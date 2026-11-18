/**
 * Theme and CRT settings.
 * Values are stored as data attributes on <html> and persisted in localStorage.
 * Every change fires a `settings-changed` event on document.
 */

import { local, STORAGE_KEYS } from '../utils/storage';

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

export const SETTINGS_CHANGED_EVENT = 'settings-changed';

const root = document.documentElement;

function notify(): void {
    document.dispatchEvent(new CustomEvent(SETTINGS_CHANGED_EVENT));
}

/* ---------- Theme ----------------------------------------- */

export function isValidTheme(name: string | undefined): name is ThemeName {
    return name !== undefined && Object.hasOwn(THEMES, name);
}

export function getTheme(): ThemeName {
    const theme = root.dataset.theme;
    return isValidTheme(theme) ? theme : DEFAULT_THEME;
}

export function setTheme(theme: ThemeName): void {
    root.dataset.theme = theme;
    local.set(STORAGE_KEYS.theme, theme);
    notify();
}

/* ---------- CRT ------------------------------------------- */

export function isCrtEnabled(): boolean {
    return root.dataset.crt !== 'off';
}

export function setCrtEnabled(enabled: boolean): void {
    const value = enabled ? 'on' : 'off';
    root.dataset.crt = value;
    local.set(STORAGE_KEYS.crt, value);
    notify();
}
