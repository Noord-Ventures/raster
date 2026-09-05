import { createOgPoster, ogContentType, ogSize } from "../og-poster";

export const alt = "Vlak components — A complete, quiet UI kit.";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ section: "Components", headline: "A complete, quiet UI kit.", description: "React · CSS · accessible", accent: "#1d34bd", motif: "components" });
}
