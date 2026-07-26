/**
 * The raster CLI as a library: every command is a pure-ish function
 * over an explicit cwd so the whole thing is testable without a shell.
 *
 * The CLI carries the entire system with it (CSS + registry bundled at
 * build time), so init and add work offline. A remote registry can
 * override the bundle via --registry or raster.json for out-of-band
 * updates.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { rasterComponents, rasterTokens } from "@raster/core";
import bundle from "../../../registry/bundle.json" with { type: "json" };

const rasterCss: string = (bundle as { css: { raster: string } }).css.raster;
const compatCss: string = (bundle as { css: { compat: string } }).css.compat;

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

export function loadConfig(cwd: string): RasterConfig {
  const file = join(cwd, CONFIG_FILE);
  if (!existsSync(file)) return { ...defaultConfig };
  return { ...defaultConfig, ...(JSON.parse(readFileSync(file, "utf8")) as Partial<RasterConfig>) };
}

function writeFileSafe(cwd: string, relPath: string, content: string, overwrite: boolean): WriteResult {
  const abs = join(cwd, relPath);
  if (existsSync(abs)) {
    const current = readFileSync(abs, "utf8");
    if (current === content) return { path: relPath, status: "unchanged" };
    if (!overwrite) return { path: relPath, status: "skipped" };
  }
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  return { path: relPath, status: "written" };
}

export interface InitOptions {
  cssDir?: string;
  componentsDir?: string;
  compat?: boolean;
  overwrite?: boolean;
}

/** Write raster.css (and optionally the 0.1 compat layer) plus raster.json. */
export function init(cwd: string, options: InitOptions = {}): WriteResult[] {
  const config: RasterConfig = {
    cssDir: options.cssDir ?? defaultConfig.cssDir,
    componentsDir: options.componentsDir ?? defaultConfig.componentsDir,
  };
  const results: WriteResult[] = [];
  results.push(writeFileSafe(cwd, join(config.cssDir, "raster.css"), rasterCss, options.overwrite ?? false));
  if (options.compat) {
    results.push(
      writeFileSafe(cwd, join(config.cssDir, "raster-compat.css"), compatCss, options.overwrite ?? false),
    );
  }
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
}

export interface AddOutcome {
  item: RegistryItem;
  cssOnly: boolean;
  results: WriteResult[];
}

/**
 * Vendor a component's React source (plus the shared cx helper) into
 * the project. CSS is not written per-component: init's raster.css
 * already styles every component. That is the CSS-first model.
 */
export function add(cwd: string, names: string[], options: AddOptions = {}): {
  outcomes: AddOutcome[];
  unknown: string[];
} {
  const config = loadConfig(cwd);
  const { resolved, unknown } = resolveWithDependencies(names);
  const outcomes: AddOutcome[] = [];
  for (const item of resolved) {
    const cssOnly = item.meta?.raster?.cssOnly ?? false;
    const results: WriteResult[] = [];
    if (!cssOnly) {
      for (const file of item.files) {
        if (!file.path.endsWith(".tsx") && !file.path.endsWith(".ts")) continue;
        const base = file.path.split("/").pop()!;
        results.push(writeFileSafe(cwd, join(config.componentsDir, base), file.content, options.overwrite ?? false));
      }
    }
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
  return rasterComponents.map((c) => ({
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
