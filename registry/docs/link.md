# Text link

Text link with a hairline underline. In-copy variant is inset 1px.

Category: actions  
Name: `link`  
Also known as: Link, Anchor, Text link, Inline link  
Page: https://getraster.com/components/link/

## When to use

- Navigation to another page or anchor.
- underline for links inside running copy.

## When not to

- Actions that do not change the URL; use Button.
- Bare hrefs with "click here" text; the text should name the destination.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Link } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add link
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/link.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div><a class="rs-link" href="#">A text link</a></div>
<div><a class="rs-link-underline" href="#">An in-copy link</a></div>
```

## Example

```tsx
import { Link } from "@noorddev/raster-react";

<Link href="/docs">A text link</Link>
<p>Read the <Link underline href="/docs">guide</Link> first.</p>
```

## Props

### Link

Text link with a hairline underline. In-copy variant is inset 1px.

Extends `AnchorHTMLAttributes<HTMLAnchorElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLAnchorElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `underline` | `boolean` | `false` | In-copy gradient underline, inset 1px. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves focus to the link |
| Enter | Follows it |

## Accessibility

- Renders a native <a>; it needs an href to be focusable.
- 2px ink focus ring on :focus-visible.

## Classes

`rs-link`, `rs-link-underline`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/link.tsx`  
CSS: `packages/core/css/components/link.css`
