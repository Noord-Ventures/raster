# Small multiples

Repeated charts on the same axes. One 184 column per panel.

Category: charts  
Name: `small-multiples`  
Also known as: Small multiples, Trellis chart, Facet grid, Panel charts  
Page: https://getraster.com/components/small-multiples/

## When to use

- The same measure across places, products, or periods, one small line chart per panel on shared axes.
- Four to eight panels in a row of 184px columns.

## When not to

- Panels with different units; they no longer compare.
- One series; use LineChart.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { SmallMultiples } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add small-multiples
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/small-multiples.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-chart-multi"><div class="rs-chart"><svg viewBox="0 0 184 64" width="184" height="64"><path class="rs-chart-line" d="M0 40 L46 28 L92 34 L138 16 L184 22"/></svg></div><div class="rs-chart"><svg viewBox="0 0 184 64" width="184" height="64"><path class="rs-chart-line" d="M0 30 L46 36 L92 22 L138 28 L184 18"/></svg></div></div>
```

## Example

```tsx
import { SmallMultiples } from "@noorddev/raster-react";

<SmallMultiples
  height={136}
  panels={[
    { title: "Alkmaar", labels: days, series: [{ name: "Sheets", values: alkmaar }] },
    { title: "Delft", labels: days, series: [{ name: "Sheets", values: delft }] },
  ]}
  unit="sheets"
/>
```

## Props

### SmallMultiples

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `panels` (required) | `SmallMultiple[]` |  |  |
| `height` | `number` | `136` |  |
| `unit` | `string` |  |  |
| `grid` | `boolean` | `true` |  |
| `ticks` | `number` | `3` |  |
| `spot` | `string \| boolean` |  |  |
| `locale` | `string` |  | BCP 47 tag for number formatting; undefined is the reader's own. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Focuses each panel's plot in turn |
| Arrow right, Arrow left, Home, End, Escape | Move and clear the cursor inside the focused panel |

## Accessibility

- Each panel is a <figure> with a caption; its plot is labelled by that caption and carries its own hidden table.

## Classes

`rs-chart-multi`

## Dependencies

Registry dependencies: [chart](chart.md).  
React: `packages/react/src/components/chart.tsx`  
CSS: `packages/core/css/components/chart.css`
