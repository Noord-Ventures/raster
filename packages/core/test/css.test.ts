import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { rasterTokens } from "../src/tokens";
import { rasterComponents } from "../src/registry";

const pkgDir = join(import.meta.dirname, "..");
let rasterCss: string;

/** raster.css with every @media block removed: what applies at desktop, unconditionally. */
function withoutMedia(css: string): string {
  let out = "";
  let i = 0;
  while (i < css.length) {
    const at = css.indexOf("@media", i);
    if (at === -1) {
      out += css.slice(i);
      break;
    }
    out += css.slice(i, at);
    let depth = 0;
    let j = css.indexOf("{", at);
    for (; j < css.length; j++) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    i = j + 1;
  }
  return out;
}

function luminanceSpread(hex: string): number {
  const n = hex.length === 4 ? hex.replace(/[0-9a-f]/gi, (c) => c + c) : hex;
  const r = parseInt(n.slice(1, 3), 16);
  const g = parseInt(n.slice(3, 5), 16);
  const b = parseInt(n.slice(5, 7), 16);
  return Math.max(r, g, b) - Math.min(r, g, b);
}

beforeAll(() => {
  // The generated CSS is committed; CI checks it is in sync with the sources
  // (build, then git diff --exit-code). Tests never write into the tree.
  rasterCss = readFileSync(join(pkgDir, "css/raster.css"), "utf8");
});

describe("generated raster.css", () => {
  it("defines every custom property it uses", () => {
    const used = new Set([...rasterCss.matchAll(/var\((--[a-z-]+)[,)]/g)].map((m) => m[1]!));
    const defined = new Set([...rasterCss.matchAll(/(--[a-z-]+)\s*:/g)].map((m) => m[1]!));
    const missing = [...used].filter((v) => !defined.has(v));
    expect(missing, `var() without definition: ${missing.join(", ")}`).toEqual([]);
  });

  it("mirrors the token values", () => {
    expect(rasterCss).toContain(`--bg: ${rasterTokens.color.light.paper}`);
    expect(rasterCss).toContain(`--text: ${rasterTokens.color.light.ink}`);
    expect(rasterCss).toContain(`--bg: ${rasterTokens.color.dark.black}`);
    expect(rasterCss).toContain(`--radius-sm: ${rasterTokens.radius.small}px`);
    expect(rasterCss).toContain(`--grid-size: ${rasterTokens.grid.module}px`);
  });

  it("defaults to bundled Inter, with system sans as fallback only", () => {
    expect(rasterCss).toContain("@font-face");
    expect(rasterCss).toContain("font-family:Inter");
    expect(rasterCss).toContain("./fonts/inter/InterVariable-latin.woff2");
    expect(rasterTokens.type.foundry.typeface).toBe("Inter");
    expect(rasterTokens.type.foundry.license).toBe("SIL OFL 1.1");
  });

  it("has balanced braces", () => {
    const open = (rasterCss.match(/\{/g) ?? []).length;
    const close = (rasterCss.match(/\}/g) ?? []).length;
    expect(open).toBe(close);
  });

  it("declares its cascade layers up front, in order", () => {
    const order = rasterCss.match(/@layer ([^;{]+);/)?.[1]?.split(",").map((s) => s.trim());
    expect(order).toEqual([
      "raster.tokens",
      "raster.base",
      "raster.type",
      "raster.components",
      "raster.touch",
      "raster.motion",
    ]);
    for (const name of order ?? []) expect(rasterCss).toContain(`@layer ${name} {`);
    // @font-face must sit outside the layers.
    expect(rasterCss.indexOf("@font-face")).toBeLessThan(rasterCss.indexOf("@layer "));
  });

  it("never uses !important", () => {
    expect(rasterCss).not.toContain("!important");
  });

  it("paints every component at desktop, not only inside a media query", () => {
    // The CSS-first guarantee: a component's primary class has rules that apply
    // unconditionally. Modifier classes may legitimately exist only for phones.
    const desktop = withoutMedia(rasterCss);
    const missing: string[] = [];
    for (const c of rasterComponents) {
      const primary = c.classes[0]!;
      if (!new RegExp(`\\.${primary}(?![\\w-])`).test(desktop)) missing.push(`${c.name}: .${primary}`);
    }
    expect(missing, `components with phone-only paint: ${missing.join(", ")}`).toEqual([]);
  });

  it("stays monochrome: every hex color is a neutral", () => {
    const hexes = [...rasterCss.matchAll(/#[0-9a-f]{3,6}\b/gi)].map((m) => m[0]);
    const hued = hexes.filter((h) => luminanceSpread(h) > 12);
    expect(hued, `hued colors: ${[...new Set(hued)].join(", ")}`).toEqual([]);
  });

  it("respects reduced motion and touch", () => {
    expect(rasterCss).toContain("@media(prefers-reduced-motion:reduce)");
    expect(rasterCss).toContain("@media(hover:none)");
  });
});
