"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** localStorage key the choice persists under. */
  storageKey?: string;
  onThemeChange?: (dark: boolean) => void;
}

const styles = stylex.create({
  toggle: {
    position: "fixed",
    top: 24,
    insetInlineEnd: {
      default: 20,
      [mq.mobileGrid]: 25,
    },
    zIndex: raster.zSticky,
    width: {
      default: 24,
      [mq.phone]: raster.hit,
    },
    height: {
      default: 24,
      [mq.phone]: raster.hit,
    },
    minWidth: {
      default: null,
      [mq.phone]: raster.hit,
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    padding: {
      default: 4,
      [mq.phone]: 12,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 0,
    cursor: "pointer",
    color: {
      default: raster.gray,
      ":hover": raster.ink,
    },
    outlineWidth: {
      default: 0,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: "none",
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: "transparent",
      ":focus-visible": raster.ink,
    },
    outlineOffset: {
      default: 0,
      ":focus-visible": 2,
    },
    filter: `drop-shadow(0 0 12px ${raster.paper}) drop-shadow(0 0 20px ${raster.paper})`,
  },
  inline: {
    position: "relative",
    top: "auto",
    insetInlineEnd: "auto",
    zIndex: 1,
    filter: "none",
  },
  mark: {
    width: 16,
    height: 16,
    display: "block",
    flexShrink: 0,
  },
});

/**
 * One mark. Moon on paper, sun on black. The button sets
 * data-theme="dark" on <html> and persists the choice.
 * Apps pin it top-right; catalog and previews use the inline modifier.
 * The name states the action ("Switch to dark scheme"), so it changes with the state.
 */
export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(function ThemeToggle({
  storageKey = "raster-theme",
  onThemeChange,
  className,
  style,
  onClick,
  ...props
}, ref) {
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

  const inline = typeof className === "string" && className.split(/\s+/).includes("rs-theme-toggle-inline");
  const sx = rs(["rs-theme-toggle", className], styles.toggle, inline && styles.inline);
  const mark = rs([dark ? "rs-theme-sun" : "rs-theme-moon"], styles.mark);

  return (
    <button
      ref={ref}
      type="button"
      aria-label={dark ? "Switch to light scheme" : "Switch to dark scheme"}
      onClick={toggle}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    >
      <Icon name={dark ? "sun" : "moon"} size={16} className={mark.className} style={mark.style} />
    </button>
  );
});
