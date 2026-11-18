/**
 * Status bar at the bottom: theme name, uptime, command counter and clock.
 */

import { getElement } from '../utils/dom';
import { formatClock, formatUptime } from '../utils/time';
import { getTheme, SETTINGS_CHANGED_EVENT } from './settings';

export interface StatusBar {
    setCommandCount(count: number): void;
}

export function createStatusBar(): StatusBar {
    const themeLabel = getElement('status-theme');
    const uptimeLabel = getElement('status-uptime');
    const commandsLabel = getElement('status-cmds');
    const clockLabel = getElement('status-clock');
    const startedAt = Date.now();

    function updateTheme(): void {
        themeLabel.textContent = getTheme();
    }

    function tick(): void {
        clockLabel.textContent = formatClock(new Date());
        uptimeLabel.textContent = formatUptime(Math.floor((Date.now() - startedAt) / 1000));
    }

    updateTheme();
    tick();
    setInterval(tick, 1000);
    document.addEventListener(SETTINGS_CHANGED_EVENT, updateTheme);

    return {
        setCommandCount(count) {
            commandsLabel.textContent = `cmds ${count}`;
        },
    };
}
