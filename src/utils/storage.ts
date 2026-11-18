/**
 * Safe wrapper around localStorage.
 * Storage can throw (private mode, blocked cookies), so every access is guarded.
 */

/**
 * All keys used in localStorage, in one place.
 * The inline script in index.html reads `theme` and `crt` as well — keep both in sync.
 */
export const STORAGE_KEYS = {
    theme: 'terminal-theme',
    crt: 'terminal-crt',
    lastLogin: 'last-login',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const local = {
    get(key: StorageKey): string | null {
        try {
            return window.localStorage.getItem(key);
        } catch {
            return null;
        }
    },

    set(key: StorageKey, value: string): void {
        try {
            window.localStorage.setItem(key, value);
        } catch {
            /* ignore — the value just won't be remembered */
        }
    },
};
