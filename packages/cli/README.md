# @noorddev/raster-cli

Installs Raster into any project. Works offline: the registry snapshot, the CSS, the docs, and Inter ship with the CLI.

```sh
npx @noorddev/raster-cli init
npx @noorddev/raster-cli add button dialog
```

## Commands

| Command | What it does |
|---|---|
| `init` | Writes `styles/raster.css`, Inter (SIL OFL 1.1), a specimen `index.html`, and `raster.json`. |
| `add <name...>` | Copies a component's React source (StyleX leaves) and its dependencies into `components/raster/`. Shared helpers install once. |
| `list [--json]` | Every component in the registry, by category. `--json` prints an array of `{ name, title, description, category, cssOnly }`. |
| `search <term> [--json]` | Components whose name, title, description, aliases, or classes match. `search sonner` finds toast; `search "side panel"` finds sheet. |
| `docs <name>` | The markdown page for a component: install paths, React example, props table, keyboard, accessibility, classes. Also `docs guide`, `docs index`, `docs tokens`. |
| `tokens [--json]` | The design tokens as JSON. |

Flags: `--css-dir`, `--components-dir`, `--overwrite`, `--registry <url or dir>`, `--json`.

Vendored components are StyleX; compile them with `@stylexjs/babel-plugin` (Vite: `@stylexjs/unplugin`, Next: `@stylexjs/postcss-plugin` plus a Babel pass). If you would rather not run a compiler, `npm install @noorddev/raster-react` ships the same components precompiled with one stylesheet.

## For agents

`list --json`, `search <term> --json`, and `docs <name>` give a coding agent the catalogue, a way to find a component by any common name, and the full page for it, with no network. The same pages are served at `https://getraster.com/docs/<name>.md` and indexed by `https://getraster.com/llms.txt`; `@noorddev/raster-mcp` exposes them as MCP tools.

## shadcn

The same registry serves `npx shadcn add https://getraster.com/r/button.json`.

Docs: [getraster.com](https://getraster.com). Licence: MIT.
