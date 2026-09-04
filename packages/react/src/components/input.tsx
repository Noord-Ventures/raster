"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the field at 12px. */
  label?: React.ReactNode;
  /** Marks the field as validated: ink border and ink feedback text. */
  ok?: boolean;
  /** Quiet feedback line under the field. */
  feedback?: React.ReactNode;
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
      default: raster.divider,
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
    outline: "none",
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
  },
  full: {
    width: "100%",
  },
  ok: {
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
});

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, ok, feedback, plain, grouped, className, style, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const sx = rs(["rs-input", !grouped && "rs-input-full", ok && "rs-input-ok", className, grouped && "rs-input-grouped"], styles.input, !grouped && styles.full, ok && styles.ok, grouped && styles.grouped);
  const control = (
    <input
      ref={ref}
      id={inputId}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
  if (plain || grouped) return control;
  const field = rs(["rs-field", "rs-input-field"], styles.field);
  const lab = rs(["rs-field-label", "rs-input-label"], styles.label);
  const fb = rs(["rs-feedback", ok && "rs-feedback-ok"], styles.feedback, ok && styles.feedbackOk);
  return (
    <div className={field.className} style={field.style}>
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
    </div>
  );
});
