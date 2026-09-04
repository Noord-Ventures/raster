# Textarea

Collects multiple lines of text. Resizes vertically only.

Category: forms  
Name: `textarea`  
Also known as: Textarea, Text area, Multiline input  
Page: https://vlak.dev/components/textarea/

## When to use

- Free text longer than one line.
- Vertical resize only; the width follows the grid.

## When not to

- Single values; use Input.
- Rich text; this is a native textarea.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Textarea } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add textarea
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/textarea.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-field"><span class="rs-field-label">Notes</span><textarea class="rs-textarea" placeholder="What should we know?"></textarea></div>
```

## Example

```tsx
import { Textarea } from "@noorddev/vlak-react";

<Textarea label="Notes" placeholder="What should we know?" rows={4} />
```

## Props

### Textarea

Extends `TextareaHTMLAttributes<HTMLTextAreaElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLTextAreaElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  |  |
| `feedback` | `ReactNode` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves focus to the field; Enter inserts a line break |

## Accessibility

- A native <textarea> with a generated id; label renders a <label> pointing at it.
- Inside Field, hint and error reach it through aria-describedby and aria-invalid.

## Classes

`rs-textarea`, `rs-textarea-invalid`, `rs-textarea-feedback`, `rs-textarea-field`, `rs-textarea-label`

## Dependencies

Registry dependencies: [input](input.md).  
React: `packages/react/src/components/textarea.tsx`  
CSS: `packages/core/css/components/textarea.css`
