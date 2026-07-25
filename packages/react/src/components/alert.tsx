import * as React from "react";
import { cx } from "../cx";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  /** Solid ink for the message that must not be missed. */
  variant?: "outline" | "solid";
  icon?: React.ReactNode;
}

export function Alert({ title, variant = "outline", icon, className, children, ...props }: AlertProps) {
  return (
    <div
      role="status"
      className={cx("rs-alert", variant === "solid" && "rs-alert-solid", className)}
      {...props}
    >
      {icon ?? (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7.5v3.5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      <div>
        {title != null && <span className="rs-alert-title">{title}</span>}
        {children != null && <p className="rs-alert-body">{children}</p>}
      </div>
    </div>
  );
}
