#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fail = [];

function read(rel) {
  const p = join(root, rel);
  if (!existsSync(p)) {
    fail.push(`missing ${rel}`);
    return "";
  }
  return readFileSync(p, "utf8");
}

const page = read("app/swag/page.tsx");
const css = read("app/swag/swag.css");
const catalog = read("app/swag/catalog.ts");
const chrome = read("components/site-chrome.tsx");
const crumbs = read("components/crumb-bar.tsx");
const mark = read("components/raster-mark.tsx");

if (!mark.includes('viewBox="0 0 822 822"') || !mark.includes("fill=\"currentColor\"")) {
  fail.push("RasterMark must be the noord library SVG");
}
if (
  !mark.includes("m411.128.67 128.714 128.713L334.5 334.726") ||
  !mark.includes("M539.429 128.97 411.09.63 282.751 128.97") ||
  !mark.includes("m500.812 347.858 128.752-128.752") ||
  !mark.includes("M536.4 126 632.6 219.1 536.4 312.2Z")
) {
  fail.push("RasterMark must keep the four noord library paths");
}
if (!chrome.includes('from "./raster-mark"') && !chrome.includes('from "./raster-mark.tsx"')) {
  fail.push("site chrome must import RasterMark from the shared module");
}
if (chrome.includes("m411.128.67")) fail.push("do not duplicate RasterMark paths in site-chrome");
if (!page.includes("from \"@/components/raster-mark\"") && !page.includes("from \"@/components/raster-mark.tsx\"")) {
  fail.push("swag must import RasterMark from the shared module");
}
if (!page.includes('className="swag-mark"')) fail.push("swag hero must render RasterMark in the corner slot");
if (!page.includes("swag-print-mark")) fail.push("swag stills must overlay RasterMark on print areas");
if (!css.includes("top: 24px") || !css.includes("left: 20px")) {
  fail.push("swag hero mark must sit at top 24 / left 20");
}

if (!page.includes('className="swag-page"')) fail.push("swag page shell missing");
if (!page.includes('className="swag-field"')) fail.push("swag must use the 204 field");
if (!page.includes("Coming soon")) fail.push("Coming soon copy missing");
if (/stripe|checkout|addToCart|payment|SiteChrome/i.test(page)) fail.push("swag page must not checkout or remount chrome");

for (const slug of ["hoodie", "tote", "mug", "cap", "notebook", "bottle", "stickers"]) {
  if (!catalog.includes(`slug: "${slug}"`)) fail.push(`catalog missing ${slug}`);
  const still = join(root, "public/swag", `${slug}.jpg`);
  if (!existsSync(still)) fail.push(`missing still public/swag/${slug}.jpg`);
}

if (!catalog.includes("print:")) fail.push("catalog must name print areas");
if (!css.includes("padding-top: 64px")) fail.push("swag Store kicker must sit below the corner mark");
if (!css.includes("border-radius: 0")) fail.push("swag cards stay chrome-square");
if (!css.includes("grid-auto-rows: minmax(204px, auto)")) fail.push("swag field must sit on 204");
if (!css.includes("object-fit: contain")) fail.push("swag stills sit contain on paper");
if (/tailwind|radix|stripe/i.test(page + css)) fail.push("no Tailwind/Radix/Stripe on swag");

if (!/href:\s*"\/swag"/.test(chrome)) fail.push("SiteChrome missing /swag");
if (!crumbs.includes('label: "Swag"')) fail.push("crumb-bar missing Swag");

if (fail.length) {
  console.error(fail.map((f) => `  ✗ ${f}`).join("\n"));
  process.exit(1);
}
console.log("swag store locks ok");
