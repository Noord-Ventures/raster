import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

const styles = stylex.create({
  field: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: {
      default: 8,
      ["@media (max-width: 640px)"]: 8,
    },
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
  hint: {
    margin: 0,
    fontSize: {
      default: 12,
      ["@media (max-width: 640px)"]: 14,
    },
    fontWeight: 500,
    color: raster.gray,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
  error: {
    margin: 0,
    fontSize: {
      default: 12,
      ["@media (max-width: 640px)"]: 14,
    },
    fontWeight: 500,
    color: raster.ink,
    letterSpacing: "-0.01em",
    lineHeight: "16px",
  },
});

/** Stack: label, control, hint or error. */
export function Field({ className, style, ...props }: FieldProps) {
  const sx = rs(["rs-field", className], styles.field);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FieldLabel({ className, style, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const sx = rs(["rs-field-label", className], styles.label);
  return <label {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FieldHint({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-field-hint", className], styles.hint);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function FieldError({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-field-error", className], styles.error);
  return <p role="alert" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
