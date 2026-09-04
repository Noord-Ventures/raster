import { mkdtempSync, readFileSync, existsSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { add, docsFor, init, list, loadConfig, resolveWithDependencies, search } from "../src/lib";

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
    expect(page).toContain("rs-kbd");
    expect(page).toContain("rs-chart");
    expect(page).toContain("scheme-moon");
    expect(page).toContain("Module cells sit flush on the gridline");
    expect(page).not.toContain("Dark scheme");
    expect(page).not.toContain("programme");
    expect(page).not.toContain("No radius");
    expect(page).not.toContain("Hello world");
    expect(page).not.toContain("lighthouse");
    expect(page).not.toContain("U+0041");
    expect(page).not.toContain("Messina");
    expect(page).not.toContain("tailwind");
    expect(page).not.toContain("radix");
    expect(loadConfig(cwd)).toMatchObject({ cssDir: "styles", componentsDir: "components/raster" });
  });

  it("honors --registry and custom dirs", () => {
    init(cwd, { cssDir: "app/styles", registry: "https://getraster.com/r" });
    expect(existsSync(join(cwd, "app/styles/raster.css"))).toBe(true);
    expect(existsSync(join(cwd, "app/styles/fonts/inter/OFL.txt"))).toBe(true);
    expect(loadConfig(cwd).registry).toBe("https://getraster.com/r");
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
  it("vendors component source plus the shared lib once", async () => {
    init(cwd);
    const { outcomes, unknown } = await add(cwd, ["button"]);
    expect(unknown).toEqual([]);
    expect(outcomes.map((o) => o.item.name)).toEqual(["raster-lib", "button"]);
    const source = readFileSync(join(cwd, "components/raster/button.tsx"), "utf8");
    expect(source).toContain("rs-btn-primary");
    expect(source).toContain("@stylexjs/stylex");
    expect(existsSync(join(cwd, "components/raster/cx.ts"))).toBe(true);
    expect(existsSync(join(cwd, "components/raster/rs.ts"))).toBe(true);
    expect(readFileSync(join(cwd, "components/raster/rs.ts"), "utf8")).toContain('from "./cx"');
    expect(existsSync(join(cwd, "components/raster/tokens.stylex.ts"))).toBe(true);
  });

  it("pulls registry dependencies in install order", async () => {
    init(cwd);
    const { outcomes } = await add(cwd, ["dialog"]);
    expect(outcomes.map((o) => o.item.name)).toEqual(["raster-lib", "button", "icons", "dialog"]);
    expect(existsSync(join(cwd, "components/raster/dialog.tsx"))).toBe(true);
    expect(existsSync(join(cwd, "components/raster/button.tsx"))).toBe(true);
  });

  it("reports unknown names", async () => {
    init(cwd);
    const { unknown } = await add(cwd, ["nope"]);
    expect(unknown).toEqual(["nope"]);
  });

  it("installs every vendored file exactly once across a whole add", async () => {
    init(cwd);
    const { outcomes } = await add(cwd, ["select", "combobox", "date-picker", "bar-chart"]);
    const written = outcomes.flatMap((o) => o.results.map((r) => r.path));
    expect(new Set(written).size).toBe(written.length);
    expect(outcomes.filter((o) => o.item.name === "dropdown-menu")).toHaveLength(1);
    expect(existsSync(join(cwd, "components/raster/charts/frame.tsx"))).toBe(true);
  });

  it("every vendored import resolves inside the project", async () => {
    init(cwd);
    const { outcomes } = await add(cwd, ["chart", "sidebar", "form", "menubar"]);
    for (const r of outcomes.flatMap((o) => o.results)) {
      const file = join(cwd, r.path);
      const dir = join(file, "..");
      for (const spec of [...readFileSync(file, "utf8").matchAll(/from "(\.[^"]+)"/g)].map((m) => m[1]!)) {
        const base = join(dir, spec);
        expect(
          existsSync(`${base}.ts`) || existsSync(`${base}.tsx`) || existsSync(join(base, "index.ts")),
          `${r.path}: ${spec} resolves`,
        ).toBe(true);
      }
    }
  });

  it("keeps nested trees intact so chart imports resolve", async () => {
    init(cwd);
    await add(cwd, ["chart"]);
    expect(existsSync(join(cwd, "components/raster/chart.tsx"))).toBe(true);
    expect(existsSync(join(cwd, "components/raster/charts/index.ts"))).toBe(true);
    expect(existsSync(join(cwd, "components/raster/charts/line.tsx"))).toBe(true);
    const line = readFileSync(join(cwd, "components/raster/charts/line.tsx"), "utf8");
    for (const spec of [...line.matchAll(/from "(\.[^"]+)"/g)].map((m) => m[1]!)) {
      const base = join(cwd, "components/raster/charts", spec);
      expect(
        existsSync(`${base}.ts`) || existsSync(`${base}.tsx`) || existsSync(join(base, "index.ts")),
        `${spec} resolves`,
      ).toBe(true);
    }
  });

  it("writes a React leaf for table", async () => {
    init(cwd);
    const { outcomes } = await add(cwd, ["table"]);
    expect(outcomes[0]!.cssOnly).toBe(false);
    expect(existsSync(join(cwd, "components/raster/table.tsx"))).toBe(true);
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

describe("docs", () => {
  it("prints the bundled markdown page for a component", () => {
    const page = docsFor("button")!;
    expect(page).toContain("# Button");
    expect(page).toContain("npx @noorddev/raster-cli add button");
    expect(page).toContain('import { Button } from "@noorddev/raster-react"');
    expect(page).toContain("## Props");
    expect(page).toContain("## Keyboard");
  });

  it("serves the guide, the index, and the tokens page", () => {
    expect(docsFor("guide")).toContain("# Raster guide");
    expect(docsFor("index")).toContain("# Raster components");
    expect(docsFor("tokens")).toContain("--bg");
  });

  it("has a page for every listed component and none for unknown names", () => {
    for (const entry of list()) expect(docsFor(entry.name), entry.name).toBeTruthy();
    expect(docsFor("nope")).toBeUndefined();
  });
});

describe("search", () => {
  it("matches names, titles, aliases, descriptions, and classes", () => {
    expect(search("menu").map((h) => h.name)).toContain("dropdown-menu");
    expect(search("sonner")[0]?.name).toBe("toast");
    expect(search("side panel")[0]?.name).toBe("sheet");
    expect(search("rs-btn-primary").map((h) => h.name)).toContain("button");
    expect(search("hairline").length).toBeGreaterThan(0);
    expect(search("   ")).toEqual([]);
    expect(search("zzzz-nothing")).toEqual([]);
  });

  it("ranks an exact name first and reports what matched", () => {
    const hits = search("select");
    expect(hits[0]?.name).toBe("select");
    expect(hits[0]?.matched).toContain("name");
    for (const hit of hits) expect(hit.matched.length).toBeGreaterThan(0);
  });
});

describe("list", () => {
  it("returns plain data for --json", () => {
    const entries = list();
    expect(entries.length).toBeGreaterThan(50);
    for (const entry of entries) {
      expect(typeof entry.name).toBe("string");
      expect(typeof entry.category).toBe("string");
      expect(typeof entry.cssOnly).toBe("boolean");
    }
    expect(JSON.parse(JSON.stringify(entries))).toEqual(entries);
  });
});
