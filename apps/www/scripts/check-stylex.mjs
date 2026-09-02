#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../..", import.meta.url));

function fail(message) {
  console.error(message);
  process.exit(1);
}

const tokens = readFileSync(join(root, "packages/react/src/tokens.stylex.ts"), "utf8");
const button = readFileSync(join(root, "packages/react/src/components/button.tsx"), "utf8");
const group = readFileSync(join(root, "packages/react/src/components/button-group.tsx"), "utf8");
const callout = readFileSync(join(root, "packages/react/src/components/callout.tsx"), "utf8");
const card = readFileSync(join(root, "packages/react/src/components/card.tsx"), "utf8");
const layout = readFileSync(join(root, "apps/www/app/layout.tsx"), "utf8");
const stylexCss = readFileSync(join(root, "apps/www/app/stylex.css"), "utf8");
const preview = readFileSync(join(root, "apps/www/components/preview.tsx"), "utf8");
const calloutUse = readFileSync(join(root, "apps/www/components/examples/callout/use.tsx"), "utf8");
const cardUse = readFileSync(join(root, "apps/www/components/examples/card/use.tsx"), "utf8");
const buttonUse = readFileSync(join(root, "apps/www/components/examples/button/use.tsx"), "utf8");
const coreCss = readFileSync(join(root, "packages/core/css/raster.css"), "utf8");
const buttonCss = readFileSync(join(root, "packages/core/css/components/button.css"), "utf8");
const calloutCss = readFileSync(join(root, "packages/core/css/components/callout.css"), "utf8");
const cardCss = readFileSync(join(root, "packages/core/css/components/card.css"), "utf8");

if (!tokens.includes("stylex.defineVars") || !tokens.includes('from "@stylexjs/stylex"')) {
  fail("StyleX tokens must use defineVars");
}
if (!tokens.includes("Not a second") && !tokens.includes("var(--bg)")) {
  fail("StyleX tokens must alias Raster CSS vars");
}
for (const cssVar of [
  "var(--bg)",
  "var(--text)",
  "var(--divider)",
  "var(--grid-size)",
  "var(--pad)",
  "var(--radius-sm)",
  "var(--control-h)",
  "var(--hit)",
]) {
  if (!tokens.includes(cssVar)) fail(`StyleX tokens must map ${cssVar}, not invent a second scale`);
}
if (tokens.includes("#") && /#[0-9A-Fa-f]{3,8}/.test(tokens)) {
  fail("StyleX tokens must alias Raster CSS vars, not hardcode hex");
}

for (const [name, src] of [
  ["button", button],
  ["button-group", group],
  ["callout", callout],
  ["card", card],
]) {
  if (!src.includes("@stylexjs/stylex") || !src.includes("stylex.create") || !src.includes("from \"../tokens.stylex\"")) {
    fail(`${name} must be a StyleX leaf on Raster tokens`);
  }
  if (/tailwind|@radix-ui/.test(src)) fail(`${name} must stay off Tailwind and Radix`);
}

if (!button.includes("grouped") || !group.includes("grouped: true")) {
  fail("Button group seams must mark children grouped");
}
if (!callout.includes("borderRadius: 0") || callout.includes("borderLeft") || callout.includes("3px")) {
  fail("Callout StyleX must be hairline all sides, radius 0, no left bar");
}
if (!card.includes("borderWidth: 0") || !card.includes("boxShadow: \"none\"")) {
  fail("Card StyleX must be a typography stack with no outline");
}

if (!layout.includes("./stylex.css") || !stylexCss.includes("@stylex")) {
  fail("www must compile StyleX via @stylex in app/stylex.css");
}
if (!preview.includes("Callout") || !preview.includes("from \"@noorddev/raster-react\"")) {
  fail("Components specimens must render StyleX-backed Callout");
}
if (!preview.includes("<Button>") || !preview.includes("<Card>")) {
  fail("Components specimens must render StyleX-backed Button and Card");
}
if (!calloutUse.includes("from \"@noorddev/raster-react\"") || !calloutUse.includes("<Callout>")) {
  fail("Callout Use must render the StyleX Callout");
}
if (!buttonUse.includes("from \"@noorddev/raster-react\"") || !cardUse.includes("from \"@noorddev/raster-react\"")) {
  fail("Button and Card Use must stay on raster-react leaves");
}

if (!coreCss.includes(".rs-btn-primary") || !buttonCss.includes(".rs-btn-primary")) {
  fail("CSS-first button export must stay alive");
}
if (!calloutCss.includes(".rs-callout") || !cardCss.includes(".rs-card")) {
  fail("CSS-first callout and card exports must stay alive");
}

console.log("StyleX leaves: tokens map Raster vars; Button, Callout, Card; CSS coexistence.");
