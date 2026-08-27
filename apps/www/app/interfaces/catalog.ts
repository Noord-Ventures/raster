export const interfaces = [
  {
    slug: "ai-tool",
    title: "AI tool",
    law: "A writing tool. Composer at the bottom.",
  },
  {
    slug: "dashboard",
    title: "SaaS dashboard",
    law: "An ops field. Range, jobs, a selected note.",
  },
  {
    slug: "threads",
    title: "Threads",
    law: "A feed. Notes, photographs in a cell, a reply.",
  },
  {
    slug: "fleet",
    title: "Fleet",
    law: "A night map in a cell. Units, a selected alert.",
  },
  {
    slug: "delivery",
    title: "Food delivery",
    law: "Photographs in cells. A rating, a bag.",
  },
  {
    slug: "slack",
    title: "Chat",
    law: "Channels, messages, a composer. Agents with people.",
  },
] as const;

export type InterfaceSlug = (typeof interfaces)[number]["slug"];

export const INTERFACE_SLUGS = interfaces.map((item) => item.slug);

export function interfaceBySlug(slug: string) {
  return interfaces.find((item) => item.slug === slug);
}
