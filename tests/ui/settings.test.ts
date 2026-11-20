import { describe, expect, it, vi } from 'vitest';
import { createSettings } from '../../src/ui/settings';
import { STORAGE_KEYS } from '../../src/utils/storage';
import { createMemoryStore } from '../helpers/memoryStore';

function setup() {
    const root = document.createElement('html');
    const store = createMemoryStore();
    return { root, store, settings: createSettings(root, store) };
}

describe('settings', () => {
    it('falls back to the default theme', () => {
        const { root, settings } = setup();
        root.dataset.theme = 'unknown';

        expect(settings.getTheme()).toBe('phosphor');
    });

    it('applies and remembers a theme', () => {
        const { root, store, settings } = setup();

        settings.setTheme('amber');

        expect(root.dataset.theme).toBe('amber');
        expect(store.values.get(STORAGE_KEYS.theme)).toBe('amber');
    });

    it('enables the CRT effect by default', () => {
        expect(setup().settings.isCrtEnabled()).toBe(true);
    });

    it('applies and remembers the CRT state', () => {
        const { root, store, settings } = setup();

        settings.setCrtEnabled(false);

        expect(settings.isCrtEnabled()).toBe(false);
        expect(root.dataset.crt).toBe('off');
        expect(store.values.get(STORAGE_KEYS.crt)).toBe('off');
    });

    it('notifies listeners after every change', () => {
        const { settings } = setup();
        const listener = vi.fn();
        settings.onChange(listener);

        settings.setTheme('matrix');
        settings.setCrtEnabled(false);

        expect(listener).toHaveBeenCalledTimes(2);
    });
});
