import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { rasterTokens } from "../src/tokens";
import { legacyClassMap, toLegacyCss } from "../src/legacy";

const pkgDir = join(import.meta.dirname, "..");
const reactDir = join(pkgDir, "../react/src/components");
const wwwDir = join(pkgDir, "../../apps/www");
const readReact = (name: string) => readFileSync(join(reactDir, name), "utf8");
const readCss = (name: string) => readFileSync(join(pkgDir, "css", name), "utf8");
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
    expect(rasterCss).toContain("font-family:Inter");
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

  it("draws a 1px hairline spinner ring, not a rotating square", () => {
    const spinner = readReact("spinner.tsx");
    expect(spinner).not.toMatch(/borderRadius:\s*0/);
    expect(spinner).not.toMatch(/1\.5px/);
    expect(spinner).toMatch(/<svg/);
    expect(spinner).toMatch(/strokeWidth="1"/);
    expect(spinner).toMatch(/strokeLinecap="butt"/);
    expect(spinner).toContain('["rs-spinner"');
  });

  it("keeps callout a Raster note: 1px hairline all sides, radius 0, no left bar", () => {
    const callout = readReact("callout.tsx");
    expect(callout).toMatch(/borderWidth: raster.hairline/);
    expect(callout).toMatch(/borderColor: raster.divider/);
    expect(callout).not.toMatch(/borderLeft:\s*3/);
    expect(callout).toMatch(/borderRadius: 0/);
    expect(callout).not.toMatch(/borderRadius: raster.radiusSm/);
    expect(callout).toMatch(/boxShadow: "none"/);
  });

  it("gives carousel and workflow cards the button-family radius, not 0 or 12px", () => {
    const carousel = readReact("carousel.tsx");
    const flow = readReact("flow.tsx");
    expect(carousel).toMatch(/borderRadius: \{\s*default: raster.radiusSm/);
    expect(carousel).not.toMatch(/borderRadius:\s*(10|12)\b/);
    expect(flow).toMatch(/borderRadius: raster.radiusSm/);
    expect(flow).toMatch(/rs-flow-step/);
    expect(flow).toMatch(/rs-flow-add/);
    expect(flow).not.toMatch(/borderRadius:\s*(0|10|12)\b/);
  });

  it("joins stepper hairlines to the dots", () => {
    const stepper = readReact("stepper.tsx");
    expect(stepper).toMatch(/left: \{\s*default: 24/);
    expect(stepper).toMatch(/right: 0/);
    expect(stepper).not.toMatch(/display: "none"/);
    expect(stepper).toContain('["rs-step-line"]');
  });

  it("catalogs icons in sentence-case groups", () => {
    const icons = readReact("icon.tsx");
    expect(icons).toMatch(/catalog: \{[^}]*width: "100%"/s);
    expect(icons).toMatch(/textTransform: "none"/);
    expect(icons).not.toMatch(/textTransform: "uppercase"/);
  });

  it("paints breadcrumb ancestors as ink, not a UA link color", () => {
    const crumbs = readReact("breadcrumbs.tsx");
    expect(crumbs).toMatch(/":link": raster.ink/);
    expect(crumbs).toMatch(/":visited": raster.ink/);
    expect(crumbs).toMatch(/color: \{\s*default: raster.ink/s);
    expect(crumbs).not.toMatch(/#00[fF]|#0000ff|\bblue\b|purple/i);
  });

  it("leaves air under the last sidebar item before the foot rule", () => {
    const side = readReact("sidebar.tsx");
    expect(side).toMatch(/":last-child": 32/);
    expect(side).toMatch(/paddingTop: 8/);
    expect(side).toMatch(/paddingBottom: 32/);
    expect(side).toMatch(/borderColor: raster.divider/);
    expect(side).toContain('["rs-sidebar"');
  });

  it("keeps calendar days square and drops the month chevrons 1px", () => {
    const cal = readReact("calendar.tsx");
    const phone = readCss("phone.css");
    expect(cal).toMatch(/width: 36/);
    expect(cal).toMatch(/height: 36/);
    expect(cal).not.toMatch(/height: 32/);
    expect(cal).toMatch(/transform: "translateY\(1px\)"/);
    expect(cal).toMatch(/gridTemplateColumns: "repeat\(7, 36px\)"/);
    expect(phone).toMatch(/\.rs-cal-day\{[^}]*width:36px;\s*height:36px/);
    expect(phone).toMatch(/\.rs-cal-grid\{[^}]*repeat\(7,36px\)/);
    expect(phone).not.toMatch(/\.rs-cal-day\{[^}]*height:var\(--hit\)/);
    expect(phone).not.toMatch(/\.rs-cal-grid\{[^}]*minmax\(0,1fr\)/);
  });

  it("joins button groups on one hairline and the button radius", () => {
    const group = readReact("button-group.tsx");
    const toggle = readReact("toggle.tsx");
    const phone = readCss("phone.css");
    expect(group).toMatch(/borderWidth: raster.hairline/);
    expect(group).toMatch(/borderColor: raster.divider/);
    expect(group).toMatch(/borderRadius: \{\s*default: raster.radiusSm/);
    expect(group).toMatch(/backgroundColor: raster.divider/);
    expect(group).toMatch(/gap: raster.hairline/);
    expect(group).not.toMatch(/marginInlineStart/);
    expect(group).not.toMatch(/borderInlineStartColor: "transparent"/);
    expect(toggle).toMatch(/borderWidth: raster.hairline/);
    expect(toggle).toMatch(/borderRadius: \{\s*default: raster.radiusSm/);
    expect(toggle).toMatch(/":not\(:first-child\)": raster.hairline/);
    expect(toggle).not.toMatch(/marginLeft: -1/);
    expect(phone).not.toMatch(/\.rs-toggle-group .rs-toggle\{[^}]*margin-left:-1px/);
  });

  it("sits the field input on an integer 40px control", () => {
    const field = readReact("field.tsx");
    const input = readReact("input.tsx");
    expect(field).toMatch(/gap: \{\s*default: 8/);
    expect(field).toMatch(/lineHeight: "16px"/);
    expect(input).toMatch(/height: raster.controlH/);
    expect(input).toMatch(/boxSizing: "border-box"/);
    expect(input).toMatch(/appearance: "none"/);
    expect(input).toMatch(/backgroundColor: "var\(--bg\)"/);
    expect(input).toMatch(/color: "var\(--text\)"/);
    expect(field).toMatch(/hint: \{[^}]*margin: 0/s);
    expect(field).toMatch(/error: \{[^}]*margin: 0/s);
  });

  it("lets grouped fields inherit the standalone input radius", () => {
    const inputGroup = readReact("input-group.tsx");
    const native = readReact("native-select.tsx");
    expect(inputGroup).toMatch(/borderRadius: \{\s*default: raster.radiusSm/);
    expect(native).toMatch(/borderRadius: \{\s*default: raster.radiusSm/);
  });

  it("paints chrome hairlines in the divider ink, not the subtle fill", () => {
    const sep = readReact("separator.tsx");
    const page = readReact("pagination.tsx");
    const crumb = readReact("crumb-bar.tsx");
    expect(sep).toMatch(/borderTopColor: raster.divider/);
    expect(sep).toMatch(/backgroundColor: raster.divider/);
    expect(sep).not.toMatch(/dividerSubtle/);
    expect(page).toMatch(/borderColor: raster.divider/);
    expect(crumb).toMatch(/borderBottomColor: raster.divider/);
  });

  it("marks only the active tab with a hairline", () => {
    const tabs = readReact("tabs.tsx");
    expect(tabs).not.toMatch(/1\.5px/);
    expect(tabs).toMatch(/appearance: "none"/);
    expect(tabs).toMatch(/boxShadow: "inset 0 -1px 0"/);
    expect(tabs).toContain("rs-tabs");
    expect(tabs).toMatch(/borderWidth: 0/);
  });

  it("draws charts as a poster field, not a dashboard widget", () => {
    const chart = readReact("charts/frame.tsx");
    const hist = readReact("charts/histogram.tsx");
    const donut = readReact("charts/donut.tsx");
    expect(chart).toMatch(/strokeLinecap: "butt"/);
    expect(chart).toMatch(/borderRadius: 0/);
    expect(chart).toMatch(/boxShadow: "none"/);
    expect(chart).toMatch(/strokeWidth: 1/);
    expect(chart).not.toMatch(/strokeLinecap: "round"/);
    expect(chart).not.toMatch(/fill:\s*["']#e30613/i);
    expect(chart).toMatch(/CROUWEL_SPOT/);
    expect(chart).toContain("rs-chart-field");
    expect(chart).toContain("rs-chart-line");
    expect(hist).toMatch(/fill: raster.divider/);
    expect(hist).not.toMatch(/fill: raster.ink/);
    expect(donut).toMatch(/fontWeight: 500/);
    expect(donut).not.toMatch(/fontSize: 16/);
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
  it("re-emits every leftover CSS-first legacy class name", () => {
    for (const [canonical, legacy] of legacyClassMap) {
      if (!rasterCss.includes(`.${canonical}`)) continue;
      expect(compatCss.includes(`.${legacy}`), `.${legacy} missing from raster-compat.css`).toBe(true);
    }
  });

  it("does not restyle bare tables once the table leaf is StyleX", () => {
    expect(rasterCss).not.toMatch(/(^|\n)table\{/);
    expect(compatCss).not.toMatch(/(^|\n)table\{/);
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

  it("paints a readable module grid quieter than chrome divider", () => {
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
    expect(rasterCss).toContain(`--divider: ${light.divider}`);
    expect(rasterCss).not.toMatch(/--grid-line:\s*rgba\(0,0,0,0\.025\)/);
    expect(rasterCss).not.toMatch(/--grid-line:\s*rgba\(255,255,255,0\.01\)/);
    expect(rasterCss).toContain("html::before");
    expect(rasterCss).toContain("background-image:var(--grid-image)");
    expect(rasterCss).toContain("--grid-pos: 20px 0");
    expect(rasterCss).not.toMatch(/clip-path:inset\(0 0 0 21px\)/);
    const overlay = rasterCss.match(/html::before\{[^}]*\}/)?.[0] ?? "";
    expect(overlay).not.toContain("repeating-linear-gradient");
    expect(overlay).not.toContain("clip-path");
  });

  it("grid module = column + gutter", () => {
    expect(rasterTokens.grid.module).toBe(rasterTokens.grid.column + rasterTokens.grid.gutter);
  });

  it("keeps cards chrome-square and frameless, toggles on the button radius", () => {
    const card = readReact("card.tsx");
    const toggle = readReact("toggle.tsx");
    expect(card).toMatch(/card: \{[^}]*borderWidth: 0/s);
    expect(card).toMatch(/card: \{[^}]*borderRadius: 0/s);
    expect(card).not.toMatch(/card: \{[^}]*borderWidth: 1/s);
    expect(toggle).toMatch(/borderRadius: \{\s*default: raster.radiusSm/);
    expect(toggle).toContain('["rs-toggle"');
    expect(toggle).toContain('["rs-toggle-group"');
  });

  it("uses one slight Raster radius, the standalone button token", () => {
    const button = readReact("button.tsx");
    const card = readReact("card.tsx");
    const toggle = readReact("toggle.tsx");
    const dialog = readReact("dialog.tsx");
    const callout = readReact("callout.tsx");
    const sheet = readReact("sheet.tsx");
    const drawer = readReact("drawer.tsx");
    const empty = readReact("empty.tsx");
    const chart = readReact("charts/frame.tsx");
    expect(rasterTokens.radius.small).toBe(4);
    expect(rasterTokens.radius.base).toBe(rasterTokens.radius.small);
    expect(rasterTokens.radius.small).toBeGreaterThanOrEqual(2);
    expect(rasterTokens.radius.small).toBeLessThanOrEqual(4);
    expect(rasterTokens.radius.rule).toMatch(/--radius-sm/);
    expect(rasterTokens.radius.rule).toMatch(/chrome-square/);
    expect(rasterCss).toContain("--radius-sm: 4px");
    expect(rasterCss).toContain("--radius: var(--radius-sm)");
    expect(button).toMatch(/borderRadius: \{\s*default: raster.radiusSm/);
    expect(card).toMatch(/borderRadius: 0/);
    expect(toggle).toMatch(/borderRadius: \{\s*default: raster.radiusSm/);
    expect(dialog).toMatch(/borderRadius: raster.radiusSm/);
    expect(callout).toMatch(/borderRadius: 0/);
    expect(sheet).toMatch(/borderTopLeftRadius: raster.radiusSm/);
    expect(drawer).toMatch(/borderTopLeftRadius: raster.radiusSm/);
    const site = readFileSync(join(wwwDir, "app/site.css"), "utf8");
    expect(site).toMatch(/\.gallery-item \{[^}]*border-radius: 0/);
    expect(site).toMatch(/\.preview-box \{[^}]*border-radius: var\(--radius-sm\)/);
    const frames = readFileSync(join(wwwDir, "app/interfaces/interfaces.css"), "utf8");
    expect(frames).toMatch(/\.if-tile \{[^}]*border-radius: 0/);
    expect(frames).toMatch(/\.if-specimen \{[^}]*border-radius: var\(--radius-sm\)/);
    const use = readFileSync(join(wwwDir, "components/examples/use.css"), "utf8");
    expect(use).toMatch(/\.rs-use \{[^}]*border-radius: var\(--radius-sm\)/);
    expect(use).toMatch(/\.rs-scene \{[^}]*border-radius: var\(--radius-sm\)/);
    expect(empty).toMatch(/borderRadius: 0/);
    expect(chart).toMatch(/borderRadius: 0/);
    expect(rasterTokens.radius.chrome).toBe(0);
  });

  it("ships the concentric-radius law", () => {
    const nest = readReact("concentric-radius.tsx");
    const card = readReact("card.tsx");
    const dialog = readReact("dialog.tsx");
    const group = readReact("button-group.tsx");
    const input = readReact("input.tsx");
    const inputGroup = readReact("input-group.tsx");
    const cal = readReact("calendar.tsx");
    expect(rasterTokens.radius.chrome).toBe(0);
    expect(rasterTokens.radius.concentric).toBe("Steve Ruiz innerRadius, clamped at 0");
    expect(rasterCss).toContain("--radius-chrome: 0px");
    expect(rasterCss).toContain("--radius-in: max(0px, calc(var(--radius) - var(--pad)))");
    expect(nest).toContain('["rs-nest"');
    expect(nest).toContain('["rs-nest-in"');
    expect(nest).toContain('"--rs-in": "max(0px, calc(var(--rs-out) - var(--rs-gap)))"');
    expect(card).toContain('["rs-card"');
    expect(dialog).toContain("rs-dialog");
    expect(group).toContain('["rs-btn-group"');
    expect(input).toContain("rs-input");
    expect(inputGroup).toContain("rs-input-group");
    expect(card).toMatch(/inner: \{[^}]*borderWidth: 0/s);
    expect(cal).toMatch(/borderRadius: "var\(--rs-in, var\(--radius-sm\)\)"/);
    expect(dialog).toMatch(/borderRadius: 0/);
    expect(nest).toMatch(/borderRadius: "var\(--rs-in\)"/);
    expect(nest).not.toMatch(/inner: \{[^}]*--rs-out:/s);
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
    const site = readFileSync(join(wwwDir, "app/site.css"), "utf8");
    expect(site).not.toMatch(/translateY\(-6px\)/);
    expect(site).not.toMatch(/\.5s cubic-bezier/);
    expect(site).toContain("var(--duration-snap)");
    const chart = readReact("charts/frame.tsx");
    expect(chart).not.toMatch(/animationName:/);
    expect(chart).not.toMatch(/stagger|animation-delay/);
  });

  it("emits a phone control scale at 640 without restyling desktop", () => {
    const button = readReact("button.tsx");
    const phone = readCss("phone.css");
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
    expect(button).toMatch(/height: \{\s*default: raster.controlH/);
    expect(phone).toMatch(/@media\(max-width:640px\)/);
    expect(phone).toContain(".rs-btn-primary");
    expect(phone).toContain(".rs-input");
    expect(phone).toContain(".rs-tab");
    expect(phone).toContain(".rs-switch");
    expect(phone).toMatch(/min-height:var\(--hit\)/);
    expect(rasterCss).toMatch(/\.rs-btn-primary,\.rs-btn-ghost\{[^}]*min-height:var\(--hit\)/);
  });
});
