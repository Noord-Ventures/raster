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
 * One mark. Moon on paper, sun on black. The button sets
 * data-theme="dark" on <html> and persists the choice.
 * Apps pin it top-right; catalog and previews use the inline modifier.
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
      <Icon name={dark ? "sun" : "moon"} size={16} className={dark ? "rs-theme-sun" : "rs-theme-moon"} />
    </button>
  );
}
