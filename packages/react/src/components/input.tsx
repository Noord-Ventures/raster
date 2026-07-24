import * as React from "react";
import { cx } from "../cx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the field at 12px. */
  label?: React.ReactNode;
  /** Marks the field as validated: ink border and ink feedback text. */
  ok?: boolean;
  /** Quiet feedback line under the field. */
  feedback?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, ok, feedback, className, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  return (
    <div className="rs-field">
      {label != null && (
        <label className="rs-field-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cx("rs-input", "rs-input-full", ok && "rs-input-ok", className)}
        {...props}
      />
      {feedback != null && <span className={cx("rs-feedback", ok && "rs-feedback-ok")}>{feedback}</span>}
    </div>
  );
});
