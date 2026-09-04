"use client";

import * as React from "react";
import {
  ChartCanvas,
  ChartField,
  ChartHead,
  ChartLegend,
  ChartLegendItem,
  ChartTip,
  ChartTitle,
  PLOT,
  SrTable,
  barMark,
  chartStyles,
  defaultFormat,
  describePlot,
  niceMax,
  plotName,
  plotProps,
  stackedRows,
  stepCursor,
  ticksFor,
  useChartWidth,
  type ChartSeries,
} from "./frame";
import { rs } from "../../rs";

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
  /** BCP 47 tag for number formatting; undefined is the reader's own. */
  locale?: string;
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(function BarChart({
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
  locale,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: BarChartProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const fromData: ChartSeries[] = data ? [{ name: "Value", values: data.map((d) => d.value) }] : [];
  const shown = (series ?? fromData).slice(0, 4);
  const tickLabels = labels ?? data?.map((d) => d.label) ?? shown[0]?.values.map((_, i) => `${i + 1}`) ?? [];
  const n = tickLabels.length;
  const stacks = stacked && shown.length > 1 ? stackedRows(shown) : null;
  const rawMax = stacks
    ? Math.max(...stacks.map((row) => row[row.length - 1] ?? 0))
    : Math.max(0, ...shown.flatMap((s) => s.values));
  const max = niceMax(rawMax);
  const format = valueFormat ?? ((v: number) => defaultFormat(v, undefined, locale));
  const tip = valueFormat ?? ((v: number) => defaultFormat(v, unit, locale));
  const [hover, setHover] = React.useState<number | null>(null);
  const [canvasRef, W] = useChartWidth<HTMLDivElement>();
  const titleId = React.useId();

  const { ML, MR, MT, MB } = PLOT;
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

  const svg = rs(["rs-chart-svg"], chartStyles.svg);
  const plot = rs(["rs-chart-plot"], chartStyles.plot);
  const gridSx = rs(["rs-chart-grid"], chartStyles.grid);
  const axis = rs(["rs-chart-axis"], chartStyles.axis);
  const baseline = rs(["rs-chart-baseline"], chartStyles.baseline);

  const name = plotName(
    { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy },
    yLabel ? titleId : undefined,
    describePlot("Bar chart", shown.map((s) => s.name), unit),
  );
  const a11y = plotProps(
    name,
    (key) => {
      const next = stepCursor(key, hover, n);
      if (next === undefined) return false;
      setHover(next);
      return true;
    },
    () => setHover(null),
  );
  const hoverProps = (i: number) => ({
    onPointerEnter: () => setHover(i),
    onPointerLeave: () => setHover(null),
  });

  return (
    <ChartField ref={ref} spot={spot} className={className} {...props}>
      {yLabel && (
        <ChartHead>
          <ChartTitle id={titleId}>{yLabel}</ChartTitle>
        </ChartHead>
      )}
      <ChartCanvas ref={canvasRef}>
        <svg className={svg.className} style={svg.style} viewBox={`0 0 ${W} ${height}`} {...a11y}>
          <g className={plot.className} style={plot.style} aria-hidden="true">
            {grid &&
              tickVals.map((t) =>
                horizontal ? (
                  <g key={t}>
                    <line className={gridSx.className} style={gridSx.style} x1={xV(t)} x2={xV(t)} y1={MT} y2={height - MB} />
                    <text className={axis.className} style={axis.style} x={xV(t)} y={height - 4} textAnchor="middle">
                      {format(t)}
                    </text>
                  </g>
                ) : (
                  <g key={t}>
                    <line className={gridSx.className} style={gridSx.style} x1={ML} x2={W - MR} y1={yV(t)} y2={yV(t)} />
                    <text className={axis.className} style={axis.style} x={ML - 6} y={yV(t) + 3.5} textAnchor="end">
                      {format(t)}
                    </text>
                  </g>
                ),
              )}
            {tickLabels.map((label, i) => {
              const values = shown.map((s) => s.values[i] ?? 0);
              const mark = (si: number) =>
                barMark({
                  spot: Boolean(spot) && (stacks ? si === 0 : true),
                  muted: hover != null && hover !== i,
                });
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
                        {...mark(si)}
                        x={x1}
                        y={y0}
                        width={Math.max(0, x2 - x1)}
                        height={barThick}
                        {...hoverProps(i)}
                      />
                    );
                  });
                }
                const v = values[0] ?? 0;
                return (
                  <rect
                    key={label}
                    {...mark(0)}
                    x={ML}
                    y={y0}
                    width={Math.max(0, xV(v) - ML)}
                    height={barThick}
                    {...hoverProps(i)}
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
                      {...mark(si)}
                      x={x0}
                      y={y1}
                      width={barThick}
                      height={Math.max(0, y2 - y1)}
                      {...hoverProps(i)}
                    />
                  );
                });
              }
              const v = values[0] ?? 0;
              return (
                <rect
                  key={label}
                  {...mark(0)}
                  x={x0}
                  y={yV(v)}
                  width={barThick}
                  height={Math.max(0, yV(0) - yV(v))}
                  {...hoverProps(i)}
                />
              );
            })}
            <line
              className={baseline.className}
              style={baseline.style}
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
                    className={axis.className}
                    style={axis.style}
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
            left={horizontal ? ML + (xV(shown[0]?.values[hover] ?? 0) - ML) / 2 : ML + hover * band + band / 2}
            top={horizontal ? MT + hover * band + inset : yV(shown[0]?.values[hover] ?? 0)}
            label={tickLabels[hover]}
            rows={shown.map((s) => ({ name: shown.length > 1 ? s.name : undefined, value: tip(s.values[hover] ?? 0) }))}
          />
        )}
      </ChartCanvas>
      {unit && (
        <ChartLegend aria-hidden="true">
          <ChartLegendItem>{unit}</ChartLegendItem>
        </ChartLegend>
      )}
      <SrTable caption={yLabel ?? describePlot("Chart data", shown.map((s) => s.name), unit)} labels={tickLabels} series={shown} />
    </ChartField>
  );
});
