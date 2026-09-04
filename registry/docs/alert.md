# Alert

Calls attention to contextual information. 1px frame and icon; critical variant fills with ink.

Category: feedback  
Name: `alert`  
Also known as: Alert, Banner, Notice, Inline message  
Page: https://vlak.dev/components/alert/

## When to use

- A persistent message that belongs to the page: a warning, a limit, a state.
- variant="solid" for the one critical message in view.

## When not to

- Transient confirmations; use toast.
- Notes in running copy; use Callout.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Alert } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add alert
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/alert.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-alert" role="status"><div><span class="rs-alert-title">Heads up</span><p class="rs-alert-body">Your workspace syncs every hour.</p></div></div>
```

## Example

```tsx
import { Alert } from "@noorddev/vlak-react";

<Alert title="Heads up">Your workspace syncs every hour.</Alert>
<Alert variant="solid" title="Payment failed" live="assertive">Update your card to keep publishing.</Alert>
```

## Props

### Alert

Extends `Omit<HTMLAttributes<HTMLDivElement>, "title">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  |  |
| `variant` | `"outline" \| "solid"` | `"outline"` | Solid ink variant. |
| `icon` | `ReactNode` |  |  |
| `live` | `"polite" \| "assertive"` |  | Static content is a note. Set "polite" (role=status) or "assertive" (role=alert) only when the alert appears in response to something. |

## Accessibility

- Static content renders role="note". Pass live="polite" (role="status") or live="assertive" (role="alert") only when the alert appears in response to something.
- The default icon is decorative; icon accepts your own node.

## Classes

`rs-alert`, `rs-alert-title`, `rs-alert-body`, `rs-alert-solid`, `rs-alert-body-solid`, `rs-alert-icon`, `rs-alert-icon-solid`, `rs-alert-title-solid`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/alert.tsx`  
CSS: `packages/core/css/components/alert.css`
