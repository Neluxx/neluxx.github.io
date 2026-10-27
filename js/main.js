/**
 * Entry point — wires up the UI and starts the terminal.
 */

import { commands } from './commands/index.js';
import { CommandRegistry } from './terminal/CommandRegistry.js';
import { Terminal } from './terminal/Terminal.js';
import { runBootSequence } from './ui/bootSequence.js';
import { createStatusBar } from './ui/statusBar.js';
import { initWindowChrome } from './ui/windowChrome.js';

async function main() {
    initWindowChrome();
    const statusBar = createStatusBar();

    const registry = new CommandRegistry().register(...commands);

    const app = document.getElementById('terminal-app');
    const terminal = new Terminal({
        registry,
        app,
        output: document.getElementById('terminal-output'),
        input: document.getElementById('terminal-input'),
        prompt: document.getElementById('input-prompt'),
        onCommand: (count) => statusBar.setCommandCount(count),
    });

    terminal.print(registry.get('welcome').run());

    await runBootSequence(document.getElementById('boot-sequence'));

    app.classList.add('is-visible');
    terminal.focus();
}

main();
