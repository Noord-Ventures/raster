# Empty

Explains an empty state with a title, one sentence, and an optional action.

Category: feedback  
Name: `empty`  
Also known as: Empty, Empty state, Zero state, No results  
Page: https://vlak.dev/components/empty/

## When to use

- A list, table, or search with nothing to show.
- One sentence and one action at most.

## When not to

- Errors; use Alert.
- Loading; use Skeleton.

## Install

**React package.** Precompiled; no compiler to configure.

```sh
npm install @noorddev/vlak-react
```

```tsx
import "@noorddev/vlak-react/css";
import { Empty } from "@noorddev/vlak-react";
```

**Vendor the source.** The StyleX leaf lands in `components/vlak/` for your compiler to own.

```sh
npx @noorddev/vlak-cli add empty
```

**shadcn registry.** Same files, through the shadcn CLI.

```sh
npx shadcn add https://vlak.dev/r/empty.json
```

**CSS only.** `rs-*` classes on plain markup, styled by `@noorddev/vlak/css`.

```html
<div class="rs-empty"><p class="rs-empty-title">No projects yet</p><p class="rs-empty-body">Start one. The grid is empty on purpose.</p><div class="rs-empty-action"><button class="rs-btn-ghost rs-btn-sm">New project</button></div></div>
```

## Example

```tsx
import { Button, Empty } from "@noorddev/vlak-react";

<Empty title="No projects yet" action={<Button variant="ghost" size="sm">New project</Button>}>
  Start one. The grid is empty on purpose.
</Empty>
```

## Props

### Empty

A vacant cell. Title, one sentence, optional action.

Extends `Omit<HTMLAttributes<HTMLDivElement>, "title">`: every native attribute, `className`, `style`, and event handler passes through.

Forwards `ref` to the `HTMLDivElement`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  |  |
| `action` | `ReactNode` |  |  |

## Accessibility

- Plain text in a cell; the action is whatever you pass, so give it a real control.

## Classes

`rs-empty`, `rs-empty-title`, `rs-empty-body`, `rs-empty-action`

## Dependencies

Registry dependencies: [button](button.md).  
React: `packages/react/src/components/empty.tsx`  
CSS: `packages/core/css/components/empty.css`
