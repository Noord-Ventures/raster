# Button group

Joined ghost buttons with a 1px rule between.

Category: actions  
Name: `button-group`  
Also known as: Button group, Segmented buttons, Joined buttons  
Page: https://getraster.com/components/button-group/

## When to use

- Two to four related actions that read as one control.
- Ghost buttons; the group owns the outer stroke and the seams.

## When not to

- Exclusive selection; use ToggleGroup, which tracks the pressed option.
- Unrelated actions in one row; space them instead.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { ButtonGroup } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add button-group
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/button-group.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-btn-group"><button class="rs-btn-ghost">Left</button><button class="rs-btn-ghost">Center</button><button class="rs-btn-ghost">Right</button></div>
```

## Example

```tsx
import { Button, ButtonGroup } from "@noorddev/raster-react";

<ButtonGroup aria-label="Alignment">
  <Button variant="ghost">Left</Button>
  <Button variant="ghost">Center</Button>
  <Button variant="ghost">Right</Button>
</ButtonGroup>
```

## Props

### ButtonGroup

Flush joined actions. One hairline between. Group owns the outer stroke.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves between the buttons |
| Enter, Space | Activates the focused button |

## Accessibility

- Renders role="group"; pass aria-label to name it.
- Children get grouped, so each Button keeps its own name and focus ring.

## Classes

`rs-btn-group`

## Dependencies

Registry dependencies: [button](button.md).  
React: `packages/react/src/components/button-group.tsx`  
CSS: `packages/core/css/components/button-group.css`
