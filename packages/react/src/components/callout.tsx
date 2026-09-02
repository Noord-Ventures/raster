import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {}

const styles = stylex.create({
  box: {
    backgroundColor: raster.paper,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: 0,
    boxShadow: "none",
    paddingBlock: {
      default: 16,
      "@media (max-width: 640px)": 14,
    },
    paddingInline: {
      default: 20,
      "@media (max-width: 640px)": 16,
    },
  },
});

/** Paper field, 1px hairline on all sides. Not rounded. No left bar. */
export function Callout({ className, style, ...props }: CalloutProps) {
  const sx = rs(["rs-callout", className], styles.box);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
