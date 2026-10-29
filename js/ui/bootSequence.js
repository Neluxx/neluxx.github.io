/**
 * Fake BIOS / Linux boot screen shown once per browser session.
 *
 * - Any key, click or tap skips the animation; once it has finished,
 *   the same input dismisses the screen.
 * - With "reduced motion" enabled, all lines appear at once.
 * - "Last login" shows the real time of the previous visit.
 */

import { user } from '../data/content.js';
import { local, session } from '../utils/storage.js';

const BOOTED_KEY = 'booted';
const LAST_LOGIN_KEY = 'last-login';

const DEFAULT_DELAY = 45;
const TYPING_DELAY = 70;
const FADE_OUT_MS = 360; // keep in sync with #boot-sequence transition
const DISMISS_EVENTS = ['keydown', 'pointerdown'];

/**
 * Line types:
 *   { text }                    plain line
 *   { status: 'ok' | 'warn' }   systemd style line with a coloured status column
 *   { cls }                     extra CSS class for the whole line
 *   { delay }                   pause after the line in ms
 */
const BOOT_LINES = [
    { text: 'POST: memory test ........... 16384 MB OK', cls: 'boot-ok' },
    { text: 'POST: detecting CPU ......... 8 cores, 1 thought at a time', cls: 'boot-info' },
    { text: 'BIOS: loading bootloader .... OK', cls: 'boot-ok', delay: 160 },
    { text: '' },
    { text: '[    0.000000] Linux version 6.8.0-45-generic (Ubuntu 24.04 LTS)', cls: 'boot-dim' },
    { text: '[    0.004213] Command line: BOOT_IMAGE=/boot/vmlinuz ro quiet splash', cls: 'boot-dim' },
    { text: '[    0.118027] Memory: 16301984K available, 0K reserved for regrets', cls: 'boot-dim' },
    { text: '[    0.384511] ACPI: coffee machine not found, continuing anyway', cls: 'boot-dim' },
    { text: '[    1.207734] usb 1-1: new mechanical keyboard detected (loud)', cls: 'boot-dim', delay: 160 },
    { text: '' },
    { status: 'ok', text: 'Started Journal Service.' },
    { status: 'ok', text: `Mounted /home/${user.name}.` },
    { status: 'ok', text: 'Started Network Manager.' },
    { status: 'ok', text: 'Started Rubber Duck Debugging Service.' },
    { status: 'ok', text: 'Started Tabs vs. Spaces Arbitration Daemon.' },
    { status: 'warn', text: 'node_modules.mount: size exceeds expectations.' },
    { status: 'ok', text: 'Finished Clearing Browser Cache (just in case).' },
    { status: 'ok', text: 'Reached target Graphical Interface.' },
    { status: 'ok', text: 'Reached target Portfolio.', delay: 200 },
    { text: '' },
    { text: `Ubuntu 24.04 LTS ${user.host} pts/0`, cls: 'boot-dim' },
    { text: '' },
];

const STATUS_LABELS = {
    ok: { label: '  OK  ', cls: 'boot-ok' },
    warn: { label: ' WARN ', cls: 'boot-warn' },
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const pad = (n) => String(n).padStart(2, '0');
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Formats a date like the real `login`: "Thu Oct 29 14:02:11 2026". */
function formatLoginDate(date) {
    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    const day = String(date.getDate()).padStart(2, ' ');

    return `${DAYS[date.getDay()]} ${MONTHS[date.getMonth()]} ${day} ${time} ${date.getFullYear()}`;
}

function lastLoginText() {
    const previous = new Date(local.get(LAST_LOGIN_KEY) ?? NaN);

    return Number.isNaN(previous.getTime())
        ? 'Welcome! This is your first login.'
        : `Last login: ${formatLoginDate(previous)} on pts/0`;
}

/**
 * Resolves on the first key press, click or tap and stays resolved,
 * so it can both cut the animation short and dismiss the screen.
 */
function createDismissSignal() {
    let isSet = false;
    let resolve;
    const promise = new Promise((r) => { resolve = r; });

    const onInput = () => {
        DISMISS_EVENTS.forEach((event) => window.removeEventListener(event, onInput));
        isSet = true;
        resolve();
    };
    DISMISS_EVENTS.forEach((event) => window.addEventListener(event, onInput));

    return {
        promise,
        get isSet() { return isSet; },
    };
}

function createLine({ text = '', status, cls = '' }) {
    const line = document.createElement('div');
    line.className = `boot-line ${cls}`;

    if (status) {
        const { label, cls: statusCls } = STATUS_LABELS[status];
        const badge = document.createElement('span');
        badge.className = `bold ${statusCls}`;
        badge.textContent = label;

        line.append('[', badge, `] ${text}`);
    } else {
        line.textContent = text;
    }

    return line;
}

function createPressAnyKeyLine() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const line = document.createElement('div');
    line.className = 'boot-line boot-line--prompt';
    line.innerHTML = `<span class="boot-info bold">▸ ${isTouch ? 'Tap anywhere' : 'Press any key'} to continue</span><span class="crt-cursor"></span>`;
    return line;
}

/**
 * Plays the boot sequence (unless already shown in this session)
 * and resolves once the user dismissed it.
 */
export async function runBootSequence(container) {
    if (session.get(BOOTED_KEY) === '1') {
        container.remove();
        return;
    }

    const dismissed = createDismissSignal();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Waits, but returns early as soon as the user skips.
    const pause = (ms) => (reducedMotion ? Promise.resolve() : Promise.race([wait(ms), dismissed.promise]));

    const append = (element) => {
        container.appendChild(element);
        container.scrollTop = container.scrollHeight;
        return element;
    };

    const play = async () => {
        for (const line of BOOT_LINES) {
            if (dismissed.isSet) return;
            append(createLine(line));
            await pause(line.delay ?? DEFAULT_DELAY);
        }

        // Type the user name like a real login.
        const login = append(createLine({ text: `${user.host} login: ` }));
        for (const char of user.name) {
            if (dismissed.isSet) return;
            await pause(TYPING_DELAY);
            login.textContent += char;
        }
        await pause(200);

        append(createLine({ text: lastLoginText(), cls: 'boot-dim' }));
        append(createPressAnyKeyLine());
    };

    await play();
    await dismissed.promise;

    session.set(BOOTED_KEY, '1');
    local.set(LAST_LOGIN_KEY, new Date().toISOString());

    container.classList.add('is-hidden');
    await wait(FADE_OUT_MS);
    container.remove();
}
