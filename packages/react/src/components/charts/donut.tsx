import * as React from "react";
import { cx } from "../../cx";
import { ChartField, defaultFormat } from "./frame";

export interface DonutProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  label?: React.ReactNode;
  unit?: string;
  valueFormat?: (value: number) => string;
  spot?: boolean | string;
}

const R = 36;
const C = 2 * Math.PI * R;

export function Donut({
  value,
  max = 100,
  size = 184,
  label,
  unit,
  valueFormat,
  className,
  spot,
  ...props
}: DonutProps) {
  const format = valueFormat ?? ((v: number) => `${Math.round((v / max) * 100)}%`);
  const pct = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
  const caption = typeof label === "string" ? label : undefined;
  return (
    <ChartField spot={spot} className={cx("rs-chart-donut-wrap", className)} {...props}>
      <svg
        className="rs-chart-plot rs-chart-donut"
        width={size}
        height={size}
        viewBox="0 0 96 96"
        role="img"
        aria-label={`${format(value)}${caption ? ` ${caption}` : ""}`}
      >
        <circle className="rs-chart-donut-track" cx="48" cy="48" r={R} />
        <circle
          className="rs-chart-donut-value"
          cx="48"
          cy="48"
          r={R}
          strokeDasharray={`${pct * C} ${C}`}
          transform="rotate(-90 48 48)"
        />
        <text className="rs-chart-donut-label" x="48" y={caption ? 46 : 51} textAnchor="middle">
          {format(value)}
          {unit ? ` ${unit}` : ""}
        </text>
        {caption && (
          <text className="rs-chart-donut-caption" x="48" y="60" textAnchor="middle">
            {caption}
          </text>
        )}
      </svg>
      {label && !caption ? <p className="rs-chart-title">{label}</p> : null}
    </ChartField>
  );
}

export type ShareSlice = { label: string; value: number };

export interface ShareProps extends React.HTMLAttributes<HTMLDivElement> {
  slices: ShareSlice[];
  unit?: string;
  valueFormat?: (n: number) => string;
  spot?: boolean | string;
}

export function Share({
  slices,
  unit,
  valueFormat,
  className,
  spot,
  ...props
}: ShareProps) {
  const format = valueFormat ?? ((v: number) => defaultFormat(v, unit));
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <ChartField spot={spot} className={className} {...props}>
      <div className="rs-chart-share" role="img" aria-label="Share">
        {slices.map((s, i) => (
          <div
            key={s.label}
            className={cx("rs-chart-share-seg", i === 0 && "rs-chart-share-seg-spot")}
            style={{ flex: `${s.value} 1 0` }}
            title={`${s.label} ${format(s.value)}`}
          />
        ))}
      </div>
      <div className="rs-chart-legend" aria-hidden="true">
        {slices.map((s) => (
          <span key={s.label} className="rs-chart-legend-item">
            {s.label} {defaultFormat((s.value / total) * 100)}%
          </span>
        ))}
      </div>
    </ChartField>
  );
}
