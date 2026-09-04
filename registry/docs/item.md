# Item

Flush row: title and description on the left, meta on the right.

Category: content  
Name: `item`  
Also known as: Item, List item, Row, Cell  
Page: https://getraster.com/components/item/

## When to use

- Rows in a flush list: a title, a line of description, a trailing meta value.
- Settings lists, results, and directories.

## When not to

- Rows that navigate; wrap the title in a Link.
- Tabular numbers across many columns; use Table.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Item } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add item
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/item.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-item"><div><p class="rs-item-title">Alkmaar</p><p class="rs-item-desc">The studio city.</p></div><span class="rs-item-meta">NL</span></div>
```

## Example

```tsx
import { Item } from "@noorddev/raster-react";

<Item title="Alkmaar" description="The studio city." meta="NL" />
```

## Props

### Item

A flush row. Title occupies the cell; meta trails.

Extends `Omit<HTMLAttributes<HTMLDivElement>, "title">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (required) | `ReactNode` |  |  |
| `description` | `ReactNode` |  |  |
| `meta` | `ReactNode` |  |  |

## Accessibility

- A <div> with two <p> lines and a trailing <span>; nothing is interactive by itself.

## Classes

`rs-item`, `rs-item-title`, `rs-item-desc`, `rs-item-meta`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/item.tsx`  
CSS: `packages/core/css/components/item.css`
