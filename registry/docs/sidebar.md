# Sidebar

204-wide rail with a head, nav, and foot. 1px on all four sides.

Category: navigation  
Name: `sidebar`  
Also known as: Sidebar, Side nav, Rail, Navigation drawer  
Page: https://getraster.com/components/sidebar/

## When to use

- A 204px rail for app or docs navigation with a head, groups of links, and a foot.
- SidebarLabel to name each group of items.

## When not to

- Marketing sites; use NavigationMenu.
- Collapsing it on desktop; the rail is the layout.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Sidebar, SidebarFoot, SidebarHead, SidebarItem, SidebarLabel, SidebarNav } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add sidebar
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/sidebar.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<aside class="rs-sidebar"><div class="rs-sidebar-head">Raster</div><nav class="rs-sidebar-nav"><p class="rs-sidebar-label">Go to</p><a class="rs-sidebar-item" aria-current="page">Overview</a><a class="rs-sidebar-item" href="#">Docs</a><a class="rs-sidebar-item" href="#">Components</a></nav><div class="rs-sidebar-foot">0.3</div></aside>
```

## Example

```tsx
import { Sidebar, SidebarFoot, SidebarHead, SidebarItem, SidebarLabel, SidebarNav } from "@noorddev/raster-react";

<Sidebar>
  <SidebarHead>Raster</SidebarHead>
  <SidebarNav aria-label="Sidebar">
    <SidebarLabel>Go to</SidebarLabel>
    <SidebarItem href="/" current>Overview</SidebarItem>
    <SidebarItem href="/docs">Docs</SidebarItem>
    <SidebarItem href="/components">Components</SidebarItem>
  </SidebarNav>
  <SidebarFoot>0.3</SidebarFoot>
</Sidebar>
```

## Props

### Sidebar

One 204 module rail. Flush items, hairline edge.

Extends `HTMLAttributes<HTMLElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLElement`.

No props of its own.

### SidebarFoot

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### SidebarHead

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### SidebarItem

Extends `AnchorHTMLAttributes<HTMLAnchorElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLAnchorElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `current` | `boolean` |  |  |

### SidebarLabel

Extends `HTMLAttributes<HTMLParagraphElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLParagraphElement`.

No props of its own.

### SidebarNav

Extends `HTMLAttributes<HTMLElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | `"Sidebar"` | Landmark name; pages carry several navs. |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves between the items |
| Enter | Follows the link |

## Accessibility

- Sidebar is an <aside>; SidebarNav is a <nav> named by aria-label ("Sidebar" by default).
- SidebarItem is an <a>; current sets aria-current="page".

## Classes

`rs-sidebar`, `rs-sidebar-head`, `rs-sidebar-nav`, `rs-sidebar-item`, `rs-sidebar-label`, `rs-sidebar-foot`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/sidebar.tsx`  
CSS: `packages/core/css/components/sidebar.css`
