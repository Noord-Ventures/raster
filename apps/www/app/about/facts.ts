/**
 * About facts. Every string is already known, or written from known facts.
 * Do not invent a bio, a client list, a headcount, or a product.
 *
 * Register: workhorse, specific, facts before poetry. Lead with what
 * Raster is and who it is for. History (Crouwel, Müller-Brockmann) sits
 * after the specimen. Credits stay in the colophon.
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
  heading: WORD,
  kicker: LAW,
};

export const lead = {
  kicker: "What it is",
  what: "Raster is a workhorse of a design system on a modular grid, used for interfaces. The page is paper. Type is Inter. The module is 204 pixels — 184 for the column, 20 for the gutter. Cells are flush. A line is 1px.",
  who: "It is meant for product UI: forms, tables, settings, the everyday catalog. You install the CSS. React is there if you want a component. The classes start with rs-.",
};

export const usage = {
  kicker: "Usage",
  intro: "Using Raster is one command, then a stylesheet. If you are making a web thing, paste this in the document head:",
  command: COMMAND,
  html: `<link rel="stylesheet" href="styles/raster.css" />`,
  control: `<button class="rs-btn-primary">Save</button>`,
  after: "Then a control. Dark scheme: set data-theme=\"dark\" on the root element.",
};

export const license = {
  kicker: "Free & open source",
  body: "Raster is free and open source. The code is MIT. You can use it in a product, a poster, or an internal tool.",
  type: `${foundry.typeface} is ${foundry.license}, designed by ${foundry.designer}.`,
};

export const specimen = {
  kicker: "Specimen",
  body: "Body is 15px, weight 500, measure about 66 characters. Headings and labels are 600. Sentence case. The module holds the type: a 204 cell, or two, or a column of them. Edges step from grid line to grid line.",
  mid: "A button is 40 tall on the desktop and 44 on the phone. The field label sits on a 16px line so the hairline lands on an integer. Radius on a control follows the concentric law. Module cells stay flush to the gridline.",
  long: "The smaller sizes keep a tall x-height so interface copy stays readable at 12 and 13. The larger sizes tighten tracking and let weight do the emphasis. There is no accent hue. Paper, ink, and the grays between them are the palette. Motion is 0.12 to 0.18 seconds, ease, a state the user caused — color and opacity name the change; layout rarely moves.",
};

export const history = {
  kicker: "History",
  body: "The program comes from Swiss Style and Dutch modernism. Josef Müller-Brockmann drew it. Wim Crouwel put it on the press at Total Design.",
};

export const featured = [
  {
    id: "jmb",
    name: "Josef Müller-Brockmann",
    years: "1914–1996",
    place: "Zurich",
    mark: "Grid Systems in Graphic Design. Neue Grafik, 1958.",
    work: {
      src: "/about/mueller-brockmann-grid-systems.jpg",
      alt: "Cover of Grid Systems in Graphic Design",
    },
  },
  {
    id: "wc",
    name: "Wim Crouwel",
    years: "1928–2019",
    place: "Amsterdam",
    mark: "Stedelijk posters. New Alphabet, 1967. Total Design, 1963.",
    work: {
      src: "/about/crouwel-new-alphabet.png",
      alt: "New Alphabet type specimen",
    },
  },
] as const;

export const field = [
  {
    name: "Max Bill",
    years: "1908–1994",
    place: "Zurich · Ulm",
    mark: "HfG Ulm. Concrete art.",
    work: {
      src: "/about/bill-hfg-ulm.jpg",
      alt: "HfG Ulm, architecture by Max Bill, 1955",
    },
  },
  {
    name: "Karl Gerstner",
    years: "1930–2017",
    place: "Basel",
    mark: "Designing Programmes, 1964.",
    work: {
      src: "/about/gerstner-designing-programmes.jpg",
      alt: "Cover of Designing Programmes",
    },
  },
  {
    name: "Emil Ruder",
    years: "1914–1970",
    place: "Basel",
    mark: "Typographie.",
    work: {
      src: "/about/ruder-typographie.jpg",
      alt: "Cover of Typographie",
    },
  },
  {
    name: "Armin Hofmann",
    years: "1920–2020",
    place: "Basel",
    mark: "Graphic Design Manual.",
    work: {
      src: "/about/hofmann-form-farbe.jpg",
      alt: "Form Farbe poster, Gewerbemuseum Winterthur, 1951",
    },
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
    work: {
      src: "/about/total-design-logo.jpg",
      alt: "Total Design mark",
    },
  },
  {
    name: "Swiss Style",
    years: "1950s",
    place: "Switzerland",
    mark: "International Typographic Style. Objective. Modular.",
    work: {
      src: "/about/neue-grafik.jpg",
      alt: "Neue Grafik, July 1963",
    },
  },
] as const;

export const program = {
  module: {
    kicker: "204",
    law: `${grid.column} column + ${grid.gutter} gutter.`,
  },
  hairline: {
    kicker: "Hairlines",
    law: "Hairlines mark the module. A 1px line, not a box.",
  },
  flush: {
    kicker: "Flush",
    law: "Module cells sit flush on the gridline.",
  },
  grotesque: {
    kicker: "Grotesque",
    law: "One face. Weight and size do the work.",
    mark: "Ag",
  },
} as const;

export const notes = [
  {
    q: "How do I install Raster?",
    a: `${COMMAND} writes styles/raster.css, Inter, raster.json, and a specimen page (index.html). Link the stylesheet, or import it in your root layout.`,
  },
  {
    q: "How do I add a component?",
    a: "npx @noorddev/raster-cli add button dialog. React source lands in components/raster/. CSS-only components need no file; the classes are already in raster.css.",
  },
  {
    q: "How do I switch to the dark scheme?",
    a: "Set data-theme=\"dark\" on the root element. Tokens flip paper and ink. The module grid stays.",
  },
  {
    q: "Do I need React?",
    a: "No. Raster is CSS-first. Plain classes on plain markup. The React layer is optional and uses native elements.",
  },
  {
    q: "Why Inter?",
    a: "One grotesque for interfaces. Variable, latin + latin-ext, vendored next to the CSS. System sans is fallback only. Weights: 500 body, 600 headings and labels.",
  },
  {
    q: "What is the module?",
    a: `204 pixels: ${grid.column} column + ${grid.gutter} gutter. Content boxes span whole modules. On a phone the field is one column; at 481 it pairs; at 816 it is four; at 1224 it is six.`,
  },
  {
    q: "Where do I report a problem?",
    a: "github.com/rennvaldes/raster. Issues and pull requests. The packages are @noorddev/raster, @noorddev/raster-react, and @noorddev/raster-cli.",
  },
] as const;

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
