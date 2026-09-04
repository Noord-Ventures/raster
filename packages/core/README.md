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

Every component as data: name, title, description, category, the classes it uses, its CSS file, its React entry, a markup snippet, and its dependencies. The docs site, the CLI, the shadcn registry, and the test suite all read from it.

## Layers

All rules sit in cascade layers (`raster.tokens`, `raster.base`, `raster.type`, `raster.components`, `raster.touch`, `raster.motion`). Unlayered author CSS wins without `!important`.

## Typeface

Inter, SIL Open Font License 1.1, vendored under `css/fonts/inter/` with its licence.

Docs: [getraster.com](https://getraster.com). Licence: MIT.
