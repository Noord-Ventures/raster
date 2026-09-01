/**
 * Raster design tokens: the single source of truth for the design system.
 * CSS custom properties, the token JSON, and the docs site all generate
 * from this file. Tokens ship in @noorddev/raster and `npx @noorddev/raster-cli tokens`.
 */

export const rasterTokens = {
  meta: {
    name: "Raster",
    description: "A monochrome, CSS-first design system.",
    url: "https://raster.noord.dev",
  },
  color: {
    light: {
      paper: "#FAF8F2",
      ink: "#1A1A1A",
      gray: "#6B6B6B",
      /** Stronger of two grid inks: Home / About 1px cell-edge cage.
          Same family as --grid-line; not a third hue. */
      divider: "rgba(0,0,0,0.08)",
      /** Fills only (hover, skeleton, muted). Not a gridline. */
      dividerSubtle: "rgba(0,0,0,0.06)",
      /** Quieter of two grid inks: inner-page 204 + Home / About L/R
          box margins. 0.08 caged inner pages; 0.025 was invisible.
          0.04 still reads on paper. */
      gridLine: "rgba(0,0,0,0.04)",
      tableAlt: "rgba(0,0,0,0.02)",
    },
    dark: {
      black: "#0E0C0A",
      white: "#E8E8E8",
      gray: "#949494",
      divider: "rgba(255,255,255,0.10)",
      dividerSubtle: "rgba(255,255,255,0.07)",
      /** Quieter of two grid inks. 0.05 still reads on dark. */
      gridLine: "rgba(255,255,255,0.05)",
      tableAlt: "rgba(255,255,255,0.03)",
    },
    /** Ink → paper, the in-between steps. Monochrome: there is no accent. */
    neutralScale: [
      "#1A1A1A",
      "#3D3D3D",
      "#6B6B6B",
      "#949494",
      "#C4C2BD",
      "#E8E8E8",
      "#FAF8F2",
    ],
    accent: "none; emphasis comes from weight, size, and spacing",
  },
  type: {
    family: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    foundry: {
      typeface: "Inter",
      designer: "Rasmus Andersson",
      license: "SIL OFL 1.1",
      url: "https://rsms.me/inter/",
    },
    weights: { body: 500, heading: 600, label: 600 },
    bodyLineHeight: 1.6,
    measure: { columns: 3, px: 592, characters: 66 },
    caseRule: "Never all caps; labels and eyebrows are sentence case.",
    scale: [
      { name: "displayXl", px: 52, weight: 600, tracking: "-0.035em", lineHeight: 1.05 },
      { name: "display", px: 38, weight: 600, tracking: "-0.03em", lineHeight: 1.15 },
      { name: "title", px: 22, weight: 600, tracking: "-0.02em", lineHeight: 1.3 },
      { name: "subhead", px: 17, weight: 500, tracking: "-0.01em", lineHeight: 1.5 },
      { name: "body", px: 15, weight: 500, tracking: "-0.01em", lineHeight: 1.6 },
      { name: "label", px: 13, weight: 600, tracking: "-0.01em", lineHeight: 1.3 },
    ],
  },
  grid: {
    module: 204,
    column: 184,
    gutter: 20,
    pad: 20,
    snap: "content boxes span whole 204px modules; edges step from grid line to grid line",
    maxModules: 6,
    maxWidth: 1244,
    anchors: { rail: 1024, wide: 1440 },
    mobile: {
      breakpoint: 480,
      columns: 2,
      gutter: 25,
      pad: 25,
      columnWidth: "50vw − 37.5px",
    },
  },
  radius: {
    /**
     * Slight Raster radius. Same token as the standalone button (`--radius-sm`).
     * Buttons, toggles, boxes, callouts, dialogs, sheets, and drawers share
     * this 4px. Not 8–12. Cards are chrome-square (0). `--radius` aliases it.
     */
    small: 4,
    /** Alias of `small`. Surfaces that already read `--radius` stay on this family. */
    base: 4,
    /** Page chrome, cards, icon marks, empty, and charts stay square. */
    chrome: 0,
    /** Steve Ruiz innerRadius (circular-corner fit), clamped at 0. */
    concentric: "Steve Ruiz innerRadius, clamped at 0",
    rule: "One token: --radius-sm (4px), the standalone button radius. Toggles share it. Cards are chrome-square (0). Nested inners follow Steve Ruiz. Chrome stays 0.",
  },
  icons: {
    sizes: [12, 16],
    stroke: 1,
    viewBox: 16,
    center: [8, 8],
    rule: "1px currentColor hairline, butt/miter, no rx, no fill; draw at 12 or 16",
  },
  motion: {
    duration: "0.12–0.18s",
    snap: "0.12s",
    ease: "0.18s",
    confirm: "0.16s",
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    rule: "A state the user caused may ease, snap with a short curve, or confirm. Entry is not a show. Color and opacity name the change; nothing bounces.",
    reducedMotion: "looping demos and unsolicited entry disabled under prefers-reduced-motion",
  },
  breakpoints: { mobileGrid: 480, mobileLayout: 640, rail: 1024, wide: 1440, cap: 1700 },
  /** Desktop stays the Raster poster. Phone (≤640) is a 44pt control scale. */
  control: {
    desktop: { hit: 40, height: 40, font: 14, label: 12 },
    phone: { hit: 44, height: 44, font: 16, label: 15 },
    breakpoint: 640,
  },
} as const;

export type RasterTokens = typeof rasterTokens;
