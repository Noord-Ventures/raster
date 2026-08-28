// Copies the generated registry into public/r so the exported site
// serves it at /r/<name>.json — the URL the CLI docs and shadcn
// interop point at.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("../../../registry", import.meta.url));
const dest = fileURLToPath(new URL("../public/r", import.meta.url));

if (!existsSync(src)) {
  console.error("registry/ not found — run: pnpm --filter @noorddev/raster build:registry");
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

const cssSrc = fileURLToPath(new URL("../../../packages/core/css/raster.css", import.meta.url));
const cssDest = fileURLToPath(new URL("../public/raster.css", import.meta.url));
if (!existsSync(cssSrc)) {
  console.error("raster.css not found — run the core CSS build");
  process.exit(1);
}
writeFileSync(cssDest, readFileSync(cssSrc));
console.log("copied raster.css → public/raster.css");

const starterSrc = fileURLToPath(new URL("../../../packages/cli/src/starter.html", import.meta.url));
const starterDest = fileURLToPath(new URL("../public/starter/index.html", import.meta.url));
if (!existsSync(starterSrc)) {
  console.error("CLI starter.html not found");
  process.exit(1);
}
mkdirSync(fileURLToPath(new URL("../public/starter", import.meta.url)), { recursive: true });
writeFileSync(starterDest, readFileSync(starterSrc, "utf8").replaceAll("{{CSS_HREF}}", "/raster.css"));
console.log("wrote starter specimen → public/starter/index.html");
