/**
 * Previously entered commands, browsable like in a real shell (↑ / ↓).
 */
export class CommandHistory {
    private readonly entries: string[] = [];

    /** How many steps back the user currently is. -1 = not browsing. */
    private position = -1;

    get size(): number {
        return this.entries.length;
    }

    add(entry: string): void {
        this.entries.push(entry);
        this.position = -1;
    }

    /** Steps back to an older entry (↑). Stops at the oldest one. */
    previous(): string {
        this.position = Math.min(this.position + 1, this.entries.length - 1);
        return this.current();
    }

    /** Steps forward to a newer entry (↓). Returns "" once past the newest one. */
    next(): string {
        this.position = Math.max(this.position - 1, -1);
        return this.current();
    }

    private current(): string {
        if (this.position < 0) {
            return '';
        }
        return this.entries[this.entries.length - 1 - this.position] ?? '';
    }
}
