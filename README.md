# CLI Portfolio

My personal portfolio as an interactive terminal in the browser built with plain HTML, CSS and JavaScript.

**[Give it a try](https://neluxx.github.io/)**

## Features

- **Boot sequence** in BIOS / systemd style — skip it with any key, click or tap
- **Commands** like `about`, `experience`, `projects` and more — type `help` to see them all
- **Themes**: `phosphor`, `amber`, `matrix`, `dracula` and `ubuntu` — switch with `theme <name>`
- **CRT effect** with scanlines, glow and flicker — turn it off with `crt off`
- **Shell feel**: command history (↑ / ↓), tab completion and Ctrl+L to clear
- Theme and CRT setting are remembered in the browser, `prefers-reduced-motion` is respected

## Project structure

```
├── index.html
├── favicon.ico
├── fonts/                # self-hosted Ubuntu Mono (Latin subset) + licence
├── css/
│   ├── base.css          # fonts, theme tokens, reset, page layout, window chrome
│   ├── crt.css           # CRT effects (scanlines, glow, flicker) + "crt off"
│   └── terminal.css      # terminal, command output, boot screen, status bar
└── js/
    ├── main.js           # entry point
    ├── data/
    │   └── content.js    # all portfolio texts — edit this to update content
    ├── commands/         # one file per command
    │   └── index.js      # list of registered commands
    ├── terminal/
    │   ├── CommandRegistry.js
    │   └── Terminal.js   # input, history, autocomplete, output
    ├── ui/
    │   ├── bootSequence.js
    │   ├── settings.js   # theme + CRT state (localStorage)
    │   ├── statusBar.js
    │   └── windowChrome.js
    └── utils/
        ├── html.js       # escaping + small render helpers
        └── storage.js    # safe localStorage access
```

## Updating content

All texts live in [`js/data/content.js`](js/data/content.js) the commands only render them, so there's no need to touch any other file.

## Adding a command

Create `js/commands/mycommand.js`:

```js
import { escapeHtml } from '../utils/html.js';

export default {
    name: 'mycommand',
    description: 'Shown in help',
    run(args, { terminal, registry }) {
        // Return an HTML string, or null for no output.
        // Always escape anything that isn't a fixed string.
        return `<p>Hello, ${escapeHtml(args || 'world')}!</p>`;
    },
};
```

Then import it and add it to the list in [`js/commands/index.js`](js/commands/index.js).

## License

The code is licensed under the [MIT License](LICENSE).  
Ubuntu Mono is licensed under the [Ubuntu Font Licence 1.0](fonts/LICENSE.txt).
