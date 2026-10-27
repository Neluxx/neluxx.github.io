/**
 * Keeps track of all available commands.
 *
 * A command is a plain object:
 *   {
 *     name:        'about',
 *     description: 'Get to know me',
 *     run(args, context) { return '<html string>'; }
 *   }
 */

export class CommandRegistry {
    #commands = new Map();

    register(...commands) {
        for (const command of commands) {
            this.#commands.set(command.name, command);
        }
        return this;
    }

    get(name) {
        return this.#commands.get(name);
    }

    all() {
        return [...this.#commands.values()];
    }

    names() {
        return [...this.#commands.keys()];
    }
}
