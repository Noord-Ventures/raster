import { mkdtempSync, readFileSync, existsSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
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
  it("writes raster.css, Inter files, a specimen page, and raster.json", () => {
    const results = init(cwd);
    expect(results.map((r) => r.status).every((s) => s === "written")).toBe(true);
    const css = readFileSync(join(cwd, "styles/raster.css"), "utf8");
    expect(css).toContain("RASTER");
    expect(css).toContain(".rs-btn-primary");
    expect(css).toContain("font-family:Inter");
    expect(css).not.toContain("Messina");
    expect(existsSync(join(cwd, "styles/fonts/inter/InterVariable-latin.woff2"))).toBe(true);
    expect(existsSync(join(cwd, "styles/fonts/inter/InterVariable-latin-ext.woff2"))).toBe(true);
    expect(readFileSync(join(cwd, "styles/fonts/inter/OFL.txt"), "utf8")).toContain("SIL Open Font License");
    const page = readFileSync(join(cwd, "index.html"), "utf8");
    expect(page).toContain('href="styles/raster.css"');
    expect(page).toContain("workhorse of a design system");
    expect(page).toContain("rs-btn-primary");
    expect(page).toContain("184 column + 20 gutter");
    expect(page).not.toContain("Hello world");
    expect(page).not.toContain("lighthouse");
    expect(page).not.toContain("U+0041");
    expect(page).not.toContain("Messina");
    expect(page).not.toContain("tailwind");
    expect(page).not.toContain("radix");
    expect(loadConfig(cwd)).toMatchObject({ cssDir: "styles", componentsDir: "components/raster" });
  });

  it("honors --compat, --registry, and custom dirs", () => {
    init(cwd, { cssDir: "app/styles", compat: true, registry: "https://raster.noord.dev/r" });
    expect(existsSync(join(cwd, "app/styles/raster.css"))).toBe(true);
    expect(readFileSync(join(cwd, "app/styles/raster-compat.css"), "utf8")).toContain(".bb-btn-primary");
    expect(existsSync(join(cwd, "app/styles/fonts/inter/OFL.txt"))).toBe(true);
    expect(loadConfig(cwd).registry).toBe("https://raster.noord.dev/r");
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
  it("vendors component source plus the cx helper", async () => {
    init(cwd);
    const { outcomes, unknown } = await add(cwd, ["button"]);
    expect(unknown).toEqual([]);
    expect(outcomes).toHaveLength(1);
    const source = readFileSync(join(cwd, "components/raster/button.tsx"), "utf8");
    expect(source).toContain("rs-btn-primary");
    expect(source).toContain('from "./cx"');
    expect(existsSync(join(cwd, "components/raster/cx.ts"))).toBe(true);
  });

  it("pulls registry dependencies in install order", async () => {
    init(cwd);
    const { outcomes } = await add(cwd, ["dialog"]);
    expect(outcomes.map((o) => o.item.name)).toEqual(["button", "dialog"]);
    expect(existsSync(join(cwd, "components/raster/dialog.tsx"))).toBe(true);
    expect(existsSync(join(cwd, "components/raster/button.tsx"))).toBe(true);
  });

  it("reports unknown names and css-only components", async () => {
    init(cwd);
    const { outcomes, unknown } = await add(cwd, ["nope", "table"]);
    expect(unknown).toEqual(["nope"]);
    expect(outcomes[0]!.cssOnly).toBe(true);
    expect(outcomes[0]!.results).toEqual([]);
  });

  it("respects a custom componentsDir from raster.json", async () => {
    init(cwd, { componentsDir: "src/ui" });
    await add(cwd, ["switch"]);
    expect(existsSync(join(cwd, "src/ui/switch.tsx"))).toBe(true);
  });

  it("loads items from --registry (local directory)", async () => {
    init(cwd);
    const registry = join(cwd, "remote-r");
    mkdirSync(registry);
    writeFileSync(
      join(registry, "button.json"),
      JSON.stringify({
        name: "button",
        title: "Button",
        description: "from remote",
        files: [
          {
            path: "raster/button.tsx",
            content: "export const Button = () => null; // remote\n",
            type: "registry:component",
            target: "components/raster/button.tsx",
          },
        ],
        meta: { raster: { cssOnly: false, registryDependencies: [] } },
      }),
    );
    const { outcomes, unknown } = await add(cwd, ["button"], { registry, overwrite: true });
    expect(unknown).toEqual([]);
    expect(readFileSync(join(cwd, "components/raster/button.tsx"), "utf8")).toContain("remote");
    expect(outcomes[0]!.item.description).toBe("from remote");
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
