# @noorddev/vlak-react

Vlak's React components. Precompiled StyleX on Vlak tokens: import the package and one stylesheet, no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Button, Dialog, Field, Input } from "@noorddev/vlak-react";
```

The stylesheet is 42 KB (12 KB gzipped) and carries the tokens, the page base, the type scale, and every component. Inter (SIL OFL 1.1) loads from the package; no Google Fonts request.

## Dark scheme

Set `data-theme="dark"` on the root element. Without it the system preference applies.

## Per-component imports

Every component is its own module, so bundlers drop what you do not use even without tree shaking:

```tsx
import { Button } from "@noorddev/vlak-react/components/button";
```

Stateful components are marked `"use client"` and work in React Server Components trees.

## StyleX

The leaves are StyleX. If you already compile StyleX (Linear, Meta, and a growing set of apps do), write your own leaves against Vlak tokens:

```tsx
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "@noorddev/vlak-react/stylex";

const styles = stylex.create({
  panel: { borderTop: `1px solid ${vlak.divider}`, padding: vlak.gap, [mq.phone]: { padding: 12 } },
});
```

Or vendor the source instead of the build: `npx @noorddev/vlak-cli add button` copies the StyleX leaf into your project for your compiler to own.

## Overriding

Everything ships inside cascade layers (`vlak.tokens`, `vlak.base`, `vlak.type`, `vlak.components`, `vlak.touch`, `vlak.motion`). Unlayered author CSS wins without `!important`:

```css
.rs-btn-primary { border-radius: 8px; }
```

## Accessibility

Native elements first: `<dialog>`, `<details>`, the Popover API, real inputs. Where the platform has nothing, the component follows the WAI-ARIA Authoring Practices pattern (listbox, menu, grid, tabs) with full keyboard support. Every interactive component has an axe test.

## Requirements

React 18 or 19. Node 18.18 or newer for the build.

Docs: [vlak.dev](https://vlak.dev). Licence: MIT.
