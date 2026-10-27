import { education } from '../data/content.js';
import { each, escapeHtml, section } from '../utils/html.js';

export default {
    name: 'education',
    description: 'My educational background',

    run() {
        const engagement = each(education.engagement, (item) => `<li>${escapeHtml(item)}</li>`);

        return section(escapeHtml(education.title), `
            <div>
                <p class="c-green bold">${escapeHtml(education.degree)}</p>
                <p class="c-purple small">${escapeHtml(education.university)}</p>
                <p class="c-green">Bachelor's Thesis:</p>
                <ul><li>${escapeHtml(education.thesis)}</li></ul>
                <p class="c-green">Academic Engagement:</p>
                <ul>${engagement}</ul>
            </div>
        `);
    },
};
