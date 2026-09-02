import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Solid ink primary or hairline ghost. One primary per view. */
  variant?: "primary" | "ghost";
  size?: "default" | "sm";
  /** Flush into a ButtonGroup: no own stroke, one ink seam. */
  grouped?: boolean;
}

const styles = stylex.create({
  base: {
    boxSizing: "border-box",
    fontFamily: "inherit",
    letterSpacing: "-0.01em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: {
      default: "pointer",
      ":disabled": "not-allowed",
    },
    height: {
      default: raster.controlH,
      "@media (max-width: 640px)": raster.controlH,
    },
    minHeight: {
      default: null,
      "@media (max-width: 640px)": raster.hit,
    },
    width: {
      default: null,
      "@media (max-width: 640px)": "100%",
    },
    fontSize: raster.controlFs,
    paddingInline: {
      default: 22,
      "@media (max-width: 640px)": 20,
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderRadius: {
      default: raster.radiusSm,
      "@media (max-width: 640px)": 0,
    },
    transition: "opacity var(--duration-snap) var(--ease), background-color var(--duration-snap) var(--ease), color var(--duration-snap) var(--ease)",
    opacity: {
      default: 1,
      ":hover": 0.85,
      ":disabled": 0.4,
    },
    outlineWidth: {
      default: null,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: null,
      ":focus-visible": raster.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
  },
  primary: {
    fontWeight: 600,
    backgroundColor: raster.ink,
    color: raster.paper,
    borderColor: "transparent",
  },
  ghost: {
    fontWeight: 500,
    backgroundColor: {
      default: "transparent",
      ":hover": raster.divider,
      ":disabled": "transparent",
    },
    color: raster.ink,
    borderColor: {
      default: raster.divider,
      ":hover": "transparent",
      ":disabled": raster.divider,
    },
  },
  sm: {
    height: {
      default: 36,
      "@media (max-width: 640px)": raster.controlH,
    },
    minHeight: {
      default: null,
      "@media (max-width: 640px)": raster.hit,
    },
    paddingInline: {
      default: 14,
      "@media (max-width: 640px)": 16,
    },
    fontSize: {
      default: 13,
      "@media (max-width: 640px)": raster.controlFs,
    },
    minWidth: {
      default: 104,
      "@media (max-width: 640px)": 0,
    },
  },
  grouped: {
    height: "auto",
    minHeight: null,
    width: {
      default: null,
      "@media (max-width: 640px)": null,
    },
    borderWidth: 0,
    borderRadius: 0,
    margin: 0,
    flexGrow: {
      default: null,
      "@media (max-width: 640px)": 1,
    },
    minWidth: {
      default: 0,
      "@media (max-width: 640px)": 0,
    },
  },
  groupedGhost: {
    backgroundColor: {
      default: raster.paper,
      ":hover": raster.divider,
      ":disabled": raster.paper,
    },
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "default", grouped = false, type = "button", className, style, ...props },
  ref,
) {
  const sx = rs(
    [variant === "ghost" ? "rs-btn-ghost" : "rs-btn-primary", size === "sm" && "rs-btn-sm", className],
    styles.base,
    variant === "ghost" ? styles.ghost : styles.primary,
    size === "sm" && styles.sm,
    grouped && styles.grouped,
    grouped && variant === "ghost" && styles.groupedGhost,
  );
  return <button ref={ref} type={type} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
