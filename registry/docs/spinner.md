# Spinner

Signals indeterminate progress. 16px ring with a 1px stroke; respects reduced motion.

Category: feedback  
Name: `spinner`  
Also known as: Spinner, Loader, Loading indicator, Activity indicator  
Page: https://vlak.dev/components/spinner/

## When to use

- Short waits of unknown length inside a control or a row.
- label to say what is loading.

## When not to

- Known progress; use Progress.
- Whole-page waits; use Skeleton.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Spinner } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add spinner
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/spinner.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<span class="rs-spinner" role="status" aria-label="Loading"><svg viewBox="0 0 16 16" width="16" height="16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-dasharray="28 13" vector-effect="non-scaling-stroke"/></svg></span>
```

## Example

```tsx
import { Spinner } from "@noorddev/vlak-react";

<Spinner label="Loading" />
```

## Props

### Spinner

Hairline ring. Stops under prefers-reduced-motion.

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Loading"` |  |

## Accessibility

- Renders role="status" with aria-label from label ("Loading" by default); the ring is aria-hidden.
- The animation stops under prefers-reduced-motion.

## Classes

`rs-spinner`, `rs-spinner-ring`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/spinner.tsx`  
CSS: `packages/core/css/components/spinner.css`
