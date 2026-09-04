# Toggle

Pressable control. Pressed fills ink. State is aria-pressed.

Category: actions  
Name: `toggle`  
Also known as: Toggle, Toggle button, Press button  
Page: https://getraster.com/components/toggle/

## When to use

- A formatting or filter option that is on or off and stays in view.
- Several independent toggles in a row.

## When not to

- A setting that applies immediately to the app; use Switch.
- One of several; use ToggleGroup.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Toggle, ToggleGroup } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add toggle
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/toggle.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-toggle-group"><button class="rs-toggle" aria-pressed="true">Left</button><button class="rs-toggle" aria-pressed="false">Center</button><button class="rs-toggle" aria-pressed="false">Right</button></div>
```

## Example

```tsx
import { useState } from "react";
import { Toggle } from "@noorddev/raster-react";

const [bold, setBold] = useState(false);

<Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">B</Toggle>
```

## Props

### Toggle

Press switch; state lives in aria-pressed.

Extends `Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLButtonElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pressed` | `boolean` |  |  |
| `defaultPressed` | `boolean` |  |  |
| `onPressedChange` | `(pressed: boolean) => void` |  |  |

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
| Tab | Moves focus to the toggle |
| Enter, Space | Presses or releases it |

## Accessibility

- A native <button> with aria-pressed.
- Give icon-only toggles an aria-label. Controlled with pressed and onPressedChange, or uncontrolled with defaultPressed.

## Classes

`rs-toggle`, `rs-toggle-group`, `rs-toggle-grouped-on`, `rs-toggle-pressed`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/toggle.tsx`  
CSS: `packages/core/css/components/toggle.css`
