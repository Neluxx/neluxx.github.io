/**
 * Fake BIOS / Linux boot screen shown on every page load.
 *
 * - Any key, click or tap skips the animation; once it has finished,
 *   the same input dismisses the screen.
 * - With "reduced motion" enabled, all lines appear at once.
 * - "Last login" shows the real time of the previous visit.
 */

import type { User } from '../data/types';
import { STORAGE_KEYS, type KeyValueStore } from '../utils/storage';
import { formatLoginDate } from '../utils/time';
import { createBootLines, type BootLine, type BootStatus } from './bootLines';

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

function lastLoginText(store: KeyValueStore): string {
    const previous = new Date(store.get(STORAGE_KEYS.lastLogin) ?? NaN);

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

/** What every step of the boot animation needs. */
interface BootScreen {
    append<T extends HTMLElement>(element: T): T;
    /** Waits, but returns early as soon as the user skips. */
    pause(ms: number): Promise<void>;
    isSkipped(): boolean;
}

function createBootScreen(container: HTMLElement, dismissed: DismissSignal): BootScreen {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
        append(element) {
            container.appendChild(element);
            container.scrollTop = container.scrollHeight;
            return element;
        },

        pause(ms) {
            return reducedMotion ? Promise.resolve() : Promise.race([wait(ms), dismissed.promise]);
        },

        isSkipped() {
            return dismissed.isSet;
        },
    };
}

async function playLines(screen: BootScreen, lines: readonly BootLine[]): Promise<void> {
    for (const line of lines) {
        if (screen.isSkipped()) return;
        screen.append(createLine(line));
        await screen.pause(line.delay ?? DEFAULT_DELAY_MS);
    }
}

/** Types the user name like a real login. */
async function typeLogin(screen: BootScreen, { name, host }: User): Promise<void> {
    const login = screen.append(createLine({ text: `${host} login: ` }));

    for (const char of name) {
        if (screen.isSkipped()) return;
        await screen.pause(TYPING_DELAY_MS);
        login.textContent += char;
    }

    await screen.pause(AFTER_LOGIN_DELAY_MS);
}

async function play(screen: BootScreen, user: User, store: KeyValueStore): Promise<void> {
    await playLines(screen, createBootLines(user));
    if (screen.isSkipped()) return;

    await typeLogin(screen, user);
    if (screen.isSkipped()) return;

    screen.append(createLine({ text: lastLoginText(store), cls: 'boot-dim' }));
    screen.append(createPressAnyKeyLine());
}

async function fadeOut(container: HTMLElement): Promise<void> {
    container.classList.add('is-hidden');
    await wait(FADE_OUT_MS);
    container.remove();
}

export interface BootOptions {
    container: HTMLElement;
    user: User;
    /** Remembers the time of the last login. */
    store: KeyValueStore;
}

/**
 * Plays the boot sequence and resolves once the user dismissed it.
 */
export async function runBootSequence({ container, user, store }: BootOptions): Promise<void> {
    const dismissed = createDismissSignal();

    await play(createBootScreen(container, dismissed), user, store);
    await dismissed.promise;

    store.set(STORAGE_KEYS.lastLogin, new Date().toISOString());
    await fadeOut(container);
}
