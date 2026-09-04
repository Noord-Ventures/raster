# Scroll area

Overflow box with the scrollbar hidden and 20px feathers at the ends.

Category: content  
Name: `scroll-area`  
Also known as: Scroll area, Scroll view, Scrollable region, Overflow box  
Page: https://getraster.com/components/scroll-area/

## When to use

- A bounded list inside a fixed layout: a sidebar, a panel, a menu of many rows.
- maxHeight sets the box; the scrollbar hides and the ends feather.

## When not to

- Page-level scrolling; let the page scroll.
- Content that needs a visible scrollbar for orientation.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { ScrollArea } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add scroll-area
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/scroll-area.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-scroll" style="max-height:140px" tabindex="0"><p>Alkmaar</p><p>Amsterdam</p><p>Delft</p><p>Eindhoven</p><p>Groningen</p><p>Haarlem</p><p>Rotterdam</p><p>Utrecht</p></div>
```

## Example

```tsx
import { ScrollArea } from "@noorddev/raster-react";

<ScrollArea maxHeight={240} aria-label="Cities">
  {cities.map((city) => <p key={city}>{city}</p>)}
</ScrollArea>
```

## Props

### ScrollArea

Hidden scrollbar; feathered top and bottom edges. A named, focusable region.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `maxHeight` | `string \| number` | `240` |  |
| `aria-label` | `string` | `"Scrollable content"` | Name of the scrolling region; it is keyboard-focusable, so it needs one. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Focuses the region |
| Arrow up, Arrow down, Page up, Page down | Scrolls it |

## Accessibility

- Renders role="region" with tabIndex=0, so keyboards can scroll it; aria-label defaults to "Scrollable content", pass your own.

## Classes

`rs-scroll`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/scroll-area.tsx`  
CSS: `packages/core/css/components/scroll-area.css`
