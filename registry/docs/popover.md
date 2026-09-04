# Popover

Native Popover API. Top layer, light dismiss.

Category: surfaces  
Name: `popover`  
Also known as: Popover, Popup, Flyout  
Page: https://getraster.com/components/popover/

## When to use

- Secondary detail the user asks for and dismisses: a definition, a small form, a legend.
- align="end" when the trigger sits at the right edge.

## When not to

- Menus; use DropdownMenu.
- Anything that must block the page; use Dialog.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Popover, PopoverBody, PopoverTitle } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add popover
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/popover.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<button class="rs-btn-ghost rs-btn-sm" popovertarget="info">Details</button>
<div id="info" popover="auto" class="rs-popover"><span class="rs-popover-title">Module grid</span><p class="rs-popover-body">204px modules: a 184px column and a 20px gutter.</p></div>
```

## Example

```tsx
import { Popover, PopoverBody, PopoverTitle } from "@noorddev/raster-react";

<Popover trigger="Details" align="start" aria-label="Module grid">
  <PopoverTitle>Module grid</PopoverTitle>
  <PopoverBody>204px modules: a 184px column and a 20px gutter.</PopoverBody>
</Popover>
```

## Props

### Popover

The native Popover API. The panel lives in the top layer; light dismiss comes from the platform. Anchor positioning places it where supported; otherwise it is measured, follows scroll and resize, and flips above the trigger when there is no room below.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` (required) | `ReactNode` |  | Trigger content, rendered in a ghost button. |
| `align` | `"end" \| "start"` | `"start"` | Where the panel sits relative to the trigger. |

### PopoverBody

Extends `HTMLAttributes<HTMLParagraphElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLParagraphElement`.

No props of its own.

### PopoverTitle

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

No props of its own.

## Keyboard

| Keys | Does |
| --- | --- |
| Enter, Space | Opens or closes from the trigger |
| Escape | Closes (platform light dismiss) |
| Tab | Moves into the panel |

## Accessibility

- The native Popover API: the panel is popover="auto" in the top layer; the trigger is a ghost Button with popovertarget, so the platform manages aria-expanded and light dismiss.
- Name the panel with aria-label or aria-labelledby; PopoverTitle is visible text only.
- Placed by CSS anchor positioning where supported, else measured and flipped above when there is no room below.

## Classes

`rs-popover`, `rs-popover-title`, `rs-popover-body`

## Dependencies

Registry dependencies: [button](button.md).  
React: `packages/react/src/components/popover.tsx`  
CSS: `packages/core/css/components/popover.css`
