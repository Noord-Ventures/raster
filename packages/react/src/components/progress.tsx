import * as React from "react";
import { cx } from "../cx";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  /** Label above the bar; the percentage lives here, never inside the bar. */
  label?: React.ReactNode;
}

export function Progress({ value, max = 100, label, className, ...props }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, max === 0 ? 0 : (value / max) * 100));
  return (
    <div className={cx(className)} {...props}>
      {label != null && (
        <div className="rs-progress-head">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className="rs-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
