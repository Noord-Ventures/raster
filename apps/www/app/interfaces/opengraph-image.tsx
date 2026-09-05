import { createOgPoster, ogContentType, ogSize } from "../og-poster";

export const alt = "Vlak interfaces — See the system at work.";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ section: "Interfaces", headline: "See the system at work.", description: "Twelve working studies", accent: "#007b70", motif: "interfaces" });
}
