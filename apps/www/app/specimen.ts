/** The homepage specimen. One writer for the face, the word, the law, and the command. */

export const FACE = "Inter";
export const WORD = "Raster";
export const LAW = "A poster you can install.";
export const COMMAND = "npx @noordvc/raster-cli init";

/**
 * Object cells on the poster. Names from the catalog on this branch —
 * the same kit a stranger opens under /components. Not a leftover demo.
 */
export const KIT = ["button-group", "tabs", "chart"] as const;

/** Narrow exception: the flush poster has no crumb bar. */
export function isSpecimenPath(pathname: string) {
  return pathname === "/";
}
