// Generates the distributable registry at <repo>/registry/:
//
//   registry/index.json    shadcn-compatible registry index (no file contents)
//   registry/<name>.json   shadcn-compatible registry-item, contents inlined
//   registry/bundle.json   every item with contents, consumed by @noordvc/raster-cli
//
// Components install two ways: through the raster CLI (bundles this
// output), or through `npx shadcn add <url>/r/<name>.json` from any
// host serving this directory.
//
// Run with: npm run build:registry  (Node ≥ 22.6)

import { existsSync, lstatSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { rasterTokens } from "../src/tokens.ts";
import { rasterComponents } from "../src/registry.ts";

const PUBLIC_HOST = "https://raster.noord.dev";
const REGISTRY_URL = process.env.RASTER_REGISTRY_URL ?? `${PUBLIC_HOST}/r`;
const VERSION = "0.3.0";

const corePath = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const repoPath = (p) => fileURLToPath(new URL(`../../../${p}`, import.meta.url));
const readCore = (p) => readFileSync(corePath(p), "utf8");
const readReact = (p) => readFileSync(repoPath(`packages/react/src/${p}`), "utf8");

const outDir = repoPath("registry");
mkdirSync(outDir, { recursive: true });
const write = (name, data) => {
  writeFileSync(`${outDir}/${name}`, JSON.stringify(data, null, 2) + "\n");
  console.log(`wrote registry/${name}`);
};

/* The base style every component needs: tokens, page base, type scale,
   reduced-motion rules: everything in raster.css except components. */
const baseCss = ["tokens.css", "base.css", "type.css", "motion.css"]
  .map((f) => readCore(`css/${f}`))
  .join("\n");

const baseItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "raster-base",
  type: "registry:style",
  title: "Raster base",
  description:
    "Tokens (light + dark), page base with the visible module grid, type scale, and reduced-motion rules.",
  registryDependencies: [`${REGISTRY_URL}/inter.json`],
  files: [
    {
      path: "raster/styles/base.css",
      content: baseCss,
      type: "registry:file",
      target: "styles/raster/base.css",
    },
  ],
  meta: { raster: { category: "foundation", cssOnly: true } },
};

const interCss = `/* Inter, SIL OFL 1.1. Variable, latin + latin-ext. System sans is fallback only. */
@font-face{
  font-family:Inter;
  font-style:normal;
  font-weight:100 900;
  font-display:swap;
  src:url("${PUBLIC_HOST}/fonts/inter/InterVariable-latin-ext.woff2") format("woff2");
  unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF
}
@font-face{
  font-family:Inter;
  font-style:normal;
  font-weight:100 900;
  font-display:swap;
  src:url("${PUBLIC_HOST}/fonts/inter/InterVariable-latin.woff2") format("woff2");
  unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD
}
`;

const interItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "inter",
  type: "registry:font",
  title: "Inter",
  description:
    "Default face. Variable Inter (latin + latin-ext), SIL OFL 1.1. System sans is fallback only.",
  files: [
    {
      path: "raster/styles/inter.css",
      content: interCss,
      type: "registry:file",
      target: "styles/raster/inter.css",
    },
  ],
  meta: { raster: { category: "foundation", cssOnly: true } },
};

const cxSource = readReact("cx.ts");

function posix(p) {
  return p.replaceAll("\\", "/");
}

function resolveLocal(fromRel, spec) {
  const collapsed = posix(normalize(join(dirname(fromRel), spec)));
  const candidates = [collapsed, `${collapsed}.tsx`, `${collapsed}.ts`, `${collapsed}/index.ts`, `${collapsed}/index.tsx`];
  for (const c of candidates) {
    const abs = repoPath(`packages/react/src/${c}`);
    if (existsSync(abs) && lstatSync(abs).isFile()) return c;
  }
  return null;
}

function isCx(rel) {
  return rel === "cx" || rel === "cx.ts" || rel.endsWith("/cx.ts") || rel.endsWith("/cx");
}

function collectReactGraph(entryRel) {
  const sources = new Map();
  const queue = [entryRel];
  while (queue.length) {
    const rel = queue.shift();
    if (!rel || sources.has(rel) || isCx(rel)) continue;
    const source = readReact(rel);
    sources.set(rel, source);
    for (const match of source.matchAll(/from ["'](\.[^"']+)["']/g)) {
      const resolved = resolveLocal(rel, match[1]);
      if (resolved && !isCx(resolved)) queue.push(resolved);
    }
  }
  return sources;
}

function destFor(srcRel, componentName, entryRel) {
  if (srcRel === entryRel) {
    const ext = srcRel.endsWith(".ts") && !srcRel.endsWith(".tsx") ? ".ts" : ".tsx";
    return `raster/${componentName}${ext}`;
  }
  return `raster/${srcRel.replace(/^components\//, "")}`;
}

function rewriteImports(source, srcRel, dest, destBySrc) {
  return source.replace(/from ["'](\.[^"']+)["']/g, (full, spec) => {
    const resolved = resolveLocal(srcRel, spec);
    const destDir = dirname(dest);
    let target;
    if (!resolved || isCx(resolved)) {
      target = "raster/cx";
    } else {
      target = destBySrc.get(resolved).replace(/\.(tsx|ts)$/, "");
    }
    let rel = posix(relative(destDir, target));
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return `from "${rel}"`;
  });
}

const items = [interItem, baseItem];

for (const component of rasterComponents) {
  const files = [];

  if (component.react) {
    const graph = collectReactGraph(component.react);
    const destBySrc = new Map(
      [...graph.keys()].map((src) => [src, destFor(src, component.name, component.react)]),
    );
    for (const [srcRel, source] of graph) {
      const dest = destBySrc.get(srcRel);
      const ext = dest.endsWith(".ts") && !dest.endsWith(".tsx") ? "ts" : "tsx";
      files.push({
        path: dest,
        content: rewriteImports(source, srcRel, dest, destBySrc),
        type: ext === "tsx" ? "registry:component" : "registry:file",
        target: `components/${dest}`,
      });
    }
    files.push({
      path: "raster/cx.ts",
      content: cxSource,
      type: "registry:file",
      target: "components/raster/cx.ts",
    });
  }

  for (const cssFile of component.css) {
    const base = cssFile.split("/").pop();
    files.push({
      path: `raster/styles/${base}`,
      content: readCore(`css/${cssFile}`),
      type: "registry:file",
      target: `styles/raster/${base}`,
    });
  }

  items.push({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: component.name,
    type: "registry:component",
    title: component.title,
    description: component.description,
    registryDependencies: [
      `${REGISTRY_URL}/raster-base.json`,
      `${REGISTRY_URL}/inter.json`,
      ...(component.registryDependencies ?? []).map((d) => `${REGISTRY_URL}/${d}.json`),
    ],
    files,
    meta: {
      raster: {
        category: component.category,
        classes: component.classes,
        snippet: component.snippet,
        cssOnly: !component.react,
        registryDependencies: component.registryDependencies ?? [],
      },
    },
  });
}

for (const item of items) write(`${item.name}.json`, item);

write("index.json", {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "raster",
  homepage: rasterTokens.meta.url,
  items: items.map(({ files, ...rest }) => ({
    ...rest,
    files: files.map(({ content, ...file }) => file),
  })),
});

write("bundle.json", {
  name: "raster",
  version: VERSION,
  css: {
    raster: readCore("css/raster.css"),
    compat: readCore("css/raster-compat.css"),
  },
  items,
});
