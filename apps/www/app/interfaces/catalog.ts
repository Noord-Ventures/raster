export const interfaces = [
  {
    slug: "line",
    title: "Line",
    voice: "The next line",
    law: "An AI chat. Chats in a rail, the line in the middle.",
    story:
      "Line is a small invented AI chat. Open a chat, send a line, then open that line to rewrite it. Replies are local. The chrome is Raster.",
    what: "AI chat",
    type: "Chat list, thread, line inspector",
    module: "204",
    ink: "Paper. Hairline. Quiet fill on the active chat.",
    use: "List → chat → a single line",
    field: "Centered measure. Composer in the pane.",
    note: "Send a line. Open it. Rewrite it.",
  },
  {
    slug: "press",
    title: "Press",
    voice: "On press",
    law: "A dashboard. Range, jobs, a selected sheet.",
    story:
      "Press is a dashboard for a week of sheets, proofs, and jobs. Open a job, then open its sheet. Change the range and the numbers move. One spot of red on the press count, Crouwel’s red. The rest is ink, with a little hue in the rail so the floor can be scanned.",
    what: "Dashboard",
    type: "Rail, metrics, job sheet",
    module: "204",
    ink: "Paper. Hairline. One red spot. Quiet hue in the rail.",
    use: "Floor → job → sheet",
    field: "Three metric cells, then the split.",
    note: "Week and month rewrite the same field.",
  },
  {
    slug: "wall",
    title: "Wall",
    voice: "On the wall",
    law: "A social feed. People, photographs, a post, a profile.",
    story:
      "Wall is a small invented social feed. Faces sit with the notes. The feed is the view. Open a post for comments, then open a person. Photographs occupy cells. The rail is the people.",
    what: "Social feed",
    type: "Feed, comments, profile",
    module: "204",
    ink: "Paper. Hairline. Photographs and faces in cells.",
    use: "Feed → post → profile",
    field: "People in the rail. Posts in the measure.",
    note: "Comments sit beside the feed. Open a face.",
  },
  {
    slug: "night",
    title: "Night",
    voice: "On the street",
    law: "Fleet management. Units, a city field, a trip.",
    story:
      "Night is fleet management for a city yard. The map is a San Francisco neighborhood: blocks, streets, small units. Select a unit, then open its trip. The chrome is Raster.",
    what: "Fleet management",
    type: "City field, units, trip",
    module: "204",
    ink: "Paper field. Ink streets. One spot on the selected unit.",
    use: "List → unit → trip",
    field: "A neighborhood you look across. Many blocks, a street grid, one selected unit.",
    note: "Acknowledge an alert. The list stays one scale.",
  },
  {
    slug: "evening",
    title: "Evening",
    voice: "Tonight",
    law: "Order out. Stores, a menu, a bag.",
    story:
      "Evening is order out for tonight. Browse stores, open a kitchen, add a plate to the bag. Address, search, and filters sit in the bar. Photographs occupy cells. Invented kitchens.",
    what: "Order out",
    type: "Market, store, bag",
    module: "204",
    ink: "Paper. Hairline. Photographs in cells. Flush chrome.",
    use: "Stores → kitchen → bag",
    field: "A market bar, then a grid of kitchens.",
    note: "Filter the kitchens. The bag is a sheet.",
  },
  {
    slug: "room",
    title: "Room",
    voice: "In the room",
    law: "Team chat. Channels, people, threads.",
    story:
      "Room is team chat for a small studio. Channels and people share a rail, with faces. Open a channel, then open a thread on a line. People stay in the room.",
    what: "Team chat",
    type: "Channels, messages, thread",
    module: "204",
    ink: "Paper. Hairline. Faces in the rail.",
    use: "Channel → message → thread",
    field: "People and agents in one list.",
    note: "Send a line. Note a message. Open a thread.",
  },
] as const;

export type InterfaceSlug = (typeof interfaces)[number]["slug"];

export const INTERFACE_SLUGS = interfaces.map((item) => item.slug);

export function interfaceBySlug(slug: string) {
  return interfaces.find((item) => item.slug === slug);
}
