# CLI Portfolio

An interactive, browser-based terminal portfolio built with plain HTML, CSS and JavaScript.

## Project structure

```
├── index.html
├── css/
│   ├── base.css          # theme tokens, reset, page layout, window chrome
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
        └── storage.js    # safe localStorage / sessionStorage access
```

## Run locally

The JavaScript uses ES modules, which browsers don't load from `file://`.
Start any static web server in the project folder, e.g.:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Push the files to the root of your repository.
2. Go to **Settings → Pages**.
3. Under *Build and deployment* choose **Deploy from a branch**, select `main` and `/ (root)`.
4. After a minute the site is live at `https://<username>.github.io/<repository>/`.

## Adding a command

Create `js/commands/mycommand.js`:

```js
export default {
    name: 'mycommand',
    description: 'Shown in help',
    run(args, { terminal, registry }) {
        return '<p>Hello!</p>'; // HTML string, or null for no output
    },
};
```

Then import it and add it to the list in `js/commands/index.js`.
