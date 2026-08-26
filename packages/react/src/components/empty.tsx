import * as React from "react";
import { cx } from "../cx";

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  action?: React.ReactNode;
}

/** A vacant cell. Title, one sentence, optional action. */
export function Empty({ title, action, className, children, ...props }: EmptyProps) {
  return (
    <div className={cx("rs-empty", className)} {...props}>
      {title != null && <p className="rs-empty-title">{title}</p>}
      {children != null && <p className="rs-empty-body">{children}</p>}
      {action != null && <div className="rs-empty-action">{action}</div>}
    </div>
  );
}
