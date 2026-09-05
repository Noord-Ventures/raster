import { createOgPoster, ogContentType, ogSize } from "../og-poster";
import { interfaces } from "./catalog";

export const alt = "Interfaces — Vlak";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ label: `Interfaces · ${interfaces.length} studies`, headline: ["See what you can", "build with Vlak."], path: "/interfaces" });
}
