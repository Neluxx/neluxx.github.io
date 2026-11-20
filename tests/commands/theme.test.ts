import { beforeEach, describe, expect, it } from 'vitest';
import type { CommandContext } from '../../src/terminal/types';
import { getTheme } from '../../src/ui/settings';
import { STORAGE_KEYS } from '../../src/utils/storage';
import { themeCommand } from '../../src/commands/theme';

// The theme command doesn't use the context.
const context = {} as CommandContext;

describe('theme command', () => {
    beforeEach(() => {
        delete document.documentElement.dataset.theme;
        localStorage.clear();
    });

    it('switches and remembers a valid theme', () => {
        themeCommand.run('Matrix', context);

        expect(getTheme()).toBe('matrix');
        expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('matrix');
    });

    it('rejects an unknown theme and escapes the input', () => {
        const output = themeCommand.run('<b>', context);

        expect(output).toContain('Unknown theme');
        expect(output).toContain('&lt;b&gt;');
        expect(getTheme()).toBe('phosphor');
    });

    it('lists all themes without arguments', () => {
        const output = themeCommand.run('', context);

        expect(output).toContain('dracula');
        expect(output).toContain('ubuntu');
    });
});
