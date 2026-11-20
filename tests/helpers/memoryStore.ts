import type { KeyValueStore, StorageKey } from '../../src/utils/storage';

/** In-memory replacement for localStorage, so tests don't share state. */
export function createMemoryStore(): KeyValueStore & { values: Map<StorageKey, string> } {
    const values = new Map<StorageKey, string>();

    return {
        values,
        get: (key) => values.get(key) ?? null,
        set: (key, value) => values.set(key, value),
    };
}
