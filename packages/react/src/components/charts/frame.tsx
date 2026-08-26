import * as React from "react";
import { cx } from "../../cx";

export interface ChartSeries {
  name: string;
  values: number[];
}

export interface ChartAnnotation {
  /** Index into the labels (line/bar) or an x value (scatter). */
  at: number;
  label: string;
}

export interface ChartPoint {
  x: number;
  y: number;
  label?: string;
  group?: string;
}

export function ticksBetween(min: number, max: number, count = 4): number[] {
  const span = max - min || 1;
  return Array.from({ length: count }, (_, i) => min + ((i + 1) / count) * span);
}

export const LINE_CLASS = [
  "rs-chart-line",
  "rs-chart-line rs-chart-line-dashed",
  "rs-chart-line rs-chart-line-muted",
  "rs-chart-line rs-chart-line-dotted",
] as const;

export const MAX_SERIES = LINE_CLASS.length;

/** Crouwel-adjacent red. Applied only as an inline field variable, never in CSS. */
export const CROUWEL_SPOT = "#E30613";

export function niceMax(raw: number): number {
  if (raw <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(raw));
  for (const f of [1, 2, 2.5, 5, 10]) {
    if (f * pow >= raw) return f * pow;
  }
  return 10 * pow;
}

export function defaultFormat(v: number, unit?: string): string {
  const n = Math.abs(v) >= 1000 ? `${+(v / 1000).toFixed(1)}k` : `${+v.toFixed(v % 1 === 0 ? 0 : 1)}`;
  return unit ? `${n} ${unit}` : n;
}

export function ticksFor(max: number, count = 4, inverted = false): number[] {
  const values = Array.from({ length: count }, (_, i) => ((i + 1) / count) * max);
  return inverted ? values.reverse() : values;
}

export function stackedRows(series: ChartSeries[]): number[][] {
  const n = Math.max(0, ...series.map((s) => s.values.length));
  return Array.from({ length: n }, (_, i) => {
    let sum = 0;
    return series.map((s) => {
      sum += s.values[i] ?? 0;
      return sum;
    });
  });
}

export function SrTable({
  caption,
  labels,
  series,
}: {
  caption: string;
  labels: string[];
  series: ChartSeries[];
}) {
  return (
    <table className="rs-sr">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Label</th>
          {series.map((s) => (
            <th key={s.name} scope="col">
              {s.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {labels.map((label, i) => (
          <tr key={i}>
            <th scope="row">{label}</th>
            {series.map((s) => (
              <td key={s.name}>{s.values[i]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LegendSwatch({ seriesIndex, spot }: { seriesIndex: number; spot?: boolean }) {
  return (
    <svg width="18" height="4" viewBox="0 0 18 4" aria-hidden="true">
      <path d="M0 2h18" className={spot && seriesIndex === 0 ? "rs-chart-line rs-chart-line-spot" : LINE_CLASS[seriesIndex]} />
    </svg>
  );
}

export function ChartTip({
  left,
  top,
  label,
  rows,
}: {
  left: string;
  top: string;
  label: string;
  rows: Array<{ name?: string; value: string }>;
}) {
  return (
    <div className="rs-chart-tip" style={{ left, top }}>
      <span className="rs-chart-tip-label">{label}</span>
      {rows.map((row, i) => (
        <div key={i} className="rs-chart-tip-row">
          {row.name ? <span className="rs-chart-tip-name">{row.name}</span> : null}
          <span className="rs-chart-tip-val">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export interface ChartFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** One Crouwel spot on the field. Chrome stays ink. */
  spot?: boolean | string;
}

export function ChartField({ spot, className, style, children, ...props }: ChartFieldProps) {
  const color = spot === true ? CROUWEL_SPOT : typeof spot === "string" ? spot : undefined;
  return (
    <div
      className={cx("rs-chart", "rs-chart-field", "rs-chart-enter", className)}
      style={{
        ...(style as React.CSSProperties),
        ...(color ? ({ ["--rs-chart-spot" as string]: color } as React.CSSProperties) : null),
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export const PLOT = { W: 408, ML: 36, MR: 8, MT: 8, MB: 22 } as const;
