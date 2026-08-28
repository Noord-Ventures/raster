import * as React from "react";
import { cx } from "../cx";
import { Icon } from "./icon";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

/** A real native checkbox; the visible 16px box mirrors its state. */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, checked, defaultChecked, onChange, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : inner;
  return (
    <label className={cx("rs-choice", className)}>
      <input
        ref={ref}
        type="checkbox"
        className="rs-sr"
        checked={on}
        onChange={(e) => {
          if (!isControlled) setInner(e.target.checked);
          onChange?.(e);
        }}
        {...props}
      />
      <span className={cx("rs-check", on && "rs-check-on")} aria-hidden="true">
        {on && <Icon name="check" size={12} />}
      </span>
      {label}
    </label>
  );
});
