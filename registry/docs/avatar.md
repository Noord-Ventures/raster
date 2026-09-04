# Avatar

32px circle of initials, or a covering image. Broken images fall back. Rows overlap 8px.

Category: content  
Name: `avatar`  
Also known as: Avatar, Profile picture, User image, Avatar group  
Page: https://getraster.com/components/avatar/

## When to use

- A person or organisation next to their name, or a row of collaborators.
- initials as the fallback while the image loads or fails.

## When not to

- Logos and product images; use AspectRatio.
- Decorative circles without a subject.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Avatar, AvatarRow } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add avatar
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/avatar.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-avatar-row"><span class="rs-avatar">RV</span><span class="rs-avatar">NO</span><span class="rs-avatar">+3</span></div>
```

## Example

```tsx
import { Avatar, AvatarRow } from "@noorddev/raster-react";

<Avatar src="/renn.jpg" name="Renn" initials="RV" size="lg" />
<AvatarRow>
  <Avatar name="Renn" initials="RV" />
  <Avatar name="Noord" initials="NO" />
  <Avatar initials="+3" alt="" />
</AvatarRow>
```

## Props

### Avatar

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` |  |  |
| `alt` | `string` |  | Image text. Defaults to `name`, then `initials`; pass "" for a decorative avatar. |
| `name` | `string` |  | Who this is. Names the image, and the initials when there is no image. |
| `initials` | `string` |  | Shown when there is no image, or when it fails to load. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |  |

### AvatarRow

Overlapping row with paper seams.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

## Accessibility

- The image alt defaults to name, then initials; pass alt="" for a decorative avatar.
- Initials with a name render role="img" with aria-label; without a name they are plain text.
- A broken image falls back to the initials.

## Classes

`rs-avatar`, `rs-avatar-sm`, `rs-avatar-lg`, `rs-avatar-row`, `rs-avatar-image`, `rs-avatar-in-row`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/avatar.tsx`  
CSS: `packages/core/css/components/avatar.css`
