import { STORAGE_KEYS, type KeyValueStore } from '../utils/storage';

/** Every theme needs a matching `html[data-theme="…"]` block in base.css. */
export const THEMES = {
    phosphor: 'Classic green CRT phosphor (default)',
    amber: 'Vintage amber monochrome monitor',
    matrix: 'Hyper-saturated digital rain green',
    dracula: 'Purple haze, easy on the eyes',
    ubuntu: 'The original purple Ubuntu look',
} as const;

export type ThemeName = keyof typeof THEMES;

export const THEME_NAMES = Object.keys(THEMES) as ThemeName[];

export const DEFAULT_THEME: ThemeName = 'phosphor';

export function isValidTheme(name: string | undefined): name is ThemeName {
    return name !== undefined && Object.hasOwn(THEMES, name);
}

export interface Settings {
    getTheme(): ThemeName;
    setTheme(theme: ThemeName): void;
    isCrtEnabled(): boolean;
    setCrtEnabled(enabled: boolean): void;
    /** Calls `listener` after every change. */
    onChange(listener: () => void): void;
}

/**
 * Theme and CRT settings.
 * The values are stored as data attributes on `root`, because the CSS selects on them,
 * and persisted in `store` so they survive a reload.
 */
export function createSettings(root: HTMLElement, store: KeyValueStore): Settings {
    const listeners: (() => void)[] = [];

    function notify(): void {
        listeners.forEach((listener) => listener());
    }

    return {
        getTheme() {
            const theme = root.dataset.theme;
            return isValidTheme(theme) ? theme : DEFAULT_THEME;
        },

        setTheme(theme) {
            root.dataset.theme = theme;
            store.set(STORAGE_KEYS.theme, theme);
            notify();
        },

        isCrtEnabled() {
            return root.dataset.crt !== 'off';
        },

        setCrtEnabled(enabled) {
            const value = enabled ? 'on' : 'off';
            root.dataset.crt = value;
            store.set(STORAGE_KEYS.crt, value);
            notify();
        },

        onChange(listener) {
            listeners.push(listener);
        },
    };
}
