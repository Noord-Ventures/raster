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
    expect(rasterCss).toContain(`--radius-sm: ${rasterTokens.radius.small}px`);
    expect(rasterCss).toContain("--radius: var(--radius-sm)");
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

  it("catalogs icons in sentence-case groups", () => {
    const icons = readFileSync(join(pkgDir, "css/components/icons.css"), "utf8");
    expect(icons).toMatch(/\.rs-icon-catalog\{[^}]*width:100%/);
    expect(icons).toMatch(/\.rs-icon-group-title\{[^}]*text-transform:none/);
    expect(icons).toMatch(/\.rs-icon-label\{[^}]*text-transform:none/);
    expect(icons).not.toMatch(/text-transform:uppercase/);
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
    expect(side).toMatch(/\.rs-sidebar-item:last-child\{padding-bottom:32px\}/);
    expect(side).toMatch(/\.rs-sidebar-nav\{[^}]*padding:8px 0 32px/);
    expect(rasterCss).toMatch(/\.rs-sidebar-item:last-child\{padding-bottom:32px\}/);
  });

  it("keeps calendar days square and drops the month chevrons 1px", () => {
    const cal = readFileSync(join(pkgDir, "css/components/calendar.css"), "utf8");
    const phone = readFileSync(join(pkgDir, "css/phone.css"), "utf8");
    expect(cal).toMatch(/\.rs-cal-day\{[^}]*width:36px;height:36px/);
    expect(cal).not.toMatch(/height:32px/);
    expect(cal).toMatch(/\.rs-cal-nav \.rs-page\{transform:translateY\(1px\)\}/);
    expect(cal).toMatch(/\.rs-cal-title\{[^}]*line-height:26px/);
    expect(rasterCss).toMatch(/\.rs-cal-day\{[^}]*width:36px;height:36px/);
    expect(phone).toMatch(/\.rs-cal-day\{[^}]*width:36px;\s*height:36px/);
    expect(phone).toMatch(/\.rs-cal-grid\{[^}]*repeat\(7,36px\)/);
    expect(phone).not.toMatch(/\.rs-cal-day\{[^}]*height:var\(--hit\)/);
    expect(phone).not.toMatch(/\.rs-cal-grid\{[^}]*minmax\(0,1fr\)/);
  });

  it("joins button groups on one hairline and the button radius", () => {
    const group = readFileSync(join(pkgDir, "css/components/button-group.css"), "utf8");
    const toggle = readFileSync(join(pkgDir, "css/components/toggle.css"), "utf8");
    const phone = readFileSync(join(pkgDir, "css/phone.css"), "utf8");
    expect(group).toMatch(/\.rs-btn-group\{[^}]*border:1px solid var\(--divider\)/);
    expect(group).toMatch(/\.rs-btn-group\{[^}]*--rs-out:var\(--radius-sm\)/);
    expect(group).toMatch(/\.rs-btn-group\{[^}]*--rs-in:max\(0px,calc\(var\(--rs-out\) - var\(--rs-gap\)\)\)/);
    expect(group).toMatch(/\.rs-btn-group\{[^}]*border-radius:var\(--rs-out\)/);
    expect(group).toMatch(/\.rs-btn-group\{[^}]*background:var\(--divider\)/);
    expect(group).toMatch(/\.rs-btn-group\{[^}]*gap:1px/);
    expect(group).toMatch(/> \.rs-btn-ghost\{background:var\(--bg\)\}/);
    expect(group).not.toMatch(/margin-inline-start:-1px/);
    expect(group).not.toMatch(/border-inline-start-color:transparent/);
    expect(toggle).toMatch(/\.rs-toggle-group\{[^}]*border:1px solid var\(--divider\)/);
    expect(toggle).toMatch(/\.rs-toggle-group\{[^}]*--rs-out:var\(--radius-sm\)/);
    expect(toggle).toMatch(/\.rs-toggle-group\{[^}]*border-radius:var\(--rs-out\)/);
    expect(toggle).toMatch(/\.rs-toggle \+ \.rs-toggle\{border-inline-start:1px solid var\(--divider\)\}/);
    expect(toggle).not.toMatch(/margin-left:-1px/);
    expect(phone).not.toMatch(/\.rs-toggle-group .rs-toggle\{[^}]*margin-left:-1px/);
    expect(rasterCss).toMatch(/\.rs-btn-group\{[^}]*border:1px solid var\(--divider\)/);
    expect(rasterCss).toMatch(/\.rs-btn-group\{[^}]*background:var\(--divider\)/);
    expect(rasterCss).toMatch(/\.rs-btn-group\{[^}]*gap:1px/);
    expect(rasterCss).toMatch(/\.rs-btn-group > \.rs-btn-ghost\{background:var\(--bg\)\}/);
  });

  it("sits the field input on an integer 40px control", () => {
    const field = readFileSync(join(pkgDir, "css/components/field.css"), "utf8");
    expect(field).toMatch(/\.rs-field\{[^}]*gap:8px/);
    expect(field).toMatch(/\.rs-field-label\{[^}]*line-height:16px/);
    expect(field).toMatch(/\.rs-input\{[^}]*height:var\(--control-h\)/);
    expect(field).toMatch(/\.rs-input\{[^}]*box-sizing:border-box/);
    expect(field).toMatch(/\.rs-field-hint\{[^}]*margin:0/);
    expect(field).toMatch(/\.rs-field-hint\{[^}]*line-height:16px/);
    expect(field).toMatch(/\.rs-field-error\{[^}]*margin:0/);
    expect(field).toMatch(/\.rs-field-error\{[^}]*line-height:16px/);
    expect(rasterCss).toMatch(/\.rs-input\{[^}]*height:var\(--control-h\)/);
    expect(rasterCss).toMatch(/\.rs-field\{[^}]*gap:8px/);
  });

  it("lets grouped fields inherit the standalone input radius", () => {
    const inputGroup = readFileSync(join(pkgDir, "css/components/input-group.css"), "utf8");
    const native = readFileSync(join(pkgDir, "css/components/native-select.css"), "utf8");
    expect(inputGroup).toMatch(/--rs-out:var\(--radius-sm\)/);
    expect(inputGroup).toMatch(/border-radius:var\(--rs-out\)/);
    expect(native).toMatch(/border-radius:var\(--radius-sm\)/);
  });

  it("paints chrome hairlines in the divider ink, not the subtle fill", () => {
    const sep = readFileSync(join(pkgDir, "css/components/separator.css"), "utf8");
    const page = readFileSync(join(pkgDir, "css/components/pagination.css"), "utf8");
    const crumb = readFileSync(join(pkgDir, "css/components/crumb-bar.css"), "utf8");
    expect(sep).toMatch(/border-top:1px solid var\(--divider\)/);
    expect(sep).toMatch(/background:var\(--divider\)/);
    expect(sep).not.toMatch(/--divider-subtle/);
    expect(page).toMatch(/border-color:var\(--divider\)/);
    expect(crumb).toMatch(/border-bottom-color:var\(--divider\)/);
    expect(rasterCss).toMatch(/\.rs-sep\{[^}]*var\(--divider\)/);
  });

  it("marks only the active tab with a hairline", () => {
    const tabs = readFileSync(join(pkgDir, "css/components/tabs.css"), "utf8");
    expect(tabs).not.toMatch(/1\.5px/);
    expect(tabs).toMatch(/appearance:none/);
    expect(tabs).toMatch(/inset 0 -1px 0 var\(--text\)/);
    expect(tabs).not.toMatch(/\.rs-tabs\{[^}]*border-bottom/);
    expect(rasterCss).toMatch(/button\.rs-tab\{[^}]*appearance:none/);
  });

  it("draws charts as a poster field, not a dashboard widget", () => {
    const chart = readFileSync(join(pkgDir, "css/components/chart.css"), "utf8");
    expect(chart).toMatch(/stroke-linecap:butt/);
    expect(chart).toMatch(/border-radius:0/);
    expect(chart).toMatch(/box-shadow:none/);
    expect(chart).toMatch(/stroke-width:1/);
    expect(chart).not.toMatch(/stroke-linecap:round/);
    expect(chart).not.toMatch(/box-shadow:\s*[^n]/);
    expect(chart).not.toMatch(/#e30613/i);
    expect(rasterCss).toMatch(/\.rs-chart-field\{/);
    expect(rasterCss).toMatch(/\.rs-chart-line\{[^}]*stroke-width:1/);
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

  it("paints a readable module grid, quieter than chrome hairlines", () => {
    const light = rasterTokens.color.light;
    const dark = rasterTokens.color.dark;
    const alpha = (value: string) => Number(value.match(/rgba?\([^)]*?,\s*([\d.]+)\s*\)/)?.[1]);
    // 0.08/0.10 caged inner pages. 0.025/0.01 were invisible. 0.04/0.05 still reads.
    expect(alpha(light.gridLine)).toBeGreaterThan(0.03);
    expect(alpha(light.gridLine)).toBeLessThan(0.06);
    expect(alpha(light.gridLine)).toBeLessThan(alpha(light.divider));
    expect(alpha(dark.gridLine)).toBeGreaterThan(0.03);
    expect(alpha(dark.gridLine)).toBeLessThan(0.08);
    expect(alpha(dark.gridLine)).toBeLessThan(alpha(dark.divider));
    expect(rasterCss).toContain(`--grid-line: ${light.gridLine}`);
    expect(rasterCss).not.toMatch(/--grid-line:\s*rgba\(0,0,0,0\.08\)/);
    expect(rasterCss).not.toMatch(/--grid-line:\s*rgba\(0,0,0,0\.025\)/);
    expect(rasterCss).not.toMatch(/--grid-line:\s*rgba\(255,255,255,0\.10\)/);
    expect(rasterCss).not.toMatch(/--grid-line:\s*rgba\(255,255,255,0\.01\)/);
  });

  it("grid module = column + gutter", () => {
    expect(rasterTokens.grid.module).toBe(rasterTokens.grid.column + rasterTokens.grid.gutter);
  });

  it("uses one slight Raster radius, the standalone button token", () => {
    expect(rasterTokens.radius.small).toBe(4);
    expect(rasterTokens.radius.base).toBe(rasterTokens.radius.small);
    expect(rasterTokens.radius.small).toBeGreaterThanOrEqual(2);
    expect(rasterTokens.radius.small).toBeLessThanOrEqual(4);
    expect(rasterTokens.radius.rule).toMatch(/--radius-sm/);
    expect(rasterCss).toContain("--radius-sm: 4px");
    expect(rasterCss).toContain("--radius: var(--radius-sm)");
    expect(rasterCss).toMatch(/\.rs-btn-primary\{[^}]*border-radius:var\(--radius-sm\)/);
    expect(rasterCss).toMatch(/\.rs-card\{[^}]*--rs-out:var\(--radius-sm\)/);
    expect(rasterCss).toMatch(/\.rs-dialog\{[^}]*--rs-out:var\(--radius-sm\)/);
    expect(rasterCss).toMatch(/\.rs-callout\{[^}]*border-radius:var\(--radius-sm\)/);
    expect(rasterCss).toMatch(/dialog\.rs-sheet\{[^}]*border-radius:var\(--radius-sm\)/);
    expect(rasterCss).toMatch(/dialog\.rs-drawer\{[^}]*border-radius:var\(--radius-sm\)/);
    const site = readFileSync(join(pkgDir, "../../apps/www/app/site.css"), "utf8");
    expect(site).toMatch(/\.gallery-item \{[^}]*border-radius: var\(--radius-sm\)/);
    expect(site).toMatch(/\.preview-box \{[^}]*border-radius: var\(--radius-sm\)/);
    expect(site).toMatch(/\.preview-box \{[^}]*background: transparent/);
    const frames = readFileSync(join(pkgDir, "../../apps/www/app/interfaces/interfaces.css"), "utf8");
    expect(frames).toMatch(/\.if-tile \{[^}]*border-radius: var\(--radius-sm\)/);
    expect(frames).toMatch(/\.if-specimen \{[^}]*border-radius: var\(--radius-sm\)/);
    const use = readFileSync(join(pkgDir, "../../apps/www/components/examples/use.css"), "utf8");
    expect(use).toMatch(/\.rs-use \{[^}]*border-radius: var\(--radius-sm\)/);
    expect(use).toMatch(/\.rs-scene \{[^}]*border-radius: var\(--radius-sm\)/);
    expect(rasterCss).toMatch(/\.rs-empty\{[^}]*border-radius:0/);
    expect(rasterCss).toMatch(/\.rs-chart\{[^}]*border-radius:0/);
    expect(rasterTokens.radius.chrome).toBe(0);
  });

  it("ships the concentric-radius law", () => {
    expect(rasterTokens.radius.chrome).toBe(0);
    expect(rasterTokens.radius.concentric).toBe("Steve Ruiz innerRadius, clamped at 0");
    expect(rasterCss).toContain("--radius-chrome: 0px");
    expect(rasterCss).toContain("--radius-in: max(0px, calc(var(--radius) - var(--pad)))");
    expect(rasterCss).toMatch(/\.rs-nest\{/);
    expect(rasterCss).toMatch(/\.rs-nest-in\{/);
    expect(rasterCss).toContain("--rs-in:max(0px,calc(var(--rs-out) - var(--rs-gap)))");
    for (const cls of [".rs-card{", ".rs-dialog{", ".rs-btn-group{", ".rs-input{", ".rs-input-group{"]) {
      expect(rasterCss).toContain(cls);
    }
    expect(rasterCss).toMatch(/\.rs-card-in\{[^}]*border-radius:var\(--rs-in\)/);
    expect(rasterCss).toMatch(/\.rs-cal-day\{[^}]*border-radius:var\(--rs-in/);
    expect(rasterCss).toMatch(/\.rs-dialog \.rs-btn-primary,[^{]*\{[^}]*border-radius:var\(--rs-in\)/);
    // Inner frames inherit --rs-in. Reassigning --rs-out from itself cycles
    // the custom property and the used radius becomes 0.
    const nestIn = rasterCss.match(/\.rs-nest-in\{[^}]*\}/)?.[0] ?? "";
    expect(nestIn).toMatch(/border-radius:var\(--rs-in\)/);
    expect(nestIn).not.toMatch(/--rs-out:/);
  });

  it("ships short named motion and refuses a load show", () => {
    expect(rasterTokens.motion.duration).toBe("0.12–0.18s");
    expect(rasterTokens.motion.snap).toBe("0.12s");
    expect(rasterTokens.motion.ease).toBe("0.18s");
    expect(rasterTokens.motion.confirm).toBe("0.16s");
    expect(rasterTokens.motion.easing).toBe("cubic-bezier(0.2, 0, 0, 1)");
    expect(rasterTokens.motion.rule).toMatch(/Entry is not a show/);
    expect(rasterCss).toContain("--duration-snap: 0.12s");
    expect(rasterCss).toContain("--duration: 0.18s");
    expect(rasterCss).toContain("--duration-confirm: 0.16s");
    expect(rasterCss).toContain("--ease: cubic-bezier(0.2, 0, 0, 1)");
    expect(rasterCss).not.toMatch(/rs-chart-enter|rs-chart-in/);
    expect(rasterCss).not.toMatch(/translateY\((4|6)px\)/);
    expect(rasterCss).not.toMatch(/scale\(\.92\)/);
    expect(rasterCss).not.toMatch(/\.5s cubic-bezier/);
    expect(rasterCss).not.toMatch(/cubic-bezier\([^)]*[1-9]\.[0-9]/);
    const site = readFileSync(join(pkgDir, "../../apps/www/app/site.css"), "utf8");
    expect(site).not.toMatch(/translateY\(-6px\)/);
    expect(site).not.toMatch(/\.5s cubic-bezier/);
    expect(site).toContain("var(--duration-snap)");
    const chart = readFileSync(join(pkgDir, "css/components/chart.css"), "utf8");
    expect(chart).not.toMatch(/animation:/);
    expect(chart).not.toMatch(/stagger|animation-delay/);
  });

  it("emits a phone control scale at 640 without restyling desktop", () => {
    expect(rasterTokens.control.desktop.hit).toBe(40);
    expect(rasterTokens.control.phone.hit).toBe(44);
    expect(rasterTokens.control.phone.font).toBe(16);
    expect(rasterTokens.control.breakpoint).toBe(640);
    expect(rasterCss).toContain("--hit: 40px");
    expect(rasterCss).toContain("--control-h: 40px");
    expect(rasterCss).toContain("--control-fs: 14px");
    expect(rasterCss).toContain("--hit:44px");
    expect(rasterCss).toContain("--control-h:44px");
    expect(rasterCss).toContain("--control-fs:16px");
    const button = readFileSync(join(pkgDir, "css/components/button.css"), "utf8");
    expect(button).toContain("height:40px");
    expect(button).not.toMatch(/@media/);
    const phone = readFileSync(join(pkgDir, "css/phone.css"), "utf8");
    expect(phone).toMatch(/@media\(max-width:640px\)/);
    expect(phone).toContain(".rs-btn-primary");
    expect(phone).toContain(".rs-input");
    expect(phone).toContain(".rs-tab");
    expect(phone).toContain(".rs-switch");
    expect(phone).toMatch(/min-height:var\(--hit\)/);
    expect(rasterCss).toMatch(/\.rs-btn-primary,\.rs-btn-ghost\{[^}]*min-height:var\(--hit\)/);
  });
});
