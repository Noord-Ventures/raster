import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
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
      [mq.phone]: raster.controlH,
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    width: {
      default: null,
      [mq.phone]: "100%",
    },
    fontSize: raster.controlFs,
    paddingInline: {
      default: 22,
      [mq.phone]: 20,
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    transition: {
      default: "opacity var(--duration-snap) var(--ease), background-color var(--duration-snap) var(--ease), color var(--duration-snap) var(--ease)",
      [mq.reduce]: "none",
    },
    /* Hover and disabled are opacity on paper; in forced colors they become system colors instead. */
    opacity: {
      default: 1,
      ":hover": 0.85,
      ":disabled": 0.4,
      [mq.forcedColors]: {
        default: 1,
        ":hover": 1,
        ":disabled": 1,
      },
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
    backgroundColor: {
      default: raster.ink,
      [mq.forcedColors]: "ButtonFace",
    },
    color: {
      default: raster.paper,
      [mq.forcedColors]: {
        default: "ButtonText",
        ":disabled": "GrayText",
      },
    },
    borderColor: {
      default: "transparent",
      [mq.forcedColors]: {
        default: "ButtonText",
        ":disabled": "GrayText",
      },
    },
  },
  ghost: {
    fontWeight: 500,
    backgroundColor: {
      default: "transparent",
      ":hover": raster.divider,
      ":disabled": "transparent",
      [mq.forcedColors]: "ButtonFace",
    },
    color: {
      default: raster.ink,
      [mq.forcedColors]: {
        default: "ButtonText",
        ":disabled": "GrayText",
      },
    },
    borderColor: {
      default: raster.divider,
      ":hover": "transparent",
      ":disabled": raster.divider,
      [mq.forcedColors]: {
        default: "ButtonText",
        ":hover": "Highlight",
        ":disabled": "GrayText",
      },
    },
  },
  sm: {
    height: {
      default: 36,
      [mq.phone]: raster.controlH,
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    paddingInline: {
      default: 14,
      [mq.phone]: 16,
    },
    fontSize: {
      default: 13,
      [mq.phone]: raster.controlFs,
    },
    minWidth: {
      default: 104,
      [mq.phone]: 0,
    },
  },
  grouped: {
    height: "auto",
    minHeight: null,
    width: {
      default: null,
      [mq.phone]: null,
    },
    borderWidth: 0,
    borderRadius: 0,
    margin: 0,
    flexGrow: {
      default: null,
      [mq.phone]: 1,
    },
    minWidth: {
      default: 0,
      [mq.phone]: 0,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": -2,
    },
  },
  groupedGhost: {
    backgroundColor: {
      default: raster.paper,
      ":hover": raster.divider,
      ":disabled": raster.paper,
      [mq.forcedColors]: "ButtonFace",
    },
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "default", grouped = false, type = "button", className, style, ...props },
  ref,
) {
  const sx = rs([variant === "ghost" ? "rs-btn-ghost" : "rs-btn-primary", size === "sm" && "rs-btn-sm", className, grouped && "rs-btn-grouped", grouped && variant === "ghost" && "rs-btn-grouped-ghost"], styles.base, variant === "ghost" ? styles.ghost : styles.primary, size === "sm" && styles.sm, grouped && styles.grouped, grouped && variant === "ghost" && styles.groupedGhost);
  return <button ref={ref} type={type} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
