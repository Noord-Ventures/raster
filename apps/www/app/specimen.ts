/** The homepage specimen. One writer for the face, the word, the law, and the command. */

export const FACE = "Inter";
export const WORD = "Raster";
export const LAW = "A design system on a modular grid.";
export const POSTER = "Inspired by Dutch and Swiss modernism.";
/** The package path: precompiled React and one stylesheet. The homepage command. */
export const INSTALL = "npm install @noorddev/raster-react";
/** The vendoring path: the CLI writes the CSS, Inter, and a specimen, then copies leaves. */
export const COMMAND = "npx @noorddev/raster-cli init";
/** The shadcn path: the same registry, through shadcn's CLI. */
export const SHADCN = "npx shadcn add https://getraster.com/r/button.json";

/** Public door. Do not attach DNS from this repo. */
export const DOOR = "https://getraster.com";
/** Public host for registry, fonts, OG, and canonical. Same as the door. */
export const HOST = "https://getraster.com";

/**
 * Object cells on the poster. Names from the catalog on this branch —
 * the same kit a stranger opens under /components. Full objects, not crops.
 */
export const KIT = [
  "accordion",
  "calendar",
  "field",
  "stepper",
  "button",
  "toggle-group",
  "tabs",
  "card",
  "slider",
  "pagination",
  "switch",
  "badge",
] as const;

function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

/** Homepage specimen. Uses the same scroll-in crumb bar as the rest of the site. */
export function isSpecimenPath(pathname: string) {
  return normalizePath(pathname) === "/";
}

/** Flush field pages. Home and About both keep the scroll-in crumb bar. */
export function isFieldPath(pathname: string) {
  const path = normalizePath(pathname);
  return path === "/" || path === "/about";
}
