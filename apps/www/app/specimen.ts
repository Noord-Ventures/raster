/** The homepage specimen. One writer for the face, the word, the law, and the command. */

export const FACE = "Inter";
export const WORD = "Raster";
export const LAW = "A poster you can install.";
export const COMMAND = "npx @noordvc/raster-cli init";

/** Narrow exception: the flush poster has no crumb bar. */
export function isSpecimenPath(pathname: string) {
  return pathname === "/";
}
