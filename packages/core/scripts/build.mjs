// Generates every derived artifact from the sources of truth:
//
//   src/tokens.ts     →  tokens/raster.tokens.json   (tokens as JSON)
//                     →  css/tokens.css              (custom properties)
//   css/* sources     →  css/raster.css              (the whole system, one file)
//
// Run with: npm run build:css  (Node ≥ 22.6)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { rasterTokens } from "../src/tokens.ts";
import { rasterComponents } from "../src/registry.ts";

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

const darkBlock = (selector) => `${selector} {
  --bg: ${color.dark.black};
  --text: ${color.dark.white};
  --text-secondary: ${color.dark.gray};
  --accent: ${color.dark.white};
  --divider: ${color.dark.divider};
  --divider-subtle: ${color.dark.dividerSubtle};
  --table-alt: ${color.dark.tableAlt};
  --grid-line: ${color.dark.gridLine};
  --control-border: ${color.dark.controlBorder};
  color-scheme: dark;
}`;

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
  --control-border: ${color.light.controlBorder};
  color-scheme: light;
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
  /* Contract variables a component may set inline: concentric radius and the chart spot color. */
  --rs-out: var(--radius);
  --rs-gap: var(--pad);
  --rs-in: var(--radius-in);
  --rs-chart-spot: var(--text);
  /* Control scale. Desktop is the poster; ≤640 recuts every control to 44pt. */
  --hit: ${control.desktop.hit}px;
  --control-h: ${control.desktop.height}px;
  --control-fs: ${control.desktop.font}px;
  --control-label: ${control.desktop.label}px;
}
${darkBlock('[data-theme="dark"]')}
/* System dark scheme applies until the page decides with data-theme. */
@media (prefers-color-scheme: dark) {
${darkBlock(':root:not([data-theme="light"])')}
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
/* Cascade layers: every Raster rule sits in a named layer, so unlayered
   consumer CSS wins without specificity games. @font-face stays outside. */
const layered = [
  ["raster.tokens", ["tokens.css"]],
  ["raster.base", ["base.css"]],
  ["raster.type", ["type.css"]],
  ["raster.components", componentFiles],
  ["raster.touch", ["touch.css"]],
  ["raster.motion", ["motion.css"]],
];

const banner = `/* ═══════════════════════════════════════════════════════════════════
   RASTER, a monochrome, CSS-first design system.
   ${rasterTokens.meta.url}

   One ink, no accent hue: emphasis comes from weight, size, and
   spacing. Hairline borders, a ${grid.module}px module grid (${grid.column}px column +
   ${grid.gutter}px gutter), sentence case everywhere.

   Layers: ${layered.map(([name]) => name).join(", ")}.
   Your own unlayered CSS overrides any of it by default.

   GENERATED from the css/ sources. Edit those, then run
   \`npm run build:css\`. Tokens come from src/tokens.ts.

   Typeface: Inter (SIL OFL 1.1), variable, latin + latin-ext.
   Bundled. System sans is fallback only.
   ═══════════════════════════════════════════════════════════════════ */

`;

const rasterCss =
  banner +
  read("css/fonts.css") +
  `\n@layer ${layered.map(([name]) => name).join(", ")};\n\n` +
  layered
    .map(([name, files]) => `@layer ${name} {\n${files.map((f) => read(`css/${f}`)).join("\n")}\n}\n`)
    .join("\n");
write("css/raster.css", rasterCss);

/* ── 4. Components only ──
   For pages that already load @noorddev/raster-react/css (tokens, base,
   type, and the compiled leaves) but also render plain rs-* markup. */
write(
  "css/components.css",
  `/* Raster component classes only (layer raster.components). Load after tokens, base, and type:
   @noorddev/raster/css carries all of it; @noorddev/raster-react/css carries the React side. Generated. */
@layer raster.components {
${componentFiles.map((f) => read(`css/${f}`)).join("\n")}
}
`,
);
