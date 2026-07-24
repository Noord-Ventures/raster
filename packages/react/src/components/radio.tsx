import * as React from "react";
import { cx } from "../cx";

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  setValue: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: RadioGroupProps) {
  const autoName = React.useId();
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const setValue = (next: string) => {
    if (!isControlled) setInner(next);
    onValueChange?.(next);
  };
  return (
    <div role="radiogroup" {...props}>
      <RadioGroupContext.Provider value={{ name: name ?? autoName, value: current, setValue }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  value: string;
  label?: React.ReactNode;
}

/** A real native radio inside a RadioGroup; the ink dot mirrors its state. */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, className, onChange, ...props },
  ref,
) {
  const group = React.useContext(RadioGroupContext);
  const on = group ? group.value === value : undefined;
  return (
    <label className={cx("rs-radio", className)}>
      <input
        ref={ref}
        type="radio"
        className="rs-sr"
        name={group?.name}
        value={value}
        checked={on}
        onChange={(e) => {
          group?.setValue(value);
          onChange?.(e);
        }}
        {...props}
      />
      <span className={cx("rs-radio-dot", on && "rs-radio-on")} aria-hidden="true" />
      {label}
    </label>
  );
});
