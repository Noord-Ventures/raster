import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

const styles = stylex.create({
  card: {
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 0,
    padding: 0,
    maxWidth: 360,
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  inner: {
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 0,
    minHeight: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: raster.ink,
    letterSpacing: "-0.01em",
    display: "block",
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
    color: raster.ink,
    letterSpacing: "-0.02em",
    marginTop: 0,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: raster.gray,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.6,
    margin: 0,
  },
});

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Card({ className, style, ...props }, ref) {
    const sx = rs(["rs-card", className], styles.card);
    return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
  },
);

export const CardInner = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function CardInner(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-card-in", className], styles.inner);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const CardLabel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function CardLabel(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-card-label", className], styles.label);
  return <span ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(function CardTitle(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-card-title", className], styles.title);
  return <h3 ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const CardBody = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function CardBody(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-card-body", className], styles.body);
  return <p ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
