import { socials } from '../data/content.js';
import { each, escapeHtml, link, section } from '../utils/html.js';

export default {
    name: 'socials',
    description: 'Find me online',

    run() {
        const links = each(socials.links, (social) => `
            <p><span class="c-green">${escapeHtml(social.label)}: </span>${link(social.url, social.text)}</p>
        `);

        return section(escapeHtml(socials.title), `<div>${links}</div>`);
    },
};
