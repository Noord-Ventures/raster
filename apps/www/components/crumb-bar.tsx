"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { rasterComponents } from "@noorddev/raster";
import { interfaceBySlug } from "@/app/interfaces/catalog";
import { isFieldPath, isSpecimenPath } from "@/app/specimen";

interface Crumb {
  label: string;
  href?: string;
}

function trailFor(pathname: string): Crumb[] {
  const parts = pathname.split("/").filter(Boolean);
  const trail: Crumb[] = [];
  if (parts[0] === "docs") {
    trail.push({ label: "Docs", href: "/docs" });
    if (parts[1] === "tokens") trail.push({ label: "Tokens" });
    else trail.push({ label: "Getting started" });
  } else if (parts[0] === "about") {
    trail.push({ label: "About" });
  } else if (parts[0] === "components") {
    trail.push({ label: "Components", href: "/components" });
    if (parts[1]) {
      const component = rasterComponents.find((c) => c.name === parts[1]);
      trail.push({ label: component?.title ?? parts[1] });
    }
  } else if (parts[0] === "interfaces") {
    trail.push({ label: "Interfaces", href: "/interfaces" });
    if (parts[1]) {
      const proto = interfaceBySlug(parts[1]);
      trail.push({ label: proto?.title ?? parts[1] });
    }
  }
  return trail;
}

/**
 * The fixed top bar, on every page. Transparent at rest; once the
 * cover scrolls away it gains the paper background and its bottom
 * hairline, and the breadcrumbs appear.
 */
export function CrumbBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 110);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trail = trailFor(pathname);

  /* Exception: specimen and About are flush fields. No crumb bar on the field. */
  if (isSpecimenPath(pathname) || isFieldPath(pathname)) return null;

  return (
    <nav className={`rs-crumb-bar${scrolled ? " rs-crumb-bar-scrolled" : ""}`} aria-label="Breadcrumbs">
      <div className="rs-crumb-bar-inner">
        <Link className="rs-crumb-root" href="/">
          Raster
        </Link>
        {trail.length > 0 && (
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
                    <Link className="rs-crumbs-link" href={crumb.href}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </React.Fragment>
              );
            })}
          </p>
        )}
      </div>
    </nav>
  );
}
