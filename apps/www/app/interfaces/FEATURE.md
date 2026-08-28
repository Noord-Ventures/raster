# Interfaces

What it is, how to get there, what done looks like.

Writers: the six live in `app/interfaces/catalog.ts`. Each proto is its own folder and its own route. The section is a first-class nav sibling of Components, Docs, and About — not a page inside a component.

Each interface is a fictional little app: an English name, a mark, one or two words of voice. Not a screenshot of a real product. Not a generic component dump. Not a Linear, Notion, Figma, or Waymo clone.

Landing cards are poster crops — a clipped fragment of that UI, not a tiny full-page shrink, not a title-only frame. Type in a crop wraps on a word. A composer or photograph may run off the card; a letter may not. Captions follow the English names.

The site 204 (184 + 20) shows on `/interfaces` the same as home. Type occupies the first cell. Cards sit on the grid. No dropped horizontals or vanished verticals. Ink is `--grid-line`, quieter than `--divider`. Do not raise opacity. Detail routes keep the field around the boxed specimen.

Detail keeps Raster site chrome (logo, corner nav, crumb bar, Interfaces rail). The custom UI sits in a boxed specimen. Below the box: a longer description, plus meta (what, type, module, ink, use, field). No horizontal divider between the UI and the copy. No rule under the description. The specimen is not almost-fullscreen.

The boxed UI is a coherent modern product with a Raster core, not a floaty flat demo. Module, hairlines, grotesque, sentence case. Never all caps. No tape. Chrome stays mostly monochrome. A board may take one spot or a quiet hue for hierarchy. Minimal shadow is allowed. Faces may be round. App dividers run edge to edge in the pane. The boxed UI may follow `--radius-sm`. Nav, lists, composers, jobs, cart, and fleet units use Raster `Icon` marks from the family (16 viewBox, 1px currentColor). No second icon set.

Each app has two to three levels of use: list → detail → one level deeper. Inspector panes (`.if-inspect`) open with width and opacity. A state the user caused may snap, ease, or confirm. Quiet, precise, a little pleasure on the change. Entry is not a show. No fade-up on load, no staggered reveal. Color, opacity, and width name the change. Nothing bounces. Reduced motion stills the loops.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Interfaces index | `/interfaces` | Corner → Interfaces | Lists the six. Title occupies a 204 cell. Each card is a poster crop on the 204, then the English name. The field under the title and around the crops reads as the module. |
| Line | `/interfaces/line` | Interfaces → Line | AI chat. List → chat → a line. Centered measure. Composer in the pane, aligned. Site 204s run around the box. |
| Press | `/interfaces/press` | Interfaces → Press | Dashboard. Floor → job → sheet. Hue in the rail. One Crouwel spot. |
| Wall | `/interfaces/wall` | Interfaces → Wall | Social feed. Feed → post → profile. Masonry on desktop, a stream on the phone. Comments sit in the inspect. First names from /work. |
| Night | `/interfaces/night` | Interfaces → Night | Fleet management. List → unit → trip. A street you look down. Buildings, a route, one selected unit. |
| Evening | `/interfaces/evening` | Interfaces → Evening | Order out. Stores → store → bag. Top bar, filters, a grid. Bag is a sheet. |
| Room | `/interfaces/room` | Interfaces → Room | Team chat. Channel → message → thread. People in the rail. Not Wall. |
| Phone | ≤430 | Contents picker | Rail hides under 900. A stacked 44pt picker lists the six. Scene controls use the 44pt phone scale. |

The six folders are `line`, `press`, `wall`, `night`, `evening`, `room`. CI fails if any route disappears.
