import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { rasterTokens } from "../src/tokens";
import { legacyClassMap, toLegacyCss } from "../src/legacy";

const pkgDir = join(import.meta.dirname, "..");
let rasterCss: string;
let compatCss: string;

beforeAll(() => {
  // Build the derived CSS so the tests always check current sources.
  execSync("node --experimental-strip-types scripts/build.mjs", { cwd: pkgDir, stdio: "pipe" });
  rasterCss = readFileSync(join(pkgDir, "css/raster.css"), "utf8");
  compatCss = readFileSync(join(pkgDir, "css/raster-compat.css"), "utf8");
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
    expect(rasterCss).toContain(`--radius: ${rasterTokens.radius.base}px`);
    expect(rasterCss).toContain(`--grid-size: ${rasterTokens.grid.module}px`);
  });

  it("defaults to bundled Inter, with system sans as fallback only", () => {
    expect(rasterCss).toContain("@font-face");
    expect(rasterCss).toContain('font-family:Inter');
    expect(rasterCss).toContain("./fonts/inter/InterVariable-latin.woff2");
    expect(rasterCss).toContain("./fonts/inter/InterVariable-latin-ext.woff2");
    expect(rasterCss).not.toMatch(/Messina|Geist|Schibsted|Heros|Plex/i);
    expect(rasterTokens.type.foundry.typeface).toBe("Inter");
    expect(rasterTokens.type.foundry.license).toBe("SIL OFL 1.1");
  });

  it("has balanced braces", () => {
    const open = (rasterCss.match(/\{/g) ?? []).length;
    const close = (rasterCss.match(/\}/g) ?? []).length;
    expect(open).toBe(close);
  });

  it("paints breadcrumb ancestors as ink, not a UA link color", () => {
    const crumbs = readFileSync(join(pkgDir, "css/components/breadcrumbs.css"), "utf8");
    expect(crumbs).toMatch(/a:link/);
    expect(crumbs).toMatch(/a:visited/);
    expect(crumbs).toMatch(/a:any-link/);
    expect(crumbs).toMatch(/color:var\(--text\)/);
    expect(crumbs).not.toMatch(/#00[fF]|#0000ff|\bblue\b|purple/i);
    expect(rasterCss).toMatch(/\.rs-crumbs a:link/);
  });

  it("leaves air under the last sidebar item before the foot rule", () => {
    const side = readFileSync(join(pkgDir, "css/components/sidebar.css"), "utf8");
    expect(side).toMatch(/\.rs-sidebar-item:last-child\{padding-bottom:20px\}/);
    expect(side).toMatch(/\.rs-sidebar-nav\{[^}]*padding:8px 0 20px/);
    expect(rasterCss).toMatch(/\.rs-sidebar-item:last-child\{padding-bottom:20px\}/);
  });

  it("marks only the active tab with a hairline", () => {
    const tabs = readFileSync(join(pkgDir, "css/components/tabs.css"), "utf8");
    expect(tabs).not.toMatch(/1\.5px/);
    expect(tabs).toMatch(/appearance:none/);
    expect(tabs).toMatch(/inset 0 -1px 0 var\(--text\)/);
    expect(tabs).not.toMatch(/\.rs-tabs\{[^}]*border-bottom/);
    expect(rasterCss).toMatch(/button\.rs-tab\{[^}]*appearance:none/);
  });

  it("never introduces a color hue — the palette is monochrome", () => {
    // Hex values must be gray-ish (R≈G≈B) — the warm paper/black get a small tolerance.
    const hexes = [...rasterCss.matchAll(/#([0-9a-fA-F]{6})\b/g)].map((m) => m[1]!);
    for (const hex of hexes) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      expect(spread, `#${hex} looks like a hue, not an ink`).toBeLessThanOrEqual(12);
    }
  });
});

describe("compat layer", () => {
  it("re-emits every legacy class name", () => {
    for (const [, legacy] of legacyClassMap) {
      expect(compatCss.includes(`.${legacy}`), `.${legacy} missing from raster-compat.css`).toBe(true);
    }
  });

  it("restyles bare table elements for 0.1 markup", () => {
    expect(compatCss).toMatch(/(^|\n)table\{/);
  });

  it("rewrites chained renames in the right order", () => {
    // rs-input → bb-sig-input must win before rs-input-full → rs-input.
    const out = toLegacyCss(".rs-input{a:1}.rs-input-full{b:2}");
    expect(out).toBe(".bb-sig-input{a:1}.rs-input{b:2}");
  });

  it("balances braces", () => {
    const open = (compatCss.match(/\{/g) ?? []).length;
    const close = (compatCss.match(/\}/g) ?? []).length;
    expect(open).toBe(close);
  });
});

describe("tokens", () => {
  it("neutral scale runs ink → paper", () => {
    const scale = rasterTokens.color.neutralScale;
    expect(scale[0]).toBe(rasterTokens.color.light.ink);
    expect(scale[scale.length - 1]).toBe(rasterTokens.color.light.paper);
  });

  it("type scale sizes strictly descend", () => {
    const sizes = rasterTokens.type.scale.map((s) => s.px);
    for (let i = 1; i < sizes.length; i++) expect(sizes[i]!).toBeLessThan(sizes[i - 1]!);
  });

  it("grid module = column + gutter", () => {
    expect(rasterTokens.grid.module).toBe(rasterTokens.grid.column + rasterTokens.grid.gutter);
  });
});
