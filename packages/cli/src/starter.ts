import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Resolve the specimen HTML: next to this file in src, or next to the bundled CLI. */
function starterTemplate(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [join(here, "starter.html"), join(here, "../src/starter.html")];
  const file = candidates.find((path) => existsSync(path));
  if (!file) {
    throw new Error("Vlak starter page not found. Rebuild @noorddev/vlak-cli.");
  }
  return readFileSync(file, "utf8");
}

/** The page `init` writes. A specimen, not a hello-world shell. */
export function starterPage(cssHref: string): string {
  return starterTemplate().replaceAll("{{CSS_HREF}}", cssHref.replace(/\\/g, "/"));
}
