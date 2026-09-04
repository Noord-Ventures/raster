# Context menu

Menu at the pointer on right-click, or on Shift+F10 from the keyboard. Escape and outside click close it.

Category: actions  
Name: `context-menu`  
Also known as: Context menu, Right-click menu, Contextual menu  
Page: https://getraster.com/components/context-menu/

## When to use

- Actions on a region or object that already has a primary interaction: a canvas, a row, a file.
- The same items shape as DropdownMenu.

## When not to

- Actions with no other way in; add a visible DropdownMenu too.
- Touch-only surfaces without a long-press alternative.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { ContextMenu } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add context-menu
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/context-menu.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-menu" role="menu"><button class="rs-menu-item" role="menuitem">Copy</button><button class="rs-menu-item" role="menuitem">Paste</button><hr class="rs-menu-sep" /><button class="rs-menu-item" role="menuitem">Inspect</button></div>
```

## Example

```tsx
import { ContextMenu } from "@noorddev/raster-react";

<ContextMenu items={[{ label: "Copy", onSelect: copy }, { label: "Paste", onSelect: paste }, { separator: true }, { label: "Inspect" }]}>
  <Canvas />
</ContextMenu>
```

## Props

### ContextMenu

Menu at the pointer on right-click, or anchored to the trigger on Shift+F10 / the ContextMenu key. The wrapper is tabbable (pass `tabIndex={-1}` when the child is focusable itself); focus returns to whatever had it when the menu closes.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `DropdownMenuItem[]` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Shift + F10, Context menu key | Opens the menu at the wrapper |
| Arrow down, Arrow up, Home, End, Type letters | Move between items |
| Enter, Space | Selects the item and closes |
| Escape | Closes and returns focus |

## Accessibility

- The wrapper is a tab stop with aria-keyshortcuts="Shift+F10"; pass tabIndex={-1} when the child is focusable itself.
- The panel is role="menu" with menuitem buttons, roving focus, and type-ahead; focus returns to whatever had it when the menu closes.
- Right-click opens at the pointer; the keyboard opens at the trigger's edge.

## Classes

`rs-context-menu-trigger`, `rs-context-menu-pin`

## Dependencies

Registry dependencies: [dropdown-menu](dropdown-menu.md).  
React: `packages/react/src/components/context-menu.tsx`  
CSS: `packages/core/css/components/context-menu.css`
