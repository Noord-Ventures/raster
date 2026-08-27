# Interfaces

What it is, how to get there, what done looks like.

Writers: the six live in `app/interfaces/catalog.ts`. Each proto is its own folder and its own route. The section is a first-class nav sibling of Components, Docs, and About — not a page inside a component.

Catalog stays Raster control. Detail is control, then a product scene. Each scene has its own surface, type, and controls. Scenes may use color, radius, and shadow. Site chrome may not.

Motion: a state the user caused may snap, ease, or confirm. Quiet, precise, a little pleasure on the change. Entry is not a show. No fade-up on load, no staggered reveal. Color and opacity name the change. Nothing bounces. Reduced motion stills the loops.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Interfaces index | `/interfaces` | Corner → Interfaces | Lists the six. First column is the six. Each tile is a proto. |
| AI tool | `/interfaces/ai-tool` | Interfaces → AI tool | Chat product. Thread, user vs assistant, composer at the bottom, canned reply. |
| SaaS dashboard | `/interfaces/dashboard` | Interfaces → SaaS dashboard | Cool ops console. Range changes the numbers. A selected job opens a pane. |
| Threads | `/interfaces/threads` | Interfaces → Threads | Editorial feed. Image posts, open thread, like, a reply. |
| Fleet | `/interfaces/fleet` | Interfaces → Fleet | Night map with a floating panel. Select a unit. Acknowledge an alert. |
| Food delivery | `/interfaces/delivery` | Interfaces → Food delivery | Photograph browsing, ratings, a working bag. |
| Slack | `/interfaces/slack` | Interfaces → Slack | Aubergine sidebar, message pane, composer, agents mixed with people. |
| Phone | ≤430 | Contents picker | Rail hides under 900. A stacked 44pt picker lists the six. Scene controls use the 44pt phone scale. |

The six folders are `ai-tool`, `dashboard`, `threads`, `fleet`, `delivery`, `slack`. CI fails if any route disappears.
