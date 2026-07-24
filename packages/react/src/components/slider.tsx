import * as React from "react";
import { cx } from "../cx";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

/** A native range input drives the ink track — pointer and keyboard for free. */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { value, defaultValue = 50, min = 0, max = 100, step = 1, onValueChange, className, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const pct = max === min ? 0 : ((current - min) / (max - min)) * 100;
  return (
    <div className={cx("rs-slider", className)}>
      <span className="rs-slider-fill" style={{ width: `${pct}%` }} />
      <span className="rs-slider-thumb" style={{ left: `${pct}%` }} />
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
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
