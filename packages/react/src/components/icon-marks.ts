/**
 * Raster icon figures. 16×16 module, optical center 8,8.
 * Vera 28 Aug 2026: stroke 1, currentColor, fill none, cap butt,
 * join miter, no rx. The first five marks stay exactly as drawn.
 */

export type MarkEl =
  | { t: "path"; d: string }
  | { t: "rect"; x: number; y: number; w: number; h: number }
  | { t: "circle"; cx: number; cy: number; r: number }
  | { t: "line"; x1: number; y1: number; x2: number; y2: number };

export type IconRotate = 90 | 180 | 270;

const p = (d: string): MarkEl => ({ t: "path", d });
const r = (x: number, y: number, w: number, h: number): MarkEl => ({ t: "rect", x, y, w, h });
const o = (cx: number, cy: number, rad: number): MarkEl => ({ t: "circle", cx, cy, r: rad });
const l = (x1: number, y1: number, x2: number, y2: number): MarkEl => ({ t: "line", x1, y1, x2, y2 });

/** Unique drawn marks. Aliases resolve elsewhere. */
export const iconNames = [
  "copy",
  "copied",
  "chevron-left",
  "chevron-right",
  "close",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "arrow-down",
  "menu",
  "more",
  "more-h",
  "external",
  "home",
  "chevrons-left",
  "chevrons-right",
  "plus",
  "minus",
  "search",
  "filter",
  "sort",
  "edit",
  "trash",
  "share",
  "download",
  "upload",
  "refresh",
  "undo",
  "redo",
  "save",
  "zoom-in",
  "zoom-out",
  "link",
  "image",
  "quote",
  "code",
  "list-ordered",
  "mail",
  "message",
  "bell",
  "send",
  "inbox",
  "reply",
  "user",
  "users",
  "user-plus",
  "user-minus",
  "file",
  "file-text",
  "folder",
  "folder-open",
  "clipboard",
  "archive",
  "attachment",
  "play",
  "pause",
  "stop",
  "skip-back",
  "skip-forward",
  "volume",
  "mic",
  "video",
  "camera",
  "music",
  "info",
  "warning",
  "error",
  "help",
  "ban",
  "calendar",
  "clock",
  "history",
  "timer",
  "sliders",
  "cog",
  "lock",
  "unlock",
  "key",
  "shield",
  "eye",
  "eye-off",
  "cart",
  "bag",
  "credit-card",
  "tag",
  "dollar",
  "package",
  "grid",
  "list",
  "columns",
  "rows",
  "sidebar",
  "table",
  "layout",
  "expand",
  "sun",
  "moon",
  "star",
  "bookmark",
  "flag",
  "map-pin",
  "globe",
  "phone",
  "printer",
  "terminal",
  "log-in",
  "log-out",
  "grip",
  "power",
  "cloud",
  "database",
  "wifi",
] as const;

export type DrawnName = (typeof iconNames)[number];

export const marks: Record<DrawnName, MarkEl[]> = {
  /* Vera — do not recut */
  copy: [p("M6.5 2.5 H13.5 V9.5"), r(2.5, 6.5, 7, 7)],
  copied: [p("M3.5 8.5 L6.5 11.5 L12.5 4.5")],
  "chevron-left": [p("M10.5 3.5 L5.5 8 L10.5 12.5")],
  "chevron-right": [p("M5.5 3.5 L10.5 8 L5.5 12.5")],
  close: [p("M4.5 4.5 L11.5 11.5"), p("M11.5 4.5 L4.5 11.5")],

  /* Navigation */
  "arrow-left": [p("M13 8 H3.5"), p("M6.5 4.5 L3 8 L6.5 11.5")],
  "arrow-right": [p("M3 8 H12.5"), p("M9.5 4.5 L13 8 L9.5 11.5")],
  "arrow-up": [p("M8 13 V3.5"), p("M4.5 6.5 L8 3 L11.5 6.5")],
  "arrow-down": [p("M8 3 V12.5"), p("M4.5 9.5 L8 13 L11.5 9.5")],
  menu: [p("M3 4.5 H13"), p("M3 8 H13"), p("M3 11.5 H13")],
  more: [o(8, 4, 1), o(8, 8, 1), o(8, 12, 1)],
  "more-h": [o(4, 8, 1), o(8, 8, 1), o(12, 8, 1)],
  external: [r(2.5, 5.5, 8, 8), p("M8.5 2.5 H13.5 V7.5"), p("M13.5 2.5 L8 8")],
  home: [p("M2.5 8 L8 3 L13.5 8"), p("M4.5 7.5 V13 H7 V10 H9 V13 H11.5 V7.5")],
  "chevrons-left": [p("M8.5 3.5 L3.5 8 L8.5 12.5"), p("M12.5 3.5 L7.5 8 L12.5 12.5")],
  "chevrons-right": [p("M3.5 3.5 L8.5 8 L3.5 12.5"), p("M7.5 3.5 L12.5 8 L7.5 12.5")],

  /* Actions */
  plus: [p("M8 3.5 V12.5"), p("M3.5 8 H12.5")],
  minus: [p("M3.5 8 H12.5")],
  search: [o(7, 7, 4), p("M10 10 L13.5 13.5")],
  filter: [p("M3.5 3.5 H12.5 L9.5 8.5 V13 L6.5 13 V8.5 Z")],
  sort: [p("M4 5 H12"), p("M4 8 H10"), p("M4 11 H8")],
  edit: [p("M10.5 3.5 L12.5 5.5 L5.5 12.5 H3.5 V10.5 Z")],
  trash: [
    p("M5 4 H11"),
    p("M6.5 4 V3 H9.5 V4"),
    p("M4.5 5.5 H11.5 V13 H4.5 Z"),
    p("M6.5 7.5 V11"),
    p("M8 7.5 V11"),
    p("M9.5 7.5 V11"),
  ],
  share: [o(4, 8, 1.25), o(12, 4.5, 1.25), o(12, 11.5, 1.25), l(5.2, 7.4, 10.8, 5.2), l(5.2, 8.6, 10.8, 10.8)],
  download: [p("M3.5 10.5 V13 H12.5 V10.5"), p("M8 3 V10"), p("M5.5 7.5 L8 10 L10.5 7.5")],
  upload: [p("M3.5 10.5 V13 H12.5 V10.5"), p("M8 10.5 V3"), p("M5.5 5.5 L8 3 L10.5 5.5")],
  refresh: [p("M4 8 A4 4 0 1 1 8 12"), p("M12 4.5 L12 8 L8.5 8")],
  undo: [p("M4 8 A4 4 0 1 1 8 12"), p("M4 8 L4 5 L7 5")],
  redo: [p("M12 8 A4 4 0 1 0 8 12"), p("M12 8 L12 5 L9 5")],
  save: [r(3.5, 3.5, 9, 9), r(5.5, 3.5, 5, 3.5), r(5.5, 9, 5, 3.5)],
  "zoom-in": [o(7, 7, 4), p("M10 10 L13.5 13.5"), p("M7 5 V9"), p("M5 7 H9")],
  "zoom-out": [o(7, 7, 4), p("M10 10 L13.5 13.5"), p("M5 7 H9")],

  /* Editing */
  link: [r(2.5, 6, 6, 4), r(7.5, 6, 6, 4)],
  image: [r(2.5, 3.5, 11, 9), o(5.5, 6.5, 1), p("M3 12 L6 8 L8.5 10.2 L11.2 6.8 L13 12")],
  quote: [
    r(3.5, 4, 3, 3.5),
    p("M3.5 7.5 L3.5 11 L6.5 7.5"),
    r(9.5, 4, 3, 3.5),
    p("M9.5 7.5 L9.5 11 L12.5 7.5"),
  ],
  code: [p("M6 4 L3 8 L6 12"), p("M10 4 L13 8 L10 12")],
  "list-ordered": [
    p("M6.5 4 H13"),
    p("M6.5 8 H13"),
    p("M6.5 12 H13"),
    p("M3 4 H5"),
    p("M3 8 H5"),
    p("M3 12 H5"),
  ],

  /* Communication */
  mail: [r(2.5, 4.5, 11, 7), p("M2.5 4.5 L8 9 L13.5 4.5")],
  message: [r(2.5, 3.5, 11, 8), p("M6 11.5 L8 11.5 L6.5 13.5")],
  bell: [p("M4.5 10.5 H11.5 L10.5 7 V5.5 L8 3.5 L5.5 5.5 V7 Z"), p("M7 12 H9")],
  send: [p("M2.5 3 L13.5 8 L2.5 13 L5 8 Z"), p("M5 8 H13.5")],
  inbox: [p("M3 6.5 V12.5 H13 V6.5"), p("M3 6.5 L6.5 10 H9.5 L13 6.5")],
  reply: [p("M8 3.5 L3.5 8 L8 12.5"), p("M3.5 8 H10.5 V5")],

  /* People */
  user: [o(8, 5.5, 2), p("M4 13.5 V12 L8 10 L12 12 V13.5")],
  users: [
    o(6, 5.5, 1.75),
    p("M2.5 13 V12 L6 10.5 L9.5 12 V13"),
    o(10.5, 5.5, 1.5),
    p("M9 13 V12 L11.5 11 L14 12.5 V13"),
  ],
  "user-plus": [o(6, 5.5, 1.75), p("M2.5 13 V12 L6 10.5 L9.5 12 V13"), p("M12 6 V12"), p("M9.5 9 H14.5")],
  "user-minus": [o(6, 5.5, 1.75), p("M2.5 13 V12 L6 10.5 L9.5 12 V13"), p("M9.5 9 H14.5")],

  /* Files */
  file: [p("M5 2.5 H9.5 L12.5 5.5 V13.5 H5 Z"), p("M9.5 2.5 V5.5 H12.5")],
  "file-text": [
    p("M5 2.5 H9.5 L12.5 5.5 V13.5 H5 Z"),
    p("M9.5 2.5 V5.5 H12.5"),
    p("M6.5 8 H11"),
    p("M6.5 10 H11"),
    p("M6.5 12 H9.5"),
  ],
  folder: [p("M2.5 5.5 H6 L7.5 4 H13.5 V12.5 H2.5 Z")],
  "folder-open": [p("M2.5 6.5 H6 L7.5 5 H13.5 V7.5 L12 12.5 H3.5 Z"), p("M2.5 6.5 V12.5")],
  clipboard: [r(4, 3.5, 8, 10.5), r(6, 2.5, 4, 2)],
  archive: [r(2.5, 3.5, 11, 3), p("M3.5 6.5 V13 H12.5 V6.5"), p("M6.5 8.5 H9.5")],
  attachment: [p("M5.5 6.5 V12 H10.5 V4.5 H7 V10.5 H8.5 V6.5")],

  /* Media */
  play: [p("M5.5 3.5 L12.5 8 L5.5 12.5 Z")],
  pause: [r(4.5, 3.5, 2.5, 9), r(9, 3.5, 2.5, 9)],
  stop: [r(4.5, 4.5, 7, 7)],
  "skip-back": [p("M3.5 4 V12"), p("M12.5 3.5 L6 8 L12.5 12.5 Z")],
  "skip-forward": [p("M12.5 4 V12"), p("M3.5 3.5 L10 8 L3.5 12.5 Z")],
  volume: [p("M3.5 6.5 H6 L9 3.5 V12.5 L6 9.5 H3.5 Z"), p("M11 5.5 L13 4"), p("M11 8 H13.5"), p("M11 10.5 L13 12")],
  mic: [r(6, 2.5, 4, 7), p("M4.5 8.5 V9.5 H11.5 V8.5"), p("M8 9.5 V13"), p("M6 13 H10")],
  video: [r(2.5, 4.5, 8, 7), p("M10.5 6.5 L13.5 4.5 V11.5 L10.5 9.5")],
  camera: [r(2.5, 5, 11, 7), p("M6 5 L7 3.5 H9 L10 5"), o(8, 8.5, 2)],
  music: [o(5.5, 12, 1.5), o(11, 10.5, 1.5), p("M7 12 V4 H12.5 V10.5")],

  /* Status */
  info: [o(8, 8, 5.5), p("M8 7.5 V11.5"), p("M8 4.5 V5.5")],
  warning: [p("M8 2.5 L14 13.5 H2 Z"), p("M8 6.5 V9.5"), p("M8 11.5 V12")],
  error: [o(8, 8, 5.5), p("M6 6 L10 10"), p("M10 6 L6 10")],
  help: [o(8, 8, 5.5), p("M6.5 6 A1.5 1.5 0 1 1 8.5 7.5 L8 9"), p("M8 11 V11.5")],
  ban: [o(8, 8, 5.5), p("M4.2 4.2 L11.8 11.8")],

  /* Time */
  calendar: [r(3, 4.5, 10, 9), p("M3 7.5 H13"), p("M6 3 V5.5"), p("M10 3 V5.5")],
  clock: [o(8, 8, 5.5), p("M8 8 L8 5"), p("M8 8 L11 9.5")],
  history: [p("M4.5 8 A3.5 3.5 0 1 0 8 4.5"), p("M4.5 8 L4.5 5 L7.5 5")],
  timer: [p("M6.5 2.5 H9.5"), p("M8 2.5 V4.5"), o(8, 9, 4.5), p("M8 9 L10 7")],

  /* Settings */
  sliders: [p("M2.5 4.5 H13.5"), p("M2.5 8 H13.5"), p("M2.5 11.5 H13.5"), r(9.5, 3, 3, 3), r(4, 6.5, 3, 3), r(7.5, 10, 3, 3)],
  cog: [
    o(8, 8, 2),
    o(8, 8, 4),
    p("M12 8 L14.2 8"),
    p("M10.8 10.8 L12.4 12.4"),
    p("M8 12 L8 14.2"),
    p("M5.2 10.8 L3.6 12.4"),
    p("M4 8 L1.8 8"),
    p("M5.2 5.2 L3.6 3.6"),
    p("M8 4 L8 1.8"),
    p("M10.8 5.2 L12.4 3.6"),
  ],
  lock: [r(4.5, 7.5, 7, 6), p("M6 7.5 V5.5 H10 V7.5")],
  unlock: [r(4.5, 7.5, 7, 6), p("M6 7.5 V5.5 H10 V6.5")],
  key: [o(5.5, 10, 2.5), p("M7.5 8.5 L13.5 2.5"), p("M11 5 L13 7")],
  shield: [p("M8 2.5 L13 5 V9 L8 13.5 L3 9 V5 Z")],
  eye: [p("M2.5 8 L8 4.5 L13.5 8 L8 11.5 Z"), o(8, 8, 1.5)],
  "eye-off": [p("M2.5 8 L8 4.5 L13.5 8 L8 11.5 Z"), o(8, 8, 1.5), p("M3 13 L13 3")],

  /* Commerce */
  cart: [p("M3 4 H4.5 L6 11 H12 L13.5 6 H5.5"), o(7, 13, 1), o(11.5, 13, 1)],
  bag: [p("M4.5 6 H11.5 L12.5 13.5 H3.5 Z"), p("M6 6 V4.5 H10 V6")],
  "credit-card": [r(2.5, 4.5, 11, 7), p("M2.5 7 H13.5")],
  tag: [p("M3.5 7 L7 3.5 H13 V9.5 L9.5 13 Z"), o(10, 6, 1)],
  dollar: [p("M8 3.5 V12.5"), p("M10.5 5 H6.5 V7.5 H9.5 V10.5 H5.5")],
  package: [r(3.5, 5.5, 9, 8), p("M3.5 5.5 L8 2.5 L12.5 5.5"), p("M8 2.5 V13.5")],

  /* Layout */
  grid: [r(2.5, 2.5, 4.5, 4.5), r(9, 2.5, 4.5, 4.5), r(2.5, 9, 4.5, 4.5), r(9, 9, 4.5, 4.5)],
  list: [p("M5.5 4 H13"), p("M5.5 8 H13"), p("M5.5 12 H13"), p("M3 4 H4"), p("M3 8 H4"), p("M3 12 H4")],
  columns: [r(2.5, 3.5, 5, 9), r(8.5, 3.5, 5, 9)],
  rows: [r(2.5, 2.5, 11, 4.5), r(2.5, 9, 11, 4.5)],
  sidebar: [r(2.5, 3.5, 11, 9), p("M6.5 3.5 V12.5")],
  table: [r(2.5, 3.5, 11, 9), p("M2.5 7 H13.5"), p("M2.5 10.5 H13.5"), p("M6.5 3.5 V12.5")],
  layout: [r(2.5, 3.5, 11, 9), p("M2.5 6.5 H13.5"), p("M8 6.5 V12.5")],
  expand: [
    p("M3.5 6.5 V3.5 H6.5"),
    p("M9.5 3.5 H12.5 V6.5"),
    p("M12.5 9.5 V12.5 H9.5"),
    p("M6.5 12.5 H3.5 V9.5"),
  ],

  /* System */
  sun: [
    o(8, 8, 2.5),
    p("M8 2 V3.5"),
    p("M8 12.5 V14"),
    p("M2 8 H3.5"),
    p("M12.5 8 H14"),
    p("M4.4 4.4 L5.3 5.3"),
    p("M10.7 10.7 L11.6 11.6"),
    p("M11.6 4.4 L10.7 5.3"),
    p("M5.3 10.7 L4.4 11.6"),
  ],
  moon: [p("M10.5 3.5 A5.5 5.5 0 1 0 10.5 12.5 A4 4 0 1 1 10.5 3.5")],
  star: [p("M8 2.5 L9.5 6.5 H13.5 L10.5 9 L11.8 13 L8 10.5 L4.2 13 L5.5 9 L2.5 6.5 H6.5 Z")],
  bookmark: [p("M5 2.5 V13.5 L8 11 L11 13.5 V2.5 Z")],
  flag: [p("M4.5 2.5 V13.5"), p("M4.5 2.5 H12.5 L10.5 5.5 L12.5 8.5 H4.5")],
  "map-pin": [p("M8 2.5 L11.5 7 L8 13.5 L4.5 7 Z"), o(8, 6.5, 1.5)],
  globe: [o(8, 8, 5.5), p("M8 2.5 V13.5"), p("M2.5 8 H13.5"), p("M3.5 5 H12.5"), p("M3.5 11 H12.5")],
  phone: [r(5, 2.5, 6, 11), p("M6.5 12 H9.5")],
  printer: [r(5.5, 2.5, 5, 5.5), p("M3.5 8 H12.5 V11.5 H3.5 Z"), p("M6 10.5 H10"), r(5.5, 11.5, 5, 2.5)],
  terminal: [r(2.5, 3.5, 11, 9), p("M4.5 6.5 L6.5 8 L4.5 9.5"), p("M8 10 H11.5")],
  "log-in": [r(7.5, 3.5, 6, 9), p("M2.5 8 H8"), p("M6 5.5 L8.5 8 L6 10.5")],
  "log-out": [r(2.5, 3.5, 6, 9), p("M8 8 H13.5"), p("M11.5 5.5 L14 8 L11.5 10.5")],
  grip: [o(5.5, 4, 0.9), o(10.5, 4, 0.9), o(5.5, 8, 0.9), o(10.5, 8, 0.9), o(5.5, 12, 0.9), o(10.5, 12, 0.9)],
  power: [p("M8 3 V8"), p("M5.2 5.2 A4.8 4.8 0 1 0 10.8 5.2")],
  cloud: [p("M4 10.5 H12.5 A2 2 0 0 0 12.5 7 A3 3 0 0 0 6.5 6.5 A2.5 2.5 0 0 0 4 10.5")],
  database: [
    p("M2.5 4.5 A5.5 1.8 0 0 0 13.5 4.5 A5.5 1.8 0 0 0 2.5 4.5"),
    p("M2.5 4.5 V11.5"),
    p("M13.5 4.5 V11.5"),
    p("M2.5 11.5 A5.5 1.8 0 0 0 13.5 11.5"),
    p("M2.5 8 A5.5 1.8 0 0 0 13.5 8"),
  ],
  wifi: [p("M3.5 8 A6 6 0 0 1 12.5 8"), p("M5 10 A4 4 0 0 1 11 10"), p("M6.5 12 A2 2 0 0 1 9.5 12"), o(8, 13.2, 0.6)],
};

export const iconAliases = {
  check: { name: "copied" },
  success: { name: "copied" },
  "chevron-down": { name: "chevron-right", rotate: 90 },
  "chevron-up": { name: "chevron-right", rotate: 270 },
  x: { name: "close" },
  settings: { name: "sliders" },
  gear: { name: "cog" },
  pencil: { name: "edit" },
} as const satisfies Record<string, { name: DrawnName; rotate?: IconRotate }>;

export type IconAlias = keyof typeof iconAliases;
export type IconName = DrawnName | IconAlias;

export type IconGroup = { title: string; names: IconName[] };

export const iconGroups: IconGroup[] = [
  {
    title: "Navigation",
    names: [
      "arrow-left",
      "arrow-right",
      "arrow-up",
      "arrow-down",
      "chevron-left",
      "chevron-right",
      "chevron-up",
      "chevron-down",
      "chevrons-left",
      "chevrons-right",
      "menu",
      "more",
      "more-h",
      "external",
      "home",
      "close",
    ],
  },
  {
    title: "Actions",
    names: [
      "plus",
      "minus",
      "search",
      "filter",
      "sort",
      "edit",
      "trash",
      "share",
      "download",
      "upload",
      "refresh",
      "undo",
      "redo",
      "save",
      "copy",
      "copied",
      "zoom-in",
      "zoom-out",
    ],
  },
  { title: "Editing", names: ["link", "image", "quote", "code", "list-ordered"] },
  { title: "Communication", names: ["mail", "message", "bell", "send", "inbox", "reply"] },
  { title: "People", names: ["user", "users", "user-plus", "user-minus"] },
  {
    title: "Files",
    names: ["file", "file-text", "folder", "folder-open", "clipboard", "archive", "attachment"],
  },
  {
    title: "Media",
    names: ["play", "pause", "stop", "skip-back", "skip-forward", "volume", "mic", "video", "camera", "music"],
  },
  { title: "Status", names: ["info", "warning", "error", "help", "ban", "success"] },
  { title: "Time", names: ["calendar", "clock", "history", "timer"] },
  { title: "Settings", names: ["sliders", "cog", "lock", "unlock", "key", "shield", "eye", "eye-off"] },
  { title: "Commerce", names: ["cart", "bag", "credit-card", "tag", "dollar", "package"] },
  { title: "Layout", names: ["grid", "list", "columns", "rows", "sidebar", "table", "layout", "expand"] },
  {
    title: "System",
    names: [
      "sun",
      "moon",
      "star",
      "bookmark",
      "flag",
      "map-pin",
      "globe",
      "phone",
      "printer",
      "terminal",
      "log-in",
      "log-out",
      "grip",
      "power",
      "cloud",
      "database",
      "wifi",
    ],
  },
];

export function resolveIcon(name: IconName): { mark: DrawnName; rotate?: IconRotate } {
  if (name in iconAliases) {
    const alias = iconAliases[name as IconAlias];
    return { mark: alias.name, rotate: "rotate" in alias ? alias.rotate : undefined };
  }
  return { mark: name as DrawnName };
}

export function iconLabel(name: IconName): string {
  return name.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
}
