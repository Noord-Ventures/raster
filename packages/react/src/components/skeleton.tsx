import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
}

const rsSkel = stylex.keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.55 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  skeleton: {
    display: "block",
    backgroundColor: raster.dividerSubtle,
    borderRadius: raster.radiusSm,
    animationName: {
      default: rsSkel,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationDuration: "1.6s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});

export function Skeleton({ width, height = 14, style, className, ...props }: SkeletonProps) {
  const sx = rs(["rs-skeleton", className], styles.skeleton);
  return (
    <span
      aria-hidden="true"
      {...props}
      className={sx.className}
      style={{ width, height, ...sx.style, ...style }}
    />
  );
}
