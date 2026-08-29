import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { rasterComponents } from "../src/registry";
import { rasterCategories, validateRegistry } from "../src/schema";

const cssDir = join(import.meta.dirname, "../css");
const reactSrcDir = join(import.meta.dirname, "../../react/src");

const allCss = rasterComponents
  .flatMap((c) => c.css)
  .map((f) => readFileSync(join(cssDir, f), "utf8"))
  .join("\n");

const allClasses = new Set(rasterComponents.flatMap((c) => c.classes));

describe("registry structure", () => {
  it("is well-formed", () => {
    expect(validateRegistry(rasterComponents)).toEqual([]);
  });

  it("lifts icons and charts into their own catalog sections", () => {
    expect(rasterCategories).toContain("icons");
    expect(rasterCategories).toContain("charts");
    expect(rasterComponents.find((c) => c.name === "icons")?.category).toBe("icons");
    for (const name of ["chart", "bar-chart", "area-chart", "scatter-chart", "donut", "histogram", "small-multiples"]) {
      expect(rasterComponents.find((c) => c.name === name)?.category, name).toBe("charts");
    }
  });

  it("lists every CSS file that exists on disk", () => {
    for (const c of rasterComponents) {
      for (const f of c.css) {
        expect(existsSync(join(cssDir, f)), `${c.name}: css/${f} missing`).toBe(true);
      }
    }
  });

  it("references React sources that exist", () => {
    for (const c of rasterComponents) {
      if (!c.react) continue;
      expect(existsSync(join(reactSrcDir, c.react)), `${c.name}: react src/${c.react} missing`).toBe(true);
    }
  });
});

describe("registry ↔ CSS parity", () => {
  it("every declared class appears in that component's CSS", () => {
    for (const c of rasterComponents) {
      const css = c.css.map((f) => readFileSync(join(cssDir, f), "utf8")).join("\n");
      for (const cls of c.classes) {
        expect(css.includes(`.${cls}`), `${c.name}: .${cls} not styled in ${c.css.join(", ")}`).toBe(true);
      }
    }
  });

  it("every class used in a snippet is declared by some component", () => {
    for (const c of rasterComponents) {
      const used = [...c.snippet.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1]!.split(/\s+/));
      for (const cls of used) {
        expect(allClasses.has(cls), `${c.name}: snippet uses undeclared class "${cls}"`).toBe(true);
      }
    }
  });

  it("snippets that borrow classes from other components declare the dependency", () => {
    for (const c of rasterComponents) {
      const used = [...c.snippet.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1]!.split(/\s+/));
      const own = new Set(c.classes);
      for (const cls of used) {
        if (own.has(cls)) continue;
        const provider = rasterComponents.find((o) => o.classes.includes(cls));
        expect(provider, `${c.name}: no provider for "${cls}"`).toBeTruthy();
        expect(
          c.registryDependencies ?? [],
          `${c.name}: uses .${cls} from "${provider!.name}" without declaring it as a registry dependency`,
        ).toContain(provider!.name);
      }
    }
  });

  it("no CSS class in component files is orphaned from the registry", () => {
    const declared = new Set([...allClasses]);
    const styled = new Set(
      [...allCss.matchAll(/\.((?:rs)-[a-z0-9-]+)/g)].map((m) => m[1]!),
    );
    const orphans = [...styled].filter((cls) => {
      if (declared.has(cls)) return false;
      // Modifier/child classes count as covered when a declared prefix owns them.
      return ![...declared].some((d) => cls.startsWith(`${d}-`));
    });
    expect(orphans, `styled but not in the registry: ${orphans.join(", ")}`).toEqual([]);
  });
});
