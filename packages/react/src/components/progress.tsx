import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  /** Label above the bar; the percentage lives here, never inside the bar. */
  label?: React.ReactNode;
}

const styles = stylex.create({
  head: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    fontWeight: 500,
    color: raster.gray,
    letterSpacing: "-0.01em",
    marginBottom: 7,
  },
  bar: {
    height: 4,
    backgroundColor: raster.dividerSubtle,
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: {
    display: "block",
    height: "100%",
    backgroundColor: raster.ink,
    borderRadius: 2,
  },
});

export function Progress({ value, max = 100, label, className, style, ...props }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, max === 0 ? 0 : (value / max) * 100));
  const head = rs(["rs-progress-head"], styles.head);
  const bar = rs(["rs-progress"], styles.bar);
  const fill = rs(["rs-progress-fill"], styles.fill);
  return (
    <div {...props} className={className} style={style}>
      {label != null && (
        <div className={head.className} style={head.style}>
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className={bar.className}
        style={bar.style}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <span className={fill.className} style={{ ...fill.style, width: `${pct}%` }} />
      </div>
    </div>
  );
}
