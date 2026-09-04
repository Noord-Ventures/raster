"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { cx } from "../cx";
import { useFieldControl } from "./field";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the field at 12px. */
  label?: React.ReactNode;
  /** Marks the field as validated: ink border and ink feedback text. */
  ok?: boolean;
  /** Quiet feedback line under the field. */
  feedback?: React.ReactNode;
  /** Hint under the field; it describes the control. */
  hint?: React.ReactNode;
  /** Error under the field; it describes the control and marks it invalid. */
  error?: React.ReactNode;
  /** Control only — no field stack. For Field / InputGroup. */
  plain?: boolean;
  /** Flush into an InputGroup: no own stroke. */
  grouped?: boolean;
}

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
  input: {
    boxSizing: "border-box",
    height: raster.controlH,
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
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
    appearance: "none",
    WebkitAppearance: "none",
    backgroundColor: "var(--bg)",
    color: "var(--text)",
    caretColor: "var(--text)",
    fontSize: {
      default: 14,
      [mq.phone]: 16,
    },
    lineHeight: `calc(${raster.controlH} - 2px)`,
    paddingInline: {
      default: 12,
      [mq.phone]: 14,
    },
    paddingBlock: 0,
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
    fontFamily: "inherit",
    ":-webkit-autofill": {
      WebkitTextFillColor: "var(--text)",
      caretColor: "var(--text)",
      backgroundColor: "var(--bg)",
      boxShadow: "inset 0 0 0 1000px var(--bg)",
    },
  },
  grouped: {
    borderWidth: 0,
    borderRadius: 0,
    height: "100%",
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    flexGrow: 1,
    minWidth: 0,
    backgroundColor: "var(--bg)",
    color: "var(--text)",
    // The group draws the ring; its overflow would clip this one.
    outlineWidth: {
      default: 0,
      ":focus-visible": 0,
    },
    outlineStyle: {
      default: "none",
      ":focus-visible": "none",
    },
  },
  full: {
    width: "100%",
  },
  ok: {
    borderColor: raster.ink,
  },
  invalid: {
    borderColor: raster.ink,
  },
  feedback: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: {
      default: 12,
      [mq.phone]: 14,
    },
    fontWeight: 500,
    color: raster.gray,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
    margin: 0,
    minHeight: 16,
  },
  feedbackOk: {
    color: raster.ink,
  },
  feedbackError: {
    color: raster.ink,
  },
});

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, ok, feedback, hint, error, plain, grouped, className, style, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const stacked = !plain && !grouped;
  const hintId = stacked && hint != null ? `${inputId}-hint` : undefined;
  const errorId = stacked && error != null ? `${inputId}-error` : undefined;
  const field = useFieldControl(props);
  const invalid = field.invalid || error != null;
  const describedBy = cx(field["aria-describedby"], hintId, errorId) || undefined;
  const sx = rs(["rs-input", !grouped && "rs-input-full", ok && "rs-input-ok", invalid && "rs-input-invalid", className, grouped && "rs-input-grouped"], styles.input, !grouped && styles.full, ok && styles.ok, invalid && styles.invalid, grouped && styles.grouped);
  const control = (
    <input
      ref={ref}
      id={inputId}
      {...props}
      aria-describedby={describedBy}
      aria-invalid={invalid ? true : field["aria-invalid"]}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
  if (!stacked) return control;
  const stack = rs(["rs-field", "rs-input-field"], styles.field);
  const lab = rs(["rs-field-label", "rs-input-label"], styles.label);
  const fb = rs(["rs-feedback", ok && "rs-feedback-ok"], styles.feedback, ok && styles.feedbackOk);
  const hintLine = rs(["rs-feedback"], styles.feedback);
  const errorLine = rs(["rs-feedback", "rs-feedback-error"], styles.feedback, styles.feedbackError);
  return (
    <div className={stack.className} style={stack.style}>
      {label != null && (
        <label className={lab.className} style={lab.style} htmlFor={inputId}>
          {label}
        </label>
      )}
      {control}
      {feedback != null && (
        <span className={fb.className} style={fb.style}>
          {feedback}
        </span>
      )}
      {hint != null && (
        <span id={hintId} className={hintLine.className} style={hintLine.style}>
          {hint}
        </span>
      )}
      {error != null && (
        <span id={errorId} role="alert" className={errorLine.className} style={errorLine.style}>
          {error}
        </span>
      )}
    </div>
  );
});
