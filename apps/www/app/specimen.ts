/** The homepage specimen. One writer for the face, the word, the law, and the command. */

export const FACE = "Inter";
export const WORD = "Raster";
export const LAW = "A poster you can install.";
export const COMMAND = "npx @noordvc/raster-cli init";

/** Public door. Do not attach DNS from this repo. */
export const DOOR = "https://getraster.com";
/** Current host until the door is pointed. Registry and fonts still live here. */
export const HOST = "https://raster.noord.dev";

/**
 * Object cells on the poster. Names from the catalog on this branch —
 * the same kit a stranger opens under /components. Not a leftover demo.
 */
export const KIT = ["button-group", "tabs", "chart"] as const;

/** Narrow exception: the flush poster has no crumb bar. */
export function isSpecimenPath(pathname: string) {
  return pathname === "/";
}
