# Form

Collects related inputs as stacked fields with one primary action at the end.

Category: forms  
Name: `form`  
Also known as: Form, Form layout, Stacked form  
Page: https://vlak.dev/components/form/

## When to use

- Any form: fields stack, one primary action at the end.
- Native validation attributes; the platform reports them.

## When not to

- Search boxes and single fields; use InlineForm.
- Multi-column layouts; stack instead.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Form } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add form
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/form.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<form class="rs-form"><div class="rs-field"><span class="rs-field-label">Name</span><input class="rs-input rs-input-full" /></div><div class="rs-field"><span class="rs-field-label">E-mail</span><input class="rs-input rs-input-full" /></div><button class="rs-btn-primary">Send</button></form>
```

## Example

```tsx
import { Button, Field, FieldLabel, Form, Input } from "@noorddev/vlak-react";

<Form onSubmit={(e) => { e.preventDefault(); save(); }}>
  <Field>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input plain id="name" required />
  </Field>
  <Field>
    <FieldLabel htmlFor="email">E-mail</FieldLabel>
    <Input plain id="email" type="email" required />
  </Field>
  <Button type="submit">Send</Button>
</Form>
```

## Props

### Form

Native form. Fields stack. One primary action at the end.

Extends `FormHTMLAttributes<HTMLFormElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLFormElement`.

No props of its own.

## Keyboard

| Keys | Does |
| --- | --- |
| Enter | Submits from a text field |

## Accessibility

- A native <form>; name it with aria-label or aria-labelledby when the page has more than one.
- Field wires labels, hints, and errors to the controls.

## Classes

`rs-form`

## Dependencies

Registry dependencies: [field](field.md), [input](input.md), [button](button.md).  
React: `packages/react/src/components/form.tsx`  
CSS: `packages/core/css/components/form.css`
