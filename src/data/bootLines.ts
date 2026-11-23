/**
 * The lines of the fake boot screen, top to bottom.
 * Edit this file to change what is shown while "booting".
 */

import type { User } from './types';

export type BootStatus = 'ok' | 'warn';

export interface BootLine {
    text: string;
    /** Renders a systemd style line: "[  OK  ] text". */
    status?: BootStatus;
    /** Extra CSS class for the whole line, e.g. "boot-dim". */
    cls?: string;
    /** Pause after the line in ms. Defaults to DEFAULT_DELAY_MS in bootSequence.ts. */
    delay?: number;
}

export function createBootLines(user: User): BootLine[] {
    return [
        { text: 'POST: memory test ........... 16384 MB OK', cls: 'boot-ok' },
        { text: 'POST: detecting CPU ......... 8 cores, 1 thought at a time', cls: 'boot-info' },
        { text: 'BIOS: loading bootloader .... OK', cls: 'boot-ok', delay: 160 },
        { text: '' },
        { text: '[    0.000000] Linux version 6.8.0-45-generic (Ubuntu 24.04 LTS)', cls: 'boot-dim' },
        { text: '[    0.004213] Command line: BOOT_IMAGE=/boot/vmlinuz ro quiet splash', cls: 'boot-dim' },
        { text: '[    0.118027] Memory: 16301984K available, 0K reserved for regrets', cls: 'boot-dim' },
        { text: '[    0.384511] ACPI: coffee machine not found, continuing anyway', cls: 'boot-dim' },
        {
            text: '[    1.207734] usb 1-1: new mechanical keyboard detected (loud)',
            cls: 'boot-dim',
            delay: 160,
        },
        { text: '' },
        { status: 'ok', text: 'Started Journal Service.' },
        { status: 'ok', text: `Mounted /home/${user.name}.` },
        { status: 'ok', text: 'Started Network Manager.' },
        { status: 'ok', text: 'Started Rubber Duck Debugging Service.' },
        { status: 'ok', text: 'Started Tabs vs. Spaces Arbitration Daemon.' },
        { status: 'warn', text: 'node_modules.mount: size exceeds expectations.' },
        { status: 'ok', text: 'Finished Clearing Browser Cache (just in case).' },
        { status: 'ok', text: 'Reached target Graphical Interface.' },
        { status: 'ok', text: 'Reached target Portfolio.', delay: 200 },
        { text: '' },
        { text: `Ubuntu 24.04 LTS ${user.host} pts/0`, cls: 'boot-dim' },
        { text: '' },
    ];
}
