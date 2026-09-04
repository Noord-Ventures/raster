# Combobox

Filters and selects an option from a listbox through one text field.

Category: forms  
Name: `combobox`  
Also known as: Combobox, Autocomplete, Typeahead, Searchable select  
Page: https://vlak.dev/components/combobox/

## When to use

- One choice from a long list the user knows how to type: cities, people, tags.
- searchText on an option when its label is not a plain string.

## When not to

- Short lists; use Select.
- Free-form values not in the list; the combobox only picks options.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Combobox } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add combobox
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/combobox.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-combobox"><input class="rs-input rs-input-full" role="combobox" placeholder="Search…" /><div class="rs-menu" role="listbox"><div class="rs-menu-item rs-menu-item-active" role="option" aria-selected="false">Alkmaar</div><div class="rs-menu-item" role="option" aria-selected="false">Amsterdam</div></div></div>
```

## Example

```tsx
import { useState } from "react";
import { Combobox } from "@noorddev/vlak-react";

const [city, setCity] = useState("");

<Combobox
  aria-label="City"
  options={cities}
  value={city}
  onValueChange={setCity}
  placeholder="Search cities…"
  emptyLabel="No city matches."
/>
```

## Props

### Combobox

Editable combobox: the input holds focus, filters on typed text, and points at the active option with aria-activedescendant.

Extends `Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` (required) | `SelectOption[]` |  |  |
| `value` | `string` |  |  |
| `defaultValue` | `string` |  |  |
| `onValueChange` | `(value: string) => void` |  |  |
| `placeholder` | `string` | `"Search…"` |  |
| `emptyLabel` | `ReactNode` | `"Nothing found."` |  |
| `disabled` | `boolean` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Type | Filters the options and opens the list |
| Arrow down | Opens the list on the selected option, then moves down |
| Arrow up | Opens the list on the last option, then moves up |
| Home, End | First or last match |
| Page up, Page down | Moves ten matches |
| Enter | Picks the active match and closes |
| Escape | Clears the search and closes |
| Tab | Closes and moves on |

## Accessibility

- APG editable combobox: an <input role="combobox"> with aria-autocomplete="list", aria-expanded, aria-controls, and aria-activedescendant; focus stays in the input.
- The list is role="listbox" with role="option" rows carrying aria-selected; it does not open on focus alone.
- Pass aria-label or aria-labelledby. Controlled with value and onValueChange, or uncontrolled with defaultValue.

## Classes

`rs-combobox`, `rs-combobox-empty`

## Dependencies

Registry dependencies: [input](input.md), [dropdown-menu](dropdown-menu.md).  
React: `packages/react/src/components/combobox.tsx`  
CSS: `packages/core/css/components/combobox.css`
