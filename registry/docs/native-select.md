# Native select

Native select with Raster 1px chrome.

Category: forms  
Name: `native-select`  
Also known as: Native select, Select element, Dropdown, HTML select  
Page: https://getraster.com/components/native-select/

## When to use

- A short fixed list where the platform picker is fine, especially on phones.
- Forms that post natively; the value travels with the form.

## When not to

- Rich option labels or type-ahead over long lists; use Select or Combobox.
- Fewer than three options; use Radio.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { NativeSelect } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add native-select
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/native-select.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<select class="rs-native-select"><option>Alkmaar</option><option>Amsterdam</option><option>Rotterdam</option></select>
```

## Example

```tsx
import { NativeSelect } from "@noorddev/raster-react";

<NativeSelect label="City" defaultValue="alkmaar">
  <option value="alkmaar">Alkmaar</option>
  <option value="amsterdam">Amsterdam</option>
  <option value="rotterdam">Rotterdam</option>
</NativeSelect>
```

## Props

### NativeSelect

The platform list. Raster chrome.

Extends `SelectHTMLAttributes<HTMLSelectElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSelectElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Space, Alt + Arrow down | Opens the platform list |
| Arrow up, Arrow down | Changes the value |
| Type a letter | Jumps to a matching option |

## Accessibility

- Renders a native <select> with a generated id; label renders a <label> pointing at it.
- Inside Field, hint and error reach it through aria-describedby and aria-invalid.

## Classes

`rs-native-select`, `rs-native-select-invalid`, `rs-native-select-field`, `rs-native-select-label`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/native-select.tsx`  
CSS: `packages/core/css/components/native-select.css`
