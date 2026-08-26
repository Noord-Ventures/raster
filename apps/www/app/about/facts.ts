/**
 * About facts. Every string is already known, or written from known facts.
 * Do not invent a bio, a client list, a headcount, or a product.
 *
 * Sources:
 *   packages/core/src/tokens.ts          type.foundry, meta.url
 *   packages/core/css/fonts/inter/OFL.txt
 *   README.md                            typeface, packages
 *   LICENSE                              copyright line
 *   apps/www/app/specimen.ts             word, door, host
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
  span: "Alkmaar ↔ Silicon Valley",
  what: "Noord is an AI lab between Alkmaar and Silicon Valley.",
  built: "Raster was designed and built there.",
  who: "Renato Valdés Olmos led design and development for Raster at Noord.",
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
