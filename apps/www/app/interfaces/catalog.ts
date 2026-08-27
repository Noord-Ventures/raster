export const interfaces = [
  {
    slug: "ai-tool",
    title: "AI tool",
    law: "A conversation. Composer at the bottom.",
  },
  {
    slug: "dashboard",
    title: "SaaS dashboard",
    law: "An ops console. Range, jobs, a selected pane.",
  },
  {
    slug: "threads",
    title: "Threads",
    law: "A feed. Notes, photographs, a live thread.",
  },
  {
    slug: "fleet",
    title: "Fleet",
    law: "A night map. Active units, a panel, alerts.",
  },
  {
    slug: "delivery",
    title: "Food delivery",
    law: "Photographs of plates. Ratings, a bag.",
  },
  {
    slug: "slack",
    title: "Slack",
    law: "Aubergine rail. Agents sit with people.",
  },
] as const;

export type InterfaceSlug = (typeof interfaces)[number]["slug"];

export const INTERFACE_SLUGS = interfaces.map((item) => item.slug);

export function interfaceBySlug(slug: string) {
  return interfaces.find((item) => item.slug === slug);
}
