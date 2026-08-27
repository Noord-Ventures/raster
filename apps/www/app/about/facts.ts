/**
 * About facts. Every string is already known, or written from known facts.
 * Do not invent a bio, a client list, a headcount, or a product.
 *
 * Designers: published years, cities, and works only.
 * Credits: Inter, Noord, Renato, packages — colophon, not the face.
 *
 * Sources:
 *   packages/core/src/tokens.ts          type.foundry, meta.url, grid.module
 *   packages/core/css/fonts/inter/OFL.txt
 *   README.md                            typeface, packages, 204 module
 *   LICENSE                              copyright line
 *   apps/www/app/specimen.ts             word, door, host, command
 *   package.json                         homepage, repository
 */

import { COMMAND, DOOR, LAW, WORD } from "../specimen";
import { rasterTokens } from "@noorddev/raster";

export const word = WORD;
export const law = LAW;

const foundry = rasterTokens.type.foundry;
const grid = rasterTokens.grid;

export const era = {
  heading: "Grid",
  kicker: "Swiss Style · Dutch modernism",
  homage: "Raster is an homage to that room.",
  programme:
    "The grid is the idea. One grotesque. Hairlines, not boxes. A 204 module. Flush cells. No radius.",
  pair: "Josef Müller-Brockmann drew the programme. Wim Crouwel put it on the press at Total Design.",
};

export const featured = [
  {
    id: "jmb",
    name: "Josef Müller-Brockmann",
    years: "1914–1996",
    place: "Zurich",
    mark: "Grid Systems in Graphic Design. Neue Grafik, 1958.",
  },
  {
    id: "wc",
    name: "Wim Crouwel",
    years: "1928–2019",
    place: "Amsterdam",
    mark: "Stedelijk posters. New Alphabet, 1967. Total Design, 1963.",
  },
] as const;

export const field = [
  {
    name: "Max Bill",
    years: "1908–1994",
    place: "Zurich · Ulm",
    mark: "HfG Ulm. Concrete art.",
  },
  {
    name: "Karl Gerstner",
    years: "1930–2017",
    place: "Basel",
    mark: "Designing Programmes, 1964.",
  },
  {
    name: "Emil Ruder",
    years: "1914–1970",
    place: "Basel",
    mark: "Typographie.",
  },
  {
    name: "Armin Hofmann",
    years: "1920–2020",
    place: "Basel",
    mark: "Graphic Design Manual.",
  },
  {
    name: "Piet Zwart",
    years: "1885–1977",
    place: "Rotterdam",
    mark: "NKF catalog. Typotekt.",
  },
  {
    name: "Paul Schuitema",
    years: "1897–1973",
    place: "Rotterdam",
    mark: "Photomontage. Constructivism.",
  },
  {
    name: "Otto Treumann",
    years: "1919–2001",
    place: "Amsterdam",
    mark: "Postwar Dutch posters.",
  },
  {
    name: "Total Design",
    years: "1963",
    place: "Amsterdam",
    mark: "Crouwel, Wissing, Kramer. TD.",
  },
  {
    name: "Swiss Style",
    years: "1950s",
    place: "Switzerland",
    mark: "International Typographic Style. Objective. Modular.",
  },
] as const;

export const programme = {
  module: {
    kicker: "204",
    law: `${grid.column} column + ${grid.gutter} gutter.`,
  },
  hairline: {
    kicker: "Hairlines",
    law: "The programme is visible. Not a box.",
  },
  flush: {
    kicker: "Flush · 0",
    law: "No radius. Cells meet the line.",
  },
  grotesque: {
    kicker: "Grotesque",
    law: "One face. Weight and size do the work.",
    mark: "Ag",
  },
} as const;

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
  packages: ["@noorddev/raster", "@noorddev/raster-react", "@noorddev/raster-cli"] as const,
  command: COMMAND,
};

export const person = {
  heading: "Renato Valdés Olmos",
  copyright: "MIT © Noord / Renato Valdés-Olmos",
  year: "2026",
  repo: "https://github.com/rennvaldes/raster",
};
