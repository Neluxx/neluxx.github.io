import { describe, expect, it } from 'vitest';
import { formatClock, formatLoginDate, formatUptime } from './time';

describe('formatClock', () => {
    it('pads hours, minutes and seconds', () => {
        expect(formatClock(new Date(2026, 0, 1, 7, 5, 9))).toBe('07:05:09');
    });
});

describe('formatUptime', () => {
    it('shows minutes and seconds below one hour', () => {
        expect(formatUptime(205)).toBe('up 03:25');
    });

    it('adds hours from one hour on', () => {
        expect(formatUptime(3805)).toBe('up 01:03:25');
    });
});

describe('formatLoginDate', () => {
    it('matches the format of the real `login` command', () => {
        expect(formatLoginDate(new Date(2026, 9, 29, 14, 2, 11))).toBe('Thu Oct 29 14:02:11 2026');
    });

    it('pads single-digit days with a space', () => {
        expect(formatLoginDate(new Date(2026, 10, 5, 8, 0, 0))).toBe('Thu Nov  5 08:00:00 2026');
    });
});
