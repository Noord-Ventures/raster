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
- **Right-to-left for free.** Every leaf paints its inline axis with logical properties. Set `dir="rtl"` and the system mirrors.
- **Tokens as data.** Custom properties, JSON, and a W3C Design Tokens (DTCG) export (`@noorddev/raster/tokens.dtcg`) for Style Dictionary, Figma Variables, and Tokens Studio.
- **Agent-ready.** Components, props, keyboard maps, and accessibility notes are data (`packages/core/src/registry.ts` plus props extracted from the types), served as JSON, markdown, `llms.txt`, a CLI with `--json`, and an MCP server, so tools and models install and compose Raster without guessing.

## For agents

Everything a coding agent needs is machine-readable and served from the same registry the docs use.

| Surface | Where |
|---|---|
| Index for language models | [getraster.com/llms.txt](https://getraster.com/llms.txt), [llms-full.txt](https://getraster.com/llms-full.txt) |
| One markdown page per component, tokens, and the guide | `getraster.com/docs/<name>.md`, `/docs/tokens.md`, `/docs/guide.md` |
| shadcn registry items | `getraster.com/r/<name>.json`, index at `/r/index.json` |
| Props extracted from the types | `@noorddev/raster/props` (JSON) |
| CLI | `npx @noorddev/raster-cli list --json`, `search <term> --json`, `docs <name>`, `tokens --json` |
| MCP server | `npx -y @noorddev/raster-mcp` (tools: list, search, get component, tokens, install, guide) |

Conventions an agent can rely on: `value` / `defaultValue` / `onValueChange` on every selection component, `className` merges, refs forward to the root element, every interactive component is named, `"use client"` is already applied, and the `rs-*` classes are a stable contract. See [AGENTS.md](AGENTS.md) for working on this repository.

## Principles

Ten words. Sentence case. No periods.

Simple · Beautiful · Opinionated · Elegant · Clear · Legible · Solid · Versatile · Customizable · Minimal

## Packages

| Path | Package | Contents |
|---|---|---|
| `packages/core` | [`@noorddev/raster`](packages/core/README.md) | Tokens, generated `rs-*` CSS, vendored Inter, the typed registry |
| `packages/react` | [`@noorddev/raster-react`](packages/react/README.md) | React components, precompiled StyleX, one stylesheet |
| `packages/cli` | [`@noorddev/raster-cli`](packages/cli/README.md) | `init`, `add`, `list`, `search`, `docs`, `tokens`. Offline registry snapshot |
| `packages/mcp` | [`@noorddev/raster-mcp`](packages/mcp/README.md) | MCP server over the same registry, for Claude Code, Cursor, and friends |
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
packages/core/src/tokens.ts             →  css/tokens.css, tokens/raster.tokens.json, tokens/raster.tokens.dtcg.json
packages/core/src/registry.ts + types   →  registry/<name>.json, registry/bundle.json, props/props.json, registry/docs/*.md
```

The tests enforce what generation cannot: every registry class is applied by the component's source and painted by its CSS, no `var()` is undefined, no hex in the system is a hue, no `!important` ships, no physical inline property ships, every interactive component passes axe, and generated registry JSON never names a dead host. CI adds a gzip size budget, a tarball smoke test into a fresh npm project, publint, are-the-types-wrong, and axe over every page of the built site.

## Development

Node 22.6 or newer, pnpm 10.

```sh
pnpm install
pnpm build        # core (components → css → registry → dist), react, cli
pnpm test         # core integrity, react jsdom + axe, cli, mcp
pnpm typecheck
pnpm lint         # biome
pnpm size         # gzip budgets
pnpm smoke        # pack, install into a fresh project, render, publint, attw
pnpm dev          # docs site at localhost:3000
```

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Typeface

Inter, SIL OFL 1.1. Variable, latin + latin-ext, vendored next to the CSS. System sans is fallback only. Weights: 500 body, 600 headings and labels.

## Licence

MIT © Noord / Renato Valdés-Olmos. Inter is SIL OFL 1.1.
