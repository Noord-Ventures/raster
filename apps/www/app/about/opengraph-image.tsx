import { createOgPoster, ogContentType, ogSize } from "../og-poster";

export const alt = "About Vlak — A system with a point of view.";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ section: "About", headline: "A system with a point of view.", description: "Method · lineage · constraints", accent: "#6350b8", motif: "about" });
}
