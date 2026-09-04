// Copy what the CLI reads at runtime next to dist/index.js: the vendored
// Inter files, the starter specimen, and the registry snapshot. The
// executable itself stays small; nothing reaches back into @noorddev/vlak.
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

const bundleSrc = fileURLToPath(new URL("../../../registry/bundle.json", import.meta.url));
const bundleDest = fileURLToPath(new URL("../dist/registry/bundle.json", import.meta.url));
mkdirSync(fileURLToPath(new URL("../dist/registry/", import.meta.url)), { recursive: true });
copyFileSync(bundleSrc, bundleDest);
console.log("copied registry snapshot → dist/registry/bundle.json");
