import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the field at 12px. */
  label?: React.ReactNode;
  /** Marks the field as validated: ink border and ink feedback text. */
  ok?: boolean;
  /** Quiet feedback line under the field. */
  feedback?: React.ReactNode;
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
      ["@media (max-width: 640px)"]: raster.controlLabel,
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
      ["@media (max-width: 640px)"]: raster.hit,
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: {
      default: raster.divider,
      ":focus": raster.accent,
    },
    borderRadius: {
      default: raster.radiusSm,
      ["@media (max-width: 640px)"]: 0,
    },
    backgroundColor: raster.paper,
    color: raster.ink,
    fontSize: {
      default: 14,
      ["@media (max-width: 640px)"]: 16,
    },
    lineHeight: `calc(${raster.controlH} - 2px)`,
    paddingInline: {
      default: 10,
      ["@media (max-width: 640px)"]: 14,
    },
    paddingBlock: 0,
    outline: "none",
    fontFamily: "inherit",
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
      ["@media (max-width: 640px)"]: 14,
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
  { label, ok, feedback, className, style, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const field = rs(["rs-field"], styles.field);
  const lab = rs(["rs-field-label"], styles.label);
  const sx = rs(["rs-input", "rs-input-full", ok && "rs-input-ok", className], styles.input, styles.full, ok && styles.ok);
  const fb = rs(["rs-feedback", ok && "rs-feedback-ok"], styles.feedback, ok && styles.feedbackOk);
  return (
    <div className={field.className} style={field.style}>
      {label != null && (
        <label className={lab.className} style={lab.style} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        {...props}
        className={sx.className}
        style={{ ...sx.style, ...style }}
      />
      {feedback != null && (
        <span className={fb.className} style={fb.style}>
          {feedback}
        </span>
      )}
    </div>
  );
});
