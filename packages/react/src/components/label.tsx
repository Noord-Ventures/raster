import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const styles = stylex.create({
  label: {
    fontSize: {
      default: "0.75rem",
      [mq.phone]: vlak.controlLabel,
    },
    fontWeight: 600,
    color: vlak.gray,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
});

/** Label above a control. 12px, secondary ink. */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-label", className], styles.label);
  return <label ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
