/**
 * Safe access to localStorage.
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

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/** A minimal key-value store, so features don't depend on localStorage directly. */
export interface KeyValueStore {
    get(key: StorageKey): string | null;
    set(key: StorageKey, value: string): void;
}

export const safeLocalStorage: KeyValueStore = {
    get(key) {
        try {
            return window.localStorage.getItem(key);
        } catch {
            return null;
        }
    },

    set(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch {
            /* ignore — the value just won't be remembered */
        }
    },
};
