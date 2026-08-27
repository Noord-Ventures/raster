# Changelog

## Unreleased

- www phone: 44pt hits, safe-area insets, stacked TOC, copy control. Desktop chrome stays.
- Concentric radius: `inner = max(0, outer − padding)` as a token, `--radius-in` / `--rs-out` / `--rs-gap`, and `Nest` / `NestInner`. Raster chrome stays square.

## 0.3.0

Cut 1: a stranger can install Raster after merge, npm publish, and DNS.

- MIT on the code. Inter stays SIL OFL 1.1 (`packages/core/css/fonts/inter/OFL.txt`).
- Publishable packages: `@noordvc/raster`, `@noordvc/raster-react`, `@noordvc/raster-cli` at 0.3.0. The `raster` and `noord` npm orgs are not available; the locked org is `noordvc`. Not private. Types ship in the tarball. `@noordvc/raster-react` depends on `@noordvc/raster` so CSS is not a second secret install.
- Default face is vendored Inter (variable, latin + latin-ext). System sans is fallback only. Messina is off.
- Public host is `https://raster.noord.dev`. Generated registry items, `raster-base`, and the `inter` item use that host. Dead hosts (`raster.design`, `raster-pied`, `vercel.app`) fail CI.
- Documented CLI is `npx @noordvc/raster-cli init`. `--registry` is implemented (HTTP(S) or a local directory; also `raster.json.registry`). `init --compat` still writes 0.1 class names.
- Dropped leftover `raster.design` copy and the `/api/raster/tokens` + `/api/mcp` pointers. Those routes do not exist on this static export.
- Docs first page and getting started show the one command and Inter.
- Everyday shadcn/ui primitives now install Raster-style: button group, drawer, empty, field, form (React), input group, item, label, native select, sidebar, spinner, toggle group. Catalog completeness, not a clone. Deferred: sonner (needs the sonner widget), direction (RTL helper, not a primitive), and the AI chat set (attachment, bubble, marker, message, message-scroller) which depend on Radix or `@shadcn/react`.

This release does not npm-publish, create a GitHub Release, or attach `raster.noord.dev` on Vercel. Those are human steps after merge.
