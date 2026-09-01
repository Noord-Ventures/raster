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
if (!css.includes("border-radius: 0")) fail.push("swag cards must be square");
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
