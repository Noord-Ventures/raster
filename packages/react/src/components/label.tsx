import * as React from "react";
import { cx } from "../cx";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/** Label above a control. 12px, secondary ink. */
export function Label({ className, ...props }: LabelProps) {
  return <label className={cx("rs-label", className)} {...props} />;
}
