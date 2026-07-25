import * as React from "react";
import { cx } from "../cx";

export interface SeparatorProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({ orientation = "horizontal", className, ...props }: SeparatorProps) {
  if (orientation === "vertical") {
    return <span role="separator" aria-orientation="vertical" className={cx("rs-sep-v", className)} {...props} />;
  }
  return <hr className={cx("rs-sep", className)} {...props} />;
}
