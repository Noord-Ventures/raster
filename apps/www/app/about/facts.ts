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
  intro: "Three ways in. Import @noorddev/raster-react for precompiled components and one stylesheet. Or run the CLI: it writes the stylesheet, Inter, and a specimen page, and copies component source on request. Or link raster.css and use the classes.",
  commandWhere: "Terminal",
  command: COMMAND,
  htmlWhere: "Head",
  html: `<link rel="stylesheet" href="styles/raster.css" />`,
  controlWhere: "Body",
  control: `<button class="rs-btn-primary">Save</button>`,
  landing:
    "index.html is the one-shot Raster landing, meant to read like getraster.com: poster type, the 204 grid, the laws. It is not a thin shell.",
  files:
    "styles/raster.css, Inter, and raster.json land in your project. No CDN, no runtime fetch. Restyle the specimen toward the live home with the files on disk.",
  after: "Dark scheme: set data-theme=\"dark\" on the root element.",
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
  body: "The program comes from International Typographic Style and Dutch modernism. Josef Müller-Brockmann drew it. Wim Crouwel put it on the press at Total Design.",
};

export const featured = [
  {
    id: "jmb",
    name: "Josef Müller-Brockmann",
    years: "1914–1996",
    place: "Zurich",
    mark: "Grid Systems in Graphic Design. Neue Grafik, 1958.",
    work: {
      src: "/about/mueller-brockmann-grid-systems.webp",
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
      src: "/about/crouwel-new-alphabet.webp",
      alt: "New Alphabet type specimen",
    },
  },
] as const;

export const field = [
  {
    name: "Richard Paul Lohse",
    years: "1902–1988",
    place: "Zurich",
    mark: "100 Jahre Eisenbeton. Kunstgewerbemuseum Zürich, 1950.",
    work: {
      src: "/about/lohse-100-jahre-eisenbeton.webp",
      alt: "100 Jahre Eisenbeton, Kunstgewerbemuseum Zürich, 1950",
    },
  },
  {
    name: "Hans Neuburg",
    years: "1904–1983",
    place: "Zurich",
    mark: "Konstruktive Grafik. Kunstgewerbemuseum Zürich, 1958.",
    work: {
      src: "/about/neuburg-konstruktive-grafik.webp",
      alt: "Konstruktive Grafik, Kunstgewerbemuseum Zürich, 1958",
    },
  },
  {
    name: "Carlo Vivarelli",
    years: "1919–1986",
    place: "Zurich",
    mark: "Für das Alter. Per la vecchiaia, 1949.",
    work: {
      src: "/about/vivarelli-fur-das-alter.webp",
      alt: "Für das Alter. Per la vecchiaia, 1949",
    },
  },
  {
    name: "Max Bill",
    years: "1908–1994",
    place: "Zurich · Ulm",
    mark: "HfG Ulm. Concrete art.",
    work: {
      src: "/about/bill-hfg-ulm.webp",
      alt: "HfG Ulm, architecture by Max Bill, 1955",
    },
  },
  {
    name: "Karl Gerstner",
    years: "1930–2017",
    place: "Basel",
    mark: "Designing Programmes, 1964.",
    work: {
      src: "/about/gerstner-designing-programmes.webp",
      alt: "Cover of Designing Programmes",
    },
  },
  {
    name: "Thérèse Moll",
    years: "1934–1961",
    place: "Basel · Cambridge",
    mark: "Micorène, c. 1958. Gerstner atelier. Modular type at MIT.",
    work: {
      src: "/about/moll-micorene.webp",
      alt: "Micorène, c. 1958",
    },
  },
  {
    name: "Emil Ruder",
    years: "1914–1970",
    place: "Basel",
    mark: "Typographie.",
    work: {
      src: "/about/ruder-typographie.webp",
      alt: "Cover of Typographie",
    },
  },
  {
    name: "Armin Hofmann",
    years: "1920–2020",
    place: "Basel",
    mark: "Graphic Design Manual.",
    work: {
      src: "/about/hofmann-form-farbe.webp",
      alt: "Form Farbe poster, Gewerbemuseum Winterthur, 1951",
    },
  },
  {
    name: "Nelly Rudin",
    years: "1928–2013",
    place: "Basel · Zurich",
    mark: "Saffa 1958 Zürich, 1958. Geigy. Müller-Brockmann studio.",
    work: {
      src: "/about/rudin-saffa-1958.webp",
      alt: "Saffa 1958 Zürich, 1958",
    },
  },
  {
    name: "Rosmarie Tissi",
    years: "1937",
    place: "Zurich",
    mark: "20 CHF Gertrud Kurz, 1992. Odermatt & Tissi.",
    work: {
      src: "/about/tissi-gertrud-kurz.webp",
      alt: "Münzkabinett Berlin. GERTRUD KURZ, 1890/1972.",
    },
  },
  {
    name: "Shizuko Yoshikawa",
    years: "1934–2019",
    place: "Ulm · Zurich",
    mark: "Japanische Plakate heute, 1978. Müller-Brockmann studio.",
    work: {
      src: "/about/yoshikawa-japanische-plakate-heute.webp",
      alt: "Japanische Plakate heute, 1978",
    },
  },
  {
    name: "Piet Zwart",
    years: "1885–1977",
    place: "Rotterdam",
    mark: "Bruynzeel kitchen, 1938. Typotekt.",
    work: {
      src: "/about/zwart-bruynzeel.webp",
      alt: "Bruynzeel kitchen, 1938",
    },
  },
  {
    name: "Paul Schuitema",
    years: "1897–1973",
    place: "Rotterdam",
    mark: "Chair no. 35, 1934. Photomontage. Constructivism.",
    work: {
      src: "/about/schuitema-chair-35.webp",
      alt: "Chair no. 35, 1934",
    },
  },
  {
    name: "Fré Cohen",
    years: "1903–1943",
    place: "Amsterdam",
    mark: "SDAP. Stadsdrukkerij Amsterdam.",
    work: {
      src: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Cohen_fre_sdap_nvv_poster_1926.png",
      alt: "SDAP / NVV poster, 1926",
    },
  },
  {
    name: "Otto Treumann",
    years: "1919–2001",
    place: "Amsterdam",
    mark: "Memorial plaque, Station Vught, 1984.",
    work: {
      src: "/about/treumann-vught.webp",
      alt: "Memorial plaque at Station Vught, 1984",
    },
  },
  {
    name: "Willem Sandberg",
    years: "1897–1984",
    place: "Amsterdam",
    mark: "Stedelijk Museum enamel sign. Torn paper, 1954.",
    work: {
      src: "/about/sandberg-stedelijk-email-1954.webp",
      alt: "Stedelijk Museum enamel sign, 1954",
    },
  },
  {
    name: "Jurriaan Schrofer",
    years: "1926–1990",
    place: "The Hague",
    mark: "De letter op straat. Meijer, 1956.",
    work: {
      src: "/about/schrofer-de-letter-op-straat.webp",
      alt: "De letter op straat, 1956",
    },
  },
  {
    name: "Total Design",
    years: "1971",
    place: "Amsterdam",
    mark: "Stedelijk, co westerik, 24 sep–7 nov 1971.",
    work: {
      src: "/about/total-design-westerik-1971.webp",
      alt: "Total Design / Crouwel, co westerik, Stedelijk 24 sep–7 nov 1971",
    },
  },
  {
    name: "Benno Wissing",
    years: "1923–2008",
    place: "Rotterdam · Amsterdam",
    mark: "Schiphol signage. Total Design, 1967.",
    work: {
      src: "/about/wissing-schiphol-signposting.webp",
      alt: "Schiphol signage, Total Design, 1967",
    },
  },
  {
    name: "International Typographic Style",
    years: "1950s",
    place: "Switzerland",
    mark: "International Typographic Style. Objective. Modular.",
    work: {
      src: "/about/neue-grafik.webp",
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
    a: "npm install @noorddev/raster-react, then import @noorddev/raster-react/css once and the components where you use them. For CSS only, install @noorddev/raster and link raster.css. For vendored source, npx @noorddev/raster-cli add <name>, or npx shadcn add getraster.com/r/<name>.json.",
  },
  {
    q: "How do I add a component?",
    a: "Import it from @noorddev/raster-react, or copy its StyleX source into components/raster/ with npx @noorddev/raster-cli add <name>. The classes are already in raster.css, so CSS-only pages need no file. The registry is at getraster.com/r/<name>.json.",
  },
  {
    q: "How do I use Raster with Next.js or Vercel?",
    a: "Import @noorddev/raster-react/css in the root layout and use the components; stateful ones already carry \"use client\". Static export works; this site is one. Set data-theme=\"dark\" on the html element for the dark scheme.",
  },
  {
    q: "Does Raster use Radix or Tailwind?",
    a: "No. Components are StyleX leaves on native elements. No Radix, no Tailwind. Every component also carries stable rs- classes.",
  },
  {
    q: "What does dependency-free mean?",
    a: "The React package depends on React and @stylexjs/stylex, nothing else. Behaviour comes from the platform: details, dialog, the Popover API, scroll snap, native inputs. No Radix. No Tailwind.",
  },
  {
    q: "Do I need React?",
    a: "No. raster.css is generated from the same StyleX leaves and paints every component through rs- classes on plain markup. React is one of three ways in.",
  },
  {
    q: "How do I switch to the dark scheme?",
    a: "Set data-theme=\"dark\" on the root element. Tokens flip paper and ink. The module grid stays.",
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
    q: "What is the International Typographic Style here?",
    a: "The influence slogan is International Typographic Style. The Dutch and Swiss names on About are the roster, not a second slogan. Paper, ink, a 204 module, hairlines.",
  },
  {
    q: "What is Noord?",
    a: "Noord Frontier Design Lab sits between Alkmaar and Silicon Valley. Raster was designed and built there. Not a fund.",
  },
  {
    q: "What are the ten principles?",
    a: "Simple, Beautiful, Opinionated, Elegant, Clear, Legible, Solid, Versatile, Customizable, Minimal. Sentence case. No periods.",
  },
  {
    q: "Where do I report a problem?",
    a: "github.com/Noord-Ventures/raster. Issues and pull requests. The packages are @noorddev/raster, @noorddev/raster-react, and @noorddev/raster-cli.",
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
  what: "Noord Frontier Design Lab sits between Alkmaar and Silicon Valley.",
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
  repo: "https://github.com/Noord-Ventures/raster",
};
