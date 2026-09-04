# Aspect ratio

Keeps media at a defined aspect ratio while it fills the available box.

Category: content  
Name: `aspect-ratio`  
Also known as: Aspect ratio, Ratio box, Media frame  
Page: https://vlak.dev/components/aspect-ratio/

## When to use

- Images, video, and embeds that must hold a ratio before they load.
- ratio as width over height.

## When not to

- Text boxes; let content set the height.
- Avatars; use Avatar.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { AspectRatio } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add aspect-ratio
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/aspect-ratio.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-ratio" style="aspect-ratio:16/9;max-width:280px;background:var(--divider-subtle)"></div>
```

## Example

```tsx
import { AspectRatio } from "@noorddev/vlak-react";

<AspectRatio ratio={16 / 9}>
  <img src="/cover.jpg" alt="Press hall" />
</AspectRatio>
```

## Props

### AspectRatio

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ratio` | `number` | `16 / 9` | Width over height, e.g. 16 / 9. |

## Accessibility

- Layout only; the media inside carries its own alt or title.

## Classes

`rs-ratio`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/aspect-ratio.tsx`  
CSS: `packages/core/css/components/aspect-ratio.css`
