"use client";

import Link from "next/link";
import * as React from "react";

export interface CrumbBarProps {
  trail: Array<{ label: string; href?: string }>;
}

/** Fixed top bar; the breadcrumbs fade in once the page cover scrolls away. */
export function CrumbBar({ trail }: CrumbBarProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 110);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`crumb-bar${scrolled ? " crumb-bar-scrolled" : ""}`} aria-label="Breadcrumbs">
      <div className="crumb-bar-inner">
        <p className="rs-crumbs" style={{ margin: 0 }}>
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
                  <Link href={crumb.href}>{crumb.label}</Link>
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
