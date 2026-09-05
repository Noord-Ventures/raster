import { createOgPoster, ogContentType, ogSize } from "../og-poster";
import { catalogComponents } from "@noorddev/vlak";

export const alt = "Components — Vlak";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ label: `Components · ${catalogComponents.length}`, headline: [`${catalogComponents.length} components, each`, "with a live preview."], path: "/components" });
}
