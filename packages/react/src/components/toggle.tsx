import * as React from "react";
import { cx } from "../cx";

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

/** Press switch; state lives in aria-pressed. */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { pressed, defaultPressed, onPressedChange, className, onClick, ...props },
  ref,
) {
  const [inner, setInner] = React.useState(defaultPressed ?? false);
  const isControlled = pressed !== undefined;
  const on = isControlled ? pressed : inner;
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={on}
      className={cx("rs-toggle", className)}
      onClick={(e) => {
        if (!isControlled) setInner(!on);
        onPressedChange?.(!on);
        onClick?.(e);
      }}
      {...props}
    />
  );
});

export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Array<{ value: string; label: React.ReactNode }>;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** One pressed at a time. */
export function ToggleGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: ToggleGroupProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  return (
    <div role="group" className={cx("rs-toggle-group", className)} {...props}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === current}
          className="rs-toggle"
          onClick={() => {
            if (!isControlled) setInner(option.value);
            onValueChange?.(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
