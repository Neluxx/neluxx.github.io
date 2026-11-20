import { beforeEach, describe, expect, it } from 'vitest';
import { createSettings, type Settings } from '../../src/ui/settings';
import { createThemeCommand } from '../../src/commands/theme';
import type { CommandContext } from '../../src/terminal/types';
import { createMemoryStore } from '../helpers/memoryStore';

// The theme command doesn't use the context.
const context = {} as CommandContext;

describe('theme command', () => {
    let settings: Settings;
    let themeCommand: ReturnType<typeof createThemeCommand>;

    beforeEach(() => {
        settings = createSettings(document.createElement('html'), createMemoryStore());
        themeCommand = createThemeCommand(settings);
    });

    it('switches to a valid theme', () => {
        themeCommand.run('Matrix', context);

        expect(settings.getTheme()).toBe('matrix');
    });

    it('rejects an unknown theme and escapes the input', () => {
        const output = themeCommand.run('<b>', context);

        expect(output).toContain('Unknown theme');
        expect(output).toContain('&lt;b&gt;');
        expect(settings.getTheme()).toBe('phosphor');
    });

    it('lists all themes without arguments', () => {
        const output = themeCommand.run('', context);

        expect(output).toContain('dracula');
        expect(output).toContain('ubuntu');
    });
});
