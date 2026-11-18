/**
 * Entry point — loads the styles, wires up the UI and starts the terminal.
 */

import './styles/base.css';
import './styles/crt.css';
import './styles/terminal.css';

import { commands } from './commands';
import { renderWelcome } from './commands/welcome';
import { CommandRegistry } from './terminal/CommandRegistry';
import { Terminal } from './terminal/Terminal';
import { runBootSequence } from './ui/bootSequence';
import { createStatusBar } from './ui/statusBar';
import { initWindowChrome } from './ui/windowChrome';
import { getElement } from './utils/dom';

async function main(): Promise<void> {
    initWindowChrome();
    const statusBar = createStatusBar();

    const registry = new CommandRegistry().register(...commands);

    const app = getElement('terminal-app');
    const terminal = new Terminal({
        registry,
        app,
        output: getElement('terminal-output'),
        input: getElement('terminal-input', HTMLInputElement),
        prompt: getElement('input-prompt'),
        onCommand: (count) => statusBar.setCommandCount(count),
    });

    terminal.print(renderWelcome());

    await runBootSequence(getElement('boot-sequence'));

    app.classList.add('is-visible');
    terminal.focus();
}

void main();
