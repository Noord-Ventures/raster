import * as React from "react";
import { cx } from "../cx";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Flush joined actions. One hairline between. */
export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return <div role="group" className={cx("rs-btn-group", className)} {...props} />;
}
