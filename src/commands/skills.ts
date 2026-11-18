import { skills } from '../data/content';
import type { Command } from '../terminal/types';
import { each, escapeHtml, section } from '../utils/html';

export const skillsCommand: Command = {
    name: 'skills',
    description: 'My technical skills',

    run() {
        const groups = each(
            skills.groups,
            (group) => `
            <p><span class="c-green">${escapeHtml(group.label)}:</span> ${escapeHtml(group.items.join(', '))}</p>
        `,
        );

        return section(escapeHtml(skills.title), `<div>${groups}</div>`);
    },
};
