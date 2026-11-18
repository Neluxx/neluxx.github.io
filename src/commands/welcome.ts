import { welcome } from '../data/content';
import type { Command } from '../terminal/types';
import { escapeHtml } from '../utils/html';

const ASCII_LOGO = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝`;

/** The welcome screen — also printed on page load (see main.ts). */
export function renderWelcome(): string {
    return `
        <div class="section">
            <pre class="ascii-art" role="img" aria-label="Portfolio">${ASCII_LOGO}</pre>
            <div>
                <p class="c-purple small">${escapeHtml(welcome.subtitle)}</p>
                <p class="c-fg mt-sm">${escapeHtml(welcome.message)}</p>
                <p class="c-purple">Type <span class="c-yellow">help</span> to see all available commands</p>
            </div>
            <div class="divider"></div>
        </div>
    `;
}

export const welcomeCommand: Command = {
    name: 'welcome',
    description: 'Back to the start',
    run: renderWelcome,
};
