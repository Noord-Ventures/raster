# Docs rail

What it is, how to get there, what done looks like.

Writers: catalog groups are `packages/core/src/schema.ts` (`rasterCategories`). Face, law, and command are `apps/www/app/specimen.ts`. The crumb bar is off on `/` (`isSpecimenPath`) so the poster stays flush.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Specimen | `/` | Logo, or the site root | Full-viewport 204 poster, flush to the edges. Inter named once. One law. One command. Hairlines meet. Nothing clipped. |
| Components index | `/components` | Corner → Components | First column is catalog groups from `rasterCategories`. Hover Navigation or Feedback; second column is that group's items. No left border on the secondaries — only the 204 gridlines. |
| Component | `/components/:name` | Hover the group → click the item | That page's group stays selected. Column two is not empty. |
| Getting started | `/docs` | Corner → Docs | Short rail: Getting started, Tokens. Command is the one in `app/specimen.ts`. |
| Tokens | `/docs/tokens` | Docs → Tokens | Same short rail. |

The components rail is groups → items. It is not Getting started / Foundations / Components.
