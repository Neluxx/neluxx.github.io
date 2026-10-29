/**
 * Window title bar: the title and the three Mac-style buttons.
 */

import { user } from '../data/content.js';

export function initWindowChrome() {
    const terminalBody = document.getElementById('terminal-body');

    // Same format as a real terminal emulator: user@host: current directory
    document.getElementById('window-title').textContent = `${user.name}@${user.host}: ~`;

    document.getElementById('btn-close').addEventListener('click', () => {
        window.close();
        window.location.href = 'about:blank';
    });

    document.getElementById('btn-minimize').addEventListener('click', () => {
        terminalBody.classList.toggle('minimized');
    });

    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen?.();
        }
    });
}
