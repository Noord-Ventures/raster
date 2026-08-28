// The Interfaces section is six first-class posters. Fail if a route
// disappears, if the section is buried in Components, or if a second kit
// (Tailwind / Radix) appears in the section.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../..", import.meta.url));
const dir = join(root, "apps/www/app/interfaces");
const slugs = ["ai-tool", "dashboard", "threads", "fleet", "delivery", "slack"];
const names = ["Line", "Press", "Wall", "Night", "Evening", "Room"];

if (!existsSync(join(dir, "FEATURE.md"))) {
  console.error("Interfaces feature map missing: app/interfaces/FEATURE.md");
  process.exit(1);
}
if (!existsSync(join(dir, "catalog.ts"))) {
  console.error("Interfaces catalog missing: app/interfaces/catalog.ts");
  process.exit(1);
}
if (!existsSync(join(dir, "page.tsx"))) {
  console.error("Interfaces index missing: app/interfaces/page.tsx");
  process.exit(1);
}

const catalog = readFileSync(join(dir, "catalog.ts"), "utf8");
const index = readFileSync(join(dir, "page.tsx"), "utf8");
const map = readFileSync(join(dir, "FEATURE.md"), "utf8");
const chrome = readFileSync(join(root, "apps/www/components/site-chrome.tsx"), "utf8");
const crumbs = readFileSync(join(root, "apps/www/components/crumb-bar.tsx"), "utf8");
const css = readFileSync(join(dir, "interfaces.css"), "utf8");
const crops = existsSync(join(dir, "crops.tsx")) ? readFileSync(join(dir, "crops.tsx"), "utf8") : "";
const shell = existsSync(join(dir, "shell.tsx")) ? readFileSync(join(dir, "shell.tsx"), "utf8") : "";

if (!chrome.includes('href: "/interfaces"') || !chrome.includes('label: "Interfaces"')) {
  console.error("Interfaces must be a first-class corner-nav sibling");
  process.exit(1);
}
if (!crumbs.includes('label: "Interfaces"') || !crumbs.includes("interfaceBySlug")) {
  console.error("Crumb bar must trail Interfaces");
  process.exit(1);
}

const folders = readdirSync(dir).filter((name) => statSync(join(dir, name)).isDirectory());
const missing = slugs.filter((slug) => !folders.includes(slug) || !existsSync(join(dir, slug, "page.tsx")));
if (missing.length) {
  console.error("Missing Interfaces routes:\n" + missing.map((s) => `  /interfaces/${s}`).join("\n"));
  process.exit(1);
}
const extras = folders.filter((name) => !slugs.includes(name));
if (extras.length) {
  console.error("Unexpected Interfaces folders:\n" + extras.map((s) => `  ${s}`).join("\n"));
  process.exit(1);
}

if (!index.includes("interfaces.map") || !index.includes("`/interfaces/${item.slug}`")) {
  console.error("Interfaces index must list the six from catalog.ts");
  process.exit(1);
}
if (!index.includes("InterfaceCrop")) {
  console.error("Interfaces index must render poster crops, not title-only cards");
  process.exit(1);
}
if (!crops.includes("if-crop-scene")) {
  console.error("Poster crops must be UI fragments, not empty frames");
  process.exit(1);
}
if (!shell.includes("if-specimen") || !shell.includes("if-meta") || !shell.includes("if-story")) {
  console.error("Detail pages must box the specimen and print description + meta");
  process.exit(1);
}
if (!css.includes(".if-specimen") || !css.includes("height: 612px")) {
  console.error("Specimen must be a 612 module box, not almost-fullscreen");
  process.exit(1);
}

for (const name of names) {
  if (!catalog.includes(`title: "${name}"`)) {
    console.error(`catalog.ts is missing fictional title: ${name}`);
    process.exit(1);
  }
}
if (/title: "(AI tool|SaaS dashboard|Threads|Fleet|Food delivery|Chat)"/.test(catalog)) {
  console.error("Catalog titles must be invented apps, not generic categories");
  process.exit(1);
}

for (const slug of slugs) {
  if (!catalog.includes(`slug: "${slug}"`)) {
    console.error(`catalog.ts is missing slug: ${slug}`);
    process.exit(1);
  }
  if (!map.includes(`/interfaces/${slug}`)) {
    console.error(`FEATURE.md does not name /interfaces/${slug}`);
    process.exit(1);
  }
}

const walk = (from) => {
  const out = [];
  for (const name of readdirSync(from)) {
    const path = join(from, name);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
};

const banned = /tailwind|@radix-ui|@radix\//;
for (const file of walk(dir)) {
  const text = readFileSync(file, "utf8");
  if (banned.test(text)) {
    console.error(`Interfaces must stay off Tailwind and Radix: ${file}`);
    process.exit(1);
  }
}

const clones = /Linear|Notion|Figma|Waymo/;
for (const file of walk(dir)) {
  const text = readFileSync(file, "utf8");
  if (clones.test(text) && !file.endsWith("FEATURE.md") && !file.endsWith("check-interfaces.mjs")) {
    console.error(`Interfaces must not clone Linear/Notion/Figma/Waymo: ${file}`);
    process.exit(1);
  }
}

const componentsPage = readFileSync(join(root, "apps/www/app/components/page.tsx"), "utf8");
if (componentsPage.includes("/interfaces")) {
  console.error("Interfaces must not be buried inside the Components page");
  process.exit(1);
}

if (!existsSync(join(dir, "fleet", "map.tsx"))) {
  console.error("Fleet proto must keep its three.js map in fleet/map.tsx");
  process.exit(1);
}

if (!existsSync(join(dir, "scene-motion.css"))) {
  console.error("Interfaces scene motion sheet missing: scene-motion.css");
  process.exit(1);
}
const motion = readFileSync(join(dir, "scene-motion.css"), "utf8");
if (!motion.includes("@keyframes sc-confirm") || !motion.includes("opacity: 0")) {
  console.error("Scene confirm must be opacity-only");
  process.exit(1);
}
if (/translateY|stagger|animation-delay/.test(motion)) {
  console.error("Scene confirm must not fade-up or stagger");
  process.exit(1);
}
if (!map.includes("Entry is not a show")) {
  console.error("FEATURE.md must state the motion lock");
  process.exit(1);
}
if (!map.includes("boxed specimen") || !/no tape/i.test(map) || !/minimal shadow/i.test(map)) {
  console.error("FEATURE.md must lock a boxed specimen: no tape, minimal shadow allowed");
  process.exit(1);
}
if (!map.includes("if-inspect")) {
  console.error("FEATURE.md must name the inspect pane");
  process.exit(1);
}
if (!map.includes("fictional little app") || !map.includes("poster crop")) {
  console.error("FEATURE.md must lock fictional apps and poster crops");
  process.exit(1);
}
if (existsSync(join(dir, "scene-fonts.ts"))) {
  console.error("Scenes must use Inter, not extra display faces");
  process.exit(1);
}

const productSkin = /Fraunces|Source_Serif|IBM_Plex|Newsreader|Iowan|Palatino|#c96442|#e08b6a|#3e1242|#007a5a|#1f8a78|#c45c26|#3ddec4|#ff6b4a|#1264a3|#5b2c6f|#071014|aubergine/i;
const allowedRadius = /^(0|50%|var\(--radius-sm\))$/;
const quietShadow = (value) =>
  value === "none" ||
  value.startsWith("inset ") ||
  /^0(\s+1px){1,2}\s+\d+px\s+rgba\(0,\s*0,\s*0/.test(value) ||
  /^0\s+1px\s+2px\s+rgba\(0,\s*0,\s*0/.test(value);

for (const slug of slugs) {
  const scene = readFileSync(join(dir, slug, "scene.css"), "utf8");
  const board = readFileSync(join(dir, slug, "board.tsx"), "utf8");
  if (!scene.includes("var(--duration-snap)") || !scene.includes("var(--ease)")) {
    console.error(`${slug} scene must use Raster snap/ease tokens`);
    process.exit(1);
  }
  if (!scene.includes("prefers-reduced-motion")) {
    console.error(`${slug} scene must honor reduced motion`);
    process.exit(1);
  }
  if (/translateY|stagger|animation-delay/.test(scene)) {
    console.error(`${slug} scene must not fade-up or stagger`);
    process.exit(1);
  }
  if (productSkin.test(scene) || productSkin.test(board)) {
    console.error(`${slug} must stay Raster: no product skin, no extra face, no reference hue`);
    process.exit(1);
  }
  const radii = [...scene.matchAll(/border-radius:\s*([^;]+)/g)].map((m) => m[1].trim());
  if (radii.some((value) => !allowedRadius.test(value))) {
    console.error(`${slug} scene chrome stays flush; boxed UI may use --radius-sm only`);
    process.exit(1);
  }
  const shadows = [...scene.matchAll(/box-shadow:\s*([^;]+)/g)].map((m) => m[1].trim());
  if (shadows.some((value) => !quietShadow(value))) {
    console.error(`${slug} scene may take a quiet shadow only`);
    process.exit(1);
  }
  if (!board.includes("sc-fresh")) {
    console.error(`${slug} board must confirm a user-caused state`);
    process.exit(1);
  }
  if (!board.includes("if-inspect")) {
    console.error(`${slug} board must open a second level (if-inspect)`);
    process.exit(1);
  }
  if (!board.includes("<Brand")) {
    console.error(`${slug} board must carry the invented brand`);
    process.exit(1);
  }
}

console.log(`ok: ${slugs.length} Interfaces routes`);
