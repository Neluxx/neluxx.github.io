import { beforeEach, describe, expect, it } from 'vitest';
import { createCrtCommand } from '../../src/commands/crt';
import { createSettings, type Settings } from '../../src/ui/settings';
import type { Command, CommandContext } from '../../src/terminal/types';
import { createMemoryStore } from '../helpers/memoryStore';

// The crt command doesn't use the context.
const context = {} as CommandContext;

describe('crt command', () => {
    let settings: Settings;
    let crtCommand: Command;

    beforeEach(() => {
        settings = createSettings(document.createElement('html'), createMemoryStore());
        crtCommand = createCrtCommand(settings);
    });

    it('turns the effect off and on', () => {
        crtCommand.run('off', context);
        expect(settings.isCrtEnabled()).toBe(false);

        crtCommand.run('on', context);
        expect(settings.isCrtEnabled()).toBe(true);
    });

    it('toggles without arguments', () => {
        crtCommand.run('', context);

        expect(settings.isCrtEnabled()).toBe(false);
    });

    it('shows the usage for an invalid argument', () => {
        const output = crtCommand.run('maybe', context);

        expect(output).toContain('Usage');
        expect(settings.isCrtEnabled()).toBe(true);
    });
});
