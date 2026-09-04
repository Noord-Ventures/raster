import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface FlowProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface FlowStepProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface FlowAddProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const at560 = "@media (min-width: 560px)";
const at940 = "@media (min-width: 940px)";
const at1280 = "@media (min-width: 1280px)";
const at1448 = "@media (min-width: 1448px)";

const styles = stylex.create({
  flow: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [at560]: "repeat(2, 184px)",
      [at940]: "repeat(3, 184px)",
      [at1280]: "repeat(4, 184px)",
      [at1448]: "repeat(5, 184px)",
    },
    width: {
      default: null,
      [at560]: "fit-content",
    },
    gap: raster.gutter,
  },
  step: {
    position: "relative",
    borderWidth: raster.hairline,
    borderStyle: "dashed",
    borderColor: {
      default: raster.divider,
      ":hover": raster.accent,
    },
    borderRadius: raster.radiusSm,
    paddingTop: 14,
    paddingRight: 34,
    paddingBottom: 16,
    paddingLeft: 14,
    backgroundColor: "var(--bg)",
    transition: "border-color var(--duration-snap) var(--ease)",
    "::after": {
      content: '""',
      position: "absolute",
      top: 15,
      right: 13,
      width: 8,
      height: 14,
      backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.3px)",
      backgroundSize: "4px 5px",
      color: "var(--text-secondary)",
      opacity: 0.4,
    },
  },
  num: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: "50%",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    backgroundColor: "var(--bg)",
    fontSize: 13,
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    color: "var(--text)",
    marginBottom: 14,
  },
  title: {
    display: "inline-block",
    fontSize: 14.5,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text)",
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "dashed",
    borderBottomColor: raster.divider,
    paddingBottom: 1,
    marginTop: 0,
    marginBottom: 8,
    marginLeft: 0,
    marginRight: 0,
  },
  body: {
    fontSize: 12.5,
    lineHeight: 1.55,
    color: raster.gray,
    letterSpacing: "-0.005em",
    margin: 0,
  },
  subs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 11,
  },
  sub: {
    fontSize: 11,
    lineHeight: 1,
    paddingBlock: 3,
    paddingInline: 7,
    borderWidth: raster.hairline,
    borderStyle: "dashed",
    borderColor: raster.divider,
    borderRadius: raster.radiusSm,
    color: raster.gray,
    letterSpacing: "-0.005em",
  },
  subAdd: {
    width: 18,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: "center",
    opacity: 0.7,
  },
  add: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    borderWidth: raster.hairline,
    borderStyle: "dashed",
    borderColor: {
      default: raster.divider,
      ":hover": raster.accent,
    },
    borderRadius: raster.radiusSm,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: {
      default: raster.gray,
      ":hover": "var(--text)",
    },
    backgroundColor: "transparent",
    width: 184,
    maxWidth: "100%",
    transition: "border-color var(--duration-snap) var(--ease), color var(--duration-snap) var(--ease)",
    fontFamily: "inherit",
    cursor: "pointer",
  },
  plus: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: "50%",
    fontSize: 13,
    lineHeight: 1,
  },
});

/** Dashed 1px pipeline. */
export function Flow({ className, style, ...props }: FlowProps) {
  const sx = rs(["rs-flow", className], styles.flow);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FlowStep({ className, style, ...props }: FlowStepProps) {
  const sx = rs(["rs-flow-step", className], styles.step);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FlowNum({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-flow-num", className], styles.num);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FlowTitle({ className, style, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const sx = rs([className, "rs-flow-title"], styles.title);
  return <h3 {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FlowBody({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs([className, "rs-flow-body"], styles.body);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FlowSubs({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-flow-subs", className], styles.subs);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FlowSub({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs([className, "rs-flow-sub"], styles.sub);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FlowSubAdd({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-flow-sub-add", className], styles.sub, styles.subAdd);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FlowAdd({ className, style, children, ...props }: FlowAddProps) {
  const sx = rs(["rs-flow-add", className], styles.add);
  const plus = rs(["rs-flow-plus"], styles.plus);
  return (
    <button type="button" {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      <span className={plus.className} style={plus.style}>
        +
      </span>
      {children}
    </button>
  );
}

export function FlowPlus({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-flow-plus", className], styles.plus);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
