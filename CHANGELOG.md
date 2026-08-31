# Changelog

## Unreleased

- Evening store stills are real Unsplash photographs, not generated food. Same paths under `apps/www/public/interfaces/food/`. DoorDash-like cards and Raster chrome stay. Does not publish.
- Catalog H1 top shares the TOC first-row line at scroll 0 (docs, components, interfaces). Cover is not a flex-end spacer above the rail. Two-column TOC stays. Does not publish.
- Interfaces people are /work keepers only: Aziez Soekha, Jenny Lo, Koen Bok, Gianpiero Puleo. Night fleet viz is a city-scale map well: many blocks, a readable street grid, vehicles as small units. Does not publish.
- Two gridline hues, same ink family. `--grid-line` is the quieter step: inner-page 204 on docs / components / interfaces, plus Home / About / starter L/R box margins. `--divider` is the slightly stronger step: Home / About / starter 1px cell-edge cage. `--divider-subtle` stays a fill, not a gridline. The utmost left inner gutter paints; the 21px `html::before` clip is gone. Home / About / starter still kill the repeating 204 so it does not cut type or stills. Does not publish.
- Slight Raster radius: `--radius-sm` is 4px, the standalone button token. Cards, boxes, callouts, dialogs, sheets, drawers, catalog frames, and interface scene frames share it. `--radius` aliases `--radius-sm`. Nested inners still follow Steve Ruiz. Chrome, icon marks, empty, and charts stay 0. No shadow. Does not publish.
- About is a workhorse specimen in the Inter register: what it is, who it is for, pasteable usage, free & open, type on the module, then history. The 204 spine stays (20 / 204 / 224 / 408). Navbar on scroll on About. `npx @noorddev/raster-cli init` writes `index.html` as a real specimen, not a hello-world shell. Preview at `/starter`.
- Starter / generated page recut: box padding is the 20px gutter; scheme toggle is the Raster sun/moon mark; Flush hairlines span the cell; 184+20 reads as column and gutter on the 204 module; US English; kit includes a graph and `rs-kbd`. Module cells stay flush; inner boxes may take `--radius-sm`. Same copy on About.
- Raster icons: first complete family in `@noorddev/raster-react`. Same 16 module / 1px language. Catalog on /components/icons. Site theme-toggle is the family. Does not publish.
- Homepage is boxed 204 cells only: no gutter overlay through Raster / tagline / install. Inner pages keep quiet `--grid-image` verticals on `html::before` (no 204 horizontals). Button-group joins stay the 1px `--divider` gap.
- Chrome polish: calendar days are square; month chevrons sit 1px down; grouped seams and dividers use `--divider`; button / input groups inherit `--radius-sm`. Grouped T-junctions are one stroke. Field input is a 40px integer control with 8px / 16px label and hint.
- www: quieter credits. Homepage install command is a primary CTA.
- Homepage opens on the right and bottom; no --divider outer frame. L/R box margins are the quieter `--grid-line`. About keeps its bottom cage hairline.
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
