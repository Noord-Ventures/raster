# Contributing to Raster

Raster is a monochrome design system: tokens, CSS, React components, a registry, and a CLI. Contributions that keep it small, legible, and accessible are welcome.

## Setup

Node 22.6 or newer and pnpm 10.

```sh
pnpm install
pnpm build        # core (components → raster.css → registry → dist), react, cli
pnpm test         # core integrity tests, react jsdom + axe tests, cli tests
pnpm typecheck
pnpm dev          # docs site at localhost:3000
```

## How the pieces fit

- `packages/react/src/components/*.tsx` are the single source of paint. Each component is StyleX leaves plus `rs-*` class names applied through `rs()`.
- `packages/core/scripts/build-components.mjs` executes those leaves and writes `packages/core/css/components/<name>.css`. Never edit the generated files; edit the leaf and rebuild.
- `packages/core/scripts/build.mjs` assembles `raster.css` from tokens, base, type, the generated component files, touch, and motion, each in its own cascade layer.
- `packages/core/src/registry.ts` is the catalogue: name, classes, CSS file, React entry, snippet, dependencies. Docs, CLI, tests, and the shadcn registry all read from it.
- `packages/react/scripts/build.mjs` compiles the React package with the StyleX Babel plugin and emits one stylesheet.

## Adding or changing a component

1. Edit or add the leaf in `packages/react/src/components/`. Every StyleX key must be applied through `rs([...classes], styles.key)` so the CSS builder can pair it with a class. The builder fails the build with a message when it cannot.
2. Add the entry to `packages/core/src/registry.ts` (classes, `css: ["components/<name>.css"]`, `react`, `snippet`, `registryDependencies`).
3. Export it from `packages/react/src/index.ts`.
4. Rebuild and test:
   ```sh
   pnpm --filter @noorddev/raster build:css
   pnpm --filter @noorddev/raster build:registry
   pnpm test
   ```
5. Add a test in `packages/react/test/`. Every interactive component needs an axe pass and a keyboard test.
6. Document it: a `use.tsx` example under `apps/www/components/examples/<name>/` and the copy in the registry entry.

## Rules of the house

- Monochrome. Paper, ink, gray. No hue anywhere in the system; a test enforces it.
- Hairlines, square corners by default, the 204px module.
- Sentence case. No all caps.
- Behaviour from the platform first: `<details>`, `<dialog>`, the Popover API, scroll snap, native inputs. JavaScript only where the platform has nothing.
- No `!important` in shipped CSS. Override through `@layer` instead.
- Accessibility is not optional: name, role, keyboard, focus ring, 3:1 control contrast, `prefers-reduced-motion`, `forced-colors`.
- Zero runtime dependencies beyond React and `@stylexjs/stylex`.

## Pull requests

- One change per pull request. Keep the diff readable.
- Run `pnpm build && pnpm test && pnpm typecheck` before opening.
- Commit generated CSS and registry JSON together with the source change that produced them.
- Describe what changed and why in plain sentences. Screenshots for anything visual, light and dark.

## Reporting bugs

Use the issue templates. A minimal reproduction (a StackBlitz, a CodeSandbox, or a short snippet) is the fastest path to a fix.

## Licence

By contributing you agree that your contributions are licensed under the MIT licence in `LICENSE`. Inter stays under the SIL Open Font License 1.1.
