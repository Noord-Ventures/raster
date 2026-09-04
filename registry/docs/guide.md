# Raster guide

Raster is a monochrome design system: paper, ink, gray, hairlines, and a 204px module. 74 components in 9 categories: actions (10), forms (16), navigation (7), feedback (9), surfaces (8), content (13), icons (1), charts (7), patterns (3). Version 0.3.0. Site: https://getraster.com. Source: https://github.com/Noord-Ventures/raster.

Three install paths share one source, so nothing drifts: the React package (precompiled StyleX plus one stylesheet), the vendored source (the shadcn model, through the Raster CLI or the shadcn CLI), and CSS only (`rs-*` classes on plain markup).

## Install

### React package

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Button, Dialog, Field, Input } from "@noorddev/raster-react";
```

React 18 or 19. Every component is also its own module: `import { Button } from "@noorddev/raster-react/components/button"`. Stateful components carry `"use client"` already, so they work inside React Server Components trees without a wrapper.

### Vendor the source

```sh
npx @noorddev/raster-cli init
npx @noorddev/raster-cli add button dialog
```

`init` writes `styles/raster.css`, the Inter files, a specimen `index.html`, and `raster.json`. `add` copies the component's StyleX leaf and its dependencies into `components/raster/`; shared helpers (`rs.ts`, `cx.ts`, `tokens.stylex.ts`) install once. Vendored leaves need a StyleX compiler (see StyleX below).

### shadcn registry

```sh
npx shadcn add https://getraster.com/r/button.json
```

The registry at `https://getraster.com/r/` follows the shadcn registry-item schema. `https://getraster.com/r/index.json` lists every item; each item's `meta.raster` carries the category, classes, snippet, example, usage, keyboard, accessibility notes, and aliases.

### CSS only

```html
<link rel="stylesheet" href="node_modules/@noorddev/raster/css/raster.css" />
<button class="rs-btn-primary">Primary action</button>
```

`@noorddev/raster/css` paints every component through `rs-*` classes and needs no JavaScript. Individual files are exported too: `@noorddev/raster/css/tokens.css`, `@noorddev/raster/css/components/button.css`. The class names per component are listed on each component page and in `/r/<name>.json` under `meta.raster.classes`.

## Theming

Set `data-theme="dark"` on the root element for the dark scheme, `data-theme="light"` to pin light. Without either, `prefers-color-scheme` applies. `color-scheme` is set with the tokens, so native controls follow. `ThemeToggle` flips the attribute and stores the choice in `localStorage` under `raster-theme`.

There is no accent hue. Emphasis comes from weight, size, and spacing. Charts may carry one spot color through the `spot` prop, which sets `--rs-chart-spot`.

Every token is a custom property on `:root`; override them in your own stylesheet. See tokens.md for the full list with light and dark values. The tokens also ship as JSON (`@noorddev/raster/tokens`) and as a W3C Design Tokens (DTCG) file (`@noorddev/raster/tokens.dtcg`).

## Cascade layers and overriding

All Raster CSS sits in cascade layers, in this order: `raster.tokens`, `raster.base`, `raster.type`, `raster.components`, `raster.touch`, `raster.motion`. Unlayered author CSS wins over any of it, so overrides never need `!important`:

```css
.rs-btn-primary { border-radius: 8px; }
```

To override from inside a layer, declare yours after Raster's: `@layer raster.motion, app;`.

## StyleX

The leaves are StyleX. Consumers of `@noorddev/raster-react` need no compiler: the package is precompiled and `@noorddev/raster-react/css` carries the output. To write your own leaves against Raster tokens, or to compile vendored leaves, use the token file:

```tsx
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "@noorddev/raster-react/tokens.stylex";

const styles = stylex.create({
  panel: { borderTop: `1px solid ${raster.divider}`, padding: raster.pad, [mq.phone]: { padding: 12 } },
});
```

`raster` aliases the CSS custom properties (`raster.ink` is `var(--text)`), so compiled leaves and `rs-*` CSS read the same values. A StyleX compiler must include `@noorddev/raster-react/tokens.stylex` in its compile so the variable hashes match: Vite uses `@stylexjs/unplugin`; Next.js uses `@stylexjs/postcss-plugin` plus a Babel pass with `@stylexjs/babel-plugin`. Without a compiler, import the package and its stylesheet and skip StyleX entirely.

## Components

Every component applies its styles through `rs([...classes], styles.leaf)`: the same element carries the semantic `rs-*` class (the CSS-only contract) and the compiled StyleX class. Overriding the class works on both paths.

Conventions that hold across the catalogue:

- Controlled and uncontrolled: `value` / `defaultValue` / `onValueChange` (Select, Combobox, Tabs, RadioGroup, ToggleGroup, Slider, Calendar, DatePicker); `checked` / `defaultChecked` / `onCheckedChange` (Switch); `pressed` / `defaultPressed` / `onPressedChange` (Toggle); `open` / `onClose` (Dialog, AlertDialog, Sheet, Drawer, CommandDialog). Checkbox and Radio are native inputs and use `checked` / `onChange`.
- `className` and `style` merge with the component's own; native attributes and event handlers pass through to the root element (the props tables say which attribute set each component extends).
- Refs: 147 of 148 exported components forward `ref` to their root element; each props table names the element (`ref` in props.json). The rest render a plain element and take no ref.
- Names: components that render no visible label take `aria-label` or `aria-labelledby` (Select, Combobox, Switch, Slider, ButtonGroup, ToggleGroup, RadioGroup, ScrollArea, Carousel, Split). Dialogs are named by their Title part.
- Platform first: `<dialog>`, `<details>`, the Popover API, scroll snap, and native inputs do the work. Where the platform has nothing, the APG pattern applies (listbox, menu, grid, tabs) with full keyboard support, listed on each page.
- Sentence case everywhere. No all caps. Copy is short and matter-of-fact.

## CLI

```sh
npx @noorddev/raster-cli init [--css-dir <dir>] [--components-dir <dir>] [--registry <url>] [--overwrite]
npx @noorddev/raster-cli add <component...> [--overwrite] [--registry <url>]
npx @noorddev/raster-cli list [--json]
npx @noorddev/raster-cli search <term> [--json]
npx @noorddev/raster-cli docs <component>
npx @noorddev/raster-cli tokens [--json]
```

The CLI works offline: the registry snapshot, the CSS, the docs, and Inter ship with it. `--json` prints machine output with no prose.

## Registry

- `https://getraster.com/r/index.json`: every item without file contents.
- `https://getraster.com/r/<name>.json`: one item with its files inlined, in the shadcn registry-item schema. `raster-base` (tokens, base, type), `inter` (the font), and `raster-lib` (shared helpers) are the foundation items every component depends on.
- `https://getraster.com/docs/props.json`: every export of every component with its props (name, type, required, default, description) and the DOM attribute type it extends.

## For agents

Raster is published as data so tools can install and compose it without guessing:

- `https://getraster.com/llms.txt`: the index of everything below, in the llmstxt.org format. `https://getraster.com/llms-full.txt` is the whole documentation in one file.
- `https://getraster.com/docs/index.md`, `https://getraster.com/docs/guide.md` (this file), `https://getraster.com/docs/tokens.md`, and `https://getraster.com/docs/<name>.md` for each component.
- `https://getraster.com/r/index.json` and `https://getraster.com/r/<name>.json`: the registry, with `meta.raster` holding the example, usage, keyboard table, accessibility notes, classes, and aliases.
- `https://getraster.com/docs/props.json`: the props contract, also shipped as `@noorddev/raster/props`.
- `npx @noorddev/raster-cli list --json`, `search <term> --json`, `docs <name>`, `tokens --json`: the same data from the terminal, offline.
- `@noorddev/raster-mcp`: an MCP server over stdio with `list_components`, `get_component`, `search_components`, `get_tokens`, `get_install`, and `get_guide`, plus `raster://docs/<name>` resources. Configure it as `{"mcpServers": {"raster": {"command": "npx", "args": ["-y", "@noorddev/raster-mcp"]}}}`.
- In code, `import { rasterComponents, rasterTokens } from "@noorddev/raster"` gives the typed registry and tokens.

When composing an interface: pick components by name or alias from index.md, read the page for the example and the props table, import from `@noorddev/raster-react`, and keep to the conventions above. Do not invent props; the props tables are generated from the TypeScript sources. Keep the copy in sentence case.
