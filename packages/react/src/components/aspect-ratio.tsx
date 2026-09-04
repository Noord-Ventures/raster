import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width over height, e.g. 16 / 9. */
  ratio?: number;
}

const styles = stylex.create({
  box: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: raster.radius,
  },
});

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
  { ratio = 16 / 9, style, className, ...props },
  ref,
) {
  const sx = rs(["rs-ratio", className], styles.box);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, aspectRatio: ratio, ...style }} />;
});
