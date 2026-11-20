/**
 * Fake BIOS / Linux boot screen shown on every page load.
 *
 * - Any key, click or tap skips the animation; once it has finished,
 *   the same input dismisses the screen.
 * - With "reduced motion" enabled, all lines appear at once.
 * - "Last login" shows the real time of the previous visit.
 */

import { user } from '../data/content';
import { safeLocalStorage, STORAGE_KEYS } from '../utils/storage';
import { formatLoginDate } from '../utils/time';
import { BOOT_LINES, type BootLine, type BootStatus } from './bootLines';

const DEFAULT_DELAY_MS = 45;
const TYPING_DELAY_MS = 70;
const AFTER_LOGIN_DELAY_MS = 200;
const FADE_OUT_MS = 360; // keep in sync with the #boot-sequence transition in terminal.css
const DISMISS_EVENTS = ['keydown', 'pointerdown'] as const;

const STATUS_LABELS: Record<BootStatus, { label: string; cls: string }> = {
    ok: { label: '  OK  ', cls: 'boot-ok' },
    warn: { label: ' WARN ', cls: 'boot-warn' },
};

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

interface DismissSignal {
    readonly promise: Promise<void>;
    readonly isSet: boolean;
}

/**
 * Resolves on the first key press, click or tap and stays resolved,
 * so it can both cut the animation short and dismiss the screen.
 */
function createDismissSignal(): DismissSignal {
    let isSet = false;

    const promise = new Promise<void>((resolve) => {
        const onInput = (): void => {
            for (const event of DISMISS_EVENTS) window.removeEventListener(event, onInput);
            isSet = true;
            resolve();
        };

        for (const event of DISMISS_EVENTS) window.addEventListener(event, onInput);
    });

    return {
        promise,
        get isSet() {
            return isSet;
        },
    };
}

function lastLoginText(): string {
    const previous = new Date(safeLocalStorage.get(STORAGE_KEYS.lastLogin) ?? NaN);

    return Number.isNaN(previous.getTime())
        ? 'Welcome! This is your first login.'
        : `Last login: ${formatLoginDate(previous)} on pts/0`;
}

function createLine({ text, status, cls = '' }: BootLine): HTMLDivElement {
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

function createPressAnyKeyLine(): HTMLDivElement {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const line = document.createElement('div');
    line.className = 'boot-line boot-line--prompt';
    line.innerHTML = `<span class="boot-info bold">▸ ${isTouch ? 'Tap anywhere' : 'Press any key'} to continue</span><span class="crt-cursor"></span>`;
    return line;
}

/**
 * Plays the boot sequence and resolves once the user dismissed it.
 */
export async function runBootSequence(container: HTMLElement): Promise<void> {
    const dismissed = createDismissSignal();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Waits, but returns early as soon as the user skips.
    const pause = (ms: number): Promise<void> =>
        reducedMotion ? Promise.resolve() : Promise.race([wait(ms), dismissed.promise]);

    const append = <T extends HTMLElement>(element: T): T => {
        container.appendChild(element);
        container.scrollTop = container.scrollHeight;
        return element;
    };

    const play = async (): Promise<void> => {
        for (const line of BOOT_LINES) {
            if (dismissed.isSet) return;
            append(createLine(line));
            await pause(line.delay ?? DEFAULT_DELAY_MS);
        }

        // Type the user name like a real login.
        const login = append(createLine({ text: `${user.host} login: ` }));
        for (const char of user.name) {
            if (dismissed.isSet) return;
            await pause(TYPING_DELAY_MS);
            login.textContent += char;
        }
        await pause(AFTER_LOGIN_DELAY_MS);

        append(createLine({ text: lastLoginText(), cls: 'boot-dim' }));
        append(createPressAnyKeyLine());
    };

    await play();
    await dismissed.promise;

    safeLocalStorage.set(STORAGE_KEYS.lastLogin, new Date().toISOString());

    container.classList.add('is-hidden');
    await wait(FADE_OUT_MS);
    container.remove();
}
