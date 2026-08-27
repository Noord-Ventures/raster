# Interfaces

What it is, how to get there, what done looks like.

Writers: the six live in `app/interfaces/catalog.ts`. Each proto is its own folder and its own route. The section is a first-class nav sibling of Components, Docs, and About — not a page inside a component. Compose the Raster catalog. Do not invent a second kit.

Chrome stays monochrome. A board may set one Crouwel spot or a color-field. Inter, 204 module, hairlines, flush, no radius, no shadow, sentence case.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Interfaces index | `/interfaces` | Corner → Interfaces | Lists the six. First column is the six. Each tile is a proto. |
| AI tool | `/interfaces/ai-tool` | Interfaces → AI tool | Sidebar, main canvas, AI chat box, in-feed widgets. |
| SaaS dashboard | `/interfaces/dashboard` | Interfaces → SaaS dashboard | Sidebar, graphs, lists, multiple panes. |
| Threads | `/interfaces/threads` | Interfaces → Threads | Main feed, content types, threads, discussion. |
| Fleet | `/interfaces/fleet` | Interfaces → Fleet | Floating Raster on a three.js map. Active fleet, inactive objects, alerts. Map is a scene, not the noord.vc marketing page. |
| Food delivery | `/interfaces/delivery` | Interfaces → Food delivery | Main browsing, navbar, ratings. |
| Slack | `/interfaces/slack` | Interfaces → Slack | Chat UI, sidebar, agents mixed with real people. |
| Phone | ≤430 | Contents picker | Rail hides under 900. A stacked 44pt picker lists the six. Board sidebars and Raster controls use the 44pt phone scale. Desktop posters stay flush. |

The six folders are `ai-tool`, `dashboard`, `threads`, `fleet`, `delivery`, `slack`. CI fails if any route disappears.
