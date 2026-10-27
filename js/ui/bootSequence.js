/**
 * Fake BIOS / Linux boot screen shown once per browser session.
 */

import { session } from '../utils/storage.js';

const STORAGE_KEY = 'booted';

const BOOT_LINES = [
    { text: 'POST: checking memory...... ', tail: 'OK', cls: 'boot-ok' },
    { text: 'POST: detecting CPU........ ', tail: 'Curiosity v4.7', cls: 'boot-info' },
    { text: 'BIOS: loading bootloader... ', tail: 'OK', cls: 'boot-ok' },
    { text: '', delay: 50 },
    { text: '[    0.0042 ] Linux portfolio 6.6.0-coffee #1 SMP', cls: 'boot-dim' },
    { text: '[    0.0118 ] mounting /home/neluxx ............... ', tail: '[ OK ]', cls: 'boot-ok' },
    { text: '[    0.0203 ] starting humor.service ............... ', tail: '[ OK ]', cls: 'boot-ok' },
    { text: '[    0.0317 ] checking caffeine levels ............. ', tail: '[ LOW ]', cls: 'boot-warn' },
    { text: '[    0.0480 ] loading personality matrix ........... ', tail: '[ OK ]', cls: 'boot-ok' },
    { text: '[    0.0612 ] starting html.service ................ ', tail: '[ OK ]', cls: 'boot-ok' },
    { text: '[    0.0791 ] starting github-pages.target ......... ', tail: '[ OK ]', cls: 'boot-ok' },
    { text: '[    0.0902 ] initializing portfolio ............... ', tail: '[ OK ]', cls: 'boot-ok' },
    { text: '', delay: 80 },
    { text: 'login: neluxx', cls: 'boot-info', delay: 80 },
    { text: 'Last login: just now on tty1', cls: 'boot-dim', delay: 80 },
];

const DEFAULT_DELAY = 35;
const DISMISS_EVENTS = ['keydown', 'mousedown', 'touchstart'];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createLine({ text, tail, cls = '' }) {
    const line = document.createElement('div');
    line.className = `boot-line ${cls}`;

    if (tail) {
        const head = document.createElement('span');
        head.textContent = text;

        const status = document.createElement('span');
        status.className = `bold ${cls}`;
        status.textContent = tail;

        line.append(head, status);
    } else {
        line.textContent = text;
    }

    return line;
}

function createPressAnyKeyLine() {
    const line = document.createElement('div');
    line.className = 'boot-line boot-line--prompt';
    line.innerHTML = '<span class="boot-info bold">▸ Press any key to continue</span><span class="crt-cursor"></span>';
    return line;
}

function waitForAnyKey() {
    return new Promise((resolve) => {
        const dismiss = () => {
            DISMISS_EVENTS.forEach((event) => window.removeEventListener(event, dismiss));
            resolve();
        };
        DISMISS_EVENTS.forEach((event) => window.addEventListener(event, dismiss));
    });
}

/**
 * Plays the boot sequence (unless already shown in this session)
 * and resolves once the user dismissed it.
 */
export async function runBootSequence(container) {
    if (session.get(STORAGE_KEY) === '1') {
        container.remove();
        return;
    }

    for (const line of BOOT_LINES) {
        container.appendChild(createLine(line));
        container.scrollTop = container.scrollHeight;
        await wait(line.delay ?? DEFAULT_DELAY);
    }

    container.appendChild(createLine({ text: '' }));
    container.appendChild(createPressAnyKeyLine());
    container.scrollTop = container.scrollHeight;

    await waitForAnyKey();
    session.set(STORAGE_KEY, '1');

    container.classList.add('is-hidden');
    await wait(360);
    container.remove();
}
