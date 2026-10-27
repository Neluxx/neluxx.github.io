import { welcome } from '../data/content.js';
import { escapeHtml } from '../utils/html.js';

const ASCII_LOGO = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝`;

export default {
    name: 'welcome',
    description: 'Back to the start',

    run() {
        return `
            <div class="section">
                <pre class="ascii-art">${ASCII_LOGO}</pre>
                <div>
                    <p class="c-purple small">${escapeHtml(welcome.subtitle)}</p>
                    <p class="c-fg mt-sm">${escapeHtml(welcome.message)}</p>
                    <p class="c-purple">Type <span class="c-yellow">help</span> to see all available commands</p>
                </div>
                <div class="divider"></div>
            </div>
        `;
    },
};
