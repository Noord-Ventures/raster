import * as React from "react";
import { cx } from "../cx";

export interface Crumb {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Crumb[];
}

export function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className={cx("rs-crumbs", className)} {...props}>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="rs-crumbs-sep" aria-hidden="true">
                /
              </span>
            )}
            {last ? (
              <span className="rs-crumbs-here" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <a className="rs-crumbs-link" href={item.href}>
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
