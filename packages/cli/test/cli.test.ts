import { mkdtempSync, readFileSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { add, init, list, loadConfig, resolveWithDependencies } from "../src/lib";

let cwd: string;

beforeEach(() => {
  cwd = mkdtempSync(join(tmpdir(), "raster-cli-"));
});

afterEach(() => {
  rmSync(cwd, { recursive: true, force: true });
});

describe("init", () => {
  it("writes raster.css and raster.json", () => {
    const results = init(cwd);
    expect(results.map((r) => r.status)).toEqual(["written", "written"]);
    const css = readFileSync(join(cwd, "styles/raster.css"), "utf8");
    expect(css).toContain("RASTER");
    expect(css).toContain(".rs-btn-primary");
    expect(loadConfig(cwd)).toMatchObject({ cssDir: "styles", componentsDir: "components/raster" });
  });

  it("honors --compat and custom dirs", () => {
    init(cwd, { cssDir: "app/styles", compat: true });
    expect(existsSync(join(cwd, "app/styles/raster.css"))).toBe(true);
    expect(readFileSync(join(cwd, "app/styles/raster-compat.css"), "utf8")).toContain(".bb-btn-primary");
  });

  it("never clobbers an existing file without overwrite", () => {
    init(cwd);
    writeFileSync(join(cwd, "styles/raster.css"), "/* mine */");
    const results = init(cwd);
    expect(results[0]!.status).toBe("skipped");
    expect(readFileSync(join(cwd, "styles/raster.css"), "utf8")).toBe("/* mine */");
    const overwritten = init(cwd, { overwrite: true });
    expect(overwritten[0]!.status).toBe("written");
  });
});

describe("add", () => {
  it("vendors component source plus the cx helper", () => {
    init(cwd);
    const { outcomes, unknown } = add(cwd, ["button"]);
    expect(unknown).toEqual([]);
    expect(outcomes).toHaveLength(1);
    const source = readFileSync(join(cwd, "components/raster/button.tsx"), "utf8");
    expect(source).toContain("rs-btn-primary");
    expect(source).toContain('from "./cx"');
    expect(existsSync(join(cwd, "components/raster/cx.ts"))).toBe(true);
  });

  it("pulls registry dependencies in install order", () => {
    init(cwd);
    const { outcomes } = add(cwd, ["dialog"]);
    expect(outcomes.map((o) => o.item.name)).toEqual(["button", "dialog"]);
    expect(existsSync(join(cwd, "components/raster/dialog.tsx"))).toBe(true);
    expect(existsSync(join(cwd, "components/raster/button.tsx"))).toBe(true);
  });

  it("reports unknown names and css-only components", () => {
    init(cwd);
    const { outcomes, unknown } = add(cwd, ["nope", "table"]);
    expect(unknown).toEqual(["nope"]);
    expect(outcomes[0]!.cssOnly).toBe(true);
    expect(outcomes[0]!.results).toEqual([]);
  });

  it("respects a custom componentsDir from raster.json", () => {
    init(cwd, { componentsDir: "src/ui" });
    add(cwd, ["switch"]);
    expect(existsSync(join(cwd, "src/ui/switch.tsx"))).toBe(true);
  });
});

describe("registry resolution", () => {
  it("resolves every listed component", () => {
    for (const entry of list()) {
      const { resolved, unknown } = resolveWithDependencies([entry.name]);
      expect(unknown).toEqual([]);
      expect(resolved.length).toBeGreaterThan(0);
    }
  });
});
