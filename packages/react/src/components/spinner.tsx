import * as React from "react";
import { cx } from "../cx";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

/** Hairline ring. Stops under prefers-reduced-motion. */
export function Spinner({ label = "Loading", className, ...props }: SpinnerProps) {
  return <span role="status" aria-label={label} className={cx("rs-spinner", className)} {...props} />;
}
