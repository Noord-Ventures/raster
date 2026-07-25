import * as React from "react";
import { cx } from "../cx";

export interface HoverCardProps extends React.HTMLAttributes<HTMLSpanElement> {
  trigger: React.ReactNode;
}

/** A rich preview that opens on hover — and on keyboard focus, in plain CSS. */
export function HoverCard({ trigger, className, children, ...props }: HoverCardProps) {
  return (
    <span className={cx("rs-hover-card", className)} {...props}>
      <span tabIndex={0}>{trigger}</span>
      <span className="rs-hover-card-panel" role="tooltip">
        {children}
      </span>
    </span>
  );
}
