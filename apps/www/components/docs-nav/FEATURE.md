# Docs rail

What it is, how to get there, what done looks like.

Writers: catalog groups are `packages/core/src/schema.ts` (`rasterCategories`). Face, law, and command are `apps/www/app/specimen.ts`. The crumb bar is off on `/` (`isSpecimenPath`) so the poster stays flush.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Specimen | `/` | Logo, or the site root | Full-viewport 204 poster. Top and left flush — no outer frame. Hero word is Raster, set in Inter. Law is “A poster you can install.” One command. Internal hairlines stay. |
| Components index | `/components` | Corner → Components | First column is catalog groups from `rasterCategories`. Hover Navigation or Feedback; second column is that group's items. Secondaries are paper: no left border, no inset 184-line. The 408 module line is the only join. Below 1440 the rail occupies columns 1–2 (the 1024 inset drops). From 1440 the chrome keeps the one-module inset. Catalog tiles are opaque paper (`isolation` + paper fill on the face and the description); the page grid stops at the card edge. |
| Component | `/components/:name` | Hover the group → click the item | That page's group stays selected. Column two is not empty. |
| Getting started | `/docs` | Corner → Docs | Short rail: Getting started, Tokens. Command is the one in `app/specimen.ts`. |
| Tokens | `/docs/tokens` | Docs → Tokens | Same short rail. |
| About | `/about` | Corner → About | Masthead, then Typeface, Noord, Renato Valdés Olmos, then credits from this repo’s packages. Isolated files under `app/about`. |

The components rail is groups → items. It is not Getting started / Foundations / Components.
