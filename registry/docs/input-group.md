# Input group

Joins a text field with a prefix or suffix inside one 1px border.

Category: forms  
Name: `input-group`  
Also known as: Input group, Input addon, Prefix input, Suffix input  
Page: https://vlak.dev/components/input-group/

## When to use

- A fixed prefix or suffix that belongs to the value: a protocol, a unit, a currency.
- end to place the addon after the field.

## When not to

- Buttons inside the field; use InlineForm.
- Icons as decoration; the addon is text.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { InputAddon, InputGroup } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add input-group
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/input-group.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-input-group"><span class="rs-input-addon">https://</span><input class="rs-input" placeholder="vlak.dev" /></div>
```

## Example

```tsx
import { Input, InputAddon, InputGroup } from "@noorddev/vlak-react";

<InputGroup>
  <InputAddon>https://</InputAddon>
  <Input placeholder="vlak.dev" aria-label="Site" />
</InputGroup>

<InputGroup end>
  <Input placeholder="0.00" aria-label="Amount" />
  <InputAddon>EUR</InputAddon>
</InputGroup>
```

## Props

### InputAddon

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

No props of its own.

### InputGroup

Addon and field share one control boundary.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `end` | `boolean` |  | Place the addon after the field. |

## Accessibility

- The Input child is cloned with plain and grouped; it keeps its own id and name.
- The addon is presentational text. Give the input an aria-label or a FieldLabel; the addon does not name it.

## Classes

`rs-input-group`, `rs-input-addon`, `rs-input-group-end`

## Dependencies

Registry dependencies: [input](input.md).  
React: `packages/react/src/components/input-group.tsx`  
CSS: `packages/core/css/components/input-group.css`
