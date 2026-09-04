# Resizable

Resizes two adjacent panes with a draggable 1px handle. Arrow keys adjust the split.

Category: surfaces  
Name: `resizable`  
Also known as: Resizable, Split pane, Resizable panels, Splitter, Panel group  
Page: https://vlak.dev/components/resizable/

## When to use

- Two panes the user sizes against each other: editor and preview, list and detail.
- Percentages for initial, min, and max.

## When not to

- More than two panes; nest a Split.
- Layouts that should stack on phones by other rules; it stacks at 640px on its own.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Split } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add resizable
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/resizable.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-split"><div class="rs-split-pane" style="width:50%">Left</div><button class="rs-split-handle" role="separator" aria-valuenow="50"></button><div class="rs-split-pane" style="width:50%">Right</div></div>
```

## Example

```tsx
import { Split } from "@noorddev/vlak-react";

<Split initial={60} min={30} max={80} handleLabel="Resize editor and preview">
  <Editor />
  <Preview />
</Split>
```

## Props

### Split

Two panes on a draggable hairline. Arrows step, Home/End jump; the axis follows the layout.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initial` | `number` | `50` | Starting share of the first pane, in percent. |
| `min` | `number` | `20` |  |
| `max` | `number` | `80` |  |
| `handleLabel` | `string` | `"Resize panes"` | Accessible name of the handle. |
| `children` (required) | `[ReactNode, ReactNode]` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Focuses the handle |
| Arrow left, Arrow up | Shrinks the first pane by 2% |
| Arrow right, Arrow down | Grows it by 2% |
| Shift + Arrow keys | Moves by 10% |
| Home, End | Jumps to min or max |

## Accessibility

- The handle is a <button role="separator"> with aria-orientation, aria-valuenow, aria-valuemin, aria-valuemax, and aria-label from handleLabel.
- Below 640px the panes stack and the axis follows: the orientation flips and the arrows move vertically.

## Classes

`rs-split`, `rs-split-pane`, `rs-split-handle`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/resizable.tsx`  
CSS: `packages/core/css/components/resizable.css`
