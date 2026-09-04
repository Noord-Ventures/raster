import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
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
    backgroundColor: vlak.dividerSubtle,
    borderRadius: vlak.radiusSm,
    animationName: {
      default: rsSkel,
      [mq.reduce]: "none",
    },
    animationDuration: "1.6s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { width, height = 14, style, className, ...props },
  ref,
) {
  const sx = rs(["rs-skeleton", className], styles.skeleton);
  return (
    <span
      ref={ref}
      aria-hidden="true"
      {...props}
      className={sx.className}
      style={{ width, height, ...sx.style, ...style }}
    />
  );
});
