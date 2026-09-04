/**
 * The raster CLI as a library: every command is a pure-ish function
 * over an explicit cwd so the whole thing is testable without a shell.
 *
 * The CLI carries the entire system with it (CSS + registry + Inter
 * files bundled at build time), so init and add work offline. A remote
 * registry can override the bundle via --registry or raster.json for
 * out-of-band updates.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { catalogComponents, rasterComponents, rasterTokens } from "@noorddev/raster";
import bundle from "../../../registry/bundle.json" with { type: "json" };
import { starterPage } from "./starter";

const rasterCss: string = (bundle as { css: { raster: string } }).css.raster;

export interface RegistryFile {
  path: string;
  content: string;
  type: string;
  target: string;
}

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  files: RegistryFile[];
  meta?: {
    raster?: {
      category?: string;
      snippet?: string;
      cssOnly?: boolean;
      registryDependencies?: string[];
    };
  };
}

export interface RasterConfig {
  cssDir: string;
  componentsDir: string;
  registry?: string;
}

export const defaultConfig: RasterConfig = {
  cssDir: "styles",
  componentsDir: "components/raster",
};

export interface WriteResult {
  path: string;
  status: "written" | "skipped" | "unchanged";
}

const CONFIG_FILE = "raster.json";
const FONT_FILES = ["InterVariable-latin.woff2", "InterVariable-latin-ext.woff2", "OFL.txt"];

export function loadConfig(cwd: string): RasterConfig {
  const file = join(cwd, CONFIG_FILE);
  if (!existsSync(file)) return { ...defaultConfig };
  return { ...defaultConfig, ...(JSON.parse(readFileSync(file, "utf8")) as Partial<RasterConfig>) };
}

function writeFileSafe(cwd: string, relPath: string, content: string | Buffer, overwrite: boolean): WriteResult {
  const abs = join(cwd, relPath);
  if (existsSync(abs)) {
    const current = readFileSync(abs);
    const next = typeof content === "string" ? Buffer.from(content) : content;
    if (current.equals(next)) return { path: relPath, status: "unchanged" };
    if (!overwrite) return { path: relPath, status: "skipped" };
  }
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  return { path: relPath, status: "written" };
}

/** Resolve vendored Inter files: published CLI dist, or the core package in-repo. */
export function resolveFontsDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(here, "fonts/inter"),
    join(here, "../fonts/inter"),
    join(here, "../../core/css/fonts/inter"),
    join(here, "../../../core/css/fonts/inter"),
  ];
  const found = candidates.find((dir) => existsSync(join(dir, "OFL.txt")));
  if (!found) {
    throw new Error("Raster Inter files not found. Rebuild @noorddev/raster-cli (copy-fonts) or check packages/core/css/fonts/inter.");
  }
  return found;
}

function copyFonts(cwd: string, cssDir: string, overwrite: boolean): WriteResult[] {
  const srcDir = resolveFontsDir();
  const results: WriteResult[] = [];
  for (const file of FONT_FILES) {
    const src = join(srcDir, file);
    if (!existsSync(src)) continue;
    results.push(writeFileSafe(cwd, join(cssDir, "fonts/inter", file), readFileSync(src), overwrite));
  }
  return results;
}

export interface InitOptions {
  cssDir?: string;
  componentsDir?: string;
  overwrite?: boolean;
  registry?: string;
}

/** Write raster.css, Inter files, a specimen page, and raster.json. */
export function init(cwd: string, options: InitOptions = {}): WriteResult[] {
  const config: RasterConfig = {
    cssDir: options.cssDir ?? defaultConfig.cssDir,
    componentsDir: options.componentsDir ?? defaultConfig.componentsDir,
  };
  if (options.registry) config.registry = options.registry;
  const results: WriteResult[] = [];
  const cssHref = `${config.cssDir.replace(/\\/g, "/")}/raster.css`;
  results.push(writeFileSafe(cwd, join(config.cssDir, "raster.css"), rasterCss, options.overwrite ?? false));
  results.push(...copyFonts(cwd, config.cssDir, options.overwrite ?? false));
  results.push(writeFileSafe(cwd, "index.html", starterPage(cssHref), options.overwrite ?? false));
  results.push(
    writeFileSafe(cwd, CONFIG_FILE, JSON.stringify(config, null, 2) + "\n", options.overwrite ?? false),
  );
  return results;
}

export function getItems(): RegistryItem[] {
  return (bundle as { items: RegistryItem[] }).items;
}

export function findItem(name: string): RegistryItem | undefined {
  return getItems().find((item) => item.name === name);
}

/** Expand names to include registry dependencies (by raster name), deduped, in install order. */
export function resolveWithDependencies(names: string[]): { resolved: RegistryItem[]; unknown: string[] } {
  const unknown: string[] = [];
  const seen = new Set<string>();
  const resolved: RegistryItem[] = [];
  const visit = (name: string) => {
    if (seen.has(name)) return;
    seen.add(name);
    const item = findItem(name);
    if (!item) {
      unknown.push(name);
      return;
    }
    for (const dep of item.meta?.raster?.registryDependencies ?? []) visit(dep);
    resolved.push(item);
  };
  for (const name of names) visit(name);
  return { resolved, unknown };
}

export interface AddOptions {
  overwrite?: boolean;
  registry?: string;
}

export interface AddOutcome {
  item: RegistryItem;
  cssOnly: boolean;
  results: WriteResult[];
}

function itemUrl(registry: string, name: string): string {
  return `${registry.replace(/\/$/, "")}/${name}.json`;
}

async function readRegistryItem(registry: string, name: string): Promise<RegistryItem> {
  const loc = itemUrl(registry, name);
  if (/^https?:\/\//.test(loc) || loc.startsWith("file:")) {
    const res = await fetch(loc);
    if (!res.ok) throw new Error(`Failed to fetch ${loc}: ${res.status}`);
    return (await res.json()) as RegistryItem;
  }
  const file = join(registry, `${name}.json`);
  if (!existsSync(file)) throw new Error(`Registry item not found: ${file}`);
  return JSON.parse(readFileSync(file, "utf8")) as RegistryItem;
}

async function resolveFromRegistry(
  registry: string,
  names: string[],
): Promise<{ resolved: RegistryItem[]; unknown: string[] }> {
  const unknown: string[] = [];
  const seen = new Set<string>();
  const resolved: RegistryItem[] = [];
  const visit = async (name: string) => {
    if (seen.has(name)) return;
    seen.add(name);
    try {
      const item = await readRegistryItem(registry, name);
      for (const dep of item.meta?.raster?.registryDependencies ?? []) await visit(dep);
      resolved.push(item);
    } catch {
      unknown.push(name);
    }
  };
  for (const name of names) await visit(name);
  return { resolved, unknown };
}

function writeItemFiles(cwd: string, item: RegistryItem, componentsDir: string, overwrite: boolean): WriteResult[] {
  const results: WriteResult[] = [];
  for (const file of item.files) {
    if (!file.path.endsWith(".tsx") && !file.path.endsWith(".ts")) continue;
    // Registry targets are `components/raster/<tree>`; keep the tree so nested
    // imports (charts/, shared helpers) resolve exactly as they do in the source.
    const rel = file.target.replace(/^components\/raster\//, "").replace(/^raster\//, "");
    results.push(writeFileSafe(cwd, join(componentsDir, rel), file.content, overwrite));
  }
  return results;
}

/**
 * Vendor a component's React source (plus the shared cx helper) into
 * the project. CSS is not written per-component: init's raster.css
 * already styles every component. That is the CSS-first model.
 *
 * When --registry or raster.json.registry is set, items are loaded
 * from that registry (HTTP(S) URL or a local directory of JSON files)
 * instead of the bundled snapshot.
 */
export async function add(
  cwd: string,
  names: string[],
  options: AddOptions = {},
): Promise<{
  outcomes: AddOutcome[];
  unknown: string[];
}> {
  const config = loadConfig(cwd);
  const registry = options.registry ?? config.registry;
  const { resolved, unknown } = registry
    ? await resolveFromRegistry(registry, names)
    : resolveWithDependencies(names);
  const outcomes: AddOutcome[] = [];
  for (const item of resolved) {
    const cssOnly = item.meta?.raster?.cssOnly ?? false;
    const results = cssOnly ? [] : writeItemFiles(cwd, item, config.componentsDir, options.overwrite ?? false);
    outcomes.push({ item, cssOnly, results });
  }
  return { outcomes, unknown };
}

export interface ListEntry {
  name: string;
  title: string;
  description: string;
  category: string;
  cssOnly: boolean;
}

export function list(): ListEntry[] {
  return catalogComponents.map((c) => ({
    name: c.name,
    title: c.title,
    description: c.description,
    category: c.category,
    cssOnly: !c.react,
  }));
}

export function tokensJson(): string {
  return JSON.stringify(rasterTokens, null, 2);
}

export function snippetFor(name: string): string | undefined {
  return rasterComponents.find((c) => c.name === name)?.snippet;
}
