"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

function ThemeToggle() {
  const [dark, setDark] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = () => {
    const next = !(document.documentElement.dataset.theme === "dark");
    if (next) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("raster-theme", next ? "dark" : "light");
    } catch {
      /* private mode */
    }
    setDark(next);
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle color scheme">
      {dark ? (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const current = (href: string) =>
    (href === "/" ? pathname === "/" : pathname.startsWith(href)) ? "page" : undefined;
  return (
    <header className="site-header">
      <Link href="/" className="site-logo">
        Raster <span>— a monochrome design system</span>
      </Link>
      <nav>
        <Link href="/docs" aria-current={current("/docs")}>
          Docs
        </Link>
        <Link href="/components" aria-current={current("/components")}>
          Components
        </Link>
        <a href="https://github.com/rennvaldes/raster">GitHub</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
