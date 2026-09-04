import { execSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const repoRoot = join(import.meta.dirname, "../../..");
const pkgDir = join(import.meta.dirname, "..");
const registryDir = join(repoRoot, "registry");
const DEAD = /raster\.design|raster-pied|vercel\.app|raster\.noord\.dev/;

let files: string[];

beforeAll(() => {
  execSync("node --experimental-strip-types scripts/build-registry.mjs", { cwd: pkgDir, stdio: "pipe" });
  files = readdirSync(registryDir).filter((name) => name.endsWith(".json"));
});

describe("generated registry hosts", () => {
  it("never mentions raster.design, raster-pied, or vercel.app", () => {
    const hits: string[] = [];
    for (const name of files) {
      const text = readFileSync(join(registryDir, name), "utf8");
      if (DEAD.test(text)) hits.push(name);
    }
    expect(hits, `dead host in registry/${hits.join(", ")}`).toEqual([]);
  });

  it("never names a leftover scoped package", () => {
    const leftovers = [new RegExp(`@${"raster"}/`), new RegExp(`@${"noord"}/raster`), new RegExp(`@${"rennvaldes"}/`)];
    const hits: string[] = [];
    for (const name of files) {
      const text = readFileSync(join(registryDir, name), "utf8");
      if (leftovers.some((re) => re.test(text))) hits.push(name);
    }
    expect(hits, `leftover package scope in registry/${hits.join(", ")}`).toEqual([]);
  });

  it("uses https://getraster.com for homepage, raster-base, and inter", () => {
    const index = JSON.parse(readFileSync(join(registryDir, "index.json"), "utf8")) as {
      homepage: string;
      items: Array<{ name: string; registryDependencies?: string[] }>;
    };
    expect(index.homepage).toBe("https://getraster.com");

    const inter = index.items.find((item) => item.name === "inter");
    const base = index.items.find((item) => item.name === "raster-base");
    expect(inter).toBeTruthy();
    expect(base?.registryDependencies).toContain("https://getraster.com/r/inter.json");

    for (const item of index.items) {
      if (item.name === "inter" || item.name === "raster-base" || item.name === "raster-lib") continue;
      expect(item.registryDependencies, item.name).toContain("https://getraster.com/r/raster-base.json");
      expect(item.registryDependencies, item.name).toContain("https://getraster.com/r/inter.json");
      for (const dep of item.registryDependencies ?? []) {
        expect(dep.startsWith("https://getraster.com/"), `${item.name} dep ${dep}`).toBe(true);
      }
    }
  });
});
