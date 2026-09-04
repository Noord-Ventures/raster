"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { useFieldControl } from "./field";

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
      [mq.phone]: raster.controlLabel,
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
    lineHeight: 1.55,
    paddingBlock: {
      default: 8,
      [mq.phone]: 12,
    },
    paddingInline: {
      default: 10,
      [mq.phone]: 14,
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
    fontFamily: "inherit",
    minHeight: {
      default: 96,
      [mq.phone]: 132,
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
});

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, feedback, className, style, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const areaId = id ?? autoId;
  const field = useFieldControl(props);
  const invalid = field.invalid;
  const stack = rs(["rs-field", "rs-textarea-field"], styles.field);
  const lab = rs(["rs-field-label", "rs-textarea-label"], styles.label);
  const sx = rs(["rs-textarea", invalid && "rs-textarea-invalid", className], styles.area, invalid && styles.invalid);
  const fb = rs(["rs-feedback", "rs-textarea-feedback"], styles.feedback);
  return (
    <div className={stack.className} style={stack.style}>
      {label != null && (
        <label className={lab.className} style={lab.style} htmlFor={areaId}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={areaId}
        {...props}
        aria-describedby={field["aria-describedby"]}
        aria-invalid={field["aria-invalid"]}
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
