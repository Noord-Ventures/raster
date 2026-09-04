import * as stylex from "@stylexjs/stylex";

const at900 = "@media (min-width: 900px)";
const rail = "@media (min-width: 1024px)";
const phone = "@media (max-width: 640px)";
const at899 = "@media (max-width: 899px)";
const reduce = "@media (prefers-reduced-motion: reduce)";

/**
 * Interfaces posters. Landing tiles sit on the 204, ink --grid-line,
 * no shadow. Specimen is square with a quiet paper lift. Rail is transparent.
 * Crop stills and `body:has(.if-index)` stay in interfaces.css —
 * positional crops + document :has() are not StyleX-owned.
 */
export const interfaces = stylex.create({
  index: {
    display: "flex",
    gap: "var(--gutter)",
    paddingInline: "var(--pad)",
    marginLeft: {
      default: null,
      [rail]: 204,
    },
    flexDirection: {
      default: "row",
      [at899]: "column",
    },
    paddingTop: {
      default: null,
      [at899]: "calc(72px + env(safe-area-inset-top, 0px))",
      [phone]: "calc(56px + env(safe-area-inset-top, 0px))",
    },
  },
  rail: {
    display: {
      default: "none",
      [at900]: "block",
    },
    flexShrink: 0,
    alignSelf: "flex-start",
    position: "sticky",
    top: 0,
    height: "100vh",
    width: 184,
    paddingTop: 120,
    paddingRight: 20,
    paddingBottom: 72,
    paddingLeft: 0,
    overflowY: "auto",
    scrollbarWidth: "none",
    backgroundColor: "transparent",
  },
  railLink: {
    display: "block",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "-0.01em",
    color: "var(--text-secondary)",
    opacity: 0.6,
    textDecoration: "none",
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(auto-fill, 388px)",
      [phone]: "1fr",
    },
    columnGap: "var(--gutter)",
    rowGap: "calc(2 * var(--gutter))",
    paddingBottom: {
      default: 72,
      [phone]: "calc(72px + env(safe-area-inset-bottom, 0px))",
    },
  },
  tile: {
    isolation: "isolate",
    display: "grid",
    gridTemplateRows: "1fr auto",
    height: 408,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--grid-line)",
    borderRadius: 0,
    boxShadow: "none",
    textDecoration: "none",
    color: "inherit",
    overflow: "hidden",
    transition: {
      default: "border-color var(--duration-snap) var(--ease)",
      [reduce]: "none",
    },
    ":hover": { borderColor: "var(--text)" },
    ":focus-visible": {
      borderColor: "var(--text)",
      outlineWidth: 1,
      outlineStyle: "solid",
      outlineColor: "var(--text)",
      outlineOffset: 2,
    },
  },
  tileMatter: {
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 14,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--grid-line)",
    backgroundColor: "transparent",
  },
  tileTitle: {
    margin: 0,
    marginBottom: 2,
    fontSize: {
      default: 15,
      [phone]: 16,
    },
    fontWeight: 600,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
    color: "var(--text)",
  },
  tileVoice: {
    margin: 0,
    fontSize: {
      default: 13,
      [phone]: 15,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: {
      default: 1.4,
      [phone]: 1.45,
    },
    color: "var(--text-secondary)",
  },
  crop: {
    position: "relative",
    minHeight: 0,
    overflow: "hidden",
    pointerEvents: "none",
    userSelect: "none",
    backgroundColor: "transparent",
  },
  specimen: {
    marginTop: {
      default: 204,
      [at899]: 24,
      [phone]: 24,
    },
    height: {
      default: 612,
      [phone]: 680,
    },
    minHeight: {
      default: null,
      [phone]: 612,
    },
    backgroundColor: "var(--bg)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--divider)",
    borderRadius: 0,
    boxShadow: "0 1px 0 rgba(0, 0, 0, 0.04), 0 10px 28px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  matter: {
    maxWidth: 592,
    paddingTop: 32,
    paddingBottom: {
      default: 72,
      [phone]: "calc(72px + env(safe-area-inset-bottom, 0px))",
    },
  },
  voice: {
    margin: 0,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text-secondary)",
  },
  story: {
    marginTop: 16,
    marginBottom: 0,
    fontSize: 17,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.5,
    color: "var(--text)",
  },
  story2: {
    color: "var(--text-secondary)",
    fontSize: 15,
  },
  meta: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 184px))",
      [phone]: "1fr",
    },
    gap: 20,
    marginTop: 32,
    padding: 0,
    borderWidth: 0,
    boxShadow: "none",
  },
  v1Status: {
    display: {
      default: "none",
      [phone]: "flex",
    },
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    paddingInline: 20,
    fontSize: 12,
    color: "var(--text)",
    backgroundColor: "var(--bg)",
  },
  v1Nav: {
    display: {
      default: "none",
      [phone]: "flex",
    },
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    paddingInline: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--divider)",
    backgroundColor: "var(--bg)",
  },
  v1Title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
  v1Action: {
    appearance: "none",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "var(--text-secondary)",
    minHeight: 44,
    padding: 0,
    cursor: "pointer",
  },
});
