import type { Command } from './types';

/**
 * Keeps track of all available commands, in the order they were registered.
 */
export class CommandRegistry {
    private readonly commands = new Map<string, Command>();

    register(...commands: Command[]): this {
        for (const command of commands) {
            this.commands.set(command.name, command);
        }
        return this;
    }

    get(name: string): Command | undefined {
        return this.commands.get(name);
    }

    all(): Command[] {
        return [...this.commands.values()];
    }

    names(): string[] {
        return [...this.commands.keys()];
    }
}
