"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
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
    gap: "0.5rem",
  },
  label: {
    fontSize: {
      default: "0.75rem",
      [mq.phone]: vlak.controlLabel,
    },
    fontWeight: 600,
    color: vlak.gray,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
  select: {
    appearance: "none",
    WebkitAppearance: "none",
    boxSizing: "border-box",
    height: vlak.controlH,
    minHeight: {
      default: null,
      [mq.phone]: vlak.hit,
    },
    fontFamily: "inherit",
    fontSize: {
      default: "0.875rem",
      [mq.phone]: "1rem",
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: `calc(${vlak.controlH} - 2px)`,
    color: "var(--text)",
    caretColor: "var(--text)",
    backgroundColor: "var(--bg)",
    backgroundImage: {
      default: chevronLight,
      ':is([data-theme="dark"] *)': chevronDark,
    },
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    borderWidth: vlak.hairline,
    borderStyle: "solid",
    borderColor: {
      default: vlak.controlBorder,
      ":focus": vlak.accent,
    },
    borderRadius: {
      default: vlak.radiusSm,
      [mq.phone]: vlak.radiusSm,
    },
    paddingBlock: 0,
    paddingInlineStart: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingInlineEnd: {
      default: "2rem",
      [mq.phone]: "2.25rem",
    },
    outlineWidth: {
      default: 0,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: "none",
      ":focus-visible": "solid",
    },
    outlineColor: vlak.ink,
    outlineOffset: 2,
    width: "100%",
  },
  invalid: {
    borderColor: vlak.ink,
  },
});

/** The platform list. Vlak chrome. */
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
