import { about } from '../data/content';
import type { Command } from '../terminal/types';
import { each, escapeHtml, section } from '../utils/html';

export const aboutCommand: Command = {
    name: 'about',
    description: 'Get to know me',

    run() {
        return section(
            escapeHtml(about.title),
            each(about.paragraphs, (text) => `<p>${escapeHtml(text)}</p>`),
        );
    },
};
