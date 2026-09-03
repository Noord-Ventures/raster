import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
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
  area: {
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
    appearance: "none",
    WebkitAppearance: "none",
    backgroundColor: "var(--bg)",
    color: "var(--text)",
    caretColor: "var(--text)",
    fontSize: {
      default: 14,
      ["@media (max-width: 640px)"]: 16,
    },
    lineHeight: 1.55,
    paddingBlock: {
      default: 8,
      ["@media (max-width: 640px)"]: 12,
    },
    paddingInline: {
      default: 10,
      ["@media (max-width: 640px)"]: 14,
    },
    outline: "none",
    fontFamily: "inherit",
    minHeight: {
      default: 96,
      ["@media (max-width: 640px)"]: 132,
    },
    resize: "vertical",
    width: "100%",
    ":-webkit-autofill": {
      WebkitTextFillColor: "var(--text)",
      caretColor: "var(--text)",
      backgroundColor: "var(--bg)",
      boxShadow: "inset 0 0 0 1000px var(--bg)",
    },
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
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, feedback, className, style, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const areaId = id ?? autoId;
  const field = rs(["rs-field"], styles.field);
  const lab = rs(["rs-field-label"], styles.label);
  const sx = rs(["rs-textarea", className], styles.area);
  const fb = rs(["rs-feedback"], styles.feedback);
  return (
    <div className={field.className} style={field.style}>
      {label != null && (
        <label className={lab.className} style={lab.style} htmlFor={areaId}>
          {label}
        </label>
      )}
      <textarea ref={ref} id={areaId} {...props} className={sx.className} style={{ ...sx.style, ...style }} />
      {feedback != null && (
        <span className={fb.className} style={fb.style}>
          {feedback}
        </span>
      )}
    </div>
  );
});
