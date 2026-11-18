import type { CommandRegistry } from './CommandRegistry';
import type { Terminal } from './Terminal';

/** What a command gets access to while it runs. */
export interface CommandContext {
    terminal: Terminal;
    registry: CommandRegistry;
}

/**
 * A terminal command, e.g. `about` or `theme`.
 * Each command lives in its own file in src/commands/.
 */
export interface Command {
    /** What the user types. Lowercase, no spaces. */
    name: string;

    /** One line, shown in `help`. */
    description: string;

    /**
     * Executes the command.
     *
     * @param args    everything after the command name, e.g. "matrix" for `theme matrix`
     * @param context the terminal and the registry
     * @returns an HTML string to print, or null for no output.
     *          Escape everything that isn't a fixed string (see utils/html.ts).
     */
    run(args: string, context: CommandContext): string | null;
}
