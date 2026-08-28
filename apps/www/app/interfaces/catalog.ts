export const interfaces = [
  {
    slug: "ai-tool",
    title: "Line",
    voice: "The next line",
    law: "A writing app. Chats in a rail, the line in the middle.",
    story:
      "Line is a small invented writing app. Open a chat, send a line, then open that line to rewrite it. Replies are local. No live model. The chrome is Raster. The product is the name.",
    what: "Writing app",
    type: "Chat list, thread, line inspector",
    module: "204",
    ink: "Paper. Hairline. Quiet fill on the active chat.",
    use: "List → chat → a single line",
    field: "Centered measure. Composer in the pane.",
    note: "Local replies. No live model on this sheet.",
  },
  {
    slug: "dashboard",
    title: "Press",
    voice: "On press",
    law: "A press-run ledger. Range, jobs, a selected sheet.",
    story:
      "Press keeps a week of sheets, proofs, and jobs on one field. Open a job, then open its sheet. Change the range and the numbers move. One Crouwel spot on the press count. The rest is ink, with a little hue in the rail so the floor can be scanned.",
    what: "Ops app",
    type: "Rail, metrics, job sheet",
    module: "204",
    ink: "Paper. Hairline. One Crouwel spot. Quiet hue in the rail.",
    use: "Floor → job → sheet",
    field: "Three metric cells, then the split.",
    note: "Week and month rewrite the same field.",
  },
  {
    slug: "threads",
    title: "Wall",
    voice: "On the wall",
    law: "A social wall. People, photographs, a thread, a profile.",
    story:
      "Wall is a small invented social network for a studio. Faces sit with the notes. Open a post, then open a person. Photographs occupy cells. The rail is the people, not a caption.",
    what: "Social wall",
    type: "Feed, thread, profile",
    module: "204",
    ink: "Paper. Hairline. Photographs and faces in cells.",
    use: "Feed → thread → profile",
    field: "People in the rail. Posts in the measure.",
    note: "Like a line, write a reply, open a face.",
  },
  {
    slug: "fleet",
    title: "Night",
    voice: "On the street",
    law: "A dispatch map of San Francisco. Units, traffic, a trip.",
    story:
      "Night is a dispatch for a city yard. The map is San Francisco, with traffic on the grid. Select a unit, then open its trip. The field is readable on paper. Chrome stays Raster. Not a branded robotaxi.",
    what: "Dispatch map",
    type: "City field, units, trip",
    module: "204",
    ink: "Paper field. Ink streets. One spot on the selected unit.",
    use: "List → unit → trip",
    field: "San Francisco, traffic on the grid.",
    note: "Acknowledge an alert. The list stays one scale.",
  },
  {
    slug: "delivery",
    title: "Evening",
    voice: "Tonight",
    law: "A kitchen list. Photographs in cells. A plate, a bag.",
    story:
      "Evening is a list of kitchens for tonight. Open a kitchen, then a plate. Photographs occupy cells. Filter by kind. The bag still works. Invented rooms, not a delivery brand.",
    what: "Kitchen list",
    type: "Kitchens, menu, plate",
    module: "204",
    ink: "Paper. Hairline. Photographs in cells.",
    use: "Browse → kitchen → plate",
    field: "Photographs occupy a cell.",
    note: "Add a plate. The bag counts.",
  },
  {
    slug: "slack",
    title: "Room",
    voice: "In the room",
    law: "A studio room. Channels, people, threads. Agents with people.",
    story:
      "Room is a desk for a small studio. Channels and people share a rail, with faces. Open a channel, then open a thread on a line. Agents sit with people. The name is the room.",
    what: "Studio room",
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
