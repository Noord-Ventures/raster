# Stepper

Shows progress through ordered steps. 1px connectors; done fills with ink, active is outlined.

Category: navigation  
Name: `stepper`  
Also known as: Stepper, Steps, Progress steps, Wizard  
Page: https://vlak.dev/components/stepper/

## When to use

- A fixed sequence of three to six steps where the user should see what is done and what is next.
- sub for a short status under a step.

## When not to

- Steps the user can jump between; use Tabs.
- Progress of one task; use Progress.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Stepper } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add stepper
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/stepper.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-steps"><div class="rs-step"><span class="rs-step-dot rs-step-done">1</span><span class="rs-step-line"></span><span class="rs-step-name">Brief</span></div><div class="rs-step"><span class="rs-step-dot rs-step-active">2</span><span class="rs-step-name">Design</span></div></div>
```

## Example

```tsx
import { Stepper } from "@noorddev/vlak-react";

<Stepper steps={[{ name: "Brief" }, { name: "Design", sub: "In review" }, { name: "Build" }]} current={1} />
```

## Props

### Stepper

Extends `HTMLAttributes<HTMLDivElement>`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` (required) | `Step[]` |  |  |
| `current` (required) | `number` |  | 0-based index of the active step; everything before it is done. |

## Accessibility

- The active step carries aria-current="step"; connector lines are aria-hidden.
- The dots are numbered text, so the order reads without color.

## Classes

`rs-steps`, `rs-step`, `rs-step-dot`, `rs-step-done`, `rs-step-active`, `rs-step-name`, `rs-step-sub`, `rs-step-line`

## Dependencies

Registry dependencies: none.  
React: `packages/react/src/components/stepper.tsx`  
CSS: `packages/core/css/components/stepper.css`
