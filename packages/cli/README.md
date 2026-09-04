# @noorddev/raster-cli

Installs Raster into any project. Works offline: the registry snapshot, the CSS, and Inter ship with the CLI.

```sh
npx @noorddev/raster-cli init
npx @noorddev/raster-cli add button dialog
```

## Commands

| Command | What it does |
|---|---|
| `init` | Writes `styles/raster.css`, Inter (SIL OFL 1.1), a specimen `index.html`, and `raster.json`. |
| `add <name...>` | Copies a component's React source (StyleX leaves) and its dependencies into `components/raster/`. Shared helpers install once. |
| `list` | Every component in the registry, by category. |
| `tokens` | The design tokens as JSON. |

Flags: `--css-dir`, `--components-dir`, `--overwrite`, `--registry <url or dir>`.

Vendored components are StyleX; compile them with `@stylexjs/babel-plugin` (Vite: `@stylexjs/unplugin`, Next: `@stylexjs/nextjs-plugin`). If you would rather not run a compiler, `npm install @noorddev/raster-react` ships the same components precompiled with one stylesheet.

## shadcn

The same registry serves `npx shadcn add https://getraster.com/r/button.json`.

Docs: [getraster.com](https://getraster.com). Licence: MIT.
