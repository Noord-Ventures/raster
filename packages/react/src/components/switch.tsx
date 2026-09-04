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
      default: 32,
      [mq.phone]: 64,
    },
    height: {
      default: 18,
      [mq.phone]: raster.hit,
    },
    minWidth: {
      default: null,
      [mq.phone]: 64,
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
    borderColor: raster.divider,
    position: "relative",
    flexShrink: 0,
    padding: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: `background-color ${raster.duration} ${raster.ease}, border-color ${raster.duration} ${raster.ease}`,
  },
  on: {
    backgroundColor: raster.ink,
    borderColor: raster.ink,
  },
  thumb: {
    position: "absolute",
    top: {
      default: 1.5,
      [mq.phone]: 4,
    },
    left: {
      default: 1.5,
      [mq.phone]: 4,
    },
    width: {
      default: 12,
      [mq.phone]: 36,
    },
    height: {
      default: 12,
      [mq.phone]: 36,
    },
    borderRadius: {
      default: "50%",
      [mq.phone]: 0,
    },
    backgroundColor: raster.gray,
    transition: `transform ${raster.duration} ${raster.ease}`,
  },
  thumbOn: {
    backgroundColor: raster.paper,
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
