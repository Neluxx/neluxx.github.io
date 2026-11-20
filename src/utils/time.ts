/**
 * Date and duration formatting used by the boot screen and the status bar.
 */

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;

/** Pads a number to two digits: 7 → "07". */
function pad(value: number): string {
    return String(value).padStart(2, '0');
}

/** "14:02:11" */
export function formatClock(date: Date): string {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/** "up 03:25", or "up 01:03:25" once an hour has passed. */
export function formatUptime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
    const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
    const seconds = totalSeconds % SECONDS_PER_MINUTE;

    return hours > 0
        ? `up ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        : `up ${pad(minutes)}:${pad(seconds)}`;
}

/** Formats a date like the real `login`: "Thu Oct 29 14:02:11 2026". */
export function formatLoginDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, ' ');

    return `${DAYS[date.getDay()]} ${MONTHS[date.getMonth()]} ${day} ${formatClock(date)} ${date.getFullYear()}`;
}
