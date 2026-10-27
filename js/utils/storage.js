/**
 * Safe wrappers around Web Storage.
 * Storage can throw (private mode, blocked cookies), so every access is guarded.
 */

function read(storage, key) {
    try {
        return storage.getItem(key);
    } catch {
        return null;
    }
}

function write(storage, key, value) {
    try {
        storage.setItem(key, value);
    } catch {
        /* ignore — the setting just won't be remembered */
    }
}

export const local = {
    get: (key) => read(window.localStorage, key),
    set: (key, value) => write(window.localStorage, key, value),
};

export const session = {
    get: (key) => read(window.sessionStorage, key),
    set: (key, value) => write(window.sessionStorage, key, value),
};
