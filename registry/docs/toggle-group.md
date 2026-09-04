# Toggle group

Selects one option from joined toggles. The active option fills with ink.

Category: actions  
Name: `toggle-group`  
Also known as: Toggle group, Segmented control, Exclusive toggles  
Page: https://vlak.dev/components/toggle-group/

## When to use

- One of two to five options that should all stay visible: alignment, view mode, period.
- Short labels of equal weight.

## When not to

- Many or long options; use Select.
- Multiple selection; use several Toggle buttons.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { ToggleGroup } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add toggle-group
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/toggle-group.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-toggle-group"><button class="rs-toggle" aria-pressed="true">Left</button><button class="rs-toggle" aria-pressed="false">Center</button><button class="rs-toggle" aria-pressed="false">Right</button></div>
```

## Example

```tsx
import { useState } from "react";
import { ToggleGroup } from "@noorddev/vlak-react";

const [align, setAlign] = useState("left");

<ToggleGroup
  aria-label="Alignment"
  options={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
  value={align}
  onValueChange={setAlign}
/>
```

## Props

### ToggleGroup

One pressed at a time.

Extends `Omit<HTMLAttributes<HTMLDivElement>, "onChange">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` (required) | `{ value: string; label: ReactNode; }[]` |  |  |
| `value` | `string` |  |  |
| `defaultValue` | `string` |  |  |
| `onValueChange` | `(value: string) => void` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves between the options |
| Enter, Space | Selects the focused option |

## Accessibility

- Renders role="group" of native buttons with aria-pressed; pass aria-label to name the group.
- Controlled with value and onValueChange, or uncontrolled with defaultValue.

## Classes

`rs-toggle-group`

## Dependencies

Registry dependencies: [toggle](toggle.md).  
React: `packages/react/src/components/toggle-group.tsx`  
CSS: `packages/core/css/components/toggle.css`
