import * as React from "react";
import { cx } from "../cx";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
}

export function Skeleton({ width, height = 14, style, className, ...props }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cx("rs-skeleton", className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
