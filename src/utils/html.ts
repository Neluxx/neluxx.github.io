/**
 * Small helpers for building HTML strings safely.
 *
 * Convention: every helper that takes plain text escapes it itself.
 * Parameters named `html` expect markup that is already safe.
 */

const ESCAPE_MAP: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

/** Colours defined in terminal.css as `.c-<colour>`. */
export type TextColor = 'fg' | 'green' | 'cyan' | 'blue' | 'yellow' | 'red' | 'purple';

/** Escape a value so it can be safely inserted into HTML. */
export function escapeHtml(value: unknown): string {
    return String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char] ?? char);
}

/** Render a list of items and join the resulting strings. */
export function each<T>(items: readonly T[], render: (item: T) => string): string {
    return items.map(render).join('');
}

/** A titled block — the standard layout of most command responses. */
export function section(titleHtml: string, contentHtml: string): string {
    return `
        <div class="section">
            <p class="c-yellow bold">${titleHtml}</p>
            ${contentHtml}
        </div>
    `;
}

/** An external link that opens in a new tab. */
export function link(url: string, text: string): string {
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`;
}

/** Short status message, e.g. after switching the theme. */
export function statusMessage(messageHtml: string, color: TextColor = 'green'): string {
    return `<div><span class="c-${color}">▶</span> <span class="c-fg">${messageHtml}</span></div>`;
}

/** Red error message. */
export function errorMessage(messageHtml: string): string {
    return `<div class="c-red">${messageHtml}</div>`;
}
