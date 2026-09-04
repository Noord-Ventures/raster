"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { hidden } from "../hidden.stylex";
import { Icon } from "./icon";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

const styles = stylex.create({
  choice: {
    display: "flex",
    alignItems: "center",
    gap: {
      default: 9,
      [mq.phone]: 12,
    },
    fontSize: {
      default: 14,
      [mq.phone]: 17,
    },
    color: raster.ink,
    letterSpacing: "-0.01em",
    minHeight: {
      default: 24,
      [mq.phone]: raster.hit,
    },
  },
  check: {
    width: {
      default: 16,
      [mq.phone]: 22,
    },
    height: {
      default: 16,
      [mq.phone]: 22,
    },
    borderRadius: {
      default: 3,
      [mq.phone]: 0,
    },
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: {
      default: raster.controlBorder,
      [mq.forcedColors]: "CanvasText",
    },
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: raster.paper,
    boxSizing: "border-box",
  },
  on: {
    backgroundColor: {
      default: raster.ink,
      [mq.forcedColors]: "Highlight",
    },
    borderColor: {
      default: raster.ink,
      [mq.forcedColors]: "Highlight",
    },
    color: {
      default: raster.paper,
      [mq.forcedColors]: "HighlightText",
    },
    forcedColorAdjust: "none",
  },
});

/** A real native checkbox; the visible 16px box mirrors its state. */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, style, checked, defaultChecked, onChange, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : inner;
  const row = rs(["rs-choice", className], styles.choice);
  const sr = rs(["rs-sr"], hidden.sr);
  const box = rs(["rs-check", on && "rs-check-on"], styles.check, on && styles.on);
  return (
    <label className={row.className} style={{ ...row.style, ...style }}>
      <input
        ref={ref}
        type="checkbox"
        className={sr.className}
        style={sr.style}
        checked={on}
        onChange={(e) => {
          if (!isControlled) setInner(e.target.checked);
          onChange?.(e);
        }}
        {...props}
      />
      <span className={box.className} style={box.style} aria-hidden="true">
        {on && <Icon name="check" size={12} />}
      </span>
      {label}
    </label>
  );
});
