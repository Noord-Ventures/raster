import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: {
      default: 16,
      ["@media (max-width: 640px)"]: 20,
    },
    maxWidth: {
      default: 388,
      ["@media (max-width: 640px)"]: "none",
    },
    width: {
      default: null,
      ["@media (max-width: 640px)"]: "100%",
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
