import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string;
  /** Name of the scrolling region; it is keyboard-focusable, so it needs one. */
  "aria-label"?: string;
}

const styles = stylex.create({
  scroll: {
    overflowY: "auto",
    scrollbarWidth: "none",
    maskImage: "linear-gradient(to bottom, transparent 0, #000 20px, #000 calc(100% - 20px), transparent 100%)",
    paddingBlock: 12,
    paddingInline: 0,
    color: raster.ink,
    "::-webkit-scrollbar": {
      display: "none",
    },
    outlineWidth: {
      default: null,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: null,
      ":focus-visible": raster.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
  },
});

/** Hidden scrollbar; feathered top and bottom edges. A named, focusable region. */
export function ScrollArea({
  maxHeight = 240,
  style,
  className,
  "aria-label": ariaLabel = "Scrollable content",
  ...props
}: ScrollAreaProps) {
  const sx = rs(["rs-scroll", className], styles.scroll);
  return (
    <div
      role="region"
      aria-label={props["aria-labelledby"] ? undefined : ariaLabel}
      className={sx.className}
      style={{ maxHeight, ...sx.style, ...style }}
      tabIndex={0}
      {...props}
    />
  );
}
