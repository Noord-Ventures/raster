# Skeleton

Reserves space while content loads. Divider-tone pulse that respects reduced motion.

Category: feedback  
Name: `skeleton`  
Also known as: Skeleton, Placeholder, Loading placeholder, Shimmer  
Page: https://vlak.dev/components/skeleton/

## When to use

- Holding the shape of content that is about to arrive.
- One line per line of text, at the text's height.

## When not to

- Waits longer than a few seconds; show a message.
- Small controls; use Spinner.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Skeleton } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add skeleton
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/skeleton.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<span class="rs-skeleton" style="width:180px;height:14px"></span>
```

## Example

```tsx
import { Skeleton } from "@noorddev/vlak-react";

<Skeleton width="60%" />
<Skeleton width={240} height={14} />
```

## Props

### Skeleton

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `string \| number` |  |  |
| `height` | `string \| number` | `14` |  |

## Accessibility

- aria-hidden; it says nothing. Set aria-busy on the region and announce the load elsewhere.
- The pulse stops under prefers-reduced-motion.

## Classes

`rs-skeleton`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/skeleton.tsx`  
CSS: `packages/core/css/components/skeleton.css`
