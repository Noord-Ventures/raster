"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { RasterMark } from "./raster-mark";

type Scheme = "light" | "dark" | "auto";

const schemes: { value: Scheme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

function applyScheme(scheme: Scheme) {
  const dark =
    scheme === "dark" ||
    (scheme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (dark) document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
}

function readScheme(): Scheme {
  try {
    const stored = localStorage.getItem("raster-theme");
    if (stored === "light" || stored === "dark" || stored === "auto") return stored;
  } catch {
    /* private mode */
  }
  return "auto";
}

function useAppearance() {
  const [scheme, setScheme] = React.useState<Scheme>("auto");

  React.useEffect(() => {
    const current = readScheme();
    setScheme(current);
    applyScheme(current);
  }, []);

  React.useEffect(() => {
    if (scheme !== "auto") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyScheme("auto");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [scheme]);

  const select = (next: Scheme) => {
    setScheme(next);
    try {
      localStorage.setItem("raster-theme", next);
    } catch {
      /* private mode */
    }
    applyScheme(next);
  };

  return { scheme, select };
}

/* Same sliders mark as the top-right control on renatovaldes.com. One glyph, no track. */
function SettingsMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      <path d="M2 4.5h5M11 4.5h3M2 11.5h3M9 11.5h5" />
      <circle cx="9" cy="4.5" r="1.9" />
      <circle cx="7" cy="11.5" r="1.9" />
    </svg>
  );
}

function AppearanceCells({
  scheme,
  onSelect,
}: {
  scheme: Scheme;
  onSelect: (next: Scheme) => void;
}) {
  return (
    <div className="appearance-cells" role="radiogroup" aria-label="Appearance">
      {schemes.map((item) => (
        <button
          key={item.value}
          type="button"
          className="appearance-cell"
          role="radio"
          aria-checked={scheme === item.value}
          onClick={() => onSelect(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

const links = [
  { href: "/", label: "Home", corner: false },
  { href: "/components", label: "Components", corner: true },
  { href: "/interfaces", label: "Interfaces", corner: true },
  { href: "/docs", label: "Docs", corner: true },
  { href: "/about", label: "About", corner: true },
  { href: "/swag", label: "Swag", corner: true },
];

export function SiteChrome() {
  const pathname = usePathname();
  const { scheme, select } = useAppearance();
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const appearanceRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setOpen(false), [pathname]);
  React.useEffect(() => setMenuOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!appearanceRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
        <a href="https://github.com/Noord-Ventures/raster">GitHub</a>
      </nav>

      <div ref={appearanceRef}>
        <button
          type="button"
          className="theme-toggle"
          aria-label="Appearance"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-controls="appearanceMenu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <SettingsMark />
        </button>
        <div
          id="appearanceMenu"
          className="rs-menu appearance-menu"
          hidden={!menuOpen}
          role="dialog"
          aria-label="Appearance"
        >
          <p className="appearance-label">Appearance</p>
          <AppearanceCells scheme={scheme} onSelect={select} />
        </div>
      </div>

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
          <a href="https://github.com/Noord-Ventures/raster" className="nav-panel-link">
            GitHub
          </a>
        </div>
        <div className="nav-panel-appearance">
          <p className="appearance-label">Appearance</p>
          <AppearanceCells scheme={scheme} onSelect={select} />
        </div>
      </nav>
    </>
  );
}
