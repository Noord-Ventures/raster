"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { useFieldControl } from "./field";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

const styles = stylex.create({
  slider: {
    position: "relative",
    height: {
      default: 2,
      [mq.phone]: 4,
    },
    backgroundColor: raster.divider,
    borderRadius: {
      default: 1,
      [mq.phone]: 0,
    },
    marginBlock: {
      default: 11,
      [mq.phone]: 20,
    },
    marginInline: 0,
  },
  fill: {
    position: "absolute",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    backgroundColor: raster.ink,
    borderRadius: {
      default: 1,
      [mq.phone]: 0,
    },
    pointerEvents: "none",
  },
  thumb: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      default: 14,
      [mq.phone]: 22,
    },
    height: {
      default: 14,
      [mq.phone]: 22,
    },
    borderRadius: {
      default: "50%",
      [mq.phone]: 0,
    },
    backgroundColor: raster.paper,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: raster.ink,
    boxSizing: "border-box",
    pointerEvents: "none",
  },
  /** Keyboard focus on the hidden range paints a ring on the thumb. */
  thumbFocused: {
    outlineWidth: 2,
    outlineStyle: "solid",
    outlineColor: raster.ink,
    outlineOffset: 2,
  },
  range: {
    position: "absolute",
    insetInlineStart: 0,
    insetInlineEnd: 0,
    // 24px tall on desktop, 44px on phones: the hit area, not the 2px track.
    top: {
      default: -11,
      [mq.phone]: -20,
    },
    bottom: {
      default: -11,
      [mq.phone]: -20,
    },
    width: "100%",
    height: "auto",
    opacity: 0,
    cursor: "pointer",
    margin: 0,
  },
});

function isFocusVisible(el: HTMLElement): boolean {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
}

/** A native range input drives the ink track. */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { value, defaultValue = 50, min = 0, max = 100, step = 1, onValueChange, className, style, onFocus, onBlur, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const pct = max === min ? 0 : ((current - min) / (max - min)) * 100;
  const field = useFieldControl(props);
  const sx = rs(["rs-slider", className], styles.slider);
  const fill = rs(["rs-slider-fill"], styles.fill);
  const thumb = rs(["rs-slider-thumb", focused && "rs-slider-thumb-focused"], styles.thumb, focused && styles.thumbFocused);
  const range = rs(["rs-slider-range"], styles.range);
  return (
    <div className={sx.className} style={{ ...sx.style, ...style }}>
      <span className={fill.className} style={{ ...fill.style, width: `${pct}%` }} />
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        className={range.className}
        style={range.style}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (!isControlled) setInner(next);
          onValueChange?.(next);
        }}
        {...props}
        aria-describedby={field["aria-describedby"]}
        aria-invalid={field["aria-invalid"]}
        onFocus={(e) => {
          onFocus?.(e);
          setFocused(isFocusVisible(e.currentTarget));
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setFocused(false);
        }}
      />
      <span className={thumb.className} style={{ ...thumb.style, left: `${pct}%` }} />
    </div>
  );
});
