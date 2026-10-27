import { each, escapeHtml, section } from '../utils/html.js';

export default {
    name: 'help',
    description: 'Not sure where to start?',

    run(args, { registry }) {
        const rows = each(registry.all(), (command) => `
            <div class="command-table__row">
                <span class="c-cyan">${escapeHtml(command.name)}</span>
                <span class="c-fg">${escapeHtml(command.description)}</span>
            </div>
        `);

        return section('Available commands:', `
            <div>${rows}</div>
            <p class="c-purple small">Tip: use ↑ / ↓ to navigate command history · Tab to autocomplete · Ctrl+L to clear</p>
        `);
    },
};
