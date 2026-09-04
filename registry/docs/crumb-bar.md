# Crumb bar

Fixed 72px bar. Transparent at rest; scrolled state adds paper, a bottom 1px, and the trail.

Category: navigation  
Name: `crumb-bar`  
Also known as: Crumb bar, Sticky header, Top bar, App bar  
Page: https://getraster.com/components/crumb-bar/

## When to use

- The fixed top bar of a long page: transparent over the cover, paper and a hairline once scrolled.
- A root mark plus the trail of the current page.

## When not to

- Pages without a cover; use Breadcrumbs in the flow.
- Bars that hold actions or search; this one holds the trail only.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { CrumbBar } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add crumb-bar
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/crumb-bar.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<nav class="rs-crumb-bar rs-crumb-bar-scrolled"><div class="rs-crumb-bar-inner"><a class="rs-crumb-root" href="/"><span class="rs-crumb-root-full">Raster</span><span class="rs-crumb-root-short">rs</span></a><p class="rs-crumbs"><span>Docs</span><span class="rs-crumbs-sep">/</span><span class="rs-crumbs-here">Components</span></p></div></nav>
```

## Example

```tsx
import { CrumbBar } from "@noorddev/raster-react";

<CrumbBar
  root={{ label: "Renato Valdés Olmos", href: "/" }}
  rootShort="RVO"
  trail={[{ label: "Components", href: "/components" }, { label: "Switch" }]}
  threshold={110}
/>
```

## Props

### CrumbBar

The fixed top bar of the house chrome. Transparent at rest; once the page cover scrolls away it gains the paper background and its bottom hairline, and the breadcrumbs fade in. While hidden the trail is inert and invisible, so nothing focuses into an unseen link.

Extends `HTMLAttributes<HTMLElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trail` (required) | `CrumbBarItem[]` |  |  |
| `threshold` | `number` | `110` | Pixels of scroll before the bar solidifies and the crumbs fade in. |
| `root` | `CrumbBarItem` |  | Root crumb, held in the TOC column from 900px. |
| `rootShort` | `ReactNode` |  | Abbreviated root shown on phones in place of the full label. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves to the root link, then the trail links once the bar is scrolled in |
| Enter | Follows the link |

## Accessibility

- Renders <nav aria-label="Breadcrumb">; the trail is an ordered list with aria-current="page" on the last item.
- While the bar is transparent the trail is inert, so nothing focuses into an invisible link.

## Classes

`rs-crumb-bar`, `rs-crumb-bar-scrolled`, `rs-crumb-bar-inner`, `rs-crumb-root`, `rs-crumb-root-full`, `rs-crumb-root-short`, `rs-crumb-crumbs`, `rs-crumb-crumbs-on`, `rs-crumb-item`, `rs-crumb-here`, `rs-crumb-link`, `rs-crumb-sep`

## Dependencies

Registry dependencies: [breadcrumbs](breadcrumbs.md).  
React: `packages/react/src/components/crumb-bar.tsx`  
CSS: `packages/core/css/components/crumb-bar.css`
