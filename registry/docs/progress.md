# Progress

Shows completion for a known process. 4px bar; the label carries the percentage.

Category: feedback  
Name: `progress`  
Also known as: Progress, Progress bar, Meter  
Page: https://vlak.dev/components/progress/

## When to use

- Determinate progress with a known total.
- label to show the name and the percentage above the bar.

## When not to

- Unknown duration; use Spinner.
- Static ratios like storage used; a number reads better.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Progress } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add progress
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/progress.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-progress-head"><span id="upload-label">Uploading</span><span>40%</span></div><div class="rs-progress" role="progressbar" aria-labelledby="upload-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40"><span class="rs-progress-fill" style="width:40%"></span></div>
```

## Example

```tsx
import { Progress } from "@noorddev/vlak-react";

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
