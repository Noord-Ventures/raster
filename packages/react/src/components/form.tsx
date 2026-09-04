import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: {
      default: 16,
      [mq.phone]: 20,
    },
    maxWidth: {
      default: 388,
      [mq.phone]: "none",
    },
    width: {
      default: null,
      [mq.phone]: "100%",
    },
    margin: 0,
    color: raster.ink,
  },
});

/** Native form. Fields stack. One primary action at the end. */
export function Form({ className, style, ...props }: FormProps) {
  const sx = rs(["rs-form", className], styles.form);
  return <form {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
