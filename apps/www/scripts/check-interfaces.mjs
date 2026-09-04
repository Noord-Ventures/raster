// The Interfaces section is six first-class posters. Fail if a route
// disappears, if the section is buried in Components, or if a second kit
// (Tailwind / Radix) appears in the section.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../..", import.meta.url));
const dir = join(root, "apps/www/app/interfaces");
const slugs = ["line", "press", "wall", "night", "evening", "room"];
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
const ifSx = readFileSync(join(dir, "interfaces.stylex.ts"), "utf8");
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
if (!index.includes("chrome.cover") || (!index.includes('sx("cover"') && !index.includes('className="cover"'))) {
  console.error("Interfaces title must use the shared cover so H1 shares the rail first-row line");
  process.exit(1);
}
if (index.includes("if-title") || css.includes(".if-title")) {
  console.error("Interfaces must not keep a parallel if-title spacer; cover owns the 204 cell");
  process.exit(1);
}
if (css.includes("min-height: 204px")) {
  console.error("Cover owns the 204 cell in site.css; do not keep a parallel min-height 204 in interfaces.css");
  process.exit(1);
}
const baseCss = readFileSync(join(root, "packages/core/css/base.css"), "utf8");
if (!baseCss.includes("html::before") || !baseCss.includes("var(--grid-image)")) {
  console.error("Site gutter overlay must paint verticals on html::before");
  process.exit(1);
}
if (baseCss.includes("clip-path:inset(0 0 0 21px)")) {
  console.error("Left inner-page gutter must paint; do not clip 21px off html::before");
  process.exit(1);
}
const beforeAt = baseCss.indexOf("html::before{");
const beforeRule = beforeAt >= 0 ? baseCss.slice(beforeAt, baseCss.indexOf("}", beforeAt)) : "";
if (beforeRule.includes("repeating-linear-gradient")) {
  console.error("Gutter overlay must not paint 204 horizontals — that cages type");
  process.exit(1);
}
if (!css.includes("body:has(.if-index)") || !css.includes("background: transparent")) {
  console.error("Interfaces paper must stay open so the site 204 overlay reads through");
  process.exit(1);
}
if (/\.if-rail \{[^}]*background:\s*var\(--bg\)/s.test(css)) {
  console.error("Interfaces rail must not cover the site 204");
  process.exit(1);
}
if (/if-list \{[^}]*padding:\s*24px/s.test(css)) {
  console.error("Interfaces cards must sit on the 204, not 24px off it");
  process.exit(1);
}
const tileAt = css.indexOf(".if-tile {");
const tileRule = css.slice(tileAt, css.indexOf("}", tileAt));
if (/background:\s*var\(--bg\)/.test(tileRule) || !tileRule.includes("background: transparent")) {
  console.error("Interfaces tiles must not cover 204s around the crops");
  process.exit(1);
}
if (!tileRule.includes("var(--grid-line)") || tileRule.includes("var(--divider)")) {
  console.error("Interfaces tile edges must be --grid-line, the quiet 204 ink");
  process.exit(1);
}
if (/border:\s*1px/.test(tileRule)) {
  console.error("Interfaces CSS must not double the StyleX tile hairline");
  process.exit(1);
}
if (tileRule.includes("var(--radius-sm)") || !/border-radius:\s*0/.test(tileRule)) {
  console.error("Interfaces index tiles must be chrome-square (radius 0), same lock as Components cards");
  process.exit(1);
}
const listAt = css.indexOf(".if-list {");
const listRule = css.slice(listAt, css.indexOf("}", listAt));
if (/row-gap:\s*0/.test(listRule) || !/row-gap:/.test(listRule)) {
  console.error("Interfaces index must leave vertical space between tiles");
  process.exit(1);
}
const specRule = css.slice(css.indexOf(".if-specimen {"), css.indexOf("}", css.indexOf(".if-specimen {")));
if (!specRule.includes("margin-top: 204px")) {
  console.error("Detail specimen must sit on the 204, not 120px off it");
  process.exit(1);
}
if (/border:\s*1px/.test(specRule)) {
  console.error("Interfaces CSS must not double the StyleX specimen hairline");
  process.exit(1);
}
if (!/border-radius:\s*0/.test(specRule)) {
  console.error("Interfaces specimen chrome must stay square");
  process.exit(1);
}
if (!specRule.includes("box-shadow:") || specRule.includes("box-shadow: none")) {
  console.error("Specimen may take a quiet shadow");
  process.exit(1);
}
if (!ifSx.includes("borderWidth: 1") || !ifSx.includes('borderColor: "var(--grid-line)"') || !ifSx.includes('borderColor: "var(--divider)"')) {
  console.error("StyleX must own the one tile --grid-line and specimen --divider hairline");
  process.exit(1);
}
if (!map.includes("Type occupies the first cell") || !map.includes("--grid-line")) {
  console.error("FEATURE.md must lock the Interfaces 204 field");
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
const metaStart = css.indexOf(".if-meta {");
if (metaStart < 0) {
  console.error("Matter meta rule missing");
  process.exit(1);
}
const metaRule = css.slice(metaStart, css.indexOf("}", metaStart));
if (/border(-top)?:\s*1px/.test(metaRule)) {
  console.error("Matter must not draw a horizontal rule under the description");
  process.exit(1);
}
const lineCrop = css.slice(css.indexOf(".if-crop-lijn {"), css.indexOf("}", css.indexOf(".if-crop-lijn {")));
if (!/width:\s*348px/.test(lineCrop) || /width:\s*420px/.test(lineCrop)) {
  console.error("Line crop type must wrap inside the tile, not clip mid-word");
  process.exit(1);
}
if (crops.includes("the weeks follow it")) {
  console.error("Line crop must not run a sentence through the tile edge");
  process.exit(1);
}
const roomCrop = css.slice(css.indexOf(".if-crop-kamer {"), css.indexOf("}", css.indexOf(".if-crop-kamer {")));
if (!/width:\s*348px/.test(roomCrop) || /width:\s*440px/.test(roomCrop)) {
  console.error("Room crop type must wrap inside the tile, not clip mid-word");
  process.exit(1);
}
const lineScene = readFileSync(join(dir, "line", "scene.css"), "utf8");
if (!lineScene.includes("--sc-ai-measure") || !lineScene.includes("calc(100% - 80px)")) {
  console.error("Line composer must be a centered measure in the pane, not a full-width bar");
  process.exit(1);
}
const dockStart = lineScene.indexOf(".sc-ai-dock {");
const dockRule = lineScene.slice(dockStart, lineScene.indexOf("}", dockStart));
if (/border-top:\s*1px/.test(dockRule)) {
  console.error("Line dock must not be a full-pane bar");
  process.exit(1);
}
if (/line-height:\s*44px/.test(lineScene)) {
  console.error("Line composer type must sit in the middle of the field");
  process.exit(1);
}
if (/font:\s*[^;]*\binherit\b/.test(lineScene)) {
  console.error("Line type must use longhand font-family inherit; font shorthand with inherit is invalid");
  process.exit(1);
}
if (!lineScene.includes("padding: 8px 20px") || !lineScene.includes(".sc-ai-brand { padding: 16px 20px 8px; }")) {
  console.error("Line rail must sit on the 20px module pad, not tight 16px");
  process.exit(1);
}

for (const name of names) {
  if (!catalog.includes(`title: "${name}"`)) {
    console.error(`catalog.ts is missing fictional title: ${name}`);
    process.exit(1);
  }
}
if (/slug: "(ai-tool|dashboard|threads|fleet|delivery|slack)"/.test(catalog)) {
  console.error("Catalog slugs must match the English names, not the old category routes");
  process.exit(1);
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

if (!existsSync(join(dir, "night", "map.tsx"))) {
  console.error("Night proto must keep its three.js map in night/map.tsx");
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
if (!map.includes("No rule under the description")) {
  console.error("FEATURE.md must drop the page rule under the description");
  process.exit(1);
}
if (!map.includes("fictional little app") || !map.includes("poster crop")) {
  console.error("FEATURE.md must lock fictional apps and poster crops");
  process.exit(1);
}
if (!map.includes("Icon")) {
  console.error("FEATURE.md must lock Raster Icon marks");
  process.exit(1);
}
if (!map.includes("--radius-sm") || !/not pills/i.test(map)) {
  console.error("FEATURE.md must lock cards and boxes to --radius-sm, not pills");
  process.exit(1);
}
if (existsSync(join(dir, "scene-fonts.ts"))) {
  console.error("Scenes must use Inter, not extra display faces");
  process.exit(1);
}

const productSkin = /Fraunces|Source_Serif|IBM_Plex|Newsreader|Iowan|Palatino|#c96442|#e08b6a|#3e1242|#007a5a|#1f8a78|#c45c26|#3ddec4|#ff6b4a|#1264a3|#5b2c6f|#071014|aubergine/i;
const allowedRadius = /^(0|50%|var\(--radius-sm\)|var\(--radius\))$/;
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
    console.error(`${slug} cards and boxes use --radius-sm; chrome stays 0; not pills`);
    process.exit(1);
  }
  if (/border-radius:\s*(999|9999|100vw)/.test(scene)) {
    console.error(`${slug} must not use pill radius`);
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
  if (/title="(Line|Press|Wall|Night|Evening|Room)"/.test(board)) {
    console.error(`${slug} product chrome must use catalog what, not the codename`);
    process.exit(1);
  }
  if (!board.includes('from "@noorddev/raster-react"') || !board.includes("<Icon ")) {
    console.error(`${slug} board must use Raster Icon marks, not a second family`);
    process.exit(1);
  }
  if (/lucide-react|@heroicons|heroicons/.test(board + scene)) {
    console.error(`${slug} must not import Lucide or Heroicons`);
    process.exit(1);
  }
  const marks = [...board.matchAll(/<Icon name="([a-z0-9-]+)"/g)].map((m) => m[1]);
  if (new Set(marks).size < 7) {
    console.error(`${slug} board must use more Raster Icon marks on nav, lists, and chrome`);
    process.exit(1);
  }
  const needed = {
    line: ["plus", "send", "quote", "inbox"],
    press: ["layout", "printer", "calendar"],
    wall: ["rows", "thumbs-up", "users"],
    night: ["truck", "map-pin", "globe"],
    evening: ["bag", "search", "wallet"],
    room: ["hash", "send", "message"],
  };
  for (const name of needed[slug]) {
    if (!board.includes(`"${name}"`)) {
      console.error(`${slug} board must use the ${name} Raster mark`);
      process.exit(1);
    }
  }
  if (/border-left:\s*2px solid transparent/.test(scene)) {
    console.error(`${slug} sidebar must not mark selected with a left rail`);
    process.exit(1);
  }
}

const wallBoard = readFileSync(join(dir, "wall", "board.tsx"), "utf8");
const wallScene = readFileSync(join(dir, "wall", "scene.css"), "utf8");
if (wallBoard.includes('aria-label="Thread"') || !wallBoard.includes('aria-label="Feed"')) {
  console.error("Wall primary view must be a feed, not a thread");
  process.exit(1);
}
const wallCard = wallScene.slice(wallScene.indexOf(".sc-wall-card {"), wallScene.indexOf("}", wallScene.indexOf(".sc-wall-card {")));
if (!wallCard.includes("var(--radius-sm)")) {
  console.error("Wall feed cards must use --radius-sm, the button radius");
  process.exit(1);
}

const eveningBoard = readFileSync(join(dir, "evening", "board.tsx"), "utf8");
const eveningScene = readFileSync(join(dir, "evening", "scene.css"), "utf8");
if (!eveningBoard.includes("sc-evening-store") || !eveningBoard.includes("Bag")) {
  console.error("Evening must be a store market with a bag, not a thin kitchen list");
  process.exit(1);
}
const eveningStore = eveningScene.slice(eveningScene.indexOf(".sc-evening-store {"), eveningScene.indexOf("}", eveningScene.indexOf(".sc-evening-store {")));
const eveningSearch = eveningScene.slice(eveningScene.indexOf(".sc-evening-search {"), eveningScene.indexOf("}", eveningScene.indexOf(".sc-evening-search {")));
const eveningSeg = eveningScene.slice(eveningScene.indexOf(".sc-evening-seg {"), eveningScene.indexOf("}", eveningScene.indexOf(".sc-evening-seg {")));
const eveningSegBtn = eveningScene.slice(eveningScene.indexOf(".sc-evening-seg button {"), eveningScene.indexOf("}", eveningScene.indexOf(".sc-evening-seg button {")));
if (!eveningStore.includes("var(--radius-sm)") || !eveningSearch.includes("var(--radius-sm)") || !eveningSeg.includes("var(--radius-sm)")) {
  console.error("Evening cards and boxes must use --radius-sm, the button radius");
  process.exit(1);
}
if (!/border-radius:\s*0/.test(eveningSegBtn)) {
  console.error("Evening filter segments must stay square inside, not pills");
  process.exit(1);
}
const eveningPhoneAt = eveningScene.lastIndexOf("@media (max-width: 640px)");
const eveningPhone = eveningPhoneAt >= 0 ? eveningScene.slice(eveningPhoneAt) : "";
if (eveningPhone.includes("72px minmax(0, 1fr)") || /grid-template-columns:\s*1fr 1fr/.test(eveningPhone)) {
  console.error("Evening at 640 must be a text kitchen list, not a two-column or thumb-left grid");
  process.exit(1);
}
if (!eveningBoard.includes("sc-evening-v1") || !eveningBoard.includes("De Buren") || !eveningBoard.includes("Canal kitchen") || !eveningBoard.includes("North bakery") || !eveningBoard.includes("Folsom counter")) {
  console.error("Evening phone V1 must list De Buren, Canal kitchen, North bakery, and Folsom counter");
  process.exit(1);
}
if (!eveningBoard.includes("if-thumb") || !eveningBoard.includes("Stores") || !eveningBoard.includes("Bag")) {
  console.error("Evening must keep Stores, Bag, and phone chrome");
  process.exit(1);
}
if (!eveningPhone.includes("sc-evening-stores") || !eveningPhone.includes("display: none")) {
  console.error("Evening phone must hide photo store cards");
  process.exit(1);
}

const wallPhoneAt = wallScene.lastIndexOf("@media (max-width: 640px)");
const wallPhone = wallPhoneAt >= 0 ? wallScene.slice(wallPhoneAt) : "";
if (!wallBoard.includes("sc-wall-faces") || !wallBoard.includes("sc-wall-v1")) {
  console.error("Wall must keep desktop faces and a V1 text feed of keepers");
  process.exit(1);
}
if (!wallPhone.includes("sc-wall-faces") || !wallPhone.includes("display: none")) {
  console.error("Wall phone V1 must hide the people strip");
  process.exit(1);
}
if (!wallPhone.includes("sc-wall-rail { display: none")) {
  console.error("Wall phone must hide the desktop people rail, not squeeze it");
  process.exit(1);
}
if (wallPhone.includes("max-height: 168px") || wallPhone.includes("height: 168px")) {
  console.error("Wall phone V1 must not show post photos");
  process.exit(1);
}
if (!wallPhone.includes("sc-wall-open em") || !wallPhone.includes("display: none")) {
  console.error("Wall phone V1 must hide likes/comments meta");
  process.exit(1);
}
if (!wallBoard.includes("Aziez") || !wallBoard.includes("Gianpiero") || !wallBoard.includes("On the rail before the street.")) {
  console.error("Wall phone V1 must keep all four keepers in the text feed");
  process.exit(1);
}

const lineScenePhoneAt = lineScene.lastIndexOf("@media (max-width: 640px)");
const linePhone = lineScenePhoneAt >= 0 ? lineScene.slice(lineScenePhoneAt) : "";
if (!linePhone.includes('data-pane="thread"') || !linePhone.includes("display: none")) {
  console.error("Line phone must hide the chat rail on the thread pane");
  process.exit(1);
}
if (!linePhone.includes("width: 100%") || !linePhone.includes(".sc-ai-composer")) {
  console.error("Line phone V1 composer must fill the dock, not a missing measure");
  process.exit(1);
}
const lineSendOff = linePhone.match(/\.sc-ai-send:disabled\s*\{[^}]*\}/);
if (!lineSendOff || !/opacity:\s*1/.test(lineSendOff[0])) {
  console.error("Line phone V1 Send stays ink when the field is empty");
  process.exit(1);
}
if (!linePhone.includes("grid-row: 1") || !linePhone.includes("grid-row: 2")) {
  console.error("Line phone V1 must pin status and nav above the inbox");
  process.exit(1);
}

const pressScene = readFileSync(join(dir, "press", "scene.css"), "utf8");
const pressPhoneAt = pressScene.lastIndexOf("@media (max-width: 640px)");
const pressPhone = pressPhoneAt >= 0 ? pressScene.slice(pressPhoneAt) : "";
if (!pressPhone.includes("sc-dash-nav") || !pressPhone.includes("display: none")) {
  console.error("Press phone must hide Floor nav, not stack it on the KPIs");
  process.exit(1);
}

const nightMap = readFileSync(join(dir, "night", "map.tsx"), "utf8");
if (!nightMap.includes("BUILDINGS") || !nightMap.includes("TubeGeometry")) {
  console.error("Night field must be a street of buildings with a route, not a flat grid");
  process.exit(1);
}
if (/PerspectiveCamera\(\s*32/.test(nightMap) || nightMap.includes("3.9, 3.35, 5.55")) {
  console.error("Night city must zoom out so street and lamps read; do not restore the wall crop");
  process.exit(1);
}
if (!nightMap.includes("fov: 46") || !nightMap.includes("fov: 50")) {
  console.error("Night camera FOV must stay wide enough to read the street");
  process.exit(1);
}
if (/position\.set\(\s*8\.2,\s*8\.4,\s*10\.5/.test(nightMap)) {
  console.error("Night city must fill the specimen; do not orbit to a toy-block crop");
  process.exit(1);
}
if (nightMap.includes("6.0, 6.4, 8.4") || nightMap.includes("6.8, 7.2, 9.2") || nightMap.includes("5.1, 5.5, 7.4")) {
  console.error("Night camera must go to city scale; do not keep the three-tower dolly");
  process.exit(1);
}
if (nightMap.includes("10.4, 12.8, 11.6") || nightMap.includes("12.2, 15.0, 13.6")) {
  console.error("Night camera must not restore the corner dolly that left a paper wedge");
  process.exit(1);
}
if (!nightMap.includes("x: 6.8, y: 16.8, z: 6.8") || !nightMap.includes("x: 7.6, y: 19.2, z: 7.6")) {
  console.error("Night map well must frame the city from overhead, not a street crop");
  process.exit(1);
}
if (!nightMap.includes("lookAt(LOOK_X, LOOK_Y, LOOK_Z)") || !nightMap.includes("const LOOK_X = 1.1")) {
  console.error("Night camera must look at the city center, not empty ground");
  process.exit(1);
}
if (!nightMap.includes("const CITY = 5") || !nightMap.includes("const PITCH = 2.2")) {
  console.error("Night field must instance a neighborhood of blocks, not three towers");
  process.exit(1);
}

const roomScene = readFileSync(join(dir, "room", "scene.css"), "utf8");
const roomPhoneAt = roomScene.lastIndexOf("@media (max-width: 640px)");
const roomPhone = roomPhoneAt >= 0 ? roomScene.slice(roomPhoneAt) : "";
if (!roomPhone.includes("width: auto") || !roomPhone.includes("align-self: stretch")) {
  console.error("Room phone V1 channels must shrink to the pane, not 100% plus side margin");
  process.exit(1);
}
const roomSendOff = roomPhone.match(/\.sc-room-dock button:disabled\s*\{[^}]*\}/);
if (!roomSendOff || !/opacity:\s*1/.test(roomSendOff[0])) {
  console.error("Room phone V1 Send stays ink when the field is empty");
  process.exit(1);
}

const people = readFileSync(join(dir, "people.tsx"), "utf8");
const roomBoard = readFileSync(join(dir, "room", "board.tsx"), "utf8");
if (/Inez Veld|Karel Vos|Loes Hart|Bram Nijk|Maya Ort|Owen Hart/.test(people + wallBoard + roomBoard)) {
  console.error("Interfaces people must come from renatovaldes.com/work, not invented names");
  process.exit(1);
}
const keepers = ["Aziez Soekha", "Jenny Lo", "Koen Bok", "Gianpiero Puleo"];
if (keepers.some((name) => !people.includes(name))) {
  console.error("Interfaces people must keep Aziez, Jenny, Koen, and Gianpiero from /work");
  process.exit(1);
}
const forbidden = /\b(Katie|Christian|Senka|Ilana)\b/;
const specimenPaths = [
  join(root, "apps/www/app/specimen.ts"),
  join(root, "packages/cli/src/starter.html"),
  join(root, "apps/www/app/page.tsx"),
];
for (const file of [...walk(dir), ...specimenPaths.filter((path) => existsSync(path))]) {
  if (forbidden.test(readFileSync(file, "utf8"))) {
    console.error(`Katie, Christian, Senka, and Ilana cannot return in Interfaces or specimen copy: ${file}`);
    process.exit(1);
  }
}
const portraits = join(root, "apps/www/public/interfaces/people");
for (const name of ["aziez", "jenny", "koen", "gianpiero"]) {
  if (!existsSync(join(portraits, `${name}.jpg`))) {
    console.error(`Keeper portrait missing: ${name}.jpg`);
    process.exit(1);
  }
}
for (const name of ["katie", "christian", "senka", "ilana"]) {
  if (existsSync(join(portraits, `${name}.jpg`))) {
    console.error(`Forbidden portrait must not ship: ${name}.jpg`);
    process.exit(1);
  }
}
if (!catalog.includes('what: "AI chat"') || !catalog.includes('what: "Dashboard"') || !catalog.includes('what: "Social feed"') || !catalog.includes('what: "Fleet management"') || !catalog.includes('what: "Order out"') || !catalog.includes('what: "Team chat"')) {
  console.error("Catalog must lock the six Interfaces: AI chat, Dashboard, Social feed, Fleet management, Order out, Team chat");
  process.exit(1);
}
const markSrc = readFileSync(join(dir, "mark.tsx"), "utf8");
if (!markSrc.includes("interfaceBySlug") || !markSrc.includes("item?.what")) {
  console.error("Brand must read catalog what, not a hardcoded codename");
  process.exit(1);
}
for (const slug of slugs) {
  const board = readFileSync(join(dir, slug, "board.tsx"), "utf8");
  if (!board.includes("interfaceBySlug") || !board.includes("aria-label={WHAT}")) {
    console.error(`${slug} product chrome must expose catalog what`);
    process.exit(1);
  }
}

console.log(`ok: ${slugs.length} Interfaces routes`);
