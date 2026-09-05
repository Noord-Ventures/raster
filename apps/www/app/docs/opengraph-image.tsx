import { createOgPoster, ogContentType, ogSize } from "../og-poster";

export const alt = "Getting started — Vlak";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ label: "Documentation", headline: "Install the components. Build your interface.", path: "/docs" });
}
