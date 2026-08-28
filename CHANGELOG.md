# Changelog

## Unreleased

<<<<<<< HEAD
- Raster icons: first complete family in `@noorddev/raster-react`. Same 16 module / 1px language. Catalog on /components/icons. Site theme-toggle is the family. Does not publish.
- Site 204 module grid is visible on home and under the components rail. `--grid-line` reads as a hairline. No page-frame.
=======
- Site 204 module grid is visible on home, under the components rail, and through About (same spine as home). `--grid-line` reads as a hairline. No page-frame.
>>>>>>> a801d72 (Run About on the same site 204 spine as home.)
- Chrome polish: calendar days are square; month chevrons sit 1px down; grouped seams and dividers use `--divider`; button / input groups inherit `--radius-sm`. Grouped T-junctions are one stroke. Field input is a 40px integer control with 8px / 16px label and hint.
- www: quieter credits. About is a modernist homage (Swiss Style, Dutch modernism, names as type-in-cells, illustrated 204 / hairline / flush / grotesque). Homepage install command is a primary CTA.
- Homepage opens on the right and bottom; no outer frame. About and interior chrome keep their hairlines.
- User-facing install copy uses `@noorddev` (`npx @noorddev/raster-cli init`). Does not publish.
- www phone: 44pt hits, safe-area insets, stacked TOC, copy control. Desktop chrome stays.
- Phone control scale (≤640): `--hit` / `--control-h` / `--control-fs` plus `phone.css` recut every interactive Raster control. Desktop poster stays.
- Concentric radius: Steve Ruiz `innerRadius` (circular-corner fit, clamped at 0) as the helper. `--radius-in` / `--rs-in` use the closed form of that fit. Nested corners on grouped buttons, cards, fields, calendar days, and dialogs follow it. Raster chrome stays square.

## 0.3.0

Cut 1: a stranger can install Raster after merge, npm publish, and DNS.

- MIT on the code. Inter stays SIL OFL 1.1 (`packages/core/css/fonts/inter/OFL.txt`).
- Publishable packages: `@noorddev/raster`, `@noorddev/raster-react`, `@noorddev/raster-cli` at 0.3.0. The locked org is `noorddev`. Not private. Types ship in the tarball. `@noorddev/raster-react` depends on `@noorddev/raster` so CSS is not a second secret install.
- Default face is vendored Inter (variable, latin + latin-ext). System sans is fallback only. Messina is off.
- Public host is `https://raster.noord.dev`. Generated registry items, `raster-base`, and the `inter` item use that host. Dead hosts (`raster.design`, `raster-pied`, `vercel.app`) fail CI.
- Documented CLI is `npx @noorddev/raster-cli init`. `--registry` is implemented (HTTP(S) or a local directory; also `raster.json.registry`). `init --compat` still writes 0.1 class names.
- Dropped leftover `raster.design` copy and the `/api/raster/tokens` + `/api/mcp` pointers. Those routes do not exist on this static export.
- Docs first page and getting started show the one command and Inter.
- Everyday shadcn/ui primitives now install Raster-style: button group, drawer, empty, field, form (React), input group, item, label, native select, sidebar, spinner, toggle group. Catalog completeness, not a clone. Deferred: sonner (needs the sonner widget), direction (RTL helper, not a primitive), and the AI chat set (attachment, bubble, marker, message, message-scroller) which depend on Radix or `@shadcn/react`.

This release does not npm-publish, create a GitHub Release, or attach `raster.noord.dev` on Vercel. Those are human steps after merge.
