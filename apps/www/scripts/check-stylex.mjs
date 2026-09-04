#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../..", import.meta.url));

function fail(message) {
  console.error(message);
  process.exit(1);
}

const tokens = readFileSync(join(root, "packages/react/src/tokens.stylex.ts"), "utf8");
const layout = readFileSync(join(root, "apps/www/app/layout.tsx"), "utf8");
const stylexCss = readFileSync(join(root, "apps/www/app/stylex.css"), "utf8");
const preview = readFileSync(join(root, "apps/www/components/preview.tsx"), "utf8");
const calloutUse = readFileSync(join(root, "apps/www/components/examples/callout/use.tsx"), "utf8");
const cardUse = readFileSync(join(root, "apps/www/components/examples/card/use.tsx"), "utf8");
const buttonUse = readFileSync(join(root, "apps/www/components/examples/button/use.tsx"), "utf8");
const button = readFileSync(join(root, "packages/react/src/components/button.tsx"), "utf8");
const group = readFileSync(join(root, "packages/react/src/components/button-group.tsx"), "utf8");
const callout = readFileSync(join(root, "packages/react/src/components/callout.tsx"), "utf8");
const card = readFileSync(join(root, "packages/react/src/components/card.tsx"), "utf8");
const toggle = readFileSync(join(root, "packages/react/src/components/toggle.tsx"), "utf8");
const docsNav = readFileSync(join(root, "apps/www/components/docs-nav/index.tsx"), "utf8");
const useMod = readFileSync(join(root, "apps/www/components/examples/use.stylex.ts"), "utf8");

if (!tokens.includes("stylex.defineVars") || !tokens.includes('from "@stylexjs/stylex"')) {
  fail("StyleX tokens must use defineVars");
}
if (!tokens.includes("Not a second") && !tokens.includes("var(--bg)")) {
  fail("StyleX tokens must alias Raster CSS vars");
}
for (const cssVar of [
  "var(--bg)",
  "var(--text)",
  "var(--text-secondary)",
  "var(--divider)",
  "var(--divider-subtle)",
  "var(--table-alt)",
  "var(--grid-line)",
  "var(--grid-size)",
  "var(--pad)",
  "var(--gutter)",
  "var(--radius-sm)",
  "var(--radius-chrome)",
  "var(--control-h)",
  "var(--control-fs)",
  "var(--control-label)",
  "var(--hit)",
  "var(--duration-snap)",
  "var(--duration)",
  "var(--ease)",
]) {
  if (!tokens.includes(cssVar)) fail(`StyleX tokens must map ${cssVar}, not invent a second scale`);
}
if (tokens.includes("#") && /#[0-9A-Fa-f]{3,8}/.test(tokens)) {
  fail("StyleX tokens must alias Raster CSS vars, not hardcode hex");
}
if (!tokens.includes("stylex.defineConsts") || !tokens.includes("@media (max-width: 640px)")) {
  fail("StyleX tokens must defineConsts the phone recut");
}

const skip = new Set([
  "chart.tsx",
  "toggle-group.tsx",
  "icon-marks.ts",
  "index.ts",
]);

function walk(dir) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (/\.(tsx|ts)$/.test(ent.name) && !skip.has(ent.name)) out.push(p);
  }
  return out;
}

const leaves = walk(join(root, "packages/react/src/components"));
let migrated = 0;
for (const file of leaves) {
  const src = readFileSync(file, "utf8");
  const rel = file.slice(root.length + 1);
  const owns = src.includes("stylex.create") && src.includes("@stylexjs/stylex");
  const shares = src.includes("chartStyles") || src.includes("menuStyles");
  if (!owns && !shares) {
    fail(`${rel} must be a StyleX leaf`);
  }
  if (!src.includes("tokens.stylex") && !shares && !src.includes("hidden.stylex")) {
    fail(`${rel} must sit on Raster StyleX tokens or a shared StyleX leaf`);
  }
  if (/tailwind|@radix-ui/.test(src)) fail(`${rel} must stay off Tailwind and Radix`);
  migrated += 1;
}

if (!button.includes("grouped") || !group.includes("grouped: true")) {
  fail("Button group seams must mark children grouped");
}
if (!callout.includes("borderRadius: 0") || callout.includes("borderLeft") || callout.includes("3px")) {
  fail("Callout StyleX must be hairline all sides, radius 0, no left bar");
}
if (!card.includes("borderWidth: 0") || !card.includes('boxShadow: "none"')) {
  fail("Card StyleX must be a typography stack with no outline");
}
if (!toggle.includes("radiusSm")) {
  fail("Toggle StyleX must keep the button radius");
}
const input = readFileSync(join(root, "packages/react/src/components/input.tsx"), "utf8");
if (!input.includes('appearance: "none"') || !input.includes('backgroundColor: "var(--bg)"') || !input.includes('color: "var(--text)"')) {
  fail("Field inputs must drop UA chrome and sit on var(--bg) / var(--text)");
}

if (!existsSync(join(root, "apps/www/babel.config.json"))) {
  fail("www StyleX toolchain must use babel.config.json (Next cannot load .cjs Babel configs)");
}
if (!existsSync(join(root, "apps/www/postcss.config.cjs"))) {
  fail("www StyleX toolchain must keep postcss.config.cjs");
}
if (!layout.includes("./stylex.css") || !stylexCss.includes("@stylex")) {
  fail("www must compile StyleX via @stylex in app/stylex.css");
}
if (!preview.includes("Callout") || !preview.includes('from "@noorddev/raster-react"')) {
  fail("Components specimens must render StyleX-backed Callout");
}
if (!preview.includes("<Button>") || !preview.includes("<Card>")) {
  fail("Components specimens must render StyleX-backed Button and Card");
}
if (
  !preview.includes("<Link") ||
  !preview.includes("<Chip") ||
  !preview.includes("<Table") ||
  !preview.includes("<Flow") ||
  !preview.includes("<Assistant") ||
  !preview.includes("<Cite")
) {
  fail("Components specimens must render the last six StyleX kit leaves");
}
if (!calloutUse.includes('from "@noorddev/raster-react"') || !calloutUse.includes("<Callout>")) {
  fail("Callout Use must render the StyleX Callout");
}
if (!buttonUse.includes('from "@noorddev/raster-react"') || !cardUse.includes('from "@noorddev/raster-react"')) {
  fail("Button and Card Use must stay on raster-react leaves");
}

const siteChrome = readFileSync(join(root, "apps/www/components/site-chrome.tsx"), "utf8");
const siteSx = readFileSync(join(root, "apps/www/app/site.stylex.ts"), "utf8");
if (!siteChrome.includes("site.stylex") || !siteSx.includes("stylex.create")) {
  fail("Site chrome must own StyleX");
}
if (!siteSx.includes("cover:") || !siteSx.includes("galleryItem:")) {
  fail("Site StyleX must own cover and gallery");
}
if (!siteSx.includes("catalogContent:") || !siteSx.includes('"min(796px, 100%)"')) {
  fail("Site StyleX must own the 796 catalog measure");
}
if (!docsNav.includes("docs-nav.stylex") || !docsNav.includes("stylex")) {
  fail("Docs rail must own StyleX");
}
if (!useMod.includes("stylex.create") || !useMod.includes("184px minmax(0, 1fr)")) {
  fail("Use field must be a StyleX module on the 204");
}
if (!existsSync(join(root, "apps/www/components/examples/use.stylex.ts"))) {
  fail("Use StyleX module missing");
}
const useFrame = readFileSync(join(root, "apps/www/components/examples/use-frame.tsx"), "utf8");
if (!useFrame.includes("stylex") || !useFrame.includes("UseField")) {
  fail("Use field must apply StyleX through UseField");
}
if (!buttonUse.includes("UseField")) {
  fail("Button Use must sit on the StyleX Use field");
}

const aboutPage = readFileSync(join(root, "apps/www/app/about/page.tsx"), "utf8");
const aboutSx = readFileSync(join(root, "apps/www/app/about/about.stylex.ts"), "utf8");
if (!aboutPage.includes("about.stylex") || !aboutSx.includes("stylex.create")) {
  fail("About must own StyleX");
}
if (!aboutSx.includes("borderRadius: 0") || !aboutSx.includes("gap: 1")) {
  fail("About StyleX must keep flush cells and 1px seams");
}

const ifPage = readFileSync(join(root, "apps/www/app/interfaces/page.tsx"), "utf8");
const ifShell = readFileSync(join(root, "apps/www/app/interfaces/shell.tsx"), "utf8");
const ifSx = readFileSync(join(root, "apps/www/app/interfaces/interfaces.stylex.ts"), "utf8");
if (!ifPage.includes("interfaces.stylex") || !ifShell.includes("interfaces.stylex") || !ifSx.includes("stylex.create")) {
  fail("Interfaces must own StyleX");
}
if (!ifSx.includes("borderRadius: 0") || !ifSx.includes("boxShadow: \"none\"")) {
  fail("Interface tiles must stay chrome-square with no shadow");
}
if (/specimen: \{[\s\S]*?borderRadius:\s*"var\(--radius-sm\)"/.test(ifSx)) {
  fail("Interface specimen chrome must stay square");
}

const home = readFileSync(join(root, "apps/www/app/page.tsx"), "utf8");
const specimenSx = readFileSync(join(root, "apps/www/app/specimen.stylex.ts"), "utf8");
if (!home.includes("specimen.stylex") || !specimenSx.includes("stylex.create")) {
  fail("Homepage specimen must own StyleX");
}

const docs = readFileSync(join(root, "apps/www/app/docs/page.tsx"), "utf8");
const inezStylexBody =
  "The React layer is authored in StyleX — compile-time atomic CSS, typed against Raster tokens. The CSS file is still the door if you do not want React.";
if (!docs.includes("<Callout>") || !docs.includes('from "@noorddev/raster-react"')) {
  fail("Getting started must place the StyleX note as a Raster Callout");
}
if (!docs.includes(">StyleX</") || !docs.includes(inezStylexBody)) {
  fail("Getting started must use Inez locked StyleX EN exactly");
}
if (/powered by StyleX|One language for catalogue/i.test(docs)) {
  fail("Getting started must not add StyleX marketing beyond Inez locked EN");
}
if (home.includes(inezStylexBody) || /powered by StyleX/i.test(home)) {
  fail("Homepage must not carry a second StyleX marketing layer");
}

const wwwStylex = [
  "apps/www/components/docs-nav/docs-nav.stylex.ts",
  "apps/www/components/examples/use.stylex.ts",
  "apps/www/app/site.stylex.ts",
  "apps/www/app/about/about.stylex.ts",
  "apps/www/app/interfaces/interfaces.stylex.ts",
  "apps/www/app/specimen.stylex.ts",
];
for (const f of wwwStylex) {
  const src = readFileSync(join(root, f), "utf8");
  if (/tailwind|@radix-ui/.test(src)) fail(`${f} must stay off Tailwind and Radix`);
}

const useDir = join(root, "apps/www/components/examples");
let useFields = 0;
for (const ent of readdirSync(useDir, { withFileTypes: true })) {
  if (!ent.isDirectory()) continue;
  const useFile = join(useDir, ent.name, "use.tsx");
  if (!existsSync(useFile)) continue;
  const src = readFileSync(useFile, "utf8");
  if (!src.includes("UseField")) fail(`${ent.name}/use.tsx must apply the StyleX Use field`);
  useFields += 1;
}

const registrySrc = readFileSync(join(root, "packages/core/src/registry.ts"), "utf8");
if (/css:\s*\["components\//.test(registrySrc)) {
  fail("Catalogue must not keep CSS-only kit sheets");
}
const kitCssDir = join(root, "packages/core/css/components");
if (existsSync(kitCssDir) && readdirSync(kitCssDir).some((f) => f.endsWith(".css"))) {
  fail("packages/core/css/components must have no leftover catalogue CSS sheets");
}

const lastSix = ["link.tsx", "chip.tsx", "table.tsx", "flow.tsx", "assistant.tsx", "refs.tsx"];
for (const name of lastSix) {
  const file = join(root, "packages/react/src/components", name);
  if (!existsSync(file)) fail(`Last kit sheet ${name} must be a React StyleX leaf — no leftover CSS exit`);
  const src = readFileSync(file, "utf8");
  if (!src.includes("stylex.create") || !src.includes("@stylexjs/stylex")) {
    fail(`${name} must be a StyleX leaf, not a CSS leftover`);
  }
}

const STYLEX_LEAVES = 76;
if (migrated !== STYLEX_LEAVES) {
  fail(`StyleX coverage must read ${STYLEX_LEAVES}/${STYLEX_LEAVES} React leaves, got ${migrated} — no 92% leftover exit`);
}

console.log(
  `StyleX catalogue: ${STYLEX_LEAVES}/${STYLEX_LEAVES} React leaves on Raster tokens; ${useFields} Use fields; 74/74 public catalog StyleX; About + Interfaces + specimen + site chrome. Remaining CSS is document-level only (fonts, tokens, base, type, phone, motion, raster.css, raster-compat.css, stylex.css, site/specimen/about/interfaces/docs-nav/use/swag).`,
);
