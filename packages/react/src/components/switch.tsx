"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const styles = stylex.create({
  track: {
    display: "inline-flex",
    boxSizing: "border-box",
    width: {
      default: "2rem",
      [mq.phone]: "4rem",
    },
    height: {
      default: "1.125rem",
      [mq.phone]: raster.hit,
    },
    minWidth: {
      default: null,
      [mq.phone]: "4rem",
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    borderRadius: {
      default: 9,
      [mq.phone]: 0,
    },
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: {
      default: raster.controlBorder,
      [mq.forcedColors]: "ButtonText",
    },
    position: "relative",
    flexShrink: 0,
    padding: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: {
      default: `background-color ${raster.duration} ${raster.ease}, border-color ${raster.duration} ${raster.ease}`,
      [mq.reduce]: "none",
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
    /* The visible track stays 32×18; the hit area grows to 24px tall. */
    "::before": {
      content: '""',
      position: "absolute",
      top: "-0.1875rem",
      bottom: "-0.1875rem",
      insetInlineStart: 0,
      insetInlineEnd: 0,
    },
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
    forcedColorAdjust: "none",
  },
  thumb: {
    position: "absolute",
    top: {
      default: "0.09375rem",
      [mq.phone]: "0.25rem",
    },
    insetInlineStart: {
      default: "0.09375rem",
      [mq.phone]: "0.25rem",
    },
    width: {
      default: "0.75rem",
      [mq.phone]: "2.25rem",
    },
    height: {
      default: "0.75rem",
      [mq.phone]: "2.25rem",
    },
    borderRadius: {
      default: "50%",
      [mq.phone]: 0,
    },
    backgroundColor: {
      default: raster.gray,
      [mq.forcedColors]: "ButtonText",
    },
    forcedColorAdjust: "none",
    transition: {
      default: `transform ${raster.duration} ${raster.ease}`,
      [mq.reduce]: "none",
    },
  },
  thumbOn: {
    backgroundColor: {
      default: raster.paper,
      [mq.forcedColors]: "HighlightText",
    },
    transform: {
      default: "translateX(14px)",
      [mq.phone]: "translateX(20px)",
    },
  },
});

/** A button with role="switch". */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, defaultChecked, onCheckedChange, className, style, onClick, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : inner;
  const sx = rs(["rs-switch", on && "rs-switch-on", className], styles.track, on && styles.on);
  const knob = rs(["rs-switch-thumb", on && "rs-switch-thumb-on"], styles.thumb, on && styles.thumbOn);
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={on}
      className={sx.className}
      style={{ ...sx.style, ...style }}
      onClick={(e) => {
        if (!isControlled) setInner(!on);
        onCheckedChange?.(!on);
        onClick?.(e);
      }}
      {...props}
    >
      <i className={knob.className} style={knob.style} />
    </button>
  );
});
