/**
 * Status bar at the bottom: theme name, uptime, command counter and clock.
 */

import { getTheme } from './settings.js';

const pad = (n) => String(n).padStart(2, '0');

function formatClock(date) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatUptime(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return h > 0 ? `up ${pad(h)}:${pad(m)}:${pad(s)}` : `up ${pad(m)}:${pad(s)}`;
}

export function createStatusBar() {
    const els = {
        theme: document.getElementById('status-theme'),
        uptime: document.getElementById('status-uptime'),
        cmds: document.getElementById('status-cmds'),
        clock: document.getElementById('status-clock'),
    };
    const startedAt = Date.now();

    function updateTheme() {
        els.theme.textContent = getTheme();
    }

    function tick() {
        els.clock.textContent = formatClock(new Date());
        els.uptime.textContent = formatUptime(Math.floor((Date.now() - startedAt) / 1000));
    }

    updateTheme();
    tick();
    setInterval(tick, 1000);
    document.addEventListener('settings-changed', updateTheme);

    return {
        setCommandCount(count) {
            els.cmds.textContent = `cmds ${count}`;
        },
    };
}
