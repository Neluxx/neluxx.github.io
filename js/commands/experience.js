import { experience } from '../data/content.js';
import { each, escapeHtml, section } from '../utils/html.js';

export default {
    name: 'experience',
    description: 'My work experience',

    run() {
        const jobs = each(experience.jobs, (job) => `
            <div>
                <p class="c-green bold">${escapeHtml(job.title)}</p>
                <p class="c-purple small">${escapeHtml(job.company)}</p>
                <p>${escapeHtml(job.description)}</p>
            </div>
        `);

        return section(escapeHtml(experience.title), jobs);
    },
};
