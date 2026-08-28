"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

/* The Raster mark from the noord library page, bare, rotated 45° back. */
function RasterMark() {
  return (
    <svg viewBox="0 0 822 822" fill="currentColor" aria-hidden="true" className="site-logo-mark">
      <path d="m411.128.67 128.714 128.713L334.5 334.726 129.158 540.068.405 411.315 411.128.669Z" />
      <path d="M539.429 128.97 411.09.63 282.751 128.97v564.691l128.661 127.928 128.017-127.928V128.97Z" />
      <path d="m500.812 347.858 128.752-128.752 192.21 192.209-128.752 128.753-96.105-96.105-96.105-96.105Z" />
      <path d="M536.4 126 632.6 219.1 536.4 312.2Z" />
    </svg>
  );
}

function useTheme() {
  const toggle = () => {
    const next = !(document.documentElement.dataset.theme === "dark");
    if (next) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("raster-theme", next ? "dark" : "light");
    } catch {
      /* private mode */
    }
  };
  return { toggle };
}

/* Same sliders mark as the top-right control on renatovaldes.com. One glyph, no track. */
function SettingsMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M2 4.5h5M11 4.5h3M2 11.5h3M9 11.5h5" />
      <circle cx="9" cy="4.5" r="1.9" />
      <circle cx="7" cy="11.5" r="1.9" />
    </svg>
  );
}

const links = [
  { href: "/", label: "Home", corner: false },
  { href: "/docs", label: "Docs", corner: true },
  { href: "/components", label: "Components", corner: true },
  { href: "/interfaces", label: "Interfaces", corner: true },
  { href: "/about", label: "About", corner: true },
];

export function SiteChrome() {
  const pathname = usePathname();
  const { toggle } = useTheme();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        <SettingsMark />
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
          <SettingsMark />
        </button>
      </nav>
    </>
  );
}
