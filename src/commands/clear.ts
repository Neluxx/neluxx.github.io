import type { Command } from '../terminal/types';

export const clearCommand: Command = {
    name: 'clear',
    description: 'Clear the terminal',

    run(_args, { terminal }) {
        terminal.clear();
        return null;
    },
};
