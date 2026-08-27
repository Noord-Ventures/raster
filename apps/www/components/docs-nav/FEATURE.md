# Docs rail

What it is, how to get there, what done looks like.

Writers: catalog groups are `packages/core/src/schema.ts` (`rasterCategories`). Face, law, and command are `apps/www/app/specimen.ts`. Numbered laws are `apps/www/app/specimen-laws.ts`. Homepage `/` uses the same scroll-in crumb bar as docs and components. The crumb bar stays off on `/about` so that field stays flush.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Specimen | `/` | Logo, or the site root | Scrollable 204 field. Paper flush to the viewport on all four sides — no hairline frame, no inset module box. Hero word is Raster, set in Inter. Law is “A design system on a modular grid.” The primary CTA is the install line `npx @noorddev/raster-cli init` (full-bleed row, two modules, poster size, copy control). “A poster you can install.” is demoted. Numbered laws. Full kit cells (accordion, calendar, field, stepper). Internal hairlines stay. |
| Components index | `/components` | Corner → Components | First column is catalog groups from `rasterCategories`. Hover Navigation or Feedback; second column is that group's items. Secondaries are paper: no left border, no inset 184-line. They occupy 204 (gutter after groups + the next 184) so the rail is 388 and ends on the 408 module line. Catalog type and tiles start on the following column, flush, not in the gutter. Below 1440 the rail occupies columns 1–2 (the 1024 inset drops). From 1440 the chrome keeps the one-module inset. Catalog tiles are opaque paper (`isolation` + paper fill on the face and the description); the page grid stops at the card edge. |
| Component | `/components/:name` | Hover the group → click the item | That page's group stays selected. Column two is not empty. |
| Getting started | `/docs` | Corner → Docs | Short rail: Getting started, Tokens. Command is the one in `app/specimen.ts` (`npx @noorddev/raster-cli init`). Command and code blocks carry a quiet copy control. Under 900 the rail hides; a stacked 44pt contents picker takes its place. |
| Tokens | `/docs/tokens` | Docs → Tokens | Same short rail. Same phone picker. |
| Phone | ≤430 | Burger, theme, contents | 44pt hits on chrome, TOC, catalog tiles, copy. Kit controls recut at ≤640 (44pt, 16px, full-width). Safe-area insets. One column. Desktop rail and 20px mark stay. |
| About | `/about` | Corner → About | Flush field. A modernist homage — Swiss Style and Dutch modernism. Josef Müller-Brockmann and Wim Crouwel as type-in-cells; Max Bill, Karl Gerstner, Emil Ruder, Armin Hofmann, Piet Zwart, Paul Schuitema, Otto Treumann, Total Design, Swiss Style. Illustrated programme: 204, hairlines, flush / 0, grotesque. Credits (Inter, Noord, Renato, packages) are a 12px colophon, not a masthead. Isolated files under `app/about`. |

The components rail is groups → items. It is not Getting started / Foundations / Components.
