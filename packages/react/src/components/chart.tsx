import * as React from "react";
import { cx } from "../cx";

/*
 * Raster charts: zero-dependency SVG. The grid is hairlines, the
 * marks are ink, and series are told apart by texture (solid, dashed,
 * gray, dotted), never by hue. Every chart ships a hover layer and a
 * visually-hidden table for screen readers.
 */

export interface ChartSeries {
  name: string;
  values: number[];
}

/** Fixed identity order: texture follows the series, not its rank. */
const SERIES_CLASS = [
  "rs-chart-line",
  "rs-chart-line rs-chart-line-dashed",
  "rs-chart-line rs-chart-line-muted",
  "rs-chart-line rs-chart-line-dotted",
] as const;

export const MAX_SERIES = SERIES_CLASS.length;

function niceMax(raw: number): number {
  if (raw <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(raw));
  for (const f of [1, 2, 2.5, 5, 10]) {
    if (f * pow >= raw) return f * pow;
  }
  return 10 * pow;
}

const defaultFormat = (v: number): string =>
  Math.abs(v) >= 1000 ? `${+(v / 1000).toFixed(1)}k` : `${+v.toFixed(1)}`;

function SrTable({ caption, labels, series }: { caption: string; labels: string[]; series: ChartSeries[] }) {
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

function LegendSwatch({ seriesIndex }: { seriesIndex: number }) {
  return (
    <svg width="18" height="4" viewBox="0 0 18 4" aria-hidden="true">
      <path d="M0 2h18" className={SERIES_CLASS[seriesIndex]} />
    </svg>
  );
}

/* ── Line chart ── */

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  series: ChartSeries[];
  labels?: string[];
  height?: number;
  /** Fill under the first series at 5% ink. */
  area?: boolean;
  valueFormat?: (value: number) => string;
}

export function LineChart({
  series,
  labels,
  height = 180,
  area,
  valueFormat = defaultFormat,
  className,
  ...props
}: LineChartProps) {
  const shown = series.slice(0, MAX_SERIES);
  const n = Math.max(...shown.map((s) => s.values.length));
  const max = niceMax(Math.max(...shown.flatMap((s) => s.values)));
  const [hover, setHover] = React.useState<number | null>(null);
  const overlayRef = React.useRef<SVGRectElement>(null);

  const W = 560;
  const ML = 40;
  const MT = 6;
  const MB = 22;
  const plotW = W - ML - 8;
  const plotH = height - MT - MB;
  const x = (i: number) => ML + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
  const y = (v: number) => MT + plotH - (v / max) * plotH;
  const path = (values: number[]) => values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(v)}`).join(" ");
  const ticks = [0.25, 0.5, 0.75, 1].map((t) => t * max);

  const locate = (clientX: number): number | null => {
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return null;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(ratio * (n - 1));
  };

  const tickLabels = labels ?? Array.from({ length: n }, (_, i) => `${i + 1}`);

  return (
    <div className={cx("rs-chart", className)} {...props}>
      <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label={`Line chart, ${shown.map((s) => s.name).join(" and ")}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line className="rs-chart-grid" x1={ML} x2={W - 8} y1={y(t)} y2={y(t)} />
            <text className="rs-chart-axis" x={ML - 8} y={y(t) + 3.5} textAnchor="end">
              {valueFormat(t)}
            </text>
          </g>
        ))}
        <line className="rs-chart-baseline" x1={ML} x2={W - 8} y1={y(0)} y2={y(0)} />
        {area && shown[0] && (
          <path className="rs-chart-area" d={`${path(shown[0].values)} L${x(n - 1)} ${y(0)} L${x(0)} ${y(0)} Z`} />
        )}
        {shown.map((s, si) => (
          <path key={s.name} className={SERIES_CLASS[si]} d={path(s.values)} />
        ))}
        {hover != null && (
          <g>
            <line className="rs-chart-cursor" x1={x(hover)} x2={x(hover)} y1={MT} y2={y(0)} />
            {shown.map((s, si) => (
              <circle key={si} className="rs-chart-dot" cx={x(hover)} cy={y(s.values[hover] ?? 0)} r={3.5} />
            ))}
          </g>
        )}
        <text className="rs-chart-axis" x={ML} y={height - 4} textAnchor="start">
          {tickLabels[0]}
        </text>
        <text className="rs-chart-axis" x={W - 8} y={height - 4} textAnchor="end">
          {tickLabels[n - 1]}
        </text>
        <rect
          ref={overlayRef}
          x={ML}
          y={0}
          width={plotW}
          height={height}
          fill="transparent"
          onMouseMove={(e) => setHover(locate(e.clientX))}
          onMouseLeave={() => setHover(null)}
        />
      </svg>
      {hover != null && (
        <div
          className="rs-chart-tip"
          style={{ left: `${((x(hover) - 0) / W) * 100}%`, top: `${(MT / height) * 100}%` }}
        >
          <span className="rs-chart-tip-label">{tickLabels[hover]}</span>
          {shown.map((s) => (
            <div key={s.name} className="rs-chart-tip-row">
              <span className="rs-chart-tip-name">{s.name}</span>
              <span className="rs-chart-tip-val">{valueFormat(s.values[hover] ?? 0)}</span>
            </div>
          ))}
        </div>
      )}
      {shown.length > 1 && (
        <div className="rs-chart-legend">
          {shown.map((s, si) => (
            <span key={s.name} className="rs-chart-legend-item">
              <LegendSwatch seriesIndex={si} />
              {s.name}
            </span>
          ))}
        </div>
      )}
      <SrTable caption="Chart data" labels={tickLabels} series={shown} />
    </div>
  );
}

/* ── Bar chart ── */

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<{ label: string; value: number }>;
  height?: number;
  valueFormat?: (value: number) => string;
}

export function BarChart({ data, height = 180, valueFormat = defaultFormat, className, ...props }: BarChartProps) {
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const [hover, setHover] = React.useState<number | null>(null);

  const W = 560;
  const ML = 40;
  const MT = 6;
  const MB = 22;
  const plotW = W - ML - 8;
  const plotH = height - MT - MB;
  const band = plotW / data.length;
  const gap = Math.max(2, band * 0.25);
  const barW = band - gap;
  const y = (v: number) => MT + plotH - (v / max) * plotH;
  const ticks = [0.25, 0.5, 0.75, 1].map((t) => t * max);
  const labelEvery = Math.ceil(data.length / 8);

  return (
    <div className={cx("rs-chart", className)} {...props}>
      <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Bar chart">
        {ticks.map((t) => (
          <g key={t}>
            <line className="rs-chart-grid" x1={ML} x2={W - 8} y1={y(t)} y2={y(t)} />
            <text className="rs-chart-axis" x={ML - 8} y={y(t) + 3.5} textAnchor="end">
              {valueFormat(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) => (
          <rect
            key={d.label}
            className={cx("rs-chart-bar", hover != null && hover !== i && "rs-chart-bar-muted")}
            x={ML + i * band + gap / 2}
            y={y(d.value)}
            width={barW}
            height={Math.max(0, y(0) - y(d.value))}
            rx={2}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
        <line className="rs-chart-baseline" x1={ML} x2={W - 8} y1={y(0)} y2={y(0)} />
        {data.map(
          (d, i) =>
            i % labelEvery === 0 && (
              <text key={d.label} className="rs-chart-axis" x={ML + i * band + band / 2} y={height - 4} textAnchor="middle">
                {d.label}
              </text>
            ),
        )}
      </svg>
      {hover != null && data[hover] && (
        <div
          className="rs-chart-tip"
          style={{ left: `${((ML + hover * band + band / 2) / W) * 100}%`, top: `${(y(data[hover].value) / height) * 100}%` }}
        >
          <span className="rs-chart-tip-label">{data[hover].label}</span>
          <div className="rs-chart-tip-row">
            <span className="rs-chart-tip-val">{valueFormat(data[hover].value)}</span>
          </div>
        </div>
      )}
      <SrTable
        caption="Chart data"
        labels={data.map((d) => d.label)}
        series={[{ name: "Value", values: data.map((d) => d.value) }]}
      />
    </div>
  );
}

/* ── Sparkline: inline, endpoint emphasized ── */

export interface SparklineProps extends React.HTMLAttributes<HTMLSpanElement> {
  values: number[];
  width?: number;
  height?: number;
}

export function Sparkline({ values, width = 120, height = 28, className, ...props }: SparklineProps) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const x = (i: number) => (i / (values.length - 1)) * (width - 4) + 2;
  const y = (v: number) => 2 + (1 - (v - min) / span) * (height - 4);
  const d = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(v)}`).join(" ");
  const last = values[values.length - 1] ?? 0;
  return (
    <span className={cx("rs-spark", className)} {...props}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Trend ending at ${last}`}>
        <path className="rs-chart-line" d={d} />
        <circle className="rs-chart-dot" cx={x(values.length - 1)} cy={y(last)} r={2.5} />
      </svg>
    </span>
  );
}

/* ── Donut: one value against its whole ── */

export interface DonutProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  label?: React.ReactNode;
  valueFormat?: (value: number) => string;
}

export function Donut({
  value,
  max = 100,
  size = 96,
  label,
  valueFormat = (v) => `${Math.round((v / max) * 100)}%`,
  className,
  ...props
}: DonutProps) {
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, max === 0 ? 0 : value / max));
  return (
    <div className={cx("rs-chart", className)} style={{ width: size }} {...props}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${valueFormat(value)}${label ? ` ${label}` : ""}`}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--divider-subtle)" strokeWidth="4" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--text)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${pct * c} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fill: "var(--text)", fontSize: 15, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
        >
          {valueFormat(value)}
        </text>
      </svg>
    </div>
  );
}
