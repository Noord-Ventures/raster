# Switch

32×18 control. On fills ink; off is a 1px track. The thumb moves; the box stays 32px.

Category: forms  
Name: `switch`  
Also known as: Switch, Toggle switch  
Page: https://getraster.com/components/switch/

## When to use

- A setting that applies as soon as it flips.
- Binary state with a clear on and off.

## When not to

- Choices that need a submit button; use Checkbox.
- More than two states; use ToggleGroup.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Switch } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add switch
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/switch.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<span class="rs-switch rs-switch-on"><i></i></span>
```

## Example

```tsx
import { useState } from "react";
import { Switch } from "@noorddev/raster-react";

const [enabled, setEnabled] = useState(false);

<Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Notifications" />
```

## Props

### Switch

A button with role="switch".

Extends `Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLButtonElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` |  |  |
| `defaultChecked` | `boolean` |  |  |
| `onCheckedChange` | `(checked: boolean) => void` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves focus to the switch |
| Space, Enter | Toggles it |

## Accessibility

- A native <button> with role="switch" and aria-checked.
- It has no visible text; pass aria-label or aria-labelledby.
- Controlled with checked and onCheckedChange, or uncontrolled with defaultChecked.

## Classes

`rs-switch`, `rs-switch-on`, `rs-switch-thumb`, `rs-switch-thumb-on`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/switch.tsx`  
CSS: `packages/core/css/components/switch.css`
