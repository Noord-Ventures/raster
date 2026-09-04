import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const styles = stylex.create({
  label: {
    fontSize: {
      default: 12,
      [mq.phone]: raster.controlLabel,
    },
    fontWeight: 600,
    color: raster.gray,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
});

/** Label above a control. 12px, secondary ink. */
export function Label({ className, style, ...props }: LabelProps) {
  const sx = rs(["rs-label", className], styles.label);
  return <label {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
