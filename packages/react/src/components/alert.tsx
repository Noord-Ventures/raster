import * as React from "react";
import { cx } from "../cx";
import { Icon } from "./icon";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  /** Solid ink variant. */
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
        <Icon name="info" size={16} />
      )}
      <div>
        {title != null && <span className="rs-alert-title">{title}</span>}
        {children != null && <p className="rs-alert-body">{children}</p>}
      </div>
    </div>
  );
}
