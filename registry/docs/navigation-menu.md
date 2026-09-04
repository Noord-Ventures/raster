# Navigation menu

Horizontal links. The current page is full ink.

Category: navigation  
Name: `navigation-menu`  
Also known as: Navigation menu, Nav, Top navigation, Navbar, Header links  
Page: https://getraster.com/components/navigation-menu/

## When to use

- The main links of a site in one row.
- current on the item for the page you are on.

## When not to

- Nested menus; keep the row flat and use a Sidebar for depth.
- Actions; use Button.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { NavigationMenu } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add navigation-menu
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/navigation-menu.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<nav class="rs-nav"><a href="#" aria-current="page">Overview</a><a href="#">Docs</a><a href="#">Changelog</a></nav>
```

## Example

```tsx
import { NavigationMenu } from "@noorddev/raster-react";

<NavigationMenu
  aria-label="Primary"
  items={[
    { label: "Overview", href: "/", current: true },
    { label: "Docs", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
  ]}
/>
```

## Props

### NavigationMenu

Links in a row; the current page is ink.

Extends `HTMLAttributes<HTMLElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `{ label: ReactNode; href: string; current?: boolean; }[]` |  |  |
| `aria-label` | `string` | `"Primary"` | Landmark name; pages carry several navs. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves between the links |
| Enter | Follows the link |

## Accessibility

- Renders <nav> with aria-label ("Primary" by default) and plain <a> links; the current page carries aria-current="page".

## Classes

`rs-nav`, `rs-nav-link`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/navigation-menu.tsx`  
CSS: `packages/core/css/components/navigation-menu.css`
