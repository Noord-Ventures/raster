# Label

Names a form control. 12px secondary text, set above the control.

Category: forms  
Name: `label`  
Also known as: Label, Form label, Field label  
Page: https://vlak.dev/components/label/

## When to use

- Naming a control that does not take a label prop.
- Custom layouts where the label sits apart from the field.

## When not to

- Alongside Input's own label prop; it already renders one.
- As a heading; use the type scale.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Label } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add label
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/label.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<label class="rs-label" for="name">Name</label>
```

## Example

```tsx
import { Label } from "@noorddev/vlak-react";

<Label htmlFor="name">Name</Label>
<input id="name" className="rs-input rs-input-full" />
```

## Props

### Label

Label above a control. 12px, secondary ink.

Extends `LabelHTMLAttributes<HTMLLabelElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLLabelElement`.

No props of its own.

## Accessibility

- Renders a native <label>; pass htmlFor with the control's id so clicks focus the control and the name is exposed.

## Classes

`rs-label`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/label.tsx`  
CSS: `packages/core/css/components/label.css`
