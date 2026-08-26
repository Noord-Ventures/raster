import * as React from "react";
import {
  ChartField,
  ChartTip,
  LegendSwatch,
  PLOT,
  SrTable,
  defaultFormat,
  ticksBetween,
  type ChartAnnotation,
  type ChartPoint,
} from "./frame";

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
  const format = valueFormat ?? ((v: number) => defaultFormat(v, unit));
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

  return (
    <ChartField spot={spot} className={className} {...props}>
      {(yLabel || xLabel) && (
        <div className="rs-chart-head">
          {yLabel ? <p className="rs-chart-title">{yLabel}</p> : <span />}
          {xLabel ? <p className="rs-chart-title">{xLabel}</p> : null}
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Scatter">
        <g className="rs-chart-plot">
          {grid &&
            yTicks.map((t) => (
              <g key={`yg-${t}`}>
                <line className="rs-chart-grid" x1={ML} x2={W - MR} y1={toY(t)} y2={toY(t)} />
                <text className="rs-chart-axis" x={ML - 6} y={toY(t) + 3.5} textAnchor="end">
                  {format(t)}
                </text>
              </g>
            ))}
          {grid &&
            xTicks.map((t) => (
              <line key={`xg-${t}`} className="rs-chart-grid" x1={toX(t)} x2={toX(t)} y1={MT} y2={MT + plotH} />
            ))}
          <line className="rs-chart-baseline" x1={ML} x2={ML} y1={MT} y2={MT + plotH} />
          <line className="rs-chart-baseline" x1={ML} x2={W - MR} y1={MT + plotH} y2={MT + plotH} />
          {xTicks.map((t) => (
            <text key={`xl-${t}`} className="rs-chart-axis" x={toX(t)} y={height - 4} textAnchor="middle">
              {format(t)}
            </text>
          ))}
          {annotations.map((a) => (
            <g key={`${a.at}-${a.label}`}>
              <line className="rs-chart-cursor" x1={toX(a.at)} x2={toX(a.at)} y1={MT} y2={MT + plotH} />
              <text className="rs-chart-ann" x={toX(a.at) + 4} y={MT + 10}>
                {a.label}
              </text>
            </g>
          ))}
          {points.map((p, i) => (
            <circle
              key={i}
              className={spot ? "rs-chart-mark rs-chart-mark-spot" : "rs-chart-mark"}
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
        <div className="rs-chart-legend" aria-hidden="true">
          {groups.map((g) => (
            <span key={g} className="rs-chart-legend-item">
              <LegendSwatch seriesIndex={0} spot={Boolean(spot)} />
              {g}
            </span>
          ))}
          {unit ? <span className="rs-chart-legend-item">{unit}</span> : null}
        </div>
      )}
      <SrTable
        caption="Scatter data"
        labels={points.map((p) => p.label ?? `${p.x}`)}
        series={[{ name: "y", values: points.map((p) => p.y) }]}
      />
    </ChartField>
  );
}
