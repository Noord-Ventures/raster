# Docs feature map

How to reach each surface, and what done looks like. Catalog groups live in `packages/core/src/schema.ts` (`rasterCategories`).

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Specimen | `/` | Logo, or the site root | Full-viewport 204 poster, flush to the edges. Inter named once. One law. One command. Hairlines meet. Nothing clipped. |
| Components index | `/components` | Corner → Components | First column is catalog groups (Actions, Forms, Navigation, Feedback, Surfaces, Content, Patterns). Hover or focus a group; second column is that group's items. |
| Component | `/components/:name` | Hover the group → click the item | That page's group stays selected. Column two is not empty. |
| Getting started | `/docs` | Corner → Docs | Short rail: Getting started, Tokens. Command is `npx @noordvc/raster-cli init`. |
| Tokens | `/docs/tokens` | Docs → Tokens | Same short rail. |

The components rail is groups → items. It is not Getting started / Foundations / Components.
