import { skills } from '../data/content.js';
import { each, escapeHtml, section } from '../utils/html.js';

export default {
    name: 'skills',
    description: 'My technical skills',

    run() {
        const groups = each(skills.groups, (group) => `
            <p><span class="c-green">${escapeHtml(group.label)}:</span> ${escapeHtml(group.items.join(', '))}</p>
        `);

        return section(escapeHtml(skills.title), `<div>${groups}</div>`);
    },
};
