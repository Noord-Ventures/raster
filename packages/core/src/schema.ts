/**
 * Raster registry schema: the typed contract every component entry
 * satisfies. The registry drives everything downstream: the docs site,
 * the CLI, the generated registry JSON, and the integrity tests.
 */

export const rasterCategories = [
  "actions",
  "forms",
  "navigation",
  "feedback",
  "surfaces",
  "content",
  "patterns",
] as const;

export type RasterCategory = (typeof rasterCategories)[number];

export interface RasterComponent {
  /** Kebab-case identifier, unique across the registry. */
  name: string;
  /** Sentence-case display name. */
  title: string;
  description: string;
  category: RasterCategory;
  /** Every CSS class this component introduces (canonical rs- names). */
  classes: string[];
  /** CSS source files, relative to packages/core/css/. */
  css: string[];
  /** React source file, relative to packages/react/src/. Absent for CSS-only entries. */
  react?: string;
  /** Other registry components this one's snippet or styles rely on. */
  registryDependencies?: string[];
  /** Minimal HTML snippet in the house style. */
  snippet: string;
}

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/**
 * Structural validation of a registry. Returns a list of problems;
 * an empty list means the registry is well-formed. File-existence and
 * CSS-parity checks live in the core test suite, which can touch disk.
 */
export function validateRegistry(components: readonly RasterComponent[]): string[] {
  const problems: string[] = [];
  const names = new Set<string>();

  for (const c of components) {
    if (!KEBAB.test(c.name)) problems.push(`${c.name}: name is not kebab-case`);
    if (names.has(c.name)) problems.push(`${c.name}: duplicate name`);
    names.add(c.name);
    if (!c.title) problems.push(`${c.name}: missing title`);
    if (c.title !== c.title.charAt(0).toUpperCase() + c.title.slice(1) || /[A-Z]{2,}/.test(c.title))
      problems.push(`${c.name}: title must be sentence case`);
    if (!c.description) problems.push(`${c.name}: missing description`);
    if (!(rasterCategories as readonly string[]).includes(c.category))
      problems.push(`${c.name}: unknown category "${c.category}"`);
    if (c.classes.length === 0) problems.push(`${c.name}: no classes listed`);
    if (c.css.length === 0) problems.push(`${c.name}: no css files listed`);
    if (!c.snippet.trim()) problems.push(`${c.name}: empty snippet`);
  }

  for (const c of components) {
    for (const dep of c.registryDependencies ?? []) {
      if (!names.has(dep)) problems.push(`${c.name}: unknown registry dependency "${dep}"`);
    }
  }

  return problems;
}
