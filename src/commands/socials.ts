import { socials } from '../data/content';
import type { Command } from '../terminal/types';
import { each, escapeHtml, link, section } from '../utils/html';

export const socialsCommand: Command = {
    name: 'socials',
    description: 'Find me online',

    run() {
        const links = each(
            socials.links,
            (social) => `
            <p><span class="c-green">${escapeHtml(social.label)}: </span>${link(social.url, social.text)}</p>
        `,
        );

        return section(escapeHtml(socials.title), `<div>${links}</div>`);
    },
};
