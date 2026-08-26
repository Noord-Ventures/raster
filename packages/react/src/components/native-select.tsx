import * as React from "react";
import { cx } from "../cx";

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
}

/** The platform list. Raster chrome. */
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ label, className, id, children, ...props }, ref) {
    const autoId = React.useId();
    const selectId = id ?? autoId;
    const control = (
      <select ref={ref} id={selectId} className={cx("rs-native-select", className)} {...props}>
        {children}
      </select>
    );
    if (label == null) return control;
    return (
      <div className="rs-field">
        <label className="rs-field-label" htmlFor={selectId}>
          {label}
        </label>
        {control}
      </div>
    );
  },
);
