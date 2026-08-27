# Docs rail

What it is, how to get there, what done looks like.

Writers: catalog groups are `packages/core/src/schema.ts` (`rasterCategories`). Face, law, and command are `apps/www/app/specimen.ts`. Numbered laws are `apps/www/app/specimen-laws.ts`. The crumb bar is off on `/` and `/about` (`isFieldPath`) so the field stays flush.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Specimen | `/` | Logo, or the site root | Scrollable 204 field. Top and left flush — no outer frame. Hero word is Raster, set in Inter. Law is “A design system on a modular grid.” “A poster you can install.” is demoted. Numbered laws. Full kit cells (accordion, calendar, field, stepper). One command. Internal hairlines stay. |
| Components index | `/components` | Corner → Components | First column is catalog groups from `rasterCategories`. Hover Navigation or Feedback; second column is that group's items. Secondaries are paper: no left border, no inset 184-line. The 408 module line is the only join. Below 1440 the rail occupies columns 1–2 (the 1024 inset drops). From 1440 the chrome keeps the one-module inset. Catalog tiles are opaque paper (`isolation` + paper fill on the face and the description); the page grid stops at the card edge. |
| Component | `/components/:name` | Hover the group → click the item | That page's group stays selected. Column two is not empty. |
| Getting started | `/docs` | Corner → Docs | Short rail: Getting started, Tokens. Command is the one in `app/specimen.ts`. Command and code blocks carry a quiet copy control. Under 900 the rail hides; a stacked 44pt contents picker takes its place. |
| Tokens | `/docs/tokens` | Docs → Tokens | Same short rail. Same phone picker. |
| Phone | ≤430 | Burger, theme, contents | 44pt hits on chrome, TOC, catalog tiles, copy. Safe-area insets. One column. Desktop rail and 20px mark stay. |
| About | `/about` | Corner → About | Flush field. Noord first (AI lab, Alkmaar and Silicon Valley). Type occupies cells. Then Inter, packages, door, host, Renato Valdés Olmos, MIT. Isolated files under `app/about`. |

The components rail is groups → items. It is not Getting started / Foundations / Components.
