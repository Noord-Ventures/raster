import { LAW } from "./specimen";
import { createOgPoster, ogContentType, ogSize } from "./og-poster";

export const alt = `Vlak — ${LAW}`;
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return createOgPoster({ label: "", headline: ["A minimal design system", "for product exploration."] });
}
