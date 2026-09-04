# Callout

Note in running copy. 1px hairline, radius 0. No left bar.

Category: feedback  
Name: `callout`  
Also known as: Callout, Note, Aside, Admonition  
Page: https://getraster.com/components/callout/

## When to use

- A note inside running copy that deserves a frame: a term, a caveat, a definition.
- A bold lead-in and one or two sentences.

## When not to

- Status and warnings; use Alert.
- Stacking several in a row.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Callout } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add callout
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/callout.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-callout"><p><strong>Fixed fee.</strong> The number on the cover is the number on the invoice.</p></div>
```

## Example

```tsx
import { Callout } from "@noorddev/raster-react";

<Callout>
  <p><strong>Fixed fee.</strong> The number on the cover is the number on the invoice.</p>
</Callout>
```

## Props

### Callout

Paper field, 1px hairline on all sides. Not rounded. No left bar.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

## Accessibility

- A plain <div> in the reading order; add role="note" and an aria-label when it should be announced as an aside.

## Classes

`rs-callout`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/callout.tsx`  
CSS: `packages/core/css/components/callout.css`
