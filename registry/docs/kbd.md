# Kbd

Labels a keyboard key. Monospace cap with a 1px frame and heavier bottom edge.

Category: content  
Name: `kbd`  
Also known as: Kbd, Keyboard key, Key cap, Shortcut  
Page: https://vlak.dev/components/kbd/

## When to use

- Showing a shortcut next to a command or in help copy.
- KbdPair to keep a chord together.

## When not to

- Code; use Chip.
- Buttons; a key cap is not a control.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Kbd, KbdPair } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add kbd
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/kbd.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<kbd class="rs-kbd">⌘</kbd> <kbd class="rs-kbd">K</kbd>
```

## Example

```tsx
import { Kbd, KbdPair } from "@noorddev/vlak-react";

<KbdPair><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdPair>
```

## Props

### Kbd

Extends `HTMLAttributes<HTMLElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLElement`.

No props of its own.

### KbdPair

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

No props of its own.

## Accessibility

- Renders a native <kbd>; screen readers read the characters. Spell out modifier symbols in surrounding text when they matter.

## Classes

`rs-kbd`, `rs-kbd-pair`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/kbd.tsx`  
CSS: `packages/core/css/components/kbd.css`
