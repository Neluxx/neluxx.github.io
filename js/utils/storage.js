/**
 * Safe wrapper around localStorage.
 * Storage can throw (private mode, blocked cookies), so every access is guarded.
 */

export const local = {
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
