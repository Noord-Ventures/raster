# References

Inline citations, a numbered 1px list, and a cite box. Numerals hang in the gutter.

Category: content  
Name: `references`  
Also known as: References, Citations, Footnotes, Bibliography  
Page: https://getraster.com/components/references/

## When to use

- Articles and papers with numbered citations and a reference list.
- CiteBox for the how-to-cite block at the end.

## When not to

- Footnotes with long asides; keep notes short.
- Link lists; use plain Links.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/raster-react
```

```tsx
import "@noorddev/raster-react/css";
import { Cite, CiteBox, CiteBoxLabel, CiteBoxText, CiteLink, RefAuthors, RefDoi, RefItem, Refs } from "@noorddev/raster-react";
```

**Vendor the source.** The StyleX leaf lands in `components/raster/` for your compiler to own.

```sh
npx @noorddev/raster-cli add references
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://getraster.com/r/references.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/raster/css`.

```html
<p>Set in a single ink.<sup class="rs-cite"><a href="#ref-1">1</a></sup></p><ol class="rs-refs"><li id="ref-1"><span class="rs-ref-authors">Müller-Brockmann, J.</span> Grid systems in graphic design. <a class="rs-ref-doi" href="#">niggli.ch/grid</a></li></ol>
```

## Example

```tsx
import { Cite, CiteBox, CiteBoxLabel, CiteBoxText, CiteLink, RefAuthors, RefDoi, RefItem, Refs } from "@noorddev/raster-react";

<p>Set in a single ink.<Cite><CiteLink href="#ref-1">1</CiteLink></Cite></p>

<Refs>
  <RefItem id="ref-1">
    <RefAuthors>Müller-Brockmann, J.</RefAuthors> Grid systems in graphic design. <RefDoi href="https://niggli.ch/grid">niggli.ch/grid</RefDoi>
  </RefItem>
</Refs>

<CiteBox>
  <CiteBoxLabel>Cite this</CiteBoxLabel>
  <CiteBoxText>Valdés-Olmos, R. (2026). Raster. Noord.</CiteBoxText>
</CiteBox>
```

## Props

### Cite

Inline superscript citation.

Extends `HTMLAttributes<HTMLElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLElement`.

No props of its own.

### CiteBox

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### CiteBoxLabel

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### CiteBoxText

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

No props of its own.

### CiteLink

Extends `AnchorHTMLAttributes<HTMLAnchorElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLAnchorElement`.

No props of its own.

### RefAuthors

Extends `HTMLAttributes<HTMLSpanElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLSpanElement`.

No props of its own.

### RefDoi

Extends `AnchorHTMLAttributes<HTMLAnchorElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLAnchorElement`.

No props of its own.

### RefItem

Extends `LiHTMLAttributes<HTMLLIElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLLIElement`.

No props of its own.

### Refs

Numbered 1px list. Numerals hang in the gutter.

Extends `OlHTMLAttributes<HTMLOListElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLOListElement`.

No props of its own.

## Keyboard

| Keys | Does |
| --- | --- |
| Tab | Moves between citation links |
| Enter | Jumps to the reference |

## Accessibility

- Cite is a <sup> holding a native <a>; give each RefItem the id the link targets. Refs is an <ol>, so the numbering is real.

## Classes

`rs-cite`, `rs-refs`, `rs-ref-authors`, `rs-ref-doi`, `rs-cite-box`, `rs-cite-box-label`, `rs-cite-box-text`, `rs-cite-cite-a`, `rs-cite-item`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/refs.tsx`  
CSS: `packages/core/css/components/references.css`
