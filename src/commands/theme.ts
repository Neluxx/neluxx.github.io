import { each, errorMessage, escapeHtml, section, statusMessage } from '../utils/html';
import type { Command } from '../terminal/types';
import { isValidTheme, THEME_NAMES, THEMES, type Settings, type ThemeName } from '../ui/settings';

function renderThemeRow(name: ThemeName, isActive: boolean): string {
    const cls = isActive ? 'c-green bold' : 'c-cyan';

    return `
        <div class="theme-table__row">
            <span class="${cls}">${isActive ? '●' : '○'}</span>
            <span class="${cls}">${name}</span>
            <span class="c-fg muted">${THEMES[name]}</span>
        </div>
    `;
}

function renderThemeList(currentTheme: ThemeName): string {
    const rows = each(THEME_NAMES, (name) => renderThemeRow(name, name === currentTheme));

    return section(
        'Available themes — type <span class="c-yellow">theme &lt;name&gt;</span> to switch:',
        `
            <div class="stack">${rows}</div>
            <p class="c-purple small">Your selection is remembered in this browser.</p>
        `,
    );
}

export function createThemeCommand(settings: Settings): Command {
    return {
        name: 'theme',
        description: 'Switch color theme (e.g. theme matrix)',

        run(args) {
            const theme = args.trim().toLowerCase();

            if (theme === '' || theme === 'list') {
                return renderThemeList(settings.getTheme());
            }

            if (!isValidTheme(theme)) {
                return errorMessage(
                    `Unknown theme "<span class="c-yellow">${escapeHtml(theme)}</span>" — ` +
                        `available: ${THEME_NAMES.join(', ')}`,
                );
            }

            settings.setTheme(theme);
            return statusMessage(`Theme switched to <span class="c-yellow">${theme}</span>`);
        },
    };
}
