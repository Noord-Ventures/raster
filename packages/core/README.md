# @noorddev/raster

Raster core: the design tokens, the CSS, and the typed component registry. Zero dependencies. Use it without React.

```sh
npm install @noorddev/raster
```

## CSS

```ts
import "@noorddev/raster/css";
```

or from HTML:

```html
<link rel="stylesheet" href="node_modules/@noorddev/raster/css/raster.css" />
<button class="rs-btn-primary">Primary action</button>
```

`raster.css` is 84 KB (14 KB gzipped) and paints every component through `rs-*` classes. It is generated from the React package's StyleX leaves, so the two paths never drift. Individual files are exported too: `@noorddev/raster/css/tokens.css`, `@noorddev/raster/css/components/button.css`, and so on.

Set `data-theme="dark"` on the root element for the dark scheme. Without it the system preference applies.

## Tokens

```ts
import { rasterTokens } from "@noorddev/raster";
rasterTokens.color.light.paper; // "#FAF8F2"
```

The same tokens as JSON: `@noorddev/raster/tokens`. As custom properties: `css/tokens.css`.

## Registry

```ts
import { catalogComponents, rasterComponents } from "@noorddev/raster";
```

Every component as data: name, title, description, category, the classes it uses, its CSS file, its React entry, a markup snippet, its dependencies, a React example, when to use and avoid it, its keyboard interactions, accessibility notes, and aliases (shadcn/ui, Radix, and common names). The docs site, the CLI, the MCP server, the shadcn registry, and the test suite all read from it.

## Props

```ts
import props from "@noorddev/raster/props" with { type: "json" };
```

`props/props.json` lists every export of every component (`RasterPropsJson` in `src/schema.ts`): kind, description, the DOM attribute type the props extend, and each own prop with its type, whether it is required, its default, and its JSDoc. Generated from the React sources by `scripts/build-props.mjs`; never edited by hand.

## Docs for agents

`scripts/build-docs.mjs` writes `registry/docs/`: one markdown page per component (install paths, example, props tables, keyboard, accessibility, classes), `index.md`, `tokens.md`, `guide.md`, and `llms.txt`. The site serves them at `getraster.com/docs/<name>.md` and `getraster.com/llms.txt`; the CLI prints them with `docs <name>`; `@noorddev/raster-mcp` exposes them as tools and resources.

## Layers

All rules sit in cascade layers (`raster.tokens`, `raster.base`, `raster.type`, `raster.components`, `raster.touch`, `raster.motion`). Unlayered author CSS wins without `!important`.

## Typeface

Inter, SIL Open Font License 1.1, vendored under `css/fonts/inter/` with its licence.

Docs: [getraster.com](https://getraster.com). Licence: MIT.
