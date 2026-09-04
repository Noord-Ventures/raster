/**
 * The data the server answers from: the registry bundle (items, generated
 * docs markdown, CSS) and props.json. Both are read at first use from the
 * copy next to dist/index.js (published) or from the repository (in-repo),
 * so the server works offline and the executable stays small.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface RegistryFile {
  path: string;
  content: string;
  type: string;
  target: string;
}

export interface RasterMeta {
  category?: string;
  classes?: string[];
  snippet?: string;
  cssOnly?: boolean;
  registryDependencies?: string[];
  hidden?: boolean;
  aliases?: string[];
  example?: string;
  usage?: { use: string[]; avoid: string[] };
  keyboard?: Array<{ keys: string; does: string }>;
  a11y?: string[];
}

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  registryDependencies?: string[];
  dependencies?: string[];
  files: RegistryFile[];
  meta?: { raster?: RasterMeta };
}

export interface Bundle {
  name: string;
  version: string;
  css: { raster: string };
  items: RegistryItem[];
  docs?: { guide: string; index: string; tokens: string; components: Record<string, string> };
}

export interface RasterProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
}

export interface RasterExport {
  name: string;
  kind: "component" | "hook" | "function" | "type";
  description?: string;
  extends?: string;
  props: RasterProp[];
}

export interface PropsJson {
  version: string;
  components: Record<string, { exports: RasterExport[] }>;
}

const here = dirname(fileURLToPath(import.meta.url));

function locate(candidates: string[], what: string): string {
  const found = candidates.map((c) => join(here, c)).find((p) => existsSync(p));
  if (!found) throw new Error(`Raster ${what} not found. Rebuild @noorddev/raster-mcp (pnpm build) or run from the repo.`);
  return found;
}

let bundle: Bundle | undefined;
let props: PropsJson | undefined;

export function loadBundle(): Bundle {
  bundle ??= JSON.parse(readFileSync(locate(["registry/bundle.json", "../../../registry/bundle.json"], "registry bundle"), "utf8")) as Bundle;
  return bundle;
}

export function loadProps(): PropsJson {
  props ??= JSON.parse(readFileSync(locate(["props.json", "../../core/props/props.json"], "props.json"), "utf8")) as PropsJson;
  return props;
}

/** Component items only: the catalogue, hidden entries excluded unless asked. */
export function components(includeHidden = false): RegistryItem[] {
  return loadBundle().items.filter((item) => item.type === "registry:component" && (includeHidden || !item.meta?.raster?.hidden));
}

export function findComponent(name: string): RegistryItem | undefined {
  return loadBundle().items.find((item) => item.type === "registry:component" && item.name === name);
}

export function docsFor(name: string): string | undefined {
  const docs = loadBundle().docs;
  if (!docs) return undefined;
  if (name === "guide" || name === "index" || name === "tokens") return docs[name];
  return docs.components[name];
}
