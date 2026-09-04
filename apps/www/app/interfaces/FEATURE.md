# Interfaces

What it is, how to get there, what done looks like.

Writers: the twelve studies live in `app/interfaces/catalog.ts`. Each proto is its own folder and route. The section is a first-class nav sibling of Components, Docs, and About — not a page inside a component.

Each interface is a fictional little app: an English catalog name, a mark, and a `what` string for the product chrome. Inside each demo, Brand/title/masthead and the Interfaces side rail use `what` (AI chat, Dashboard, Social feed, Fleet management, Order out, Team chat) — not the codename. Routes and the Interfaces index still use Line / Press / Wall / Night / Evening / Room.

Landing cards are poster crops — a clipped fragment of that UI, not a tiny full-page shrink, not a title-only frame. Type in a crop wraps on a word. A composer or photograph may run off the card; a letter may not. Captions follow the English names.

The site gutter overlay (184 + 20 verticals) shows on `/interfaces` the same as Components — painted on `html::before`, not a second body field. The utmost left gutter paints; do not clip it. Homepage is boxed cells only and does not share this overlay. Type occupies the first cell. Cards sit on the grid. Ink is `--grid-line`, quieter than the Home / About `--divider` cage. Quiet, readable on paper and dark. Do not raise opacity. Detail routes keep the field around the boxed specimen. No page-level horizontal cage.

Detail keeps Vlak site chrome (logo, corner nav, crumb bar, Interfaces rail). The custom UI sits in a boxed specimen. Below the box: a longer description, plus meta (what, type, module, ink, use, field). No horizontal divider between the UI and the copy. No rule under the description. The specimen is not almost-fullscreen.

The boxed UI is a coherent modern product with a Vlak core, not a floaty flat demo. Module, hairlines, grotesque, sentence case. Never all caps. No tape. Chrome stays mostly monochrome. A board may take one spot or a quiet hue for hierarchy. Faces, circular controls, and physical phone frames may be round. Structural cards, panels, rails, rows, and full-bleed dividers stay square and meet their edges. Vlak `Card` supplies the unframed typographic stack inside those regions. Nav, lists, composers, jobs, cart, and fleet units use Vlak `Icon` marks from the family (16 viewBox, 1px currentColor). No second icon set.

Each app has two to three levels of use: list → detail → one level deeper. Inspector panes (`.if-inspect`) open with width and opacity. A state the user caused may snap, ease, or confirm. Quiet, precise, a little pleasure on the change. Entry is not a show. No fade-up on load, no staggered reveal. Color, opacity, and width name the change. Nothing bounces. Reduced motion stills the loops.

| Surface | Route | Click path | Done |
| --- | --- | --- | --- |
| Interfaces index | `/interfaces` | Corner → Interfaces | Lists the twelve. Title occupies a 204 cell. At scroll 0 the H1 top shares the rail first-row line. Each card is a poster crop on the 204, then the English name. Index tiles are chrome-square (radius 0), same lock as Components `.rs-card`. Vertical gap is two gutters so the stack is looser than a flush cage. The field under the title and around the crops reads as the module. |
| Line | `/interfaces/line` | Interfaces → Line | AI chat. List → chat → a line. Centered measure. Composer in the pane, aligned. Site 204s run around the box. On the phone: five-chat inbox plus composer (V1 still), not a squeezed three-pane. |
| Press | `/interfaces/press` | Interfaces → Press | Dashboard. Floor → job → sheet. Hue in the rail. One Crouwel spot. On the phone: 38 / 12 / 4 metrics and four jobs, not a 204 rail stacked on the floor. |
| Wall | `/interfaces/wall` | Interfaces → Wall | Social feed. Feed → post → profile. Masonry on desktop, a text stream on the phone. All people and portraits are fictional mock users created for the interface studies. |
| Night | `/interfaces/night` | Interfaces → Night | Fleet management. List → unit → trip. A neighborhood at city scale: many blocks, a readable street grid, many buildings. Vehicles as small units. Lamps and the selected van still findable. Default camera is overhead enough that the city fills the map well on first paint — not a corner cluster, not a paper wedge in the top-left. Not a facade wall crop. Not three towers. A route, one selected unit. Brand is catalog `what` (Fleet management). On the phone: van list first. Map stays desktop. |
| Evening | `/interfaces/evening` | Interfaces → Evening | Order out. Stores → store → bag. Two-column store cards on desktop. Text kitchen rows and Bag on the phone. Bag is a sheet. |
| Room | `/interfaces/room` | Interfaces → Room | Team chat. Channel → message → thread. People in the rail. Not Wall. On the phone: channels and people list plus composer, not a 204 rail stacked on the thread. |
| Graphic generator | `/interfaces/graphics` | Interfaces → Graphic generator | Prompt → generate → select → export. Uses the real image endpoint when `OPENAI_API_KEY` is configured. |
| 3D workspace | `/interfaces/render` | Interfaces → 3D workspace | Live WebGL car model, modeling tools, selected panel, render timeline. Drag rotates the model. |
| EV controls | `/interfaces/drive` | Interfaces → EV controls | Driving status, navigation, media, cabin and connectivity in a restrained automotive field. |
| Satellite operations | `/interfaces/orbit` | Interfaces → Satellite operations | Animated pass, targets, sweep, spectral layers and telemetry over an illustrative European observation image. |
| Frontier model company | `/interfaces/frontier` | Interfaces → Frontier model company | Proposition → evidence → model access. Uses Vlak Card stacks for capability regions. |
| Mobile platforms | `/interfaces/platforms` | Interfaces → Mobile platforms | The same itinerary in iPhone and Android frames with platform-specific navigation and chrome. |
| Phone | ≤430 | Contents picker | Rail hides under 900. A stacked 44pt picker lists all studies. Scene controls use the 44pt phone scale. Each boxed demo is a mobile composition, not the desktop scene scaled down. |

Routes are derived from `catalog.ts`; CI fails if a catalog route disappears.
