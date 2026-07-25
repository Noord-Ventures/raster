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
}

/**
 * The fixed top bar of the house chrome. Transparent at rest; once the
 * page cover scrolls away it gains the paper background and its bottom
 * hairline, and the breadcrumbs fade in.
 */
export function CrumbBar({ trail, threshold = 110, className, ...props }: CrumbBarProps) {
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
                  <a href={crumb.href}>{crumb.label}</a>
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
