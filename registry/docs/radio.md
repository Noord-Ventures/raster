# Radio

Single-choice control. Selected dot is ink.

Category: forms  
Name: `radio`  
Also known as: Radio, Radio group, RadioGroup, Radio button  
Page: https://getraster.com/components/radio/

## When to use

- One choice from two to six visible options.
- Choices that should all be readable at once.

## When not to

- Many options; use Select.
- Independent on and off choices; use Checkbox.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Radio, RadioGroup } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add radio
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/radio.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<label class="rs-radio"><span class="rs-radio-dot rs-radio-on"></span>Monthly</label>
```

## Example

```tsx
import { useState } from "react";
import { Radio, RadioGroup } from "@noorddev/raster-react";

const [plan, setPlan] = useState("monthly");

<RadioGroup aria-label="Billing" value={plan} onValueChange={setPlan}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" />
</RadioGroup>
```

## Props

### Radio

A real native radio inside a RadioGroup; the ink dot mirrors its state.

Extends `Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLInputElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` |  |  |
| `label` | `ReactNode` |  |  |

### RadioGroup

Extends `Omit<HTMLAttributes<HTMLDivElement>, "onChange">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` |  |  |
| `value` | `string` |  |  |
| `defaultValue` | `string` |  |  |
| `onValueChange` | `(value: string) => void` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves focus into the group, onto the checked radio |
| Arrow up, Arrow down, Arrow left, Arrow right | Moves the selection |
| Space | Selects the focused radio |

## Accessibility

- RadioGroup renders role="radiogroup"; pass aria-label or aria-labelledby to name it.
- Radio is a native <input type="radio"> hidden from view inside a <label>; the ink dot mirrors its state.
- The group shares a generated name unless you pass one.

## Classes

`rs-radio`, `rs-radio-dot`, `rs-radio-on`, `rs-radio-fill`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/radio.tsx`  
CSS: `packages/core/css/components/radio.css`
