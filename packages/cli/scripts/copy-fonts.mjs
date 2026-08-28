// Copy vendored Inter files next to the bundled CLI so `init` can
// write them beside raster.css without reaching back into @noorddev/raster.
import { cpSync, mkdirSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("../../core/css/fonts/inter", import.meta.url));
const dest = fileURLToPath(new URL("../dist/fonts/inter", import.meta.url));
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("copied Inter fonts → dist/fonts/inter");

const starterSrc = fileURLToPath(new URL("../src/starter.html", import.meta.url));
const starterDest = fileURLToPath(new URL("../dist/starter.html", import.meta.url));
copyFileSync(starterSrc, starterDest);
console.log("copied starter specimen → dist/starter.html");
