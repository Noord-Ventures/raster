# Progress

4px bar. Percentage is set in the label.

Category: feedback  
Name: `progress`  
Also known as: Progress, Progress bar, Meter  
Page: https://getraster.com/components/progress/

## When to use

- Determinate progress with a known total.
- label to show the name and the percentage above the bar.

## When not to

- Unknown duration; use Spinner.
- Static ratios like storage used; a number reads better.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Progress } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add progress
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/progress.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-progress-head"><span id="upload-label">Uploading</span><span>40%</span></div><div class="rs-progress" role="progressbar" aria-labelledby="upload-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40"><span class="rs-progress-fill" style="width:40%"></span></div>
```

## Example

```tsx
import { Progress } from "@noorddev/raster-react";

<Progress label="Uploading" value={40} />
<Progress value={3} max={5} aria-label="Steps done" />
```

## Props

### Progress

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `number` |  |  |
| `max` | `number` | `100` |  |
| `label` | `ReactNode` |  | Label above the bar; it names the bar. The percentage lives here, never inside the bar. |

## Accessibility

- Renders role="progressbar" with aria-valuemin, aria-valuemax, aria-valuenow, and aria-valuetext as a percentage.
- label names the bar through aria-labelledby; without one, pass aria-label.

## Classes

`rs-progress`, `rs-progress-head`, `rs-progress-fill`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/progress.tsx`  
CSS: `packages/core/css/components/progress.css`
