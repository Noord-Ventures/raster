// Copies the generated registry into public/r so the exported site
// serves it at /r/<name>.json — the URL the CLI docs and shadcn
// interop point at.
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("../../../registry", import.meta.url));
const dest = fileURLToPath(new URL("../public/r", import.meta.url));

if (!existsSync(src)) {
  console.error("registry/ not found — run: pnpm --filter @noordvc/raster build:registry");
  process.exit(1);
}
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("copied registry → public/r");

const fontSrc = fileURLToPath(new URL("../../../packages/core/css/fonts/inter", import.meta.url));
const fontDest = fileURLToPath(new URL("../public/fonts/inter", import.meta.url));
if (!existsSync(fontSrc)) {
  console.error("Inter fonts not found — expected packages/core/css/fonts/inter");
  process.exit(1);
}
mkdirSync(fontDest, { recursive: true });
cpSync(fontSrc, fontDest, { recursive: true });
console.log("copied Inter fonts → public/fonts/inter");
