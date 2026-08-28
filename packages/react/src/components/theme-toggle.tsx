"use client";

import * as React from "react";
import { cx } from "../cx";
import { Icon } from "./icon";

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** localStorage key the choice persists under. */
  storageKey?: string;
  onThemeChange?: (dark: boolean) => void;
}

/**
 * Fixed top right. Sun and moon slide on a track; the button sets
 * data-theme="dark" on <html> and persists the choice.
 */
export function ThemeToggle({
  storageKey = "raster-theme",
  onThemeChange,
  className,
  onClick,
  ...props
}: ThemeToggleProps) {
  const [dark, setDark] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = document.documentElement.dataset.theme !== "dark";
    if (next) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(storageKey, next ? "dark" : "light");
    } catch {
      /* private mode */
    }
    setDark(next);
    onThemeChange?.(next);
    onClick?.(e);
  };

  return (
    <button
      type="button"
      className={cx("rs-theme-toggle", className)}
      aria-label="Toggle color scheme"
      onClick={toggle}
      {...props}
    >
      <span className={cx("rs-theme-track", dark && "rs-theme-track-dark")}>
        <Icon name="moon" size={16} className="rs-theme-moon" />
        <Icon name="sun" size={16} className="rs-theme-sun" />
      </span>
    </button>
  );
}
