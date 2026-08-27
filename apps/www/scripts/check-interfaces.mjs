// The Interfaces section is six first-class posters. Fail if a route
// disappears, if the section is buried in Components, or if a second kit
// (Tailwind / Radix) appears in the section.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../..", import.meta.url));
const dir = join(root, "apps/www/app/interfaces");
const slugs = ["ai-tool", "dashboard", "threads", "fleet", "delivery", "slack"];

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

for (const slug of slugs) {
  const css = readFileSync(join(dir, slug, "scene.css"), "utf8");
  if (!css.includes("var(--duration-snap)") || !css.includes("var(--ease)")) {
    console.error(`${slug} scene must use Raster snap/ease tokens`);
    process.exit(1);
  }
  if (!css.includes("prefers-reduced-motion")) {
    console.error(`${slug} scene must honor reduced motion`);
    process.exit(1);
  }
  if (/translateY|stagger|animation-delay/.test(css)) {
    console.error(`${slug} scene must not fade-up or stagger`);
    process.exit(1);
  }
  const board = readFileSync(join(dir, slug, "board.tsx"), "utf8");
  if (!board.includes("sc-fresh")) {
    console.error(`${slug} board must confirm a user-caused state`);
    process.exit(1);
  }
}

console.log(`ok: ${slugs.length} Interfaces routes`);
