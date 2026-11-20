/**
 * Window title bar: the title and the three Mac-style buttons.
 */

import type { User } from '../data/types';
import { getElement } from '../utils/dom';

export function initWindowChrome(user: User): void {
    const terminalBody = getElement('terminal-body');

    // Same format as a real terminal emulator: user@host: current directory
    getElement('window-title').textContent = `${user.name}@${user.host}: ~`;

    getElement('btn-close').addEventListener('click', () => {
        window.close();
        window.location.href = 'about:blank';
    });

    getElement('btn-minimize').addEventListener('click', () => {
        terminalBody.classList.toggle('minimized');
    });

    getElement('btn-fullscreen').addEventListener('click', () => {
        void toggleFullscreen();
    });
}

async function toggleFullscreen(): Promise<void> {
    if (document.fullscreenElement) {
        await document.exitFullscreen();
    } else if (document.fullscreenEnabled) {
        // Not available everywhere (e.g. iPhone Safari)
        await document.documentElement.requestFullscreen();
    }
}
