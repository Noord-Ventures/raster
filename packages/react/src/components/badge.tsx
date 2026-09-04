import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Outline for recommendations, solid for done, muted for pending. */
  variant?: "outline" | "solid" | "muted";
}

const variantClass = {
  outline: "rs-badge",
  solid: "rs-badge-solid",
  muted: "rs-badge-muted",
} as const;

const styles = stylex.create({
  base: {
    fontSize: "0.6875rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
    lineHeight: 1.4,
    borderRadius: raster.radiusSm,
  },
  outline: {
    color: raster.accent,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.accent,
    paddingBlock: "0.1875rem",
    paddingInline: "0.625rem",
  },
  solid: {
    color: raster.paper,
    backgroundColor: raster.ink,
    paddingBlock: "0.25rem",
    paddingInline: "0.6875rem",
  },
  muted: {
    color: raster.ink,
    backgroundColor: raster.dividerSubtle,
    paddingBlock: "0.25rem",
    paddingInline: "0.6875rem",
  },
});

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "outline", className, style, ...props },
  ref,
) {
  const sx = rs(
    [variantClass[variant], className],
    styles.base,
    variant === "solid" ? styles.solid : variant === "muted" ? styles.muted : styles.outline,
  );
  return <span ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
