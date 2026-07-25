import * as React from "react";
import { cx } from "../cx";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  feedback?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, feedback, className, id, ...props },
  ref,
) {
  const autoId = React.useId();
  const areaId = id ?? autoId;
  return (
    <div className="rs-field">
      {label != null && (
        <label className="rs-field-label" htmlFor={areaId}>
          {label}
        </label>
      )}
      <textarea ref={ref} id={areaId} className={cx("rs-textarea", className)} {...props} />
      {feedback != null && <span className="rs-feedback">{feedback}</span>}
    </div>
  );
});
