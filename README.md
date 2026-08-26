# Raster

A monochrome, CSS-first design system. One ink, no accent; emphasis comes from weight, size, and spacing.

This repo contains the tokens, CSS, React components, registry, CLI, and documentation site.

## Principles

- **One ink, no accent.** The palette is monochrome: paper, ink, and the grays between.
- **Hairlines, not boxes.** Rows and dividers are 1px lines on the open grid; cells and cards avoid heavy chrome.
- **The grid is visible.** A 204px module (184px column + 20px gutter) draws faint lines across every page.
- **CSS-first, zero dependencies.** Plain classes on plain markup. The React layer uses native elements. No Radix, no Tailwind.
- **Sentence case, always.** Never all caps.
- **Quiet motion.** 0.15–0.3s, ease. Color and opacity change; layout rarely moves; nothing bounces.

## Contents

| Path | Package | Contents |
|---|---|---|
| `packages/core` | `@noordvc/raster` | Tokens, per-component CSS, vendored Inter, the typed registry, and the build that generates `raster.css`, `tokens.css`, the token JSON, and the 0.1 compat layer |
| `packages/react` | `@noordvc/raster-react` | React components styled by `@noordvc/raster` CSS (`@noordvc/raster-react` depends on `@noordvc/raster`) |
| `packages/cli` | `@noordvc/raster-cli` | `npx @noordvc/raster-cli init` / `add` / `list` / `tokens`. Bundles the registry; works offline |
| `registry/` | | Generated registry items in the shadcn registry-item schema |
| `apps/www` | | Documentation site: gallery, per-component docs, tokens, served registry |

## Usage

**CLI.**

```sh
npx @noordvc/raster-cli init            # writes styles/raster.css, Inter, and raster.json
npx @noordvc/raster-cli add button dialog
```

`add` copies React source into `components/raster/`. Registry dependencies install with it. CSS-only components need no code; the classes are in raster.css.

`init --compat` also writes the 0.1 class-name layer. `init --registry <url>` (or `raster.json.registry`) points `add` at a remote registry for out-of-band updates.

**Plain CSS.** Import `@noordvc/raster/css` (or link the file the CLI wrote) and use the `rs-*` classes. Set `data-theme="dark"` on the root element for the dark scheme.

**Tokens.**

```ts
import { rasterTokens } from "@noordvc/raster";
rasterTokens.color.light.paper; // "#FAF8F2"
```

**shadcn interop.** Each component is published as a registry item under `registry/` in the shadcn registry-item schema. From the public host:

```sh
npx shadcn add https://raster.noord.dev/r/button.json
```

## Architecture

`packages/core/src/tokens.ts` and `src/registry.ts` are the sources of truth. Everything else is generated:

```
src/tokens.ts    tokens/raster.tokens.json     tokens as JSON
                 css/tokens.css                custom properties, light + dark, the grid
css sources      css/raster.css                the whole system, one file
src/legacy.ts    css/raster-compat.css         0.1 class names: bb-*, lib-*, bare table
registry         registry/<name>.json          shadcn registry-item, contents inlined
                 registry/bundle.json          embedded by the CLI at build time
```

The test suite enforces what generation cannot: every registry class exists in its CSS, every snippet class has a provider, no `var()` is undefined, no styled class is missing from the registry, no hex in the system is a hue, and generated registry JSON never names a dead host.

## Development

```sh
pnpm install
pnpm build        # core (css + registry + dist), react, cli
pnpm test         # core integrity tests, react jsdom tests, cli tests
pnpm dev          # docs site at localhost:3000
```

## Catalogue

68 components, covering the everyday shadcn/ui catalogue. Each is CSS-first with an optional zero-dependency React layer.

Behavior comes from the platform where it exists. Accordion and collapsible are native `<details>`; the `name` attribute gives exclusive-open without JS. Dialog, alert dialog, sheet, and the command palette are native `<dialog>`: focus trap, Escape, backdrop. Popover uses the Popover API. Carousel uses scroll snap. Tooltip and hover card are CSS. Form controls wrap native inputs.

Charts are dependency-free SVG: line, bar, sparkline, donut. Hairline grid, hover tooltip, legend from two series, and a visually hidden table for screen readers. Series differ by texture (solid, dashed, gray, dotted), not hue.

## Typeface

Inter, SIL OFL 1.1. Variable, latin + latin-ext, vendored next to the CSS. System sans is fallback only. Weights: 500 body, 600 headings and labels.

## Coming from 0.1

0.2 renamed every class to the `rs-` prefix and scoped table styles to `.rs-table`. Sites on the 0.1 names keep working by linking the generated `css/raster-compat.css` after `raster.css`, or via `npx @noordvc/raster-cli init --compat`. The rename map is `packages/core/src/legacy.ts`.

---

MIT © Noord / Renato Valdés-Olmos
