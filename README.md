# Raster

The design system behind [noord.vc](https://noord.vc), [noord.dev](https://noord.dev), and renatovaldes.com.

Live documentation: **[noord.dev/studio/raster](https://noord.dev/studio/raster)**

## Principles

- **One ink, no accent.** The palette is monochrome — paper, ink, and the grays between. Emphasis comes from weight, size, and spacing, never from a hue.
- **Hairlines, not boxes.** Rows and dividers are 1px lines on the open grid; cells and cards avoid heavy chrome.
- **The grid is visible.** A 204px module (184px column + 20px gutter) draws faint lines across every page; content boxes span whole modules so edges step from grid line to grid line on resize.
- **Sentence case, always.** Never all caps — labels and eyebrows are sentence case.
- **Quiet motion.** 0.15–0.3s, ease. Color and opacity change; layout rarely moves; nothing bounces. All looping demos are disabled under `prefers-reduced-motion`.

## What's in this repo

| Path | Contents |
|---|---|
| `src/tokens.ts` | The token source of truth — color, type, grid, radii, icons, motion, breakpoints |
| `src/registry.ts` | The component kit as data: name, description, CSS classes, and a minimal markup snippet per component |
| `tokens/raster.tokens.json` | The tokens as plain JSON, generated from the TS source |
| `css/raster.css` | Self-contained stylesheet: token custom properties (light + dark), base styles, and the component classes |

## Using it

**CSS.** Link `css/raster.css` and set `data-theme="dark"` on the root element for the dark scheme. All components are plain classes on plain markup — see `src/registry.ts` for the snippet each component expects.

```html
<link rel="stylesheet" href="css/raster.css" />
<button class="bb-btn-primary">Primary action</button>
<span class="rs-switch rs-switch-on"><i></i></span>
```

**Tokens.** Import the JSON anywhere, or the typed object in TypeScript:

```ts
import { rasterTokens } from "@noord/raster";
rasterTokens.color.light.paper; // "#FAF8F2"
```

**Over the wire.** The tokens are also served publicly:

- `GET https://noord.dev/api/raster/tokens` — the token set as JSON
- `https://noord.dev/api/mcp` — MCP endpoint exposing tokens and the component registry to agents

## Typeface

Raster is set in **Messina Sans** by Luzi Gantenbein ([Luzi Type, Zürich](https://www.luzi-type.ch)). The font is commercially licensed and **not bundled in this repo** — provide your own `@font-face` for `'Messina Sans'`, or the stack falls back to system sans. Weights used: 500 (body), 600 (headings and labels).

## Regenerating the token JSON

After editing `src/tokens.ts` (Node ≥ 22.6):

```sh
npm run build:tokens
```

## Provenance & sync

Raster grew inside the [noord-vc](https://github.com/rennvaldes/noord-vc) codebase, where the live documentation page, the interactive demos, and the site itself consume it. This repo is the standalone home of the system's tokens, registry, and component CSS. Until the site consumes this package directly, changes should land in both places:

| Here | In noord-vc |
|---|---|
| `src/tokens.ts` | `src/lib/raster-tokens.ts` |
| `src/registry.ts` | `src/lib/raster-registry.ts` |
| `css/raster.css` | component sections of `src/app/globals.css` |

---

© Noord / Renato Valdés-Olmos. All rights reserved.
