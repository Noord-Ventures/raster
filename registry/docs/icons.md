# Icons

16 viewBox marks, 1px currentColor, butt/miter. Shipped in the React package.

Category: icons  
Name: `icons`  
Also known as: Icon, Icons, Icon set, Glyphs  
Page: https://getraster.com/components/icons/

## When to use

- Chrome marks at 12, 16, or 24: chevrons, close, search, sort, and the rest of the family.
- rotate for the down and up chevrons; variant="filled" for the solid kin.

## When not to

- Illustration or brand marks; these are 1px hairline glyphs.
- Icons as the only label; add text or an aria-label on the control.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Icon, IconCatalog, iconLabel, Icons, resolveIcon } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add icons
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/icons.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<div class="rs-icons"><svg class="rs-icon" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"><path d="M6.5 2.5 H13.5 V9.5" vector-effect="non-scaling-stroke"/><rect x="2.5" y="6.5" width="7" height="7" vector-effect="non-scaling-stroke"/></svg><svg class="rs-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"><path d="M6.5 2.5 H13.5 V9.5" vector-effect="non-scaling-stroke"/><rect x="2.5" y="6.5" width="7" height="7" vector-effect="non-scaling-stroke"/></svg></div>
```

## Example

```tsx
import { Icon, IconCatalog, iconNames } from "@noorddev/raster-react";

<Icon name="search" size={12} />
<Icon name="search" size={16} />
<Icon name="check" size={24} variant="filled" />
<Icon name="chevron-right" rotate={90} />
<button type="button" aria-label="Close"><Icon name="close" /></button>

iconNames; // every drawn mark
<IconCatalog />
```

## Props

### Icon

One mark. Size is the drawn square; the viewBox is always 16.

Extends `Omit<SVGAttributes<SVGSVGElement>, "children" | "rotate">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `SVGSVGElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` (required) | `IconName` |  |  |
| `size` | `IconSize` | `16` |  |
| `variant` | `IconVariant` | `"line"` | Line hairline, or filled kinship of the same figure. |
| `rotate` | `IconRotate` |  | Same mark, spun around 8,8. Accordion down is chevron-right at 90. |

### IconCatalog

Full family at 12, 16, and 24, line | filled, grouped. Optical center 8,8.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` |  |  |

### Icons

Inline mark row. One family, current color.

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### Functions

- `iconLabel` (function)
- `resolveIcon` (function)

## Accessibility

- Icon renders an inline <svg aria-hidden="true">; it is decorative unless you pass aria-hidden={false}, role="img", and aria-label.
- Icon-only controls need an aria-label; the icon never names them.

## Classes

`rs-icons`, `rs-icon`, `rs-icon-catalog`, `rs-icon-group`, `rs-icon-group-title`, `rs-icon-grid`, `rs-icon-cell`, `rs-icon-pair`, `rs-icon-kin`, `rs-icon-label`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/icon.tsx`  
CSS: `packages/core/css/components/icons.css`
