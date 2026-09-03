"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { chrome } from "@/app/site.stylex";
import { RasterMark } from "./raster-mark";

function sx(className: string, ...styles: unknown[]) {
  const next = (stylex.props as (...args: unknown[]) => { className?: string; style?: React.CSSProperties })(...styles);
  return { className: [className, next.className].filter(Boolean).join(" "), style: next.style };
}

type Scheme = "light" | "dark" | "auto";
type GridPref = "on" | "off";

const schemes: { value: Scheme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

const TEXT_STEPS = [0.9, 1, 1.1, 1.25, 1.4];

function applyScheme(scheme: Scheme) {
  const dark =
    scheme === "dark" ||
    (scheme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (dark) document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
}

function applyGrid(grid: GridPref) {
  document.documentElement.dataset.grid = grid;
}

function persistTextScale(scale: number) {
  const pct = String(Math.round(scale * 100));
  const root = document.documentElement;
  root.style.setProperty("--text-scale", String(scale));
  root.setAttribute("data-text-scale", pct);
  try {
    localStorage.setItem("raster-text-scale", pct);
  } catch {
    /* private mode */
  }
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

function readGrid(): GridPref {
  try {
    return localStorage.getItem("raster-grid") === "off" ? "off" : "on";
  } catch {
    return "on";
  }
}

function readTextIndex(): number {
  try {
    const raw = localStorage.getItem("raster-text-scale");
    if (raw == null || raw === "") return 1;
    const n = parseFloat(raw);
    if (!isFinite(n)) return 1;
    const scale = n > 3 ? n / 100 : n;
    const i = TEXT_STEPS.findIndex((step) => Math.abs(step - scale) < 0.001);
    if (i >= 0) return i;
  } catch {
    /* private mode */
  }
  return 1;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function useSettings() {
  const [scheme, setScheme] = React.useState<Scheme>("auto");
  const [grid, setGrid] = React.useState<GridPref>("on");
  const [textIndex, setTextIndex] = React.useState(1);

  useIsoLayoutEffect(() => {
    const nextScheme = readScheme();
    const nextGrid = readGrid();
    const nextText = readTextIndex();
    setScheme(nextScheme);
    setGrid(nextGrid);
    setTextIndex(nextText);
    applyScheme(nextScheme);
    applyGrid(nextGrid);
    persistTextScale(TEXT_STEPS[nextText]!);
  }, []);

  React.useEffect(() => {
    if (scheme !== "auto") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyScheme("auto");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [scheme]);

  const selectScheme = (next: Scheme) => {
    setScheme(next);
    try {
      localStorage.setItem("raster-theme", next);
    } catch {
      /* private mode */
    }
    applyScheme(next);
  };

  const selectGrid = (next: GridPref) => {
    setGrid(next);
    try {
      if (next === "off") localStorage.setItem("raster-grid", "off");
      else localStorage.removeItem("raster-grid");
    } catch {
      /* private mode */
    }
    applyGrid(next);
  };

  const stepText = (delta: number) => {
    const next = Math.max(0, Math.min(TEXT_STEPS.length - 1, textIndex + delta));
    setTextIndex(next);
    persistTextScale(TEXT_STEPS[next]!);
  };

  return { scheme, selectScheme, grid, selectGrid, textIndex, stepText };
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

function SegButtons<T extends string>({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onSelect: (next: T) => void;
}) {
  const id = `lbl-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="settings-group">
      <p className="appearance-label" id={id}>
        {label}
      </p>
      <div className="appearance-cells" role="group" aria-labelledby={id}>
        {options.map((item) => (
          <button
            key={item.value}
            type="button"
            className="appearance-cell"
            aria-pressed={value === item.value}
            onClick={() => onSelect(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function TextStepper({
  index,
  onStep,
}: {
  index: number;
  onStep: (delta: number) => void;
}) {
  const scale = TEXT_STEPS[index] ?? 1;
  return (
    <div className="settings-group">
      <p className="appearance-label" id="lbl-text-size">
        Text size
      </p>
      <div className="text-stepper" role="group" aria-labelledby="lbl-text-size">
        <button type="button" aria-label="Decrease text size" disabled={index === 0} onClick={() => onStep(-1)}>
          −
        </button>
        <output suppressHydrationWarning>{Math.round(scale * 100)}%</output>
        <button
          type="button"
          aria-label="Increase text size"
          disabled={index === TEXT_STEPS.length - 1}
          onClick={() => onStep(1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

function SettingsBody({
  scheme,
  onScheme,
  grid,
  onGrid,
  textIndex,
  onTextStep,
}: {
  scheme: Scheme;
  onScheme: (next: Scheme) => void;
  grid: GridPref;
  onGrid: (next: GridPref) => void;
  textIndex: number;
  onTextStep: (delta: number) => void;
}) {
  return (
    <>
      <SegButtons label="Appearance" value={scheme} options={schemes} onSelect={onScheme} />
      <TextStepper index={textIndex} onStep={onTextStep} />
      <SegButtons
        label="Grid"
        value={grid}
        options={[
          { value: "on", label: "Show" },
          { value: "off", label: "Hide" },
        ]}
        onSelect={onGrid}
      />
    </>
  );
}

const links = [
  { href: "/", label: "Home", corner: false },
  { href: "/components", label: "Components", corner: true },
  { href: "/interfaces", label: "Interfaces", corner: true },
  { href: "/docs", label: "Docs", corner: true },
  { href: "/about", label: "About", corner: true },
];

export function SiteChrome() {
  const pathname = usePathname();
  const { scheme, selectScheme, grid, selectGrid, textIndex, stepText } = useSettings();
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const settingsRef = React.useRef<HTMLDivElement>(null);

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
      if (!settingsRef.current?.contains(event.target as Node)) setMenuOpen(false);
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

  const settingsProps = {
    scheme,
    onScheme: selectScheme,
    grid,
    onGrid: selectGrid,
    textIndex,
    onTextStep: stepText,
  };

  return (
    <>
      <div {...sx("logo-wrap", chrome.logoWrap)}>
        <Link href="/" {...sx("site-logo", chrome.logo)} aria-label="Raster">
          <RasterMark />
        </Link>
      </div>

      <nav {...sx("corner-nav", chrome.cornerNav)} aria-label="Site">
        {links.filter((l) => l.corner).map((l) => (
          <Link key={l.href} href={l.href} aria-current={current(l.href)}>
            {l.label}
          </Link>
        ))}
        <a href="https://github.com/Noord-Ventures/raster">GitHub</a>
      </nav>

      <div className="settings" ref={settingsRef}>
        <button
          type="button"
          {...sx("theme-toggle", chrome.themeToggle)}
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
          <SettingsBody {...settingsProps} />
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
          <SettingsBody {...settingsProps} />
        </div>
      </nav>
    </>
  );
}
