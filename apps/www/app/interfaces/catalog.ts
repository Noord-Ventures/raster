export const interfaces = [
  {
    slug: "ai-tool",
    title: "AI tool",
    law: "Sidebar, main canvas, chat box, in-feed widgets.",
  },
  {
    slug: "dashboard",
    title: "SaaS dashboard",
    law: "Sidebar, graphs, lists, multiple panes.",
  },
  {
    slug: "threads",
    title: "Threads",
    law: "Main feed, content types, threads, discussion.",
  },
  {
    slug: "fleet",
    title: "Fleet",
    law: "Floating Raster on a three.js map. Active, inactive, alerts.",
  },
  {
    slug: "delivery",
    title: "Food delivery",
    law: "Main browsing, navbar, ratings.",
  },
  {
    slug: "slack",
    title: "Slack",
    law: "Chat, sidebar, agents mixed with people.",
  },
] as const;

export type InterfaceSlug = (typeof interfaces)[number]["slug"];

export const INTERFACE_SLUGS = interfaces.map((item) => item.slug);

export function interfaceBySlug(slug: string) {
  return interfaces.find((item) => item.slug === slug);
}
