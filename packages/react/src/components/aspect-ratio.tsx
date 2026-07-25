import * as React from "react";
import { cx } from "../cx";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width over height, e.g. 16 / 9. */
  ratio?: number;
}

export function AspectRatio({ ratio = 16 / 9, style, className, ...props }: AspectRatioProps) {
  return <div className={cx("rs-ratio", className)} style={{ aspectRatio: ratio, ...style }} {...props} />;
}
