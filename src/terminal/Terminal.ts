/**
 * The interactive terminal: renders output, handles the input line,
 * command history (↑ / ↓), tab completion and Ctrl+L.
 */

import { user } from '../data/content';
import { errorMessage, escapeHtml } from '../utils/html';
import { CommandHistory } from './CommandHistory';
import type { CommandRegistry } from './CommandRegistry';
import { parseInput } from './parseInput';

const PROMPT_HTML = `
    <span class="c-green">${user.name}@${user.host}</span><span>:</span><span class="c-blue">~</span><span>$</span>
`;

export interface TerminalOptions {
    registry: CommandRegistry;
    /** Scroll container around output and input. */
    app: HTMLElement;
    /** Where output blocks are appended. */
    output: HTMLElement;
    input: HTMLInputElement;
    /** Prompt in front of the input. */
    prompt: HTMLElement;
    /** Called after every command with the total number of commands entered. */
    onCommand?: (count: number) => void;
}

export class Terminal {
    private readonly registry: CommandRegistry;
    private readonly app: HTMLElement;
    private readonly output: HTMLElement;
    private readonly input: HTMLInputElement;
    private readonly onCommand: (count: number) => void;
    private readonly history = new CommandHistory();

    constructor({ registry, app, output, input, prompt, onCommand = () => {} }: TerminalOptions) {
        this.registry = registry;
        this.app = app;
        this.output = output;
        this.input = input;
        this.onCommand = onCommand;

        prompt.innerHTML = PROMPT_HTML;
        this.bindEvents();
    }

    /* ---------- Public API ------------------------------------ */

    /** Append an HTML output block. */
    print(html: string): void {
        const block = document.createElement('div');
        block.className = 'output-block';
        block.innerHTML = html;
        this.output.appendChild(block);
        this.scrollToBottom();
    }

    /** Remove all output. */
    clear(): void {
        this.output.replaceChildren();
    }

    /** Run a command as if the user had typed it. */
    execute(rawInput: string): void {
        const parsed = parseInput(rawInput);
        if (!parsed) return;

        const input = rawInput.trim();
        this.history.add(input);
        this.echo(input);

        const result = this.run(parsed.name, parsed.args);
        if (result) this.print(result);

        this.onCommand(this.history.size);
        this.scrollToBottom();
    }

    focus(): void {
        this.input.focus({ preventScroll: true });
    }

    /* ---------- Internals ------------------------------------- */

    private run(name: string, args: string): string | null {
        const command = this.registry.get(name);

        if (!command) {
            return errorMessage(
                `<span class="bold">${escapeHtml(name)}</span>: command not found — ` +
                    `try <span class="c-yellow">help</span> to list available commands`,
            );
        }

        try {
            return command.run(args, { terminal: this, registry: this.registry });
        } catch (error) {
            console.error(error);
            const message = error instanceof Error ? error.message : String(error);
            return errorMessage(`Error: ${escapeHtml(message)}`);
        }
    }

    /** Print the entered command next to a prompt. */
    private echo(input: string): void {
        const entry = document.createElement('div');
        entry.className = 'input-entry';
        entry.innerHTML = `
            <span class="prompt">${PROMPT_HTML}</span>
            <span class="input-entry__command">${escapeHtml(input)}</span>
        `;
        this.output.appendChild(entry);
    }

    private bindEvents(): void {
        this.input.addEventListener('keydown', (event) => this.handleKeydown(event));

        // Clicking anywhere focuses the input — unless the user is selecting text.
        document.addEventListener('click', () => {
            if (!window.getSelection()?.toString()) this.focus();
        });
    }

    private handleKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.execute(this.input.value);
            this.input.value = '';
            return;
        }

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            this.showHistoryEntry(event.key === 'ArrowUp' ? this.history.previous() : this.history.next());
            return;
        }

        if (event.key === 'Tab') {
            event.preventDefault();
            this.autocomplete();
            return;
        }

        if (event.ctrlKey && event.key.toLowerCase() === 'l') {
            event.preventDefault();
            this.clear();
        }
    }

    private showHistoryEntry(entry: string): void {
        if (this.history.size === 0) return;

        this.input.value = entry;

        // Move the caret to the end
        requestAnimationFrame(() => {
            this.input.setSelectionRange(entry.length, entry.length);
        });
    }

    private autocomplete(): void {
        const value = this.input.value.trim().toLowerCase();
        if (!value) return;

        // Only complete when the input is unambiguous.
        const [onlyMatch, ...otherMatches] = this.registry.names().filter((name) => name.startsWith(value));
        if (onlyMatch && otherMatches.length === 0) {
            this.input.value = onlyMatch;
        }
    }

    private scrollToBottom(): void {
        this.app.scrollTop = this.app.scrollHeight;
    }
}
