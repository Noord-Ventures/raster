# Table

Open grid, 1px row rules, last column right-aligned. Total rows use 2px rules.

Category: content  
Name: `table`  
Also known as: Table, Static table, Grid  
Page: https://getraster.com/components/table/

## When to use

- Static tabular data with a last column of numbers.
- total on the closing row and its cells for 2px rules.

## When not to

- Sorting and empty states; use DataTable.
- Layout; use the grid.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add table
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/table.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<table class="rs-table"><thead><tr><th>Phase</th><th>Weeks</th></tr></thead><tbody><tr><td>Strategy</td><td>2</td></tr><tr><td>Identity</td><td>4</td></tr></tbody></table>
```

## Example

```tsx
import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from "@noorddev/raster-react";

<Table>
  <TableHead>
    <TableRow>
      <TableTh scope="col">Phase</TableTh>
      <TableTh scope="col">Weeks</TableTh>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableTd>Strategy</TableTd>
      <TableTd>2</TableTd>
    </TableRow>
    <TableRow total>
      <TableTd total>Total</TableTd>
      <TableTd total>6</TableTd>
    </TableRow>
  </TableBody>
</Table>
```

## Props

### Table

Open grid, 1px row rules, last column right-aligned.

Extends `TableHTMLAttributes<HTMLTableElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLTableElement`.

No props of its own.

### TableBody

Extends `HTMLAttributes<HTMLTableSectionElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLTableSectionElement`.

No props of its own.

### TableHead

Extends `HTMLAttributes<HTMLTableSectionElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLTableSectionElement`.

No props of its own.

### TableRow

Extends `HTMLAttributes<HTMLTableRowElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLTableRowElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `total` | `boolean` |  | 2px rules, ink cells. |

### TableTd

Extends `TdHTMLAttributes<HTMLTableCellElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLTableCellElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `total` | `boolean` |  |  |

### TableTh

Extends `ThHTMLAttributes<HTMLTableCellElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLTableCellElement`.

No props of its own.

## Accessibility

- A native <table>; use TableTh with scope for headers and add a <caption> when the table needs a name.
- The ref on Table is forwarded to the <table>.

## Classes

`rs-table`, `rs-total-row`, `rs-table-row`, `rs-table-td`, `rs-table-th`, `rs-table-total-cell`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/table.tsx`  
CSS: `packages/core/css/components/table.css`
