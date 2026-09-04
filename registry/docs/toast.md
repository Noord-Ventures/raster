# Toast

Reports a brief status in the bottom-right corner. Polite live region; pauses on hover and closes on demand.

Category: feedback  
Name: `toast`  
Also known as: Toast, Sonner, Snackbar, Notification  
Page: https://vlak.dev/components/toast/

## When to use

- Confirming something that already happened: saved, sent, copied.
- One line; a description only when the title needs it.

## When not to

- Errors the user must act on; use Alert or AlertDialog.
- Anything with a link or a button inside.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { toast, Toaster } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add toast
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/toast.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-toasts" role="status" aria-live="polite"><div class="rs-toast"><div><span class="rs-toast-title">Saved</span><p class="rs-toast-body">Your changes are live.</p></div><button class="rs-toast-close" type="button" aria-label="Dismiss">&times;</button></div></div>
```

## Example

```tsx
import { Toaster, toast } from "@noorddev/vlak-react";

// once, in your layout
<Toaster duration={4000} closeLabel="Dismiss" />

// from anywhere
toast("Saved", { description: "Your changes are live." });
```

## Props

### Toaster

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | `4000` | The shortest a toast stays, in milliseconds. Longer text stays longer. |
| `closeLabel` | `string` | `"Dismiss"` | Accessible name of the close button on every toast. |

### Functions

- `toast` (function): Fire a toast from anywhere; a mounted <Toaster /> renders it.

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Reaches the close button of each toast |
| Enter, Space | Dismisses the toast |

## Accessibility

- The stack is role="status" with aria-live="polite".
- Each toast has a labelled close button (closeLabel, "Dismiss" by default).
- Lifetime scales with the text length and pauses while hovered or focused; duration on the call overrides it.

## Classes

`rs-toasts`, `rs-toast`, `rs-toast-title`, `rs-toast-body`, `rs-toast-close`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/toast.tsx`  
CSS: `packages/core/css/components/toast.css`
