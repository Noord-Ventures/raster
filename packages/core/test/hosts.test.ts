import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const repoRoot = join(import.meta.dirname, "../../..");
const pkgDir = join(import.meta.dirname, "..");
const registryDir = join(repoRoot, "registry");
const DEAD = /vlak\.design|vlak-pied|vercel\.app|vlak\.noord\.dev/;

let files: string[];

beforeAll(() => {
  // registry/ is committed and CI checks it is in sync; tests only read.
  files = readdirSync(registryDir).filter((name) => name.endsWith(".json"));
});

describe("generated registry hosts", () => {
  it("never mentions vlak.design, vlak-pied, or vercel.app", () => {
    const hits: string[] = [];
    for (const name of files) {
      const text = readFileSync(join(registryDir, name), "utf8");
      if (DEAD.test(text)) hits.push(name);
    }
    expect(hits, `dead host in registry/${hits.join(", ")}`).toEqual([]);
  });

  it("never names a leftover scoped package", () => {
    const leftovers = [new RegExp(`@${"vlak"}/`), new RegExp(`@${"noord"}/vlak`), new RegExp(`@${"rennvaldes"}/`)];
    const hits: string[] = [];
    for (const name of files) {
      const text = readFileSync(join(registryDir, name), "utf8");
      if (leftovers.some((re) => re.test(text))) hits.push(name);
    }
    expect(hits, `leftover package scope in registry/${hits.join(", ")}`).toEqual([]);
  });

  it("uses https://vlak.dev for homepage, vlak-base, and inter", () => {
    const index = JSON.parse(readFileSync(join(registryDir, "index.json"), "utf8")) as {
      homepage: string;
      items: Array<{ name: string; registryDependencies?: string[] }>;
    };
    expect(index.homepage).toBe("https://vlak.dev");

    const inter = index.items.find((item) => item.name === "inter");
    const base = index.items.find((item) => item.name === "vlak-base");
    expect(inter).toBeTruthy();
    expect(base?.registryDependencies).toContain("https://vlak.dev/r/inter.json");

    for (const item of index.items) {
      if (item.name === "inter" || item.name === "vlak-base" || item.name === "vlak-lib") continue;
      expect(item.registryDependencies, item.name).toContain("https://vlak.dev/r/vlak-base.json");
      expect(item.registryDependencies, item.name).toContain("https://vlak.dev/r/inter.json");
      for (const dep of item.registryDependencies ?? []) {
        expect(dep.startsWith("https://vlak.dev/"), `${item.name} dep ${dep}`).toBe(true);
      }
    }
  });
});
