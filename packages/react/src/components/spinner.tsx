import * as React from "react";
import { cx } from "../cx";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

/** Hairline ring. Stops under prefers-reduced-motion. */
export function Spinner({ label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cx("rs-spinner", className)} {...props}>
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
        <circle
          cx="8"
          cy="8"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="28 13"
        />
      </svg>
    </span>
  );
}
