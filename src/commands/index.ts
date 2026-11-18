/**
 * All available commands, in the order they appear in `help`.
 * To add a command: create a file in this folder and add it here.
 */

import type { Command } from '../terminal/types';
import { aboutCommand } from './about';
import { clearCommand } from './clear';
import { crtCommand } from './crt';
import { educationCommand } from './education';
import { experienceCommand } from './experience';
import { helpCommand } from './help';
import { projectsCommand } from './projects';
import { skillsCommand } from './skills';
import { socialsCommand } from './socials';
import { themeCommand } from './theme';
import { welcomeCommand } from './welcome';

export const commands: Command[] = [
    helpCommand,
    aboutCommand,
    clearCommand,
    skillsCommand,
    educationCommand,
    socialsCommand,
    projectsCommand,
    experienceCommand,
    welcomeCommand,
    themeCommand,
    crtCommand,
];
