# Interfaces

What it is, how to get there, what done looks like.

Writers: the six live in `app/interfaces/catalog.ts`. Each proto is its own folder and its own route. The section is a first-class nav sibling of Components, Docs, and About — not a page inside a component.

Catalog stays Raster control. Detail is a Raster product demo that happens to do that job — not a skin of Claude, Slack, or a food app. Scene chrome is Raster chrome: sentence case, Inter / system grotesque, hairlines, 204 module (184 + 20), flush cells, no radius, no shadow, no tape, monochrome. Dividers use the gridline. Photographs occupy a cell like an image.

Motion: a state the user caused may snap, ease, or confirm. Quiet, precise, a little pleasure on the change. Entry is not a show. No fade-up on load, no staggered reveal. Color and opacity name the change. Nothing bounces. Reduced motion stills the loops.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Interfaces index | `/interfaces` | Corner → Interfaces | Lists the six. First column is the six. Each tile is a proto. |
| AI tool | `/interfaces/ai-tool` | Interfaces → AI tool | Writing tool. Thread, user vs assistant as type, composer at the bottom, canned reply. |
| SaaS dashboard | `/interfaces/dashboard` | Interfaces → SaaS dashboard | Ops field. Range changes the numbers. A selected job opens a note. |
| Threads | `/interfaces/threads` | Interfaces → Threads | Feed of notes. Photographs occupy a cell. Like, a live reply. |
| Fleet | `/interfaces/fleet` | Interfaces → Fleet | Night map in a cell. Select a unit. Acknowledge an alert. |
| Food delivery | `/interfaces/delivery` | Interfaces → Food delivery | Photographs in cells. Ratings, a working bag. |
| Slack | `/interfaces/slack` | Interfaces → Slack | Channel list, message pane, composer. Agents sit with people. |
| Phone | ≤430 | Contents picker | Rail hides under 900. A stacked 44pt picker lists the six. Scene controls use the 44pt phone scale. |

The six folders are `ai-tool`, `dashboard`, `threads`, `fleet`, `delivery`, `slack`. CI fails if any route disappears.
