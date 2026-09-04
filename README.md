# Raster

A monochrome design system. Paper, ink, gray, hairlines, and a 204px module. 74 components covering the everyday shadcn/ui catalogue, with accessibility and the platform doing the work.

[getraster.com](https://getraster.com) · [github.com/Noord-Ventures/raster](https://github.com/Noord-Ventures/raster)

Built at Noord Frontier Design Lab (Alkmaar ↔ Silicon Valley).

## Install

Three ways in. All three share the same source, so nothing drifts.

**Import the package.** Precompiled React components and one stylesheet. No compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Button } from "@noorddev/raster-react";
```

**Vendor the source.** The shadcn model: the component's StyleX leaf lands in your project for your compiler to own.

```sh
npx @noorddev/raster-cli init
npx @noorddev/raster-cli add button dialog
# or
npx shadcn add https://getraster.com/r/button.json
```

**CSS only.** No React. `rs-*` classes on plain markup.

```html
<link rel="stylesheet" href="node_modules/@noorddev/raster/css/raster.css" />
<button class="rs-btn-primary">Primary action</button>
```

Dark scheme: `data-theme="dark"` on the root element. Without it the system preference applies.

## Why Raster

- **One source of paint.** Every component is a StyleX leaf. The React package ships it precompiled; the CSS package is generated from the same leaf. Vendor it, import it, or link the CSS: identical pixels.
- **StyleX first.** Atomic, typed, compiled away. Write your own leaves against Raster tokens through `@noorddev/raster-react/stylex`.
- **Platform first.** `<dialog>`, `<details>`, the Popover API, scroll snap, native inputs. JavaScript only where the platform has nothing.
- **Accessibility baked in.** APG patterns for listbox, menu, grid, and tabs. Focus rings, 3:1 control contrast, reduced motion, forced colours. Every interactive component has an axe test.
- **Small.** 12 KB gzipped for the whole React stylesheet. Zero runtime dependencies beyond React and `@stylexjs/stylex`.
- **Layered.** All CSS sits in cascade layers, so your overrides win without `!important`.
- **Agent-ready.** Components, tokens, and props are data (`packages/core/src/registry.ts`), served as JSON and as markdown, so tools and models can install and compose Raster without guessing.

## Principles

Ten words. Sentence case. No periods.

Simple · Beautiful · Opinionated · Elegant · Clear · Legible · Solid · Versatile · Customizable · Minimal

## Packages

| Path | Package | Contents |
|---|---|---|
| `packages/core` | [`@noorddev/raster`](packages/core/README.md) | Tokens, generated `rs-*` CSS, vendored Inter, the typed registry |
| `packages/react` | [`@noorddev/raster-react`](packages/react/README.md) | React components, precompiled StyleX, one stylesheet |
| `packages/cli` | [`@noorddev/raster-cli`](packages/cli/README.md) | `init`, `add`, `list`, `tokens`. Offline registry snapshot |
| `registry/` | | Generated registry items in the shadcn registry-item schema |
| `apps/www` | | Documentation site: gallery, per-component docs, tokens, served registry |

## Architecture

```
packages/react/src/components/*.tsx   StyleX leaves + rs-* classes     the source of paint
        │
        ├─ react build (StyleX Babel plugin)  →  packages/react/dist/**  +  raster-react.css
        │
        └─ core build-components           →  packages/core/css/components/*.css
                                            →  css/raster.css (layered)
packages/core/src/tokens.ts             →  css/tokens.css, tokens/raster.tokens.json
packages/core/src/registry.ts           →  registry/<name>.json, registry/bundle.json
```

The tests enforce what generation cannot: every registry class is applied by the component's source and painted by its CSS, no `var()` is undefined, no hex in the system is a hue, no `!important` ships, and generated registry JSON never names a dead host.

## Development

Node 22.6 or newer, pnpm 10.

```sh
pnpm install
pnpm build        # core (components → css → registry → dist), react, cli
pnpm test         # core integrity, react jsdom + axe, cli
pnpm typecheck
pnpm dev          # docs site at localhost:3000
```

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Typeface

Inter, SIL OFL 1.1. Variable, latin + latin-ext, vendored next to the CSS. System sans is fallback only. Weights: 500 body, 600 headings and labels.

## Licence

MIT © Noord / Renato Valdés-Olmos. Inter is SIL OFL 1.1.
