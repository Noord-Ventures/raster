# Scatter chart

Marks on a 1px grid. Ink, or one optional spot color.

Category: charts  
Name: `scatter-chart`  
Also known as: Scatter chart, Scatter plot, Dot plot, XY chart  
Page: https://getraster.com/components/scatter-chart/

## When to use

- Two numeric variables per point; group on a point to split series.
- xDomain and yDomain to pin the axes.

## When not to

- Ordered categories; use BarChart.
- Thousands of points; aggregate first.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { ScatterChart } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add scatter-chart
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/scatter-chart.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-chart"><svg viewBox="0 0 240 64" width="240" height="64"><line class="rs-chart-grid" x1="0" x2="240" y1="56" y2="56"/><circle class="rs-chart-mark" cx="36" cy="40" r="2"/><circle class="rs-chart-mark" cx="88" cy="22" r="2"/><circle class="rs-chart-mark" cx="140" cy="30" r="2"/><circle class="rs-chart-mark" cx="196" cy="14" r="2"/></svg></div>
```

## Example

```tsx
import { ScatterChart } from "@noorddev/raster-react";

<ScatterChart
  height={204}
  points={[{ x: 12, y: 40 }, { x: 40, y: 22, label: "Press" }, { x: 60, y: 30 }]}
  xLabel="Module"
  yLabel="Density"
  annotations={[{ at: 40, label: "204" }]}
/>
```

## Props

### ScatterChart

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `points` (required) | `ChartPoint[]` |  |  |
| `height` | `number` | `204` |  |
| `unit` | `string` |  |  |
| `xLabel` | `string` |  |  |
| `yLabel` | `string` |  |  |
| `xDomain` | `[number, number]` |  |  |
| `yDomain` | `[number, number]` |  |  |
| `grid` | `boolean` | `true` |  |
| `ticks` | `number` | `4` |  |
| `annotations` | `ChartAnnotation[]` | `[]` |  |
| `valueFormat` | `(n: number) => string` |  |  |
| `spot` | `string \| boolean` |  |  |
| `locale` | `string` |  | BCP 47 tag for number formatting; undefined is the reader's own. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Focuses the plot |
| Arrow right, Arrow left | Moves the cursor across the points; a status tooltip reads x and y |
| Home, End | First or last point |
| Escape | Clears the cursor |

## Accessibility

- A focusable, named plot with a visually hidden table of x and y per point.

## Classes

`rs-chart-mark`

## Dependencies

Registry dependencies: [chart](chart.md).  
React: `packages/react/src/components/chart.tsx`  
CSS: `packages/core/css/components/chart.css`
