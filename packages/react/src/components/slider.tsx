import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

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
      ["@media (max-width: 640px)"]: 4,
    },
    backgroundColor: raster.divider,
    borderRadius: {
      default: 1,
      ["@media (max-width: 640px)"]: 0,
    },
    marginBlock: {
      default: 10,
      ["@media (max-width: 640px)"]: 20,
    },
    marginInline: 0,
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: raster.ink,
    borderRadius: {
      default: 1,
      ["@media (max-width: 640px)"]: 0,
    },
  },
  thumb: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      default: 14,
      ["@media (max-width: 640px)"]: 22,
    },
    height: {
      default: 14,
      ["@media (max-width: 640px)"]: 22,
    },
    borderRadius: {
      default: "50%",
      ["@media (max-width: 640px)"]: 0,
    },
    backgroundColor: raster.paper,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: raster.ink,
    boxSizing: "border-box",
  },
  range: {
    position: "absolute",
    left: 0,
    right: 0,
    top: {
      default: -8,
      ["@media (max-width: 640px)"]: -20,
    },
    bottom: {
      default: -8,
      ["@media (max-width: 640px)"]: -20,
    },
    width: "100%",
    height: "auto",
    opacity: 0,
    cursor: "pointer",
    margin: 0,
  },
});

/** A native range input drives the ink track. */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { value, defaultValue = 50, min = 0, max = 100, step = 1, onValueChange, className, style, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const pct = max === min ? 0 : ((current - min) / (max - min)) * 100;
  const sx = rs(["rs-slider", className], styles.slider);
  const fill = rs(["rs-slider-fill"], styles.fill);
  const thumb = rs(["rs-slider-thumb"], styles.thumb);
  const range = rs([], styles.range);
  return (
    <div className={sx.className} style={{ ...sx.style, ...style }}>
      <span className={fill.className} style={{ ...fill.style, width: `${pct}%` }} />
      <span className={thumb.className} style={{ ...thumb.style, left: `${pct}%` }} />
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
      />
    </div>
  );
});
