"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { rasterComponents } from "@noorddev/raster";
import { interfaceBySlug } from "@/app/interfaces/catalog";

interface Crumb {
  label: string;
  href?: string;
}

function trailFor(pathname: string): Crumb[] {
  const parts = pathname.split("/").filter(Boolean);
  const trail: Crumb[] = [];
  if (parts.length === 0) {
    trail.push({ label: "Home" });
  } else if (parts[0] === "docs") {
    trail.push({ label: "Docs", href: "/docs" });
    if (parts[1] === "tokens") trail.push({ label: "Tokens" });
    else trail.push({ label: "Getting started" });
  } else if (parts[0] === "about") {
    trail.push({ label: "About" });
  } else if (parts[0] === "swag") {
    trail.push({ label: "Swag" });
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

/** Keep visible crumb boxes left of .corner-nav (gap ≥ 8px). Survives library CSS. */
function pinRootClearOfNav(root: HTMLElement) {
  const trail = document.querySelector<HTMLElement>(".rs-crumb-bar .rs-crumbs");
  if (window.matchMedia("(max-width: 640px)").matches) {
    root.style.removeProperty("position");
    root.style.removeProperty("top");
    root.style.removeProperty("left");
    root.style.removeProperty("width");
    root.style.removeProperty("max-width");
    root.style.removeProperty("visibility");
    root.style.removeProperty("overflow");
    root.style.removeProperty("height");
    root.style.removeProperty("line-height");
    trail?.style.removeProperty("display");
    return;
  }
  if (trail) trail.style.setProperty("display", "none", "important");
  const navs = [...document.querySelectorAll<HTMLElement>(".corner-nav a")].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  });
  if (!navs.length) return;
  const navLeft = Math.min(...navs.map((el) => el.getBoundingClientRect().left));
  const limit = navLeft - 8;
  const left = 76;
  root.style.setProperty("position", "fixed", "important");
  root.style.setProperty("top", "24px", "important");
  root.style.setProperty("left", `${left}px`, "important");
  root.style.setProperty("width", "auto", "important");
  root.style.setProperty("max-width", `${Math.max(0, limit - left)}px`, "important");
  root.style.setProperty("height", "24px", "important");
  root.style.setProperty("line-height", "24px", "important");
  root.style.setProperty("overflow", "hidden", "important");
  root.style.setProperty("white-space", "nowrap", "important");
  root.style.setProperty("text-overflow", "ellipsis", "important");
  root.style.setProperty("visibility", "visible", "important");
  const after = root.getBoundingClientRect();
  if (after.right > limit + 0.5) {
    root.style.setProperty("visibility", "hidden", "important");
  }
}

/**
 * The fixed top bar, on every page including Home and About.
 * Transparent at rest; once the cover scrolls away it gains the paper
 * background and its bottom hairline, and the breadcrumbs appear.
 */
export function CrumbBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const rootRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 110);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pin = React.useCallback(() => {
    const root = rootRef.current;
    if (root) pinRootClearOfNav(root);
  }, []);

  React.useLayoutEffect(() => {
    pin();
    window.addEventListener("resize", pin);
    return () => window.removeEventListener("resize", pin);
  }, [pin, pathname, scrolled]);

  const trail = trailFor(pathname);

  return (
    <nav className={`rs-crumb-bar${scrolled ? " rs-crumb-bar-scrolled" : ""}`} aria-label="Breadcrumbs">
      {/* Root sits outside the inner row so the library’s 1024 inset
          (margin-left: 204px) cannot place “Raster” on the nav column. */}
      <Link ref={rootRef} className="rs-crumb-root site-crumb-root" href="/">
        Raster
      </Link>
      <div className="rs-crumb-bar-inner">
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
