"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { useFieldControl } from "./field";

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
}

const chevronLight =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16' fill='none' stroke='%231A1A1A' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter'><g transform='rotate(90 8 8)'><path d='M5.5 3.5 L10.5 8 L5.5 12.5' vector-effect='non-scaling-stroke'/></g></svg>\")";
const chevronDark =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16' fill='none' stroke='%23E8E8E8' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter'><g transform='rotate(90 8 8)'><path d='M5.5 3.5 L10.5 8 L5.5 12.5' vector-effect='non-scaling-stroke'/></g></svg>\")";

const styles = stylex.create({
  field: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: {
      default: 12,
      [mq.phone]: raster.controlLabel,
    },
    fontWeight: 600,
    color: raster.gray,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
  select: {
    appearance: "none",
    WebkitAppearance: "none",
    boxSizing: "border-box",
    height: raster.controlH,
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    fontFamily: "inherit",
    fontSize: {
      default: 14,
      [mq.phone]: 16,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: `calc(${raster.controlH} - 2px)`,
    color: "var(--text)",
    caretColor: "var(--text)",
    backgroundColor: "var(--bg)",
    backgroundImage: {
      default: chevronLight,
      ':is([data-theme="dark"] *)': chevronDark,
    },
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: {
      default: raster.controlBorder,
      ":focus": raster.accent,
    },
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    paddingBlock: 0,
    paddingInlineStart: {
      default: 10,
      [mq.phone]: 14,
    },
    paddingInlineEnd: {
      default: 32,
      [mq.phone]: 36,
    },
    outlineWidth: {
      default: 0,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: "none",
      ":focus-visible": "solid",
    },
    outlineColor: raster.ink,
    outlineOffset: 2,
    width: "100%",
  },
  invalid: {
    borderColor: raster.ink,
  },
});

/** The platform list. Raster chrome. */
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ label, className, style, id, children, ...props }, ref) {
    const autoId = React.useId();
    const selectId = id ?? autoId;
    const field = useFieldControl(props);
    const invalid = field.invalid;
    const sx = rs(["rs-native-select", invalid && "rs-native-select-invalid", className], styles.select, invalid && styles.invalid);
    const control = (
      <select
        ref={ref}
        id={selectId}
        {...props}
        aria-describedby={field["aria-describedby"]}
        aria-invalid={field["aria-invalid"]}
        className={sx.className}
        style={{ ...sx.style, ...style }}
      >
        {children}
      </select>
    );
    if (label == null) return control;
    const stack = rs(["rs-field", "rs-native-select-field"], styles.field);
    const lab = rs(["rs-field-label", "rs-native-select-label"], styles.label);
    return (
      <div className={stack.className} style={stack.style}>
        <label className={lab.className} style={lab.style} htmlFor={selectId}>
          {label}
        </label>
        {control}
      </div>
    );
  },
);
