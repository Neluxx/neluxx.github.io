/**
 * Entry point — loads the styles, wires up the UI and starts the terminal.
 */

import './styles/base.css';
import './styles/crt.css';
import './styles/terminal.css';

import { createCommands } from './commands';
import { renderWelcome } from './commands/welcome';
import { CommandRegistry } from './terminal/CommandRegistry';
import { Terminal } from './terminal/Terminal';
import { runBootSequence } from './ui/bootSequence';
import { createSettings } from './ui/settings';
import { createStatusBar } from './ui/statusBar';
import { initWindowChrome } from './ui/windowChrome';
import { getElement } from './utils/dom';
import { safeLocalStorage } from './utils/storage';

async function main(): Promise<void> {
    const settings = createSettings(document.documentElement, safeLocalStorage);

    initWindowChrome();
    const statusBar = createStatusBar(settings);

    const registry = new CommandRegistry().register(...createCommands(settings));

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
