/**
 * Typed access to the elements defined in index.html.
 */

/**
 * Returns the element with the given id and checks its type.
 * Throws early with a clear message instead of failing later with `null`.
 *
 * @example getElement('terminal-input', HTMLInputElement)
 */
export function getElement<T extends HTMLElement>(
    id: string,
    type: new () => T = HTMLElement as new () => T,
): T {
    const element = document.getElementById(id);

    if (!(element instanceof type)) {
        throw new Error(`Element #${id} is missing or not a ${type.name}`);
    }

    return element;
}
