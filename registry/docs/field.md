# Field

Groups a label, control, and hint or error in one vertical field.

Category: forms  
Name: `field`  
Also known as: Field, Form field, Form item, FormField, Form control  
Page: https://vlak.dev/components/field/

## When to use

- Any control with a label plus a hint or an error, including NativeSelect, Textarea, Slider, and InputOTP.
- Form layouts where every field stacks the same way.

## When not to

- A lone Input; its label, hint, and error props do the same job.
- Grouping several controls; use a fieldset with a legend.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Field, FieldError, FieldHint, FieldLabel } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add field
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/field.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-field"><label class="rs-field-label" for="invoice-name">Name</label><input class="rs-input rs-input-full" id="invoice-name" aria-describedby="invoice-name-hint" /><p class="rs-field-hint" id="invoice-name-hint">As it appears on the invoice.</p></div>
```

## Example

```tsx
import { Field, FieldError, FieldHint, FieldLabel, Input } from "@noorddev/vlak-react";

<Field>
  <FieldLabel htmlFor="name">Name</FieldLabel>
  <Input plain id="name" />
  <FieldHint>As it appears on the invoice.</FieldHint>
</Field>

<Field>
  <FieldLabel htmlFor="iban">IBAN</FieldLabel>
  <Input plain id="iban" />
  <FieldError>Check the country code.</FieldError>
</Field>
```

## Props

### Field

Stack: label, control, hint or error. The hint and error describe the control.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### FieldError

Extends `HTMLAttributes<HTMLParagraphElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLParagraphElement`.

No props of its own.

### FieldHint

Extends `HTMLAttributes<HTMLParagraphElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLParagraphElement`.

No props of its own.

### FieldLabel

Extends `LabelHTMLAttributes<HTMLLabelElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLLabelElement`.

No props of its own.

## Accessibility

- Field passes the ids of a rendered FieldHint and FieldError to the control through aria-describedby.
- A rendered FieldError sets aria-invalid on the control and has role="alert".
- FieldLabel is a native <label>; pass htmlFor with the control's id.

## Classes

`rs-field`, `rs-field-label`, `rs-field-hint`, `rs-field-error`

## Dependencies

Registry dependencies: [input](input.md).  
React: `packages/react/src/components/field.tsx`  
CSS: `packages/core/css/components/field.css`
