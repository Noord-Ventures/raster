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
if (!docsNav.includes("docs-nav.stylex") || !docsNav.includes("stylex")) {
  fail("Docs rail must own StyleX");
}
if (!useMod.includes("stylex.create") || !useMod.includes("184px minmax(0, 1fr)")) {
  fail("Use field must be a StyleX module on the 204");
}
if (!existsSync(join(root, "apps/www/components/examples/use.stylex.ts"))) {
  fail("Use StyleX module missing");
}

const wwwStylex = [
  "apps/www/components/docs-nav/docs-nav.stylex.ts",
  "apps/www/components/examples/use.stylex.ts",
];
for (const f of wwwStylex) {
  const src = readFileSync(join(root, f), "utf8");
  if (/tailwind|@radix-ui/.test(src)) fail(`${f} must stay off Tailwind and Radix`);
}

console.log(`StyleX catalogue: ${migrated} React leaves on Raster tokens; docs-nav + Use modules; CSS-first sheets remain for CLI/registry.`);
