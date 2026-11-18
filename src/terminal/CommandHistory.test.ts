import { describe, expect, it } from 'vitest';
import { CommandHistory } from './CommandHistory';

function historyWith(...entries: string[]): CommandHistory {
    const history = new CommandHistory();
    entries.forEach((entry) => history.add(entry));
    return history;
}

describe('CommandHistory', () => {
    it('returns an empty string when there is no history', () => {
        expect(new CommandHistory().previous()).toBe('');
    });

    it('steps back from the newest to the oldest entry', () => {
        const history = historyWith('help', 'about', 'skills');

        expect(history.previous()).toBe('skills');
        expect(history.previous()).toBe('about');
        expect(history.previous()).toBe('help');
    });

    it('stays at the oldest entry', () => {
        const history = historyWith('help');

        history.previous();
        expect(history.previous()).toBe('help');
    });

    it('steps forward again and ends with an empty input', () => {
        const history = historyWith('help', 'about');

        history.previous();
        history.previous();
        expect(history.next()).toBe('about');
        expect(history.next()).toBe('');
    });

    it('starts over from the newest entry after a new command', () => {
        const history = historyWith('help', 'about');

        history.previous();
        history.previous();
        history.add('skills');
        expect(history.previous()).toBe('skills');
    });
});
