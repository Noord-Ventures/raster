import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {}


const styles = stylex.create({
  chip: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: {
      default: "0.6875rem",
      [mq.phone]: "0.8125rem",
    },
    fontWeight: 500,
    color: vlak.gray,
    borderWidth: vlak.hairline,
    borderStyle: "solid",
    borderColor: "color-mix(in srgb, currentColor 35%, transparent)",
    paddingBlock: {
      default: "0.1875rem",
      [mq.phone]: "0.75rem",
    },
    paddingInline: {
      default: "0.4375rem",
      [mq.phone]: "0.875rem",
    },
    lineHeight: 1,
    borderRadius: {
      default: vlak.radiusSm,
      [mq.phone]: vlak.radiusSm,
    },
    display: {
      default: null,
      [mq.phone]: "inline-flex",
    },
    alignItems: {
      default: null,
      [mq.phone]: "center",
    },
    minHeight: {
      default: null,
      [mq.phone]: vlak.hit,
    },
  },
});

/** Mono identifier with a 1px mixed border. */
export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-chip", className], styles.chip);
  return <span ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
