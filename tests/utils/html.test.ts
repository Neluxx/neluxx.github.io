import { describe, expect, it } from 'vitest';
import { each, escapeHtml, link } from '../../src/utils/html';

describe('escapeHtml', () => {
    it('escapes all HTML special characters', () => {
        expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
            '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;',
        );
    });

    it('converts non-string values to strings', () => {
        expect(escapeHtml(42)).toBe('42');
    });
});

describe('each', () => {
    it('renders every item and joins the results', () => {
        expect(each(['a', 'b'], (item) => `<li>${item}</li>`)).toBe('<li>a</li><li>b</li>');
    });
});

describe('link', () => {
    it('opens in a new tab and escapes url and text', () => {
        expect(link('https://example.com/?a=1&b=2', '<me>')).toBe(
            '<a href="https://example.com/?a=1&amp;b=2" target="_blank" rel="noopener noreferrer">&lt;me&gt;</a>',
        );
    });
});
