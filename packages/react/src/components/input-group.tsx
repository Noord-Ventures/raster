import * as React from "react";
import { cx } from "../cx";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Place the addon after the field. */
  end?: boolean;
}

/** Addon and field share one hairline. */
export function InputGroup({ end, className, ...props }: InputGroupProps) {
  return <div className={cx("rs-input-group", end && "rs-input-group-end", className)} {...props} />;
}

export function InputAddon({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("rs-input-addon", className)} {...props} />;
}
