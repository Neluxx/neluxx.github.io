/**
 * Status bar at the bottom: theme name, uptime, command counter and clock.
 */

import type { Settings } from './settings';
import { getElement } from '../utils/dom';
import { formatClock, formatUptime } from '../utils/time';

const MS_PER_SECOND = 1000;
const TICK_INTERVAL_MS = MS_PER_SECOND;

export interface StatusBar {
    setCommandCount(count: number): void;
}

export function createStatusBar(settings: Settings): StatusBar {
    const themeLabel = getElement('status-theme');
    const uptimeLabel = getElement('status-uptime');
    const commandsLabel = getElement('status-cmds');
    const clockLabel = getElement('status-clock');
    const startedAt = Date.now();

    function updateTheme(): void {
        themeLabel.textContent = settings.getTheme();
    }

    function tick(): void {
        clockLabel.textContent = formatClock(new Date());
        uptimeLabel.textContent = formatUptime(Math.floor((Date.now() - startedAt) / MS_PER_SECOND));
    }

    updateTheme();
    tick();
    setInterval(tick, TICK_INTERVAL_MS);
    settings.onChange(updateTheme);

    return {
        setCommandCount(count) {
            commandsLabel.textContent = `cmds ${count}`;
        },
    };
}
