import { createOgPoster, ogContentType, ogSize } from "../og-poster";

export const alt = "About Vlak";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ label: "About", headline: ["The method, design lineage,", "and practical constraints", "behind Vlak."], path: "/about" });
}
