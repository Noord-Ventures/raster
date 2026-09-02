# Raster

A poster you can install.

Public door: [getraster.com](https://getraster.com). Source: [github.com/Noord-Ventures/raster](https://github.com/Noord-Ventures/raster).

Built at Noord Frontier Design Lab (Alkmaar ↔ Silicon Valley).

This repo contains the tokens, CSS, React components, registry, CLI, and documentation site.

## Principles

Ten words. Sentence case. No periods.

1. Simple
2. Beautiful
3. Opinionated
4. Elegant
5. Clear
6. Legible
7. Solid
8. Versatile
9. Customizable
10. Minimal

## Contents

| Path | Package | Contents |
|---|---|---|
| `packages/core` | `@noorddev/raster` | Tokens, per-component CSS, vendored Inter, the typed registry, and the build that generates `raster.css`, `tokens.css`, the token JSON, and the 0.1 compat layer |
| `packages/react` | `@noorddev/raster-react` | React components styled by `@noorddev/raster` CSS (`@noorddev/raster-react` depends on `@noorddev/raster`). Button, Callout, and Card also ship StyleX leaves mapped to those tokens — CSS-first default; StyleX is a compiler for those leaves, not a claim that Raster has no compiler. |
| `packages/cli` | `@noorddev/raster-cli` | Unpublished. `init` / `add` / `list` / `tokens` after npm publish. Bundles the registry; works offline |
| `registry/` | | Generated registry items in the shadcn registry-item schema |
| `apps/www` | | Documentation site: gallery, per-component docs, tokens, served registry |

## Usage

Raster is CSS-first. Plain `rs-*` classes on plain markup. React is optional. No Radix, no Tailwind. Dependency-free means the CSS path: no Radix, no Tailwind — not “no compiler.”

**Not on npm.** `@noorddev/raster`, `@noorddev/raster-react`, and `@noorddev/raster-cli` are unpublished. This ship does not offer a CLI install. Work from this repo (`pnpm install` / `pnpm build` / `pnpm dev`). Do not teach an unpublished package name as a working path.

**Plain CSS.** From this repo, use `packages/core/css/raster.css` (exported as `@noorddev/raster/css` after publish) and the `rs-*` classes. Set `data-theme="dark"` on the root element for the dark scheme.

**Tokens.**

```ts
import { rasterTokens } from "@noorddev/raster";
rasterTokens.color.light.paper; // "#FAF8F2"
```

**shadcn interop.** Each component is published as a registry item under `registry/` in the shadcn registry-item schema. From the public host:

```sh
npx shadcn add https://getraster.com/r/button.json
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

Public catalogue count is `catalogComponents`: `rasterComponents.filter(c => !c.hidden)`. Hidden entries (today: concentric-radius) stay in the registry for CSS and math. Do not count raw `registry/*.json` files as the ship number.

## Development

```sh
pnpm install
pnpm build        # core (css + registry + dist), react, cli
pnpm test         # core integrity tests, react jsdom tests, cli tests
pnpm dev          # docs site at localhost:3000
```

## Catalogue

74 components, covering the everyday shadcn/ui catalogue. Each is CSS-first with an optional zero-dependency React layer.

Behavior comes from the platform where it exists. Accordion and collapsible are native `<details>`; the `name` attribute gives exclusive-open without JS. Dialog, alert dialog, sheet, and the command palette are native `<dialog>`: focus trap, Escape, backdrop. Popover uses the Popover API. Carousel uses scroll snap. Tooltip and hover card are CSS. Form controls wrap native inputs.

Charts are dependency-free SVG: line, bar, sparkline, donut. Hairline grid, hover tooltip, legend from two series, and a visually hidden table for screen readers. Series differ by texture (solid, dashed, gray, dotted), not hue.

## Typeface

Inter, SIL OFL 1.1. Variable, latin + latin-ext, vendored next to the CSS. System sans is fallback only. Weights: 500 body, 600 headings and labels.

## Coming from 0.1

0.2 renamed every class to the `rs-` prefix and scoped table styles to `.rs-table`. Sites on the 0.1 names keep working by linking the generated `css/raster-compat.css` after `raster.css`. The rename map is `packages/core/src/legacy.ts`.

---

MIT © Noord / Renato Valdés-Olmos
