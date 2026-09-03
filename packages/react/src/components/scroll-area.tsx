import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string;
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
  },
});

/** Hidden scrollbar; feathered top and bottom edges. */
export function ScrollArea({ maxHeight = 240, style, className, ...props }: ScrollAreaProps) {
  const sx = rs(["rs-scroll", className], styles.scroll);
  return (
    <div
      className={sx.className}
      style={{ maxHeight, ...sx.style, ...style }}
      tabIndex={0}
      {...props}
    />
  );
}
