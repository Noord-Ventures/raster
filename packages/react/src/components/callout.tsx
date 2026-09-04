import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {}

const styles = stylex.create({
  box: {
    backgroundColor: vlak.paper,
    borderWidth: vlak.hairline,
    borderStyle: "solid",
    borderColor: vlak.divider,
    borderRadius: 0,
    boxShadow: "none",
    paddingBlock: {
      default: "1rem",
      [mq.phone]: "0.875rem",
    },
    paddingInline: {
      default: "1.25rem",
      [mq.phone]: "1rem",
    },
  },
});

/** Paper field, 1px hairline on all sides. Not rounded. No left bar. */
export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-callout", className], styles.box);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
