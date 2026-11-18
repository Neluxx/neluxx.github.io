import { describe, expect, it } from 'vitest';
import { parseInput } from './parseInput';

describe('parseInput', () => {
    it('splits the name from the arguments', () => {
        expect(parseInput('theme matrix')).toEqual({ name: 'theme', args: 'matrix' });
    });

    it('lowercases the name and normalises whitespace', () => {
        expect(parseInput('  CRT   off   now ')).toEqual({ name: 'crt', args: 'off now' });
    });

    it('returns empty args for a bare command', () => {
        expect(parseInput('help')).toEqual({ name: 'help', args: '' });
    });

    it('returns null for empty input', () => {
        expect(parseInput('   ')).toBeNull();
    });
});
