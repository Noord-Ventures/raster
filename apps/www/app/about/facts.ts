/**
 * Masthead facts. Every string is already in this repo.
 * Do not invent a bio, a license, or a credit.
 *
 * Sources:
 *   packages/core/src/tokens.ts          type.foundry, meta.url
 *   packages/core/css/fonts/inter/OFL.txt
 *   README.md                            typeface, packages, principles
 *   LICENSE                              copyright line
 *   apps/www/app/specimen.ts             word, law
 *   packages/core/src/registry.ts        hover-card snippet (Noord)
 *   apps/www/package.json                docs-site runtime packages
 *   apps/www/node_modules/{next,react,react-dom}/package.json
 *   vercel.json                          deploy
 *   package.json                         homepage, repository
 */

import { DOOR, LAW, WORD } from "../specimen";
import { rasterTokens } from "@noordvc/raster";

export const word = WORD;
export const law = LAW;

const foundry = rasterTokens.type.foundry;

export const typeface = {
  heading: "Typeface",
  name: foundry.typeface,
  designer: foundry.designer,
  license: foundry.license,
  url: foundry.url,
  ofl: "Copyright 2016 The Inter Project Authors",
  why: "One face. Weight and size do the work.",
};

export const noord = {
  heading: "Noord",
  what: "Noord, a venture studio in Alkmaar. Ten portfolio companies, one design system.",
  door: DOOR,
  host: rasterTokens.meta.url,
  packages: ["@noordvc/raster", "@noordvc/raster-react", "@noordvc/raster-cli"] as const,
  command: "npx @noordvc/raster-cli init",
};

export const person = {
  heading: "Renato Valdés Olmos",
  copyright: "MIT © Noord / Renato Valdés-Olmos",
  year: "2026",
  repo: "https://github.com/rennvaldes/raster",
};

/** Runtime and vendored third parties, licenses read from this repo. */
export const credits: Array<{ name: string; license: string; note: string; href?: string }> = [
  {
    name: "Inter",
    license: "SIL OFL 1.1",
    note: "Vendored at packages/core/css/fonts/inter.",
    href: foundry.url,
  },
  {
    name: "Next.js",
    license: "MIT",
    note: "Docs site. apps/www depends on next.",
    href: "https://nextjs.org",
  },
  {
    name: "React",
    license: "MIT",
    note: "Docs site, and a peer of @noordvc/raster-react.",
    href: "https://react.dev",
  },
  {
    name: "React DOM",
    license: "MIT",
    note: "Docs site, and a peer of @noordvc/raster-react.",
  },
  {
    name: "Vercel",
    license: "—",
    note: "This repo’s vercel.json builds apps/www. Not a runtime package.",
    href: "https://vercel.com",
  },
];
