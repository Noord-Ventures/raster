/** The homepage specimen. One writer for the face, the word, the law, and the command. */

export const FACE = "Inter";
export const WORD = "Raster";
export const LAW = "A design system on a modular grid.";
export const POSTER = "A poster you can install.";
export const COMMAND = "npx @noorddev/raster-cli init";

/** Public door. Do not attach DNS from this repo. */
export const DOOR = "https://getraster.com";
/** Current host until the door is pointed. Registry and fonts still live here. */
export const HOST = "https://raster.noord.dev";

/**
 * Object cells on the poster. Names from the catalog on this branch —
 * the same kit a stranger opens under /components. Full objects, not crops.
 */
export const KIT = ["accordion", "calendar", "field", "stepper"] as const;

function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

/** Narrow exception: the flush poster has no crumb bar. */
export function isSpecimenPath(pathname: string) {
  return normalizePath(pathname) === "/";
}

/** Flush field pages: homepage specimen and About. No crumb bar on the field. */
export function isFieldPath(pathname: string) {
  const path = normalizePath(pathname);
  return path === "/" || path === "/about";
}
