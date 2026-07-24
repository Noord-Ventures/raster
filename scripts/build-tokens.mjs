// Regenerates tokens/raster.tokens.json from src/tokens.ts.
// Run with: npm run build:tokens (requires Node ≥ 22.6 for type stripping).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { rasterTokens } from "../src/tokens.ts";

const out = fileURLToPath(new URL("../tokens/raster.tokens.json", import.meta.url));
writeFileSync(out, JSON.stringify(rasterTokens, null, 2) + "\n");
console.log("wrote tokens/raster.tokens.json");
