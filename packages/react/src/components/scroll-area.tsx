import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak } from "../tokens.stylex";
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
    paddingBlock: "0.75rem",
    paddingInline: 0,
    color: vlak.ink,
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
      ":focus-visible": vlak.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
  },
});

/** Hidden scrollbar; feathered top and bottom edges. A named, focusable region. */
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea({
  maxHeight = 240,
  style,
  className,
  "aria-label": ariaLabel = "Scrollable content",
  ...props
}, ref) {
  const sx = rs(["rs-scroll", className], styles.scroll);
  return (
    <div
      ref={ref}
      role="region"
      aria-label={props["aria-labelledby"] ? undefined : ariaLabel}
      className={sx.className}
      style={{ maxHeight, ...sx.style, ...style }}
      tabIndex={0}
      {...props}
    />
  );
});
