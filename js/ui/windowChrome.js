/**
 * The three Mac-style buttons in the window title bar.
 */

export function initWindowChrome() {
    const terminalBody = document.getElementById('terminal-body');

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
