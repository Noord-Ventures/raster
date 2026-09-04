import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {}


const styles = stylex.create({
  chip: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: {
      default: 11,
      [mq.phone]: 13,
    },
    fontWeight: 500,
    color: raster.gray,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: "color-mix(in srgb, currentColor 35%, transparent)",
    paddingBlock: {
      default: 3,
      [mq.phone]: 12,
    },
    paddingInline: {
      default: 7,
      [mq.phone]: 14,
    },
    lineHeight: 1,
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
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
      [mq.phone]: raster.hit,
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
