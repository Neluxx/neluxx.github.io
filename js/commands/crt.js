import { isCrtEnabled, setCrtEnabled } from '../ui/settings.js';
import { errorMessage, statusMessage } from '../utils/html.js';

/** Maps the argument to the new state — null means invalid argument. */
function resolveState(arg) {
    switch (arg) {
        case 'on':
            return true;
        case 'off':
            return false;
        case '':
        case 'toggle':
            return !isCrtEnabled();
        default:
            return null;
    }
}

export default {
    name: 'crt',
    description: 'Toggle the CRT effect (e.g. crt off)',

    run(args) {
        const enabled = resolveState(args.trim().toLowerCase());

        if (enabled === null) {
            return errorMessage('Usage: <span class="c-yellow">crt</span> [on|off|toggle]');
        }

        setCrtEnabled(enabled);

        return enabled
            ? statusMessage('CRT effect <span class="c-green">enabled</span> — scanlines, glow and flicker active', 'green')
            : statusMessage('CRT effect <span class="c-yellow">disabled</span> — switched to clean reading mode', 'yellow');
    },
};
