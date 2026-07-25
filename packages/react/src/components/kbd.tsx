import * as React from "react";
import { cx } from "../cx";

export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <kbd className={cx("rs-kbd", className)} {...props} />;
}
