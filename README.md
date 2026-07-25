# Raster

A monochrome, CSS-first design system. One ink, no accent — emphasis comes from weight, size, and spacing, never from a hue.

Raster began as the system behind [noord.vc](https://noord.vc), [noord.dev](https://noord.dev), and renatovaldes.com; this repo is its standalone home: tokens, CSS, React components, a typed registry, a CLI, and the documentation site.

## Principles

- **One ink, no accent.** The palette is monochrome — paper, ink, and the grays between.
- **Hairlines, not boxes.** Rows and dividers are 1px lines on the open grid; cells and cards avoid heavy chrome.
- **The grid is visible.** A 204px module (184px column + 20px gutter) draws faint lines across every page.
- **CSS-first, zero dependencies.** Plain classes on plain markup. The React layer adds behavior with native elements — no Radix, no Tailwind.
- **Sentence case, always.** Never all caps.
- **Quiet motion.** 0.15–0.3s, ease. Color and opacity change; layout rarely moves; nothing bounces.

## What's in this repo

| Path | Package | Contents |
|---|---|---|
| `packages/core` | `@raster/core` | Tokens (the source of truth), per-component CSS, the typed component registry, and the build that generates `raster.css`, `tokens.css`, the token JSON, and the 0.1 compat layer |
| `packages/react` | `@raster/react` | Accessible React components with zero dependencies — native inputs, native `<dialog>`, ARIA tabs/listbox — styled by the core CSS |
| `packages/cli` | `@raster/cli` | `raster init` / `raster add` / `raster list` / `raster tokens` — carries the whole system offline and vendors code you own |
| `registry/` | — | Generated shadcn-compatible registry items, installable via `npx shadcn add <url>/r/<name>.json` |
| `apps/www` | — | The documentation site: live component gallery, per-component docs, tokens, served registry |

## Using it

**CLI (recommended).**

```sh
npx raster init            # writes styles/raster.css + raster.json
npx raster add button dialog
```

`add` vendors React source into `components/raster/` — the code is yours. Registry dependencies come along automatically. CSS-only components (link, chip, table, icons…) need no code: the classes are already in raster.css.

**Plain CSS.** Link `packages/core/css/raster.css` and use the `rs-*` classes; set `data-theme="dark"` on the root element for the dark scheme. See the registry for each component's snippet.

**Tokens.**

```ts
import { rasterTokens } from "@raster/core";
rasterTokens.color.light.paper; // "#FAF8F2"
```

**shadcn interop.** Every component is published as a registry item under `registry/` following the shadcn registry-item schema, so `npx shadcn add <host>/r/button.json` works from any host serving that directory (the docs site serves it at `/r/`).

## Architecture

`packages/core/src/tokens.ts` and `src/registry.ts` are the sources of truth. Everything else is generated:

```
src/tokens.ts ──► tokens/raster.tokens.json     (tokens as JSON)
              ──► css/tokens.css                (custom properties, light + dark, the grid)
css sources   ──► css/raster.css                (the whole system, one file)
src/legacy.ts ──► css/raster-compat.css         (0.1 class names: bb-*, lib-*, bare table)
registry      ──► registry/<name>.json          (shadcn-compatible, contents inlined)
              ──► registry/bundle.json          (embedded by the CLI at build time)
```

The test suite enforces what the generation can't: every registry class exists in its CSS, every snippet class has a provider, no `var()` is undefined, no styled class is missing from the registry, and no hex in the system is a hue.

## Development

```sh
pnpm install
pnpm build        # builds core (css + registry + dist), react, cli
pnpm test         # core integrity tests, react jsdom tests, cli tests
pnpm dev          # docs site at localhost:3000
```

## Catalogue and shadcn parity

37 components, each CSS-first with an optional zero-dependency React layer. Where shadcn reaches for Radix, Raster reaches for the platform: accordions are native `<details>` (the `name` attribute gives exclusive-open with zero JS), dialogs/alert-dialogs/sheets are native `<dialog>` (platform focus trap, Escape, backdrop), popovers use the native Popover API (top layer, light dismiss), tooltips are CSS-only and keyboard-aware, and form controls wrap real native inputs.

Still to build for full shadcn parity: command palette, combobox, calendar + date picker, data table, input-otp, context menu, menubar, navigation menu, hover card, carousel, resizable, sonner-style queueing, charts.

## Typeface

Raster is set in **Messina Sans** by Luzi Gantenbein ([Luzi Type, Zürich](https://www.luzi-type.ch)). The font is commercially licensed and **not bundled** — provide your own `@font-face` for `'Messina Sans'`, or the stack falls back to system sans. Weights: 500 (body), 600 (headings and labels).

## Coming from Raster 0.1

0.2 normalized every class to the `rs-` prefix and scoped table styles to `.rs-table`. Sites on the 0.1 names keep working by linking the generated `css/raster-compat.css` after `raster.css` (or `raster init --compat`). The rename map lives in `packages/core/src/legacy.ts`.

---

© Noord / Renato Valdés-Olmos. All rights reserved.
