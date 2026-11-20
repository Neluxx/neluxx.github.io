import { errorMessage, statusMessage } from '../utils/html';
import type { Command } from '../terminal/types';
import type { Settings } from '../ui/settings';

const USAGE = 'Usage: <span class="c-yellow">crt</span> [on|off|toggle]';

const ENABLED_MESSAGE = statusMessage(
    'CRT effect <span class="c-green">enabled</span> — scanlines, glow and flicker active',
    'green',
);

const DISABLED_MESSAGE = statusMessage(
    'CRT effect <span class="c-yellow">disabled</span> — switched to clean reading mode',
    'yellow',
);

/** Maps the argument to the new state — null means invalid argument. */
function resolveState(arg: string, isEnabled: boolean): boolean | null {
    switch (arg) {
        case 'on':
            return true;
        case 'off':
            return false;
        case '':
        case 'toggle':
            return !isEnabled;
        default:
            return null;
    }
}

export function createCrtCommand(settings: Settings): Command {
    return {
        name: 'crt',
        description: 'Toggle the CRT effect (e.g. crt off)',

        run(args) {
            const enabled = resolveState(args.trim().toLowerCase(), settings.isCrtEnabled());

            if (enabled === null) {
                return errorMessage(USAGE);
            }

            settings.setCrtEnabled(enabled);
            return enabled ? ENABLED_MESSAGE : DISABLED_MESSAGE;
        },
    };
}
