/**
 * Small helpers for building HTML strings safely.
 */

const ESCAPE_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

/** Escape a value so it can be safely inserted into HTML. */
export function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);
}

/** Render a list of items and join the resulting strings. */
export function each(items, render) {
    return items.map(render).join('');
}

/** A titled block — the standard layout of most command responses. */
export function section(title, content) {
    return `
        <div class="section">
            <p class="c-yellow bold">${title}</p>
            ${content}
        </div>
    `;
}

/** An external link that opens in a new tab. */
export function link(url, text) {
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`;
}

/** Short status message, e.g. after switching the theme. */
export function statusMessage(message, color = 'green') {
    return `<div><span class="c-${color}">▶</span> <span class="c-fg">${message}</span></div>`;
}

/** Red error message. */
export function errorMessage(message) {
    return `<div class="c-red">${message}</div>`;
}
