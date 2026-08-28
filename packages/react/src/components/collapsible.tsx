import * as React from "react";
import { cx } from "../cx";
import { Icon } from "./icon";

export interface CollapsibleProps
  extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: React.ReactNode;
  defaultOpen?: boolean;
}

/** A bare native <details>. */
export function Collapsible({ title, defaultOpen, className, children, ...props }: CollapsibleProps) {
  return (
    <details className={cx("rs-disclosure", className)} open={defaultOpen || undefined} {...props}>
      <summary>
        {title}
        <Icon name="chevron-right" rotate={90} className="rs-acc-chevron" />
      </summary>
      <div className="rs-disclosure-body">{children}</div>
    </details>
  );
}
