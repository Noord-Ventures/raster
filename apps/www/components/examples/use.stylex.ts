import * as stylex from "@stylexjs/stylex";

const phone = "@media (max-width: 640px)";
const reduce = "@media (prefers-reduced-motion: reduce)";

const fadeIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

/** Use field: a 204-module composition. Paper, hairlines, slight Raster radius. */
export const useStyles = stylex.create({
  use: {
    isolation: "isolate",
    backgroundColor: "transparent",
    backgroundImage: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--divider)",
    borderRadius: "var(--radius-sm)",
    boxShadow: "none",
    display: "grid",
    gridTemplateColumns: {
      default: "184px minmax(0, 1fr)",
      [phone]: "1fr",
    },
    minHeight: {
      default: 204,
      [phone]: 0,
    },
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 24,
  },
  scene: {
    isolation: "isolate",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--divider)",
    borderRadius: "var(--radius-sm)",
    boxShadow: "none",
    marginTop: 8,
    marginBottom: 32,
    overflow: "hidden",
  },
  type: {
    margin: 0,
    paddingTop: 20,
    paddingBottom: 18,
    paddingInline: 16,
    borderRightWidth: {
      default: 1,
      [phone]: 0,
    },
    borderRightStyle: "solid",
    borderRightColor: "var(--divider)",
    borderBottomWidth: {
      default: 0,
      [phone]: 1,
    },
    borderBottomStyle: {
      default: null,
      [phone]: "solid",
    },
    borderBottomColor: {
      default: null,
      [phone]: "var(--divider)",
    },
    backgroundColor: "transparent",
    fontSize: {
      default: "clamp(28px, 5vw, 42px)",
      [phone]: 32,
    },
    fontWeight: 600,
    letterSpacing: "-0.035em",
    lineHeight: 0.95,
    color: "var(--text)",
    display: "flex",
    alignItems: "flex-end",
    minHeight: {
      default: null,
      [phone]: 88,
    },
  },
  body: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
    minWidth: 0,
    backgroundColor: "transparent",
  },
  kicker: {
    margin: 0,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text-secondary)",
  },
  copy: {
    margin: 0,
    fontSize: {
      default: 14,
      [phone]: 16,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.45,
    color: "var(--text)",
    maxWidth: "28em",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: {
      default: "center",
      [phone]: "stretch",
    },
    flexDirection: {
      default: "row",
      [phone]: "column",
    },
    width: {
      default: null,
      [phone]: "100%",
    },
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minWidth: 0,
  },
  compare: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 184px))",
      [phone]: "1fr",
    },
    gap: 20,
    alignItems: "start",
  },
  panel: {
    animationName: fadeIn,
    animationDuration: "var(--duration-confirm)",
    animationTimingFunction: "var(--ease)",
    [reduce]: {
      animationName: "none",
    },
  },
});
