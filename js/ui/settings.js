/**
 * Theme and CRT settings.
 * Values are stored as data attributes on <html> and persisted in localStorage.
 * Every change fires a `settings-changed` event on document.
 */

import { local } from '../utils/storage.js';

export const THEMES = {
    phosphor: 'Classic green CRT phosphor (default)',
    amber: 'Vintage amber monochrome monitor',
    matrix: 'Hyper-saturated digital rain green',
    dracula: 'Purple haze, easy on the eyes',
    ubuntu: 'The original purple Ubuntu look',
};

export const DEFAULT_THEME = 'phosphor';

const root = document.documentElement;

function notify() {
    document.dispatchEvent(new CustomEvent('settings-changed'));
}

/* ---------- Theme ----------------------------------------- */

export function isValidTheme(name) {
    return Object.hasOwn(THEMES, name);
}

export function getTheme() {
    const theme = root.dataset.theme;
    return isValidTheme(theme) ? theme : DEFAULT_THEME;
}

export function setTheme(name) {
    const theme = isValidTheme(name) ? name : DEFAULT_THEME;
    root.dataset.theme = theme;
    local.set('terminal-theme', theme);
    notify();
}

/* ---------- CRT ------------------------------------------- */

export function isCrtEnabled() {
    return root.dataset.crt !== 'off';
}

export function setCrtEnabled(enabled) {
    const value = enabled ? 'on' : 'off';
    root.dataset.crt = value;
    local.set('terminal-crt', value);
    notify();
}
