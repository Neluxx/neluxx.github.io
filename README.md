# CLI Portfolio

My personal portfolio as an interactive terminal in the browser built with TypeScript, HTML and CSS — no framework.

**[Give it a try](https://neluxx.github.io/)**

## Features

- **Boot sequence** in BIOS / systemd style — skip it with any key, click or tap
- **Commands** like `about`, `experience`, `projects` and more — type `help` to see them all
- **Themes**: `phosphor`, `amber`, `matrix`, `dracula` and `ubuntu` — switch with `theme <name>`
- **CRT effect** with scanlines, glow and flicker — turn it off with `crt off`
- **Shell feel**: command history (↑ / ↓), tab completion and Ctrl+L to clear
- Theme and CRT setting are remembered in the browser, `prefers-reduced-motion` is respected

## Getting started

Requires Node.js (version in [`.nvmrc`](.nvmrc)).

```sh
npm install
npm run dev        # dev server with hot reload
```

| Script              | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server                         |
| `npm run build`     | Type check and build the site into `dist/`   |
| `npm run preview`   | Serve the built site locally                 |
| `npm test`          | Run the unit tests (Vitest)                  |
| `npm run lint`      | Check the code with ESLint                   |
| `npm run format`    | Format all files with Prettier               |
| `npm run typecheck` | Run the TypeScript compiler without building |

Every push and pull request runs lint, type check, tests and build in CI.
Pushes to `main` are deployed to GitHub Pages automatically.
Dependencies are kept up to date by [Renovate](renovate.json).

## Project structure

```
├── index.html
├── public/                   # copied as-is: favicon + self-hosted Ubuntu Mono
└── src/
    ├── main.ts               # entry point — wires everything together
    ├── data/
    │   ├── content.ts        # all portfolio texts — edit this to update content
    │   └── types.ts          # shape of the content
    ├── commands/             # one file per command
    │   └── index.ts          # list of registered commands
    ├── terminal/
    │   ├── types.ts          # the Command interface
    │   ├── Terminal.ts       # input line, output, key handling
    │   ├── CommandRegistry.ts
    │   ├── CommandHistory.ts # ↑ / ↓ history
    │   └── parseInput.ts     # "theme matrix" → { name, args }
    ├── ui/
    │   ├── bootSequence.ts   # boot screen animation
    │   ├── bootLines.ts      # the lines shown while booting
    │   ├── settings.ts       # theme + CRT state
    │   ├── statusBar.ts
    │   └── windowChrome.ts
    ├── utils/
    │   ├── dom.ts            # typed element lookup
    │   ├── html.ts           # escaping + small render helpers
    │   ├── storage.ts        # safe localStorage access
    │   └── time.ts           # clock, uptime and login date formatting
    └── styles/
        ├── base.css          # fonts, theme tokens, reset, page layout, window chrome
        ├── crt.css           # CRT effects (scanlines, glow, flicker) + "crt off"
        └── terminal.css      # terminal, command output, boot screen, status bar
```

Tests live in `tests/`, in the same folder layout as `src/` (e.g. `tests/utils/html.test.ts` tests `src/utils/html.ts`).

## Updating content

All texts live in [`src/data/content.ts`](src/data/content.ts). The commands only render them, so there's no need to touch any other file.

## Adding a command

Create `src/commands/hello.ts`:

```ts
import type { Command } from '../terminal/types';
import { escapeHtml } from '../utils/html';

export const helloCommand: Command = {
  name: 'hello',
  description: 'Shown in help',

  run(args) {
    // Return an HTML string, or null for no output.
    // Always escape anything that isn't a fixed string.
    return `<p>Hello, ${escapeHtml(args || 'world')}!</p>`;
  },
};
```

Then import it and add it to the list in [`src/commands/index.ts`](src/commands/index.ts).

## License

The code is licensed under the [MIT License](LICENSE).  
Ubuntu Mono is licensed under the [Ubuntu Font Licence 1.0](public/fonts/LICENSE.txt).
