import { THEMES, getTheme, isValidTheme, setTheme } from '../ui/settings.js';
import { each, errorMessage, escapeHtml, section, statusMessage } from '../utils/html.js';

function listThemes() {
    const current = getTheme();

    const rows = each(Object.entries(THEMES), ([name, description]) => {
        const isActive = name === current;
        const cls = isActive ? 'c-green bold' : 'c-cyan';

        return `
            <div class="theme-table__row">
                <span class="${cls}">${isActive ? '●' : '○'}</span>
                <span class="${cls}">${name}</span>
                <span class="c-fg muted">${description}</span>
            </div>
        `;
    });

    return section(
        'Available themes — type <span class="c-yellow">theme &lt;name&gt;</span> to switch:',
        `
            <div class="stack">${rows}</div>
            <p class="c-purple small">Your selection is remembered in this browser.</p>
        `
    );
}

export default {
    name: 'theme',
    description: 'Switch color theme (e.g. theme matrix)',

    run(args) {
        const theme = args.trim().toLowerCase();

        if (theme === '' || theme === 'list') {
            return listThemes();
        }

        if (!isValidTheme(theme)) {
            return errorMessage(
                `Unknown theme "<span class="c-yellow">${escapeHtml(theme)}</span>" — ` +
                `available: ${Object.keys(THEMES).join(', ')}`
            );
        }

        setTheme(theme);
        return statusMessage(`Theme switched to <span class="c-yellow">${theme}</span>`);
    },
};
