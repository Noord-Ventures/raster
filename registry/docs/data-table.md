# Data table

Sortable table. Headers expose aria-sort.

Category: content  
Name: `data-table`  
Also known as: Data table, Sortable table, Grid  
Page: https://getraster.com/components/data-table/

## When to use

- Rows from data with sortable columns and an empty state.
- render for cells that are not plain values; sortValue for custom sort keys.

## When not to

- Hand-written rows; use Table.
- Pagination, selection, or editing; compose those around it.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { DataTable } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add data-table
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/data-table.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<table class="rs-table"><thead><tr><th><button class="rs-datatable-sort">Phase</button></th><th>Weeks</th></tr></thead><tbody><tr><td>Identity</td><td>4</td></tr><tr><td>Strategy</td><td>2</td></tr></tbody></table>
```

## Example

```tsx
import { DataTable } from "@noorddev/raster-react";

<DataTable
  columns={[
    { key: "phase", header: "Phase", sortable: true },
    { key: "weeks", header: "Weeks", sortable: true },
    { key: "owner", header: "Owner", render: (row) => row.owner.name },
  ]}
  rows={rows}
  rowKey={(row) => row.id}
  emptyLabel="No phases yet."
/>
```

## Props

### Functions

- `DataTable` (function): Sortable rows over the plain rs-table.

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves between the sort buttons |
| Enter, Space | Sorts ascending, then descending, then clears |

## Accessibility

- Sortable headers hold a native <button>; the <th> carries aria-sort while sorted.
- The empty state is plain text under the table.

## Classes

`rs-datatable-sort`, `rs-datatable-empty`, `rs-datatable-sort-icon`, `rs-datatable-sort-icon-on`, `rs-datatable-table`, `rs-datatable-td`, `rs-datatable-td-alt`, `rs-datatable-th`

## Dependencies

Registry dependencies: [table](table.md).  
React: `packages/react/src/components/data-table.tsx`  
CSS: `packages/core/css/components/data-table.css`
