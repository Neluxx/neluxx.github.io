import { describe, expect, it } from 'vitest';
import { CommandRegistry } from './CommandRegistry';
import type { Command } from './types';

function fakeCommand(name: string): Command {
    return { name, description: `${name} description`, run: () => null };
}

describe('CommandRegistry', () => {
    it('finds a registered command by name', () => {
        const about = fakeCommand('about');
        const registry = new CommandRegistry().register(about);

        expect(registry.get('about')).toBe(about);
        expect(registry.get('unknown')).toBeUndefined();
    });

    it('keeps the registration order', () => {
        const registry = new CommandRegistry().register(fakeCommand('help'), fakeCommand('about'));

        expect(registry.names()).toEqual(['help', 'about']);
    });
});
