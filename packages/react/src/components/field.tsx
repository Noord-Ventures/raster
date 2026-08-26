import * as React from "react";
import { cx } from "../cx";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Stack: label, control, hint or error. */
export function Field({ className, ...props }: FieldProps) {
  return <div className={cx("rs-field", className)} {...props} />;
}

export function FieldLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cx("rs-field-label", className)} {...props} />;
}

export function FieldHint({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("rs-field-hint", className)} {...props} />;
}

export function FieldError({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p role="alert" className={cx("rs-field-error", className)} {...props} />;
}
