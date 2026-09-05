import { createOgPoster, ogContentType, ogSize } from "../og-poster";

export const alt = "Vlak documentation — From install to interface.";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ section: "Docs", headline: "From install to interface.", description: "Start building with Vlak", accent: "#b13b18", motif: "docs" });
}
