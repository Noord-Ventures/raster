import * as React from "react";
import { cx } from "../cx";

export interface InlineFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string;
  buttonLabel?: React.ReactNode;
  successLabel?: React.ReactNode;
  /** The action only appears once this returns true. Defaults to a loose e-mail check. */
  validate?: (value: string) => boolean;
  onSubmit?: (value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/** One field, one action; the action sits inside the field. */
export function InlineForm({
  placeholder = "Your e-mail",
  buttonLabel = "Subscribe",
  successLabel = "You're on the list",
  validate = (v) => /.+@.+\..+/.test(v),
  onSubmit,
  className,
  inputProps,
  ...props
}: InlineFormProps) {
  const [value, setValue] = React.useState("");
  const [done, setDone] = React.useState(false);
  const valid = validate(value);

  if (done) {
    return (
      <div className="rs-subscribed">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {successLabel}
      </div>
    );
  }

  return (
    <form
      className={cx("rs-inline-field", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        onSubmit?.(value);
        setDone(true);
      }}
      {...props}
    >
      <input
        className="rs-inline-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...inputProps}
      />
      <span className={cx("rs-reveal", valid && "rs-reveal-in")}>
        <button type="submit" className="rs-btn-primary rs-inline-btn" tabIndex={valid ? 0 : -1}>
          {buttonLabel}
        </button>
      </span>
    </form>
  );
}
