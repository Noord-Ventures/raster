"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

/* The Raster mark: a 2×2 module grid with one cell inked. */
function RasterMark() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20">
      <rect x="0.75" y="0.75" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.25" y="0.75" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="0.75" y="11.25" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.25" y="11.25" width="8" height="8" fill="currentColor" />
    </svg>
  );
}

function useTheme() {
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
  return { dark, toggle };
}

function ThemeIcon({ dark }: { dark: boolean | null }) {
  return dark ? (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const links = [
  { href: "/", label: "Home", corner: false },
  { href: "/docs", label: "Docs", corner: true },
  { href: "/components", label: "Components", corner: true },
];

export function SiteChrome() {
  const pathname = usePathname();
  const { dark, toggle } = useTheme();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  const current = (href: string) =>
    (href === "/" ? pathname === "/" : pathname.startsWith(href)) ? ("page" as const) : undefined;

  return (
    <>
      <div className="logo-wrap">
        <Link href="/" className="site-logo" aria-label="Raster">
          <RasterMark />
        </Link>
      </div>

      <nav className="corner-nav" aria-label="Site">
        {links.filter((l) => l.corner).map((l) => (
          <Link key={l.href} href={l.href} aria-current={current(l.href)}>
            {l.label}
          </Link>
        ))}
        <a href="https://github.com/rennvaldes/raster">GitHub</a>
      </nav>

      <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle color scheme">
        <ThemeIcon dark={dark} />
      </button>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="navPanel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nav-toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <nav id="navPanel" className="nav-panel" data-open={open} aria-label="Site menu" aria-hidden={!open}>
        <div className="nav-panel-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-panel-link" aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
          <a href="https://github.com/rennvaldes/raster" className="nav-panel-link">
            GitHub
          </a>
        </div>
        <button className="nav-panel-theme" type="button" onClick={toggle}>
          <span>Appearance</span>
          <ThemeIcon dark={dark} />
        </button>
      </nav>
    </>
  );
}
