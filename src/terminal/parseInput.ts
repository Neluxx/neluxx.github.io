export interface ParsedInput {
    /** Lowercased command name, e.g. "theme". */
    name: string;

    /** Everything after the name, single-spaced, e.g. "matrix". */
    args: string;
}

/**
 * Splits a line of user input into command name and arguments.
 * Returns null for empty input.
 *
 * @example parseInput('  Theme   matrix ') // { name: 'theme', args: 'matrix' }
 */
export function parseInput(rawInput: string): ParsedInput | null {
    const [name, ...rest] = rawInput.trim().split(/\s+/);

    if (!name) {
        return null;
    }

    return { name: name.toLowerCase(), args: rest.join(' ') };
}
