# Input

Text field. 1px control border, 2px focus ring, 12px label above.

Category: forms  
Name: `input`  
Also known as: Input, Text field, TextField, Text input  
Page: https://getraster.com/components/input/

## When to use

- Single-line text, e-mail, number, password, and search fields.
- label, hint, and error together; the component wires them to the control.

## When not to

- Long text; use Textarea.
- A fixed set of options; use Select or NativeSelect.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Input } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add input
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/input.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-field"><span class="rs-field-label">E-mail</span><input class="rs-input rs-input-full" /></div>
```

## Example

```tsx
import { Input } from "@noorddev/raster-react";

<Input label="E-mail" type="email" placeholder="you@example.com" hint="We never share it." />
<Input label="Name" error="Name is required." />
<Input label="Handle" ok feedback="Available" />
```

## Props

### Input

Extends `InputHTMLAttributes<HTMLInputElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLInputElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | Label rendered above the field at 12px. |
| `ok` | `boolean` |  | Marks the field as validated: ink border and ink feedback text. |
| `feedback` | `ReactNode` |  | Quiet feedback line under the field. |
| `hint` | `ReactNode` |  | Hint under the field; it describes the control. |
| `error` | `ReactNode` |  | Error under the field; it describes the control and marks it invalid. |
| `plain` | `boolean` |  | Control only — no field stack. For Field / InputGroup. |
| `grouped` | `boolean` |  | Flush into an InputGroup: no own stroke. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves focus to the field |
| Enter | Submits the enclosing form |

## Accessibility

- Renders a native <input> with a generated id; label points at it with htmlFor.
- hint and error are linked through aria-describedby; error also sets aria-invalid and renders with role="alert".
- Inside Field, pass plain so Field's hint and error describe the control instead.

## Classes

`rs-field`, `rs-field-label`, `rs-input`, `rs-input-full`, `rs-input-ok`, `rs-input-invalid`, `rs-feedback`, `rs-feedback-ok`, `rs-feedback-error`, `rs-input-field`, `rs-input-grouped`, `rs-input-label`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/input.tsx`  
CSS: `packages/core/css/components/input.css`
