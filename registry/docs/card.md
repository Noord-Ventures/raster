# Card

Groups related content as a label, title, and body. No outline.

Category: surfaces  
Name: `card`  
Also known as: Card, Panel, Tile  
Page: https://vlak.dev/components/card/

## When to use

- A titled block of copy on the grid: label, title, body.
- CardInner for a padded field inside a Nest.

## When not to

- Framed boxes with shadows; cards have no outline.
- Interactive tiles; wrap the title in a Link instead of making the card clickable.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Card, CardBody, CardInner, CardLabel, CardTitle } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add card
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/card.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-card"><span class="rs-card-label">Case study</span><h3 class="rs-card-title">A quieter interface</h3><p class="rs-card-body">Emphasis from weight and spacing, never from a hue.</p></div>
```

## Example

```tsx
import { Card, CardBody, CardLabel, CardTitle } from "@noorddev/vlak-react";

<Card>
  <CardLabel>Case study</CardLabel>
  <CardTitle>A quieter interface</CardTitle>
  <CardBody>Emphasis from weight and spacing, never from a hue.</CardBody>
</Card>
```

## Props

### Card

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### CardBody

Extends `HTMLAttributes<HTMLParagraphElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLParagraphElement`.

No props of its own.

### CardInner

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### CardLabel

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

No props of its own.

### CardTitle

Extends `HTMLAttributes<HTMLHeadingElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLHeadingElement`.

No props of its own.

## Accessibility

- CardTitle renders an <h3>; adjust the heading level with a wrapper when it breaks the outline.
- The ref on Card is forwarded to the <div>.

## Classes

`rs-card`, `rs-card-label`, `rs-card-title`, `rs-card-body`, `rs-card-in`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/card.tsx`  
CSS: `packages/core/css/components/card.css`
