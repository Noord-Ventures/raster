# Hover card

Previews linked context on hover or keyboard focus.

Category: surfaces  
Name: `hover-card`  
Also known as: Hover card, Preview card, Profile card, Rich tooltip  
Page: https://vlak.dev/components/hover-card/

## When to use

- A preview of the thing a link points at: a profile, a document, a place.
- Rich content that is not needed to use the link.

## When not to

- One-line labels; use Tooltip.
- Content with its own controls; use Popover.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { HoverCard } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add hover-card
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/hover-card.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<span class="rs-hover-card"><span tabindex="0" aria-describedby="noord-card">@noord</span><span class="rs-hover-card-panel" role="tooltip" id="noord-card">Noord, a venture studio in Alkmaar. Ten portfolio companies, one design system.</span></span>
```

## Example

```tsx
import { HoverCard, Link } from "@noorddev/vlak-react";

<HoverCard trigger={<Link href="/noord">@noord</Link>}>
  Noord, a venture studio in Alkmaar. Ten portfolio companies, one design system.
</HoverCard>
```

## Props

### HoverCard

Preview panel on hover or keyboard focus. CSS shows it; the panel describes the trigger, and Escape hides it until the pointer leaves.

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` (required) | `ReactNode` |  | A focusable element is used as is; anything else gets one tab stop. |
| `open` | `boolean` |  | Keep the panel shown regardless of hover or focus: for docs, tests, and static previews. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Focuses the trigger and shows the card |
| Escape | Hides the card until the pointer leaves |

## Accessibility

- The panel is role="tooltip" and describes the trigger through aria-describedby.
- A focusable trigger element is used as is; anything else is wrapped in a tab stop.

## Classes

`rs-hover-card`, `rs-hover-card-panel`, `rs-hover-card-open`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/hover-card.tsx`  
CSS: `packages/core/css/components/hover-card.css`
