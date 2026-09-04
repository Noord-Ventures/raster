# Menubar

Groups application menus in one row of dropdowns with a 1px frame.

Category: actions  
Name: `menubar`  
Also known as: Menubar, Menu bar, Application menu  
Page: https://vlak.dev/components/menubar/

## When to use

- Desktop-style application menus: File, Edit, View.
- Tools and editors with many commands grouped by verb.

## When not to

- Site navigation; use NavigationMenu.
- One menu; use DropdownMenu.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Menubar } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add menubar
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/menubar.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-menubar" role="menubar"><button class="rs-dropdown" role="menuitem" aria-haspopup="menu"><span>File</span></button><button class="rs-dropdown" role="menuitem" aria-haspopup="menu"><span>Edit</span></button><button class="rs-dropdown" role="menuitem" aria-haspopup="menu"><span>View</span></button></div>
```

## Example

```tsx
import { Menubar } from "@noorddev/vlak-react";

<Menubar
  menus={[
    { label: "File", items: [{ label: "New", onSelect: create }, { label: "Open…", onSelect: open }] },
    { label: "Edit", items: [{ label: "Undo", onSelect: undo }, { label: "Redo", onSelect: redo }] },
  ]}
/>
```

## Props

### Menubar

Dropdown menus in a hairline strip. The triggers are menuitems with one roving tab stop; ArrowLeft/ArrowRight move between them and an open menu follows.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `menus` (required) | `{ label: ReactNode; items: DropdownMenuItem[]; }[]` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves focus to the bar (one roving tab stop) |
| Arrow left, Arrow right | Moves between menus; an open menu follows |
| Home, End | First or last menu |
| Arrow down, Enter, Space | Opens the menu on the first item |
| Arrow up | Opens the menu on the last item |
| Escape | Closes the open menu and returns focus to its trigger |

## Accessibility

- Renders role="menubar"; each trigger is a <button role="menuitem"> with aria-haspopup="menu", aria-expanded, and aria-controls.
- Open panels are role="menu" labelled by their trigger, with the same keyboard model as DropdownMenu.

## Classes

`rs-menubar`

## Dependencies

Registry dependencies: [dropdown-menu](dropdown-menu.md).  
React: `packages/react/src/components/menubar.tsx`  
CSS: `packages/core/css/components/menubar.css`
