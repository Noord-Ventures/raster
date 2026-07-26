import * as React from "react";
import { cx } from "../cx";

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tip text. Plain CSS shows it on hover and on keyboard focus. */
  tip: string;
}

export function Tooltip({ tip, className, children, ...props }: TooltipProps) {
  return (
    <span className={cx("rs-tip", className)} data-tip={tip} {...props}>
      {children}
    </span>
  );
}
