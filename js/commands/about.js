import { about } from '../data/content.js';
import { each, escapeHtml, section } from '../utils/html.js';

export default {
    name: 'about',
    description: 'Get to know me',

    run() {
        return section(
            escapeHtml(about.title),
            each(about.paragraphs, (text) => `<p>${escapeHtml(text)}</p>`)
        );
    },
};
