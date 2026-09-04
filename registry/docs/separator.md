# Separator

Separates related regions with a 1px horizontal or vertical rule.

Category: content  
Name: `separator`  
Also known as: Separator, Divider, Rule, hr  
Page: https://vlak.dev/components/separator/

## When to use

- A hairline between groups in a stack or a row.
- orientation="vertical" between inline items.

## When not to

- Between every list row; rows carry their own rules.
- As spacing; use the grid.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Separator } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add separator
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/separator.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<hr class="rs-sep" />
```

## Example

```tsx
import { Separator } from "@noorddev/vlak-react";

<Separator />
<Separator orientation="vertical" style={{ height: 16 }} />
```

## Props

### Separator

Extends `HTMLAttributes<HTMLElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |  |

## Accessibility

- Horizontal renders an <hr>; vertical renders role="separator" with aria-orientation="vertical". Neither takes focus.

## Classes

`rs-sep`, `rs-sep-v`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/separator.tsx`  
CSS: `packages/core/css/components/separator.css`
