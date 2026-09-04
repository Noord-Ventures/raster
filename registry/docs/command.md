# Command

Command palette in a native dialog. Filter, arrows, enter.

Category: actions  
Name: `command`  
Also known as: Command, Command palette, cmdk, Command menu, Spotlight  
Page: https://getraster.com/components/command/

## When to use

- A palette of commands and destinations behind one shortcut.
- keywords on an item to widen the match; hint for the shortcut label.

## When not to

- Picking a value for a field; use Combobox.
- Fewer than ten commands; use DropdownMenu.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Command, CommandDialog } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add command
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/command.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-command" style="border:1px solid var(--divider);border-radius:var(--radius)"><input class="rs-command-input" placeholder="Type a command or search…" /><div class="rs-command-list" role="listbox"><div class="rs-command-group">Go to</div><div class="rs-command-item rs-command-item-active" role="option" aria-selected="true"><span>Components</span><span class="rs-command-hint">⌘1</span></div><div class="rs-command-item" role="option" aria-selected="false"><span>Tokens</span><span class="rs-command-hint">⌘2</span></div></div></div>
```

## Example

```tsx
import { useEffect, useState } from "react";
import { CommandDialog } from "@noorddev/raster-react";

const [open, setOpen] = useState(false);

// wire the shortcut once in your app
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen(true);
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

<CommandDialog
  open={open}
  onClose={() => setOpen(false)}
  groups={[
    { label: "Go to", items: [{ label: "Components", hint: "⌘1", onSelect: () => go("/components") }] },
    { label: "Actions", items: [{ label: "New project", keywords: "create add", onSelect: create }] },
  ]}
/>
```

## Props

### Command

Filter, arrows, enter. The input keeps focus; the list is aria-activedescendant.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `groups` (required) | `CommandGroup[]` |  |  |
| `placeholder` | `string` | `"Type a command or search…"` |  |
| `emptyLabel` | `ReactNode` | `"Nothing found."` |  |
| `onDone` | `() => void` |  |  |

### CommandDialog

The palette in a native <dialog>. Wire ⌘K in your app to setOpen(true).

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDialogElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `groups` (required) | `CommandGroup[]` |  |  |
| `placeholder` | `string` |  |  |
| `emptyLabel` | `ReactNode` |  |  |
| `onDone` | `() => void` |  |  |
| `open` (required) | `boolean` |  |  |
| `onClose` | `() => void` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Type | Filters the items by label and keywords |
| Arrow down, Arrow up | Moves the active item |
| Home, End | First or last item |
| Page up, Page down | Moves ten items |
| Enter | Runs the active item and closes |
| Escape | Closes |

## Accessibility

- The input is role="combobox" named "Command" with aria-autocomplete="list" and aria-activedescendant; the list is role="listbox" with labelled role="group" sections.
- CommandDialog places it in a native modal <dialog>; Command alone renders inline. The input takes focus on mount.

## Classes

`rs-command`, `rs-command-input`, `rs-command-list`, `rs-command-group`, `rs-command-item`, `rs-command-item-active`, `rs-command-hint`, `rs-command-empty`

## Dependencies

Registry dependencies: [dialog](dialog.md).  
React: `packages/react/src/components/command.tsx`  
CSS: `packages/core/css/components/command.css`
