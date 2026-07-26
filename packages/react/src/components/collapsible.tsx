import * as React from "react";
import { cx } from "../cx";

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
        <svg className="rs-acc-chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="rs-disclosure-body">{children}</div>
    </details>
  );
}
