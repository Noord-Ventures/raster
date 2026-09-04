# Tooltip

Explains a control on hover or keyboard focus. A real element describes its trigger.

Category: feedback  
Name: `tooltip`  
Also known as: Tooltip, Tip, Hint  
Page: https://vlak.dev/components/tooltip/

## When to use

- A short label for an icon-only or terse control.
- Text that adds to the name, never text that replaces it.

## When not to

- Content that must be read to operate the control; put it in view.
- Rich content; use HoverCard.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Tooltip } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add tooltip
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/tooltip.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<span class="rs-tip"><button class="rs-btn-ghost rs-btn-sm" aria-describedby="copy-tip">Copy</button><span class="rs-tip-bubble" role="tooltip" id="copy-tip">Copy to clipboard</span></span>
```

## Example

```tsx
import { Button, Tooltip } from "@noorddev/vlak-react";

<Tooltip tip="Copy to clipboard">
  <Button variant="ghost" size="sm" aria-label="Copy">Copy</Button>
</Tooltip>
```

## Props

### Tooltip

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tip` (required) | `string` |  | Tip text. Shown on hover and on keyboard focus; Escape hides it. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Focuses the trigger and shows the tip |
| Escape | Hides the tip until the pointer leaves |

## Accessibility

- The tip is a real element with role="tooltip", linked to the trigger through aria-describedby.
- An element child is described directly (and given tabIndex when it cannot take focus); a text child makes the wrapper the trigger.
- Shown on hover and focus; the bubble stays hoverable.

## Classes

`rs-tip`, `rs-tip-bubble`

## Dependencies

Registry dependencies: [button](button.md).  
React: `packages/react/src/components/tooltip.tsx`  
CSS: `packages/core/css/components/tooltip.css`
