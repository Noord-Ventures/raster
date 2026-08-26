import * as React from "react";
import { cx } from "../cx";

export interface CrumbBarItem {
  label: React.ReactNode;
  href?: string;
}

export interface CrumbBarProps extends React.HTMLAttributes<HTMLElement> {
  trail: CrumbBarItem[];
  /** Pixels of scroll before the bar solidifies and the crumbs fade in. */
  threshold?: number;
  /** Root crumb, held in the TOC column from 900px. */
  root?: CrumbBarItem;
  /** Abbreviated root shown on phones in place of the full label. */
  rootShort?: React.ReactNode;
}

/**
 * The fixed top bar of the house chrome. Transparent at rest; once the
 * page cover scrolls away it gains the paper background and its bottom
 * hairline, and the breadcrumbs fade in.
 */
export function CrumbBar({ trail, threshold = 110, root, rootShort, className, ...props }: CrumbBarProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <nav
      className={cx("rs-crumb-bar", scrolled && "rs-crumb-bar-scrolled", className)}
      aria-label="Breadcrumbs"
      {...props}
    >
      <div className="rs-crumb-bar-inner">
        {root &&
          (root.href ? (
            <a className="rs-crumb-root" href={root.href}>
              {rootShort ? <span className="rs-crumb-root-full">{root.label}</span> : root.label}
              {rootShort && <span className="rs-crumb-root-short">{rootShort}</span>}
            </a>
          ) : (
            <span className="rs-crumb-root">
              {rootShort ? <span className="rs-crumb-root-full">{root.label}</span> : root.label}
              {rootShort && <span className="rs-crumb-root-short">{rootShort}</span>}
            </span>
          ))}
        <p className="rs-crumbs">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span className="rs-crumbs-sep" aria-hidden="true">
                    /
                  </span>
                )}
                {last ? (
                  <span className="rs-crumbs-here">{crumb.label}</span>
                ) : crumb.href ? (
                  <a className="rs-crumbs-link" href={crumb.href}>
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </p>
      </div>
    </nav>
  );
}
