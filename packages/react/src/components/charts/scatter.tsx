"use client";

import * as React from "react";
import {
  ChartField,
  ChartHead,
  ChartLegend,
  ChartLegendItem,
  ChartTip,
  ChartTitle,
  LegendSwatch,
  PLOT,
  SrTable,
  chartStyles,
  defaultFormat,
  scatterMark,
  ticksBetween,
  type ChartAnnotation,
  type ChartPoint,
} from "./frame";
import { rs } from "../../rs";

export type ScatterChartProps = React.HTMLAttributes<HTMLDivElement> & {
  points: ChartPoint[];
  height?: number;
  unit?: string;
  xLabel?: string;
  yLabel?: string;
  xDomain?: [number, number];
  yDomain?: [number, number];
  grid?: boolean;
  ticks?: number;
  annotations?: ChartAnnotation[];
  valueFormat?: (n: number) => string;
  spot?: boolean | string;
};

function extent(values: number[], pad = 0.08): [number, number] {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  return [lo - span * pad, hi + span * pad];
}

export function ScatterChart({
  points,
  height = 204,
  unit,
  xLabel,
  yLabel,
  xDomain,
  yDomain,
  grid = true,
  ticks = 4,
  annotations = [],
  valueFormat,
  className,
  spot,
  ...props
}: ScatterChartProps) {
  const format = valueFormat ?? ((v: number) => defaultFormat(v));
  const [hover, setHover] = React.useState<number | null>(null);
  const { W, ML, MR, MT, MB } = PLOT;
  const plotW = W - ML - MR;
  const plotH = height - MT - MB;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const [xMin, xMax] = xDomain ?? extent(xs);
  const [yMin, yMax] = yDomain ?? extent(ys);
  const yTicks = ticksBetween(yMin, yMax, ticks);
  const xTicks = ticksBetween(xMin, xMax, ticks);
  const toX = (x: number) => ML + ((x - xMin) / (xMax - xMin || 1)) * plotW;
  const toY = (y: number) => MT + plotH - ((y - yMin) / (yMax - yMin || 1)) * plotH;
  const groups = [...new Set(points.map((p) => p.group).filter(Boolean))] as string[];
  const active = hover != null ? points[hover] : null;

  const svg = rs(["rs-chart-svg"], chartStyles.svg);
  const plot = rs(["rs-chart-plot"], chartStyles.plot);
  const gridSx = rs(["rs-chart-grid"], chartStyles.grid);
  const axis = rs(["rs-chart-axis"], chartStyles.axis);
  const baseline = rs(["rs-chart-baseline"], chartStyles.baseline);
  const cursor = rs(["rs-chart-cursor"], chartStyles.cursor);
  const ann = rs(["rs-chart-ann"], chartStyles.ann);
  const mark = scatterMark(Boolean(spot));

  return (
    <ChartField spot={spot} className={className} {...props}>
      {(yLabel || xLabel) && (
        <ChartHead>
          {yLabel ? <ChartTitle>{yLabel}</ChartTitle> : <span />}
          {xLabel ? <ChartTitle>{xLabel}</ChartTitle> : null}
        </ChartHead>
      )}
      <svg className={svg.className} style={svg.style} viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Scatter">
        <g className={plot.className} style={plot.style}>
          {grid &&
            yTicks.map((t) => (
              <g key={`yg-${t}`}>
                <line className={gridSx.className} style={gridSx.style} x1={ML} x2={W - MR} y1={toY(t)} y2={toY(t)} />
                <text className={axis.className} style={axis.style} x={ML - 6} y={toY(t) + 3.5} textAnchor="end">
                  {format(t)}
                </text>
              </g>
            ))}
          {grid &&
            xTicks.map((t) => (
              <line key={`xg-${t}`} className={gridSx.className} style={gridSx.style} x1={toX(t)} x2={toX(t)} y1={MT} y2={MT + plotH} />
            ))}
          <line className={baseline.className} style={baseline.style} x1={ML} x2={ML} y1={MT} y2={MT + plotH} />
          <line className={baseline.className} style={baseline.style} x1={ML} x2={W - MR} y1={MT + plotH} y2={MT + plotH} />
          {xTicks.map((t) => (
            <text key={`xl-${t}`} className={axis.className} style={axis.style} x={toX(t)} y={height - 4} textAnchor="middle">
              {format(t)}
            </text>
          ))}
          {annotations.map((a) => (
            <g key={`${a.at}-${a.label}`}>
              <line className={cursor.className} style={cursor.style} x1={toX(a.at)} x2={toX(a.at)} y1={MT} y2={MT + plotH} />
              <text className={ann.className} style={ann.style} x={toX(a.at) + 4} y={MT + 10}>
                {a.label}
              </text>
            </g>
          ))}
          {points.map((p, i) => (
            <circle
              key={i}
              className={mark.className}
              style={mark.style}
              cx={toX(p.x)}
              cy={toY(p.y)}
              r={hover === i ? 3.5 : 2.25}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </g>
      </svg>
      {active && (
        <ChartTip
          left={`${(toX(active.x) / W) * 100}%`}
          top={`${(toY(active.y) / height) * 100}%`}
          label={active.label ?? `${format(active.x)} · ${format(active.y)}`}
          rows={[{ name: active.group, value: format(active.y) }]}
        />
      )}
      {(groups.length > 0 || unit) && (
        <ChartLegend aria-hidden="true">
          {groups.map((g) => (
            <ChartLegendItem key={g}>
              <LegendSwatch seriesIndex={0} spot={Boolean(spot)} />
              {g}
            </ChartLegendItem>
          ))}
          {unit ? <ChartLegendItem>{unit}</ChartLegendItem> : null}
        </ChartLegend>
      )}
      <SrTable
        caption="Scatter data"
        labels={points.map((p) => p.label ?? `${p.x}`)}
        series={[{ name: "y", values: points.map((p) => p.y) }]}
      />
    </ChartField>
  );
}
