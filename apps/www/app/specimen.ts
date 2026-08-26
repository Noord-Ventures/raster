/** The homepage specimen. One writer for the face, the law, and the command. */

export const FACE = "Inter";
export const LAW = "One ink, a 204 module.";
export const COMMAND = "npx @noordvc/raster-cli init";

/** Narrow exception: the flush poster has no crumb bar. */
export function isSpecimenPath(pathname: string) {
  return pathname === "/";
}
