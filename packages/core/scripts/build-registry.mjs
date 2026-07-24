// Generates the distributable registry at <repo>/registry/:
//
//   registry/index.json    — shadcn-compatible registry index (no file contents)
//   registry/<name>.json   — shadcn-compatible registry-item, contents inlined
//   registry/bundle.json   — every item with contents, consumed by @raster/cli
//
// Components install two ways: through the raster CLI (bundles this
// output), or through `npx shadcn add <url>/r/<name>.json` from any
// host serving this directory.
//
// Run with: npm run build:registry  (Node ≥ 22.6)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { rasterTokens } from "../src/tokens.ts";
import { rasterComponents } from "../src/registry.ts";

const REGISTRY_URL = process.env.RASTER_REGISTRY_URL ?? "https://raster.noord.dev/r";

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
   reduced-motion rules — everything in raster.css except components. */
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

const cxSource = readReact("cx.ts");

const items = [baseItem];

for (const component of rasterComponents) {
  const files = [];

  if (component.react) {
    const source = readReact(component.react).replace('from "../cx"', 'from "./cx"');
    files.push({
      path: `raster/${component.name}.tsx`,
      content: source,
      type: "registry:component",
      target: `components/raster/${component.name}.tsx`,
    });
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
  version: "0.2.0",
  css: {
    raster: readCore("css/raster.css"),
    compat: readCore("css/raster-compat.css"),
  },
  items,
});
