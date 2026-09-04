# Breadcrumbs

Shows a page's place in a hierarchy. Ancestors are links; the current page is full ink.

Category: navigation  
Name: `breadcrumbs`  
Also known as: Breadcrumb, Breadcrumbs, Trail  
Page: https://vlak.dev/components/breadcrumbs/

## When to use

- Showing where a page sits in a hierarchy three or more levels deep.
- The last item is the current page and carries no href.

## When not to

- Flat sites with one level.
- As the primary navigation; pair it with a nav.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Breadcrumbs } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add breadcrumbs
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/breadcrumbs.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<p class="rs-crumbs"><a class="rs-crumbs-link" href="/">Studio</a><span class="rs-crumbs-sep">/</span><span class="rs-crumbs-here">Vlak</span></p>
```

## Example

```tsx
import { Breadcrumbs } from "@noorddev/vlak-react";

<Breadcrumbs items={[{ label: "Studio", href: "/studio" }, { label: "Vlak", href: "/studio/vlak" }, { label: "Components" }]} />
```

## Props

### Breadcrumbs

A trail: ordered list in a nav, the current page marked.

Extends `HTMLAttributes<HTMLElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `Crumb[]` |  |  |

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves between the ancestor links |
| Enter | Follows the link |

## Accessibility

- Renders <nav aria-label="Breadcrumb"> with an ordered list.
- The last item is marked aria-current="page"; separators are aria-hidden.

## Classes

`rs-crumbs`, `rs-crumbs-list`, `rs-crumbs-item`, `rs-crumbs-link`, `rs-crumbs-sep`, `rs-crumbs-here`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/breadcrumbs.tsx`  
CSS: `packages/core/css/components/breadcrumbs.css`
