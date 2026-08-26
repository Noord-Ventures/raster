import * as React from "react";
import { cx } from "../../cx";
import {
  ChartField,
  ChartTip,
  PLOT,
  SrTable,
  defaultFormat,
  niceMax,
  stackedRows,
  ticksFor,
  type ChartSeries,
} from "./frame";

export type BarOrientation = "vertical" | "horizontal";

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Array<{ label: string; value: number }>;
  series?: ChartSeries[];
  labels?: string[];
  height?: number;
  orientation?: BarOrientation;
  stacked?: boolean;
  inverted?: boolean;
  grid?: boolean;
  ticks?: number;
  unit?: string;
  yLabel?: string;
  spot?: boolean | string;
  valueFormat?: (value: number) => string;
}

export function BarChart({
  data,
  series,
  labels,
  height = 204,
  orientation = "vertical",
  stacked,
  inverted,
  grid = true,
  ticks = 4,
  unit,
  yLabel,
  spot,
  valueFormat,
  className,
  ...props
}: BarChartProps) {
  const fromData: ChartSeries[] = data ? [{ name: "Value", values: data.map((d) => d.value) }] : [];
  const shown = (series ?? fromData).slice(0, 4);
  const tickLabels = labels ?? data?.map((d) => d.label) ?? shown[0]?.values.map((_, i) => `${i + 1}`) ?? [];
  const n = tickLabels.length;
  const stacks = stacked && shown.length > 1 ? stackedRows(shown) : null;
  const rawMax = stacks
    ? Math.max(...stacks.map((row) => row[row.length - 1] ?? 0))
    : Math.max(0, ...shown.flatMap((s) => s.values));
  const max = niceMax(rawMax);
  const format = valueFormat ?? ((v: number) => defaultFormat(v, unit));
  const [hover, setHover] = React.useState<number | null>(null);

  const { W, ML, MR, MT, MB } = PLOT;
  const plotW = W - ML - MR;
  const plotH = height - MT - MB;
  const horizontal = orientation === "horizontal";
  const band = (horizontal ? plotH : plotW) / Math.max(1, n);
  const barThick = Math.min(8, Math.max(2, band - 1));
  const inset = (band - barThick) / 2;
  const yV = (v: number) => {
    const t = v / max;
    return inverted ? MT + t * plotH : MT + plotH - t * plotH;
  };
  const xV = (v: number) => ML + (v / max) * plotW;
  const tickVals = ticksFor(max, ticks);
  const labelEvery = Math.ceil(n / 8);

  return (
    <ChartField spot={spot} className={className} {...props}>
      {yLabel && (
        <div className="rs-chart-head">
          <p className="rs-chart-title">{yLabel}</p>
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Bar chart">
        <g className="rs-chart-plot">
          {grid &&
            tickVals.map((t) =>
              horizontal ? (
                <g key={t}>
                  <line className="rs-chart-grid" x1={xV(t)} x2={xV(t)} y1={MT} y2={height - MB} />
                  <text className="rs-chart-axis" x={xV(t)} y={height - 4} textAnchor="middle">
                    {format(t)}
                  </text>
                </g>
              ) : (
                <g key={t}>
                  <line className="rs-chart-grid" x1={ML} x2={W - MR} y1={yV(t)} y2={yV(t)} />
                  <text className="rs-chart-axis" x={ML - 6} y={yV(t) + 3.5} textAnchor="end">
                    {format(t)}
                  </text>
                </g>
              ),
            )}
          {tickLabels.map((label, i) => {
            const values = shown.map((s) => s.values[i] ?? 0);
            if (horizontal) {
              const y0 = MT + i * band + inset;
              if (stacks) {
                let prev = 0;
                return shown.map((s, si) => {
                  const v = s.values[i] ?? 0;
                  const x1 = xV(prev);
                  const x2 = xV(prev + v);
                  prev += v;
                  return (
                    <rect
                      key={`${label}-${s.name}`}
                      className={cx(
                        "rs-chart-bar",
                        spot && si === 0 && "rs-chart-bar-spot",
                        hover != null && hover !== i && "rs-chart-bar-muted",
                      )}
                      x={x1}
                      y={y0}
                      width={Math.max(0, x2 - x1)}
                      height={barThick}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                    />
                  );
                });
              }
              const v = values[0] ?? 0;
              return (
                <rect
                  key={label}
                  className={cx("rs-chart-bar", spot && "rs-chart-bar-spot", hover != null && hover !== i && "rs-chart-bar-muted")}
                  x={ML}
                  y={y0}
                  width={Math.max(0, xV(v) - ML)}
                  height={barThick}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            }
            const x0 = ML + i * band + inset;
            if (stacks) {
              let prev = 0;
              return shown.map((s, si) => {
                const v = s.values[i] ?? 0;
                const y1 = yV(prev + v);
                const y2 = yV(prev);
                prev += v;
                return (
                  <rect
                    key={`${label}-${s.name}`}
                    className={cx(
                      "rs-chart-bar",
                      spot && si === 0 && "rs-chart-bar-spot",
                      hover != null && hover !== i && "rs-chart-bar-muted",
                    )}
                    x={x0}
                    y={y1}
                    width={barThick}
                    height={Math.max(0, y2 - y1)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              });
            }
            const v = values[0] ?? 0;
            return (
              <rect
                key={label}
                className={cx("rs-chart-bar", spot && "rs-chart-bar-spot", hover != null && hover !== i && "rs-chart-bar-muted")}
                x={x0}
                y={yV(v)}
                width={barThick}
                height={Math.max(0, yV(0) - yV(v))}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
          <line
            className="rs-chart-baseline"
            x1={ML}
            x2={horizontal ? ML : W - MR}
            y1={horizontal ? MT : yV(0)}
            y2={horizontal ? height - MB : yV(0)}
          />
          {tickLabels.map(
            (label, i) =>
              i % labelEvery === 0 && (
                <text
                  key={label}
                  className="rs-chart-axis"
                  x={horizontal ? ML - 6 : ML + i * band + band / 2}
                  y={horizontal ? MT + i * band + band / 2 + 3 : height - 4}
                  textAnchor={horizontal ? "end" : "middle"}
                >
                  {label}
                </text>
              ),
          )}
        </g>
      </svg>
      {hover != null && tickLabels[hover] && (
        <ChartTip
          left={horizontal ? "50%" : `${((ML + hover * band + band / 2) / W) * 100}%`}
          top={horizontal ? `${((MT + hover * band) / height) * 100}%` : `${(yV(shown[0]?.values[hover] ?? 0) / height) * 100}%`}
          label={tickLabels[hover]}
          rows={shown.map((s) => ({ name: shown.length > 1 ? s.name : undefined, value: format(s.values[hover] ?? 0) }))}
        />
      )}
      <SrTable caption="Chart data" labels={tickLabels} series={shown} />
    </ChartField>
  );
}
