/**
 * The interactive terminal: renders output, handles the input line,
 * command history (↑ / ↓), tab completion and Ctrl+L.
 */

import { escapeHtml, errorMessage } from '../utils/html.js';
import { user } from '../data/content.js';

const PROMPT_HTML = `
    <span class="c-green">${user.name}@${user.host}</span><span>:</span><span class="c-blue">~</span><span>$</span>
`;

export class Terminal {
    #registry;
    #els;
    #history = [];      // previously entered commands
    #historyIndex = -1; // -1 = not browsing history
    #onCommand;

    /**
     * @param {object}          options
     * @param {CommandRegistry} options.registry
     * @param {HTMLElement}     options.app       scroll container
     * @param {HTMLElement}     options.output    where output blocks are appended
     * @param {HTMLInputElement} options.input
     * @param {HTMLElement}     options.prompt    prompt in front of the input
     * @param {Function}        [options.onCommand] called with the total command count
     */
    constructor({ registry, app, output, input, prompt, onCommand = () => {} }) {
        this.#registry = registry;
        this.#els = { app, output, input };
        this.#onCommand = onCommand;

        prompt.innerHTML = PROMPT_HTML;
        this.#bindEvents();
    }

    /* ---------- Public API ------------------------------------ */

    /** Append an HTML output block. */
    print(html) {
        const block = document.createElement('div');
        block.className = 'output-block';
        block.innerHTML = html;
        this.#els.output.appendChild(block);
        this.#scrollToBottom();
    }

    /** Remove all output. */
    clear() {
        this.#els.output.replaceChildren();
    }

    /** Run a command as if the user had typed it. */
    execute(rawInput) {
        const input = rawInput.trim();
        if (!input) return;

        this.#history.push(input);
        this.#historyIndex = -1;
        this.#echo(input);

        const [name, ...rest] = input.split(/\s+/);
        const args = rest.join(' ');
        const output = this.#run(name.toLowerCase(), args);

        if (output) this.print(output);

        this.#onCommand(this.#history.length);
        this.#scrollToBottom();
    }

    focus() {
        this.#els.input.focus({ preventScroll: true });
    }

    /* ---------- Internals ------------------------------------- */

    #run(name, args) {
        const command = this.#registry.get(name);

        if (!command) {
            return errorMessage(
                `<span class="bold">${escapeHtml(name)}</span>: command not found — ` +
                `try <span class="c-yellow">help</span> to list available commands`
            );
        }

        try {
            return command.run(args, { terminal: this, registry: this.#registry });
        } catch (error) {
            console.error(error);
            return errorMessage(`Error: ${escapeHtml(error.message)}`);
        }
    }

    /** Print the entered command next to a prompt. */
    #echo(input) {
        const entry = document.createElement('div');
        entry.className = 'input-entry';
        entry.innerHTML = `
            <span class="prompt">${PROMPT_HTML}</span>
            <span class="input-entry__command">${escapeHtml(input)}</span>
        `;
        this.#els.output.appendChild(entry);
    }

    #bindEvents() {
        const { input } = this.#els;

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.execute(input.value);
                input.value = '';
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                this.#navigateHistory(1);
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                this.#navigateHistory(-1);
            } else if (event.key === 'Tab') {
                event.preventDefault();
                this.#autocomplete();
            } else if (event.ctrlKey && event.key.toLowerCase() === 'l') {
                event.preventDefault();
                this.clear();
            }
        });

        // Clicking anywhere focuses the input — unless the user is selecting text.
        document.addEventListener('click', () => {
            if (!window.getSelection()?.toString()) this.focus();
        });
    }

    /** step = 1 → older entry, step = -1 → newer entry */
    #navigateHistory(step) {
        if (this.#history.length === 0) return;

        const maxIndex = this.#history.length - 1;
        this.#historyIndex = Math.min(Math.max(this.#historyIndex + step, -1), maxIndex);

        const { input } = this.#els;
        input.value = this.#historyIndex >= 0
            ? this.#history[maxIndex - this.#historyIndex]
            : '';

        // Move the caret to the end
        requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
    }

    #autocomplete() {
        const { input } = this.#els;
        const value = input.value.trim().toLowerCase();
        if (!value) return;

        const matches = this.#registry.names().filter((name) => name.startsWith(value));
        if (matches.length === 1) {
            input.value = matches[0];
        }
    }

    #scrollToBottom() {
        const { app } = this.#els;
        app.scrollTop = app.scrollHeight;
    }
}
