// Generates every derived artifact from the sources of truth:
//
//   src/tokens.ts     →  tokens/raster.tokens.json   (tokens as JSON)
//                     →  css/tokens.css              (custom properties)
//   css/* sources     →  css/raster.css              (the whole system, one file)
//   src/legacy.ts     →  css/raster-compat.css       (0.1 class names)
//
// Run with: npm run build:css  (Node ≥ 22.6)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { rasterTokens } from "../src/tokens.ts";
import { rasterComponents } from "../src/registry.ts";
import { toLegacyCss } from "../src/legacy.ts";

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const read = (p) => readFileSync(root(p), "utf8");
const write = (p, text) => {
  writeFileSync(root(p), text);
  console.log(`wrote ${p} (${text.length} bytes)`);
};

/* ── 1. Tokens as JSON ── */
write("tokens/raster.tokens.json", JSON.stringify(rasterTokens, null, 2) + "\n");

/* ── 2. Tokens as CSS custom properties ── */
const { color, grid, radius, control, motion, type } = rasterTokens;
const c1 = grid.column;
const gridImage = `linear-gradient(to right,var(--grid-line) 0,var(--grid-line) 1px,transparent 1px,transparent ${c1}px,var(--grid-line) ${c1}px,var(--grid-line) ${c1 + 1}px,transparent ${c1 + 1}px,transparent ${grid.module}px)`;

const tokensCss = `/* ── Tokens ── GENERATED from src/tokens.ts. Do not edit by hand. */
:root {
  --bg: ${color.light.paper};                        /* paper */
  --text: ${color.light.ink};                      /* ink */
  --text-secondary: ${color.light.gray};            /* gray */
  --accent: ${color.light.ink};                   /* the "accent" is ink; monochrome */
  --divider: ${color.light.divider};
  --divider-subtle: ${color.light.dividerSubtle};
  --table-alt: ${color.light.tableAlt};
  --grid-line: ${color.light.gridLine};
  --radius-sm: ${radius.small}px;           /* slight Raster radius; standalone buttons */
  --radius: var(--radius-sm);              /* alias — buttons, boxes, dialogs share it; cards stay 0 */
  --radius-chrome: ${radius.chrome}px;
  --gutter: ${grid.gutter}px;
  --pad: ${grid.pad}px;
  /* Concentric: Steve Ruiz innerRadius result. Closed form of the circular-corner fit. Default radius vs --pad is 0. */
  --radius-in: max(0px, calc(var(--radius) - var(--pad)));
  --ease: ${motion.easing};
  --duration-snap: ${motion.snap};
  --duration: ${motion.ease};
  --duration-confirm: ${motion.confirm};
  --transition: background-color var(--duration) var(--ease), color var(--duration) var(--ease);
  /* Background column grid: ${grid.module}px modules (${grid.column} column + ${grid.gutter} gutter). */
  --grid-image: ${gridImage};
  --grid-size: ${grid.module}px;
  --grid-pos: ${grid.gutter}px 0;
  --text-scale: ${type.textScale.default};
  /* Control scale. Desktop is the Raster poster; phone recuts in phone.css. */
  --hit: ${control.desktop.hit}px;
  --control-h: ${control.desktop.height}px;
  --control-fs: ${control.desktop.font}px;
  --control-label: ${control.desktop.label}px;
}
[data-theme="dark"] {
  --bg: ${color.dark.black};
  --text: ${color.dark.white};
  --text-secondary: ${color.dark.gray};
  --accent: ${color.dark.white};
  --divider: ${color.dark.divider};
  --divider-subtle: ${color.dark.dividerSubtle};
  --table-alt: ${color.dark.tableAlt};
  --grid-line: ${color.dark.gridLine};
}
/* Mobile grid (≤${grid.mobile.breakpoint}): two fluid columns, three ${grid.mobile.gutter}px gutters
   (edge · middle · edge). Column width = 50vw − ${grid.mobile.gutter * 1.5}px; the background
   draws all four column-edge lines and content lives between the outer pair. */
@media(max-width:${grid.mobile.breakpoint}px){
  :root{
    --pad:${grid.mobile.pad}px;
    --grid-image:linear-gradient(to right,transparent 0,transparent ${grid.mobile.gutter}px,var(--grid-line) ${grid.mobile.gutter}px,var(--grid-line) ${grid.mobile.gutter + 1}px,transparent ${grid.mobile.gutter + 1}px,transparent calc(50vw - ${grid.mobile.gutter / 2}px),var(--grid-line) calc(50vw - ${grid.mobile.gutter / 2}px),var(--grid-line) calc(50vw - ${grid.mobile.gutter / 2 - 1}px),transparent calc(50vw - ${grid.mobile.gutter / 2 - 1}px),transparent calc(50vw + ${grid.mobile.gutter / 2}px),var(--grid-line) calc(50vw + ${grid.mobile.gutter / 2}px),var(--grid-line) calc(50vw + ${grid.mobile.gutter / 2 + 1}px),transparent calc(50vw + ${grid.mobile.gutter / 2 + 1}px),transparent calc(100vw - ${grid.mobile.gutter + 1}px),var(--grid-line) calc(100vw - ${grid.mobile.gutter + 1}px),var(--grid-line) calc(100vw - ${grid.mobile.gutter}px),transparent calc(100vw - ${grid.mobile.gutter}px));
    --grid-size:100vw;
    --grid-pos:0 0;
  }
}
/* Phone control scale (≤${control.breakpoint}): 44pt hits, 16px type on fields. */
@media(max-width:${control.breakpoint}px){
  :root{
    --hit:${control.phone.hit}px;
    --control-h:${control.phone.height}px;
    --control-fs:${control.phone.font}px;
    --control-label:${control.phone.label}px;
  }
}
`;
write("css/tokens.css", tokensCss);

/* ── 3. The whole system as one file ── */
const componentFiles = [];
for (const component of rasterComponents) {
  for (const file of component.css) {
    if (!componentFiles.includes(file)) componentFiles.push(file);
  }
}
const sources = ["fonts.css", "tokens.css", "base.css", "type.css", ...componentFiles, "phone.css", "motion.css"];

const banner = `/* ═══════════════════════════════════════════════════════════════════
   RASTER, a monochrome, CSS-first design system.
   ${rasterTokens.meta.url}

   One ink, no accent hue: emphasis comes from weight, size, and
   spacing. Hairline borders, a ${grid.module}px module grid (${grid.column}px column +
   ${grid.gutter}px gutter), sentence case everywhere.

   GENERATED from the css/ sources. Edit those, then run
   \`npm run build:css\`. Tokens come from src/tokens.ts.

   Typeface: Inter (SIL OFL 1.1), variable, latin + latin-ext.
   Bundled. System sans is fallback only.
   ═══════════════════════════════════════════════════════════════════ */

`;

const rasterCss = banner + sources.map((f) => read(`css/${f}`)).join("\n");
write("css/raster.css", rasterCss);

/* ── 4. Compat layer: the 0.1 class names ── */
const compatBanner = `/* RASTER COMPAT, GENERATED. Re-emits Raster rules under the 0.1
   class names (bb-*, lib-*, bare table elements) so sites built on
   them keep working. Link this after raster.css; drop it once your
   markup uses the rs- names. */

`;
const compatParts = [];
for (const f of sources) {
  const source = read(`css/${f}`);
  const legacy = toLegacyCss(source);
  if (legacy !== source) compatParts.push(legacy);
}
mkdirSync(root("css"), { recursive: true });
write("css/raster-compat.css", compatBanner + compatParts.join("\n"));
