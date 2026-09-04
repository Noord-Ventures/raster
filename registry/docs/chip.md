# Mono chip

Marks a short technical identifier. Monospace text with a 1px mixed border.

Category: content  
Name: `chip`  
Also known as: Chip, Mono chip, Code chip, Token  
Page: https://vlak.dev/components/chip/

## When to use

- Identifiers in monospace: paths, handles, keys, short code.
- Inline in copy or in a list of tags.

## When not to

- Status words; use Badge.
- Removable filter tokens; the chip has no close control.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Chip } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add chip
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/chip.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<span class="rs-chip">/noord-brand</span>
```

## Example

```tsx
import { Chip } from "@noorddev/vlak-react";

<Chip>/noord-brand</Chip>
```

## Props

### Chip

Mono identifier with a 1px mixed border.

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

No props of its own.

## Accessibility

- A plain <span> set in the mono stack.

## Classes

`rs-chip`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/chip.tsx`  
CSS: `packages/core/css/components/chip.css`
