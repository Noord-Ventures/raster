import * as React from "react";
import { cx } from "../cx";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string;
}

/** Quiet overflow: hidden scrollbar, feathered top and bottom edges. */
export function ScrollArea({ maxHeight = 240, style, className, ...props }: ScrollAreaProps) {
  return (
    <div
      className={cx("rs-scroll", className)}
      style={{ maxHeight, ...style }}
      tabIndex={0}
      {...props}
    />
  );
}
