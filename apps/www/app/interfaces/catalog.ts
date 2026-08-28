export const interfaces = [
  {
    slug: "ai-tool",
    title: "Lijn",
    voice: "The next line",
    law: "A writing desk. Drafts in a rail, the line at the bottom.",
    story:
      "Lijn is a small invented desk for tightening a brief. Drafts sit in a rail. You send a line; Lijn answers locally. No live model. The chrome is Raster. The name is the tool.",
    what: "Writing desk",
    type: "Rail, thread, composer",
    module: "204",
    ink: "Paper. Hairline. No spot.",
  },
  {
    slug: "dashboard",
    title: "Pers",
    voice: "On press",
    law: "A press-run ledger. Range, jobs, a selected note.",
    story:
      "Pers keeps a week of sheets, proofs, and jobs on one field. Change the range and the numbers move. Select a job and a note opens. One Crouwel spot on the press count. The rest is ink.",
    what: "Ops field",
    type: "Metrics, jobs, a note",
    module: "204",
    ink: "Paper. Hairline. One Crouwel spot.",
  },
  {
    slug: "threads",
    title: "Muur",
    voice: "On the wall",
    law: "A studio wall. Notes, photographs in a cell, a reply.",
    story:
      "Muur is a wall for a small studio. Notes and press sheets occupy cells. Like a line, open a thread, write a reply. No product skin. Photographs sit flush, like an image in a module.",
    what: "Studio wall",
    type: "Feed, photograph, reply",
    module: "204",
    ink: "Paper. Hairline. Photographs in cells.",
  },
  {
    slug: "fleet",
    title: "Nacht",
    voice: "Night",
    law: "A night yard. Units on a cell. Acknowledge an alert.",
    story:
      "Nacht is a dispatch for a night yard. The map occupies a cell as a dark field. Select a unit. Acknowledge the alert. Chrome stays paper and hairline. The field is night.",
    what: "Dispatch map",
    type: "Night field, units, alert",
    module: "204",
    ink: "Night field. Paper chrome.",
  },
  {
    slug: "delivery",
    title: "Avond",
    voice: "Tonight",
    law: "A kitchen list. Photographs in cells. A rating, a bag.",
    story:
      "Avond is a list of kitchens for tonight. Photographs occupy cells. Filter by kind, open a kitchen, add a plate to the bag. Invented rooms, not a delivery brand. The chrome is Raster.",
    what: "Kitchen list",
    type: "Photograph, rating, bag",
    module: "204",
    ink: "Paper. Hairline. Photographs in cells.",
  },
  {
    slug: "slack",
    title: "Kamer",
    voice: "In the room",
    law: "A studio room. Channels, messages, a composer. Agents with people.",
    story:
      "Kamer is a room for a desk. Channels and people share a rail. Agents sit with people. Send a line, note a message. Not a chat product. The name is the room.",
    what: "Studio room",
    type: "Channels, thread, composer",
    module: "204",
    ink: "Paper. Hairline. No spot.",
  },
] as const;

export type InterfaceSlug = (typeof interfaces)[number]["slug"];

export const INTERFACE_SLUGS = interfaces.map((item) => item.slug);

export function interfaceBySlug(slug: string) {
  return interfaces.find((item) => item.slug === slug);
}
