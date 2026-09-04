# Badge

11px badge. Outline, solid, and muted fills.

Category: feedback  
Name: `badge`  
Also known as: Badge, Tag, Pill, Status  
Page: https://getraster.com/components/badge/

## When to use

- A short status or category next to a title.
- solid for done, outline for a recommendation, muted for pending.

## When not to

- Counts that update live; announce those elsewhere.
- Clickable filters; use Toggle.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Badge } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add badge
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/badge.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<span class="rs-badge">Recommended</span><span class="rs-badge-solid">Delivered</span><span class="rs-badge-muted">In progress</span>
```

## Example

```tsx
import { Badge } from "@noorddev/raster-react";

<Badge>Recommended</Badge>
<Badge variant="solid">Delivered</Badge>
<Badge variant="muted">In progress</Badge>
```

## Props

### Badge

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"outline" \| "solid" \| "muted"` | `"outline"` | Outline for recommendations, solid for done, muted for pending. |

## Accessibility

- A plain <span>; the text is all there is. Keep it to one or two words.

## Classes

`rs-badge`, `rs-badge-solid`, `rs-badge-muted`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/badge.tsx`  
CSS: `packages/core/css/components/badge.css`
