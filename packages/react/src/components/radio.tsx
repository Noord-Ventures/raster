"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { hidden } from "../hidden.stylex";

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  setValue: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: RadioGroupProps) {
  const autoName = React.useId();
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const setValue = (next: string) => {
    if (!isControlled) setInner(next);
    onValueChange?.(next);
  };
  return (
    <div role="radiogroup" {...props}>
      <RadioGroupContext.Provider value={{ name: name ?? autoName, value: current, setValue }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  value: string;
  label?: React.ReactNode;
}

const styles = stylex.create({
  radio: {
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
  dot: {
    width: {
      default: 16,
      [mq.phone]: 22,
    },
    height: {
      default: 16,
      [mq.phone]: 22,
    },
    borderRadius: "50%",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: {
      default: raster.controlBorder,
      [mq.forcedColors]: "CanvasText",
    },
    position: "relative",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  on: {
    borderColor: {
      default: raster.ink,
      [mq.forcedColors]: "Highlight",
    },
  },
  fill: {
    position: "absolute",
    inset: {
      default: 3,
      [mq.phone]: 5,
    },
    borderRadius: "50%",
    backgroundColor: {
      default: raster.ink,
      [mq.forcedColors]: "Highlight",
    },
    forcedColorAdjust: "none",
  },
});

/** A real native radio inside a RadioGroup; the ink dot mirrors its state. */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, className, style, onChange, ...props },
  ref,
) {
  const group = React.useContext(RadioGroupContext);
  const on = group ? group.value === value : undefined;
  const row = rs(["rs-radio", className], styles.radio);
  const sr = rs(["rs-sr"], hidden.sr);
  const mark = rs(["rs-radio-dot", on && "rs-radio-on"], styles.dot, on && styles.on);
  const fill = rs(["rs-radio-fill"], styles.fill);
  return (
    <label className={row.className} style={{ ...row.style, ...style }}>
      <input
        ref={ref}
        type="radio"
        className={sr.className}
        style={sr.style}
        name={group?.name}
        value={value}
        checked={on}
        onChange={(e) => {
          group?.setValue(value);
          onChange?.(e);
        }}
        {...props}
      />
      <span className={mark.className} style={mark.style} aria-hidden="true">
        {on ? <span className={fill.className} style={fill.style} /> : null}
      </span>
      {label}
    </label>
  );
});
