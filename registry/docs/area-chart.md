# Area chart

Filled field under the first series. 1px grid, textured series, one optional spot color.

Category: charts  
Name: `area-chart`  
Also known as: Area chart, Filled line chart  
Page: https://getraster.com/components/area-chart/

## When to use

- One series over time where the volume under the line matters.
- The same props as LineChart; the first series is filled.

## When not to

- Several overlapping series; the fills hide each other. Use LineChart.
- Categories; use BarChart.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { AreaChart } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add area-chart
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/area-chart.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-chart"><svg viewBox="0 0 240 64" width="240" height="64"><path class="rs-chart-area" d="M0 44 L40 36 L80 40 L120 22 L160 26 L200 12 L240 16 L240 56 L0 56 Z"/><path class="rs-chart-line" d="M0 44 L40 36 L80 40 L120 22 L160 26 L200 12 L240 16"/></svg></div>
```

## Example

```tsx
import { AreaChart } from "@noorddev/raster-react";

<AreaChart
  height={204}
  labels={days}
  series={[{ name: "Sheets", values: sheets }]}
  unit="sheets"
  annotations={[{ at: 3, label: "Press" }]}
/>
```

## Props

### AreaChart

Filled field. Same law as the line: hairlines, texture, one optional spot.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `series` (required) | `ChartSeries[]` |  |  |
| `labels` | `string[]` |  |  |
| `height` | `number` |  |  |
| `stacked` | `boolean` |  |  |
| `inverted` | `boolean` |  |  |
| `grid` | `boolean` |  |  |
| `ticks` | `number` |  |  |
| `unit` | `string` |  |  |
| `yLabel` | `string` |  |  |
| `xLabel` | `string` |  |  |
| `annotations` | `ChartAnnotation[]` |  |  |
| `domain` | `[number, number]` |  |  |
| `spot` | `string \| boolean` |  |  |
| `valueFormat` | `(value: number) => string` |  |  |
| `locale` | `string` |  | BCP 47 tag for number formatting; undefined is the reader's own. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Focuses the plot |
| Arrow right, Arrow left | Moves the cursor across the points; a status tooltip reads the values |
| Home, End | First or last point |
| Escape | Clears the cursor |

## Accessibility

- Same as LineChart: a focusable, named plot and a visually hidden data table.

## Classes

`rs-chart-area`

## Dependencies

Registry dependencies: [chart](chart.md).  
React: `packages/react/src/components/chart.tsx`  
CSS: `packages/core/css/components/chart.css`
