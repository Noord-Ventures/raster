import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface CiteProps extends React.HTMLAttributes<HTMLElement> {}
export interface RefsProps extends React.OlHTMLAttributes<HTMLOListElement> {}
export interface RefItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}
export interface CiteBoxProps extends React.HTMLAttributes<HTMLDivElement> {}


const styles = stylex.create({
  cite: {
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 0,
    verticalAlign: "super",
    whiteSpace: "nowrap",
  },
  citeA: {
    color: {
      default: raster.gray,
      ":hover": raster.accent,
    },
    textDecoration: "none",
    transition: "color var(--duration-snap) var(--ease)",
  },
  refs: {
    listStyle: "none",
    counterReset: "ref",
    marginTop: 4,
    marginBottom: 8,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    padding: 0,
  },
  item: {
    counterIncrement: "ref",
    position: "relative",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.65,
    color: raster.gray,
    letterSpacing: "-0.01em",
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: {
      default: raster.divider,
      ":last-child": "transparent",
    },
    scrollMarginTop: 88,
    ":target": {
      backgroundColor: "var(--table-alt)",
    },
    "::before": {
      content: "counter(ref)",
      position: "absolute",
      insetInlineStart: -16,
      top: 11,
      width: 12,
      textAlign: "end",
      fontSize: 11,
      fontWeight: 600,
      color: "var(--accent)",
    },
  },
  authors: {
    color: "var(--text)",
    fontWeight: 500,
  },
  doi: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11,
    color: {
      default: raster.gray,
      ":hover": "var(--text)",
    },
    textDecoration: "none",
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: {
      default: raster.divider,
      ":hover": raster.accent,
    },
    transition: "color var(--duration-snap) var(--ease), border-color var(--duration-snap) var(--ease)",
    wordBreak: "break-all",
  },
  box: {
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radius,
    padding: {
      default: 20,
      [mq.phone]: "14px 16px",
    },
    marginTop: 8,
  },
  boxLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: raster.gray,
    letterSpacing: "-0.01em",
    marginBottom: 8,
  },
  boxText: {
    fontSize: 13,
    fontWeight: 500,
    color: raster.gray,
    lineHeight: 1.7,
    userSelect: "all",
  },
});

/** Inline superscript citation. */
export function Cite({ className, style, children, ...props }: CiteProps) {
  const sx = rs(["rs-cite", className], styles.cite);
  return (
    <sup {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {children}
    </sup>
  );
}

export function CiteLink({ className, style, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const sx = rs([className, "rs-cite-cite-a"], styles.citeA);
  return <a {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

/** Numbered 1px list. Numerals hang in the gutter. */
export function Refs({ className, style, ...props }: RefsProps) {
  const sx = rs(["rs-refs", className], styles.refs);
  return <ol {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function RefItem({ className, style, ...props }: RefItemProps) {
  const sx = rs([className, "rs-cite-item"], styles.item);
  return <li {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function RefAuthors({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-ref-authors", className], styles.authors);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function RefDoi({ className, style, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const sx = rs(["rs-ref-doi", className], styles.doi);
  return <a {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function CiteBox({ className, style, ...props }: CiteBoxProps) {
  const sx = rs(["rs-cite-box", className], styles.box);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function CiteBoxLabel({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-cite-box-label", className], styles.boxLabel);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function CiteBoxText({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-cite-box-text", className], styles.boxText);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
