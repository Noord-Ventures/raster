# Interfaces

What it is, how to get there, what done looks like.

Writers: the six live in `app/interfaces/catalog.ts`. Each proto is its own folder and its own route. The section is a first-class nav sibling of Components, Docs, and About — not a page inside a component.

Each interface is a fictional little app: a name, a mark, one or two words of voice. Not a screenshot of a real product. Not a generic component dump. Not a Linear, Notion, or Figma clone.

Landing cards are poster crops — a clipped fragment of that UI, not a tiny full-page shrink, not a title-only frame.

Detail keeps Raster site chrome (logo, corner nav, crumb bar, Interfaces rail). The custom UI sits in a boxed specimen. Below the box: a description, plus meta (what, type, module, ink). The specimen is not almost-fullscreen.

Chrome stays Raster: monochrome, hairlines, Inter, sentence case, 204 module (184 + 20). Specimen chrome: no radius, no shadow, no tape. Hairline = divider ink. The boxed UI may follow the Raster button radius (`--radius-sm`). A board may take one spot color or a Crouwel field. Never all caps.

Motion: a state the user caused may snap, ease, or confirm. Quiet, precise, a little pleasure on the change. Entry is not a show. No fade-up on load, no staggered reveal. Color and opacity name the change. Nothing bounces. Reduced motion stills the loops.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Interfaces index | `/interfaces` | Corner → Interfaces | Lists the six. First column is the six. Each card is a poster crop of that UI, then the invented name. |
| Lijn | `/interfaces/ai-tool` | Interfaces → Lijn | Writing desk. Boxed specimen. Drafts, thread, composer. Description + meta below. |
| Pers | `/interfaces/dashboard` | Interfaces → Pers | Ops field. Boxed specimen. Range changes the numbers. A selected job opens a note. One Crouwel spot. |
| Muur | `/interfaces/threads` | Interfaces → Muur | Studio wall. Boxed specimen. Photographs occupy a cell. Like, a live reply. |
| Nacht | `/interfaces/fleet` | Interfaces → Nacht | Night field. Boxed specimen. Select a unit. Acknowledge an alert. |
| Avond | `/interfaces/delivery` | Interfaces → Avond | Kitchen list. Boxed specimen. Photographs in cells. Ratings, a working bag. |
| Kamer | `/interfaces/slack` | Interfaces → Kamer | Studio room. Boxed specimen. Channel list, message pane, composer. Agents sit with people. |
| Phone | ≤430 | Contents picker | Rail hides under 900. A stacked 44pt picker lists the six. Scene controls use the 44pt phone scale. |

The six folders are `ai-tool`, `dashboard`, `threads`, `fleet`, `delivery`, `slack`. CI fails if any route disappears.
