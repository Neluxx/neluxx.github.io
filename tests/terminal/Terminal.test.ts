import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CommandRegistry } from '../../src/terminal/CommandRegistry';
import { Terminal } from '../../src/terminal/Terminal';
import type { Command } from '../../src/terminal/types';

function command(name: string, run: Command['run'] = () => `<p>${name} output</p>`): Command {
    return { name, description: name, run };
}

describe('Terminal', () => {
    let output: HTMLElement;
    let input: HTMLInputElement;
    let onCommand: (count: number) => void;
    let terminal: Terminal;

    beforeEach(() => {
        output = document.createElement('div');
        input = document.createElement('input');
        onCommand = vi.fn<(count: number) => void>();

        const registry = new CommandRegistry().register(
            command('help'),
            command('crt'),
            command('clear'),
            command('broken', () => {
                throw new Error('<boom>');
            }),
        );

        terminal = new Terminal({
            registry,
            user: { name: 'neluxx', host: 'portfolio' },
            app: document.createElement('div'),
            output,
            input,
            prompt: document.createElement('span'),
            onCommand,
        });
    });

    function press(key: string, options: KeyboardEventInit = {}): void {
        input.dispatchEvent(new KeyboardEvent('keydown', { key, ...options }));
    }

    function type(value: string): void {
        input.value = value;
        press('Enter');
    }

    it('echoes the input and prints the command output', () => {
        terminal.execute('  HELP ');

        expect(output.querySelector('.input-entry__command')?.textContent).toBe('HELP');
        expect(output.textContent).toContain('help output');
        expect(onCommand).toHaveBeenCalledWith(1);
    });

    it('ignores empty input', () => {
        terminal.execute('   ');

        expect(output.childElementCount).toBe(0);
        expect(onCommand).not.toHaveBeenCalled();
    });

    it('reports an unknown command and escapes its name', () => {
        terminal.execute('<b>');

        expect(output.innerHTML).toContain('command not found');
        expect(output.innerHTML).toContain('&lt;b&gt;');
    });

    it('shows an escaped error message when a command throws', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);

        terminal.execute('broken');

        expect(output.innerHTML).toContain('Error: &lt;boom&gt;');
    });

    it('runs the command on Enter and clears the input', () => {
        type('help');

        expect(output.textContent).toContain('help output');
        expect(input.value).toBe('');
    });

    it('browses the history with the arrow keys', () => {
        type('help');
        type('crt');

        press('ArrowUp');
        expect(input.value).toBe('crt');

        press('ArrowUp');
        expect(input.value).toBe('help');

        press('ArrowDown');
        press('ArrowDown');
        expect(input.value).toBe('');
    });

    it('completes a unique command prefix on Tab', () => {
        input.value = 'he';
        press('Tab');

        expect(input.value).toBe('help');
    });

    it('leaves an ambiguous prefix unchanged on Tab', () => {
        input.value = 'c';
        press('Tab');

        expect(input.value).toBe('c');
    });

    it('clears the output on Ctrl+L', () => {
        terminal.execute('help');

        press('l', { ctrlKey: true });

        expect(output.childElementCount).toBe(0);
    });
});
