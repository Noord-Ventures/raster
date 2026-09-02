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
const chrome = read("components/site-chrome.tsx");
const crumbs = read("components/crumb-bar.tsx");
const footer = read("components/site-footer.tsx");
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

if (!page.includes("notFound(")) {
  fail.push("hidden /swag must 404 via notFound()");
}
if (/Coming soon|swag-page|swag-field|SiteChrome/i.test(page)) {
  fail.push("hidden /swag must not render a store page");
}
if (/stripe|checkout|addToCart|payment/i.test(page)) {
  fail.push("swag page must not checkout");
}

for (const slug of ["hoodie", "tote", "mug", "cap", "notebook", "bottle", "stickers"]) {
  const still = join(root, "public/swag", `${slug}.jpg`);
  if (!existsSync(still)) fail.push(`missing still public/swag/${slug}.jpg`);
}

if (/href:\s*"\/swag"/.test(chrome) || chrome.includes('label: "Swag"')) {
  fail.push("SiteChrome must not list Swag");
}
if (crumbs.includes('label: "Swag"') || crumbs.includes('parts[0] === "swag"')) {
  fail.push("crumb-bar must not trail Swag");
}
if (footer.includes("/swag") || footer.includes(">Swag<")) {
  fail.push("footer must not link Swag");
}
if (/tailwind|@radix-ui/i.test(page + chrome + footer)) {
  fail.push("no Tailwind/Radix on chrome or hidden swag");
}

if (fail.length) {
  console.error(fail.map((f) => `  ✗ ${f}`).join("\n"));
  process.exit(1);
}
console.log("swag hidden: 404, no nav, assets kept");
