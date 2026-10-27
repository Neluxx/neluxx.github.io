import { projects } from '../data/content.js';
import { each, escapeHtml, link, section } from '../utils/html.js';

export default {
    name: 'projects',
    description: 'Projects I have worked on',

    run() {
        const list = each(projects.list, (project) => `
            <div>
                <p class="c-green bold">${escapeHtml(project.name)}</p>
                <p>${escapeHtml(project.description)}</p>
                <p>${link(project.url, project.text)}</p>
            </div>
        `);

        return section(escapeHtml(projects.title), list);
    },
};
