import * as React from "react";
import {
  ChartField,
  ChartTip,
  PLOT,
  SrTable,
  defaultFormat,
  niceMax,
  ticksFor,
} from "./frame";

export type HistogramBin = { label: string; count: number };

export interface HistogramProps extends React.HTMLAttributes<HTMLDivElement> {
  bins: HistogramBin[];
  height?: number;
  unit?: string;
  yLabel?: string;
  grid?: boolean;
  ticks?: number;
  valueFormat?: (n: number) => string;
  spot?: boolean | string;
}

export function Histogram({
  bins,
  height = 204,
  unit,
  yLabel,
  grid = true,
  ticks = 4,
  valueFormat,
  className,
  spot,
  ...props
}: HistogramProps) {
  const format = valueFormat ?? ((v: number) => defaultFormat(v, unit));
  const [hover, setHover] = React.useState<number | null>(null);
  const { W, ML, MR, MT, MB } = PLOT;
  const plotW = W - ML - MR;
  const plotH = height - MT - MB;
  const max = niceMax(Math.max(...bins.map((b) => b.count), 1));
  const yTicks = ticksFor(max, ticks);
  const gap = 1;
  const bw = (plotW - gap * Math.max(0, bins.length - 1)) / bins.length;
  const active = hover != null ? bins[hover] : null;

  return (
    <ChartField spot={spot} className={className} {...props}>
      {yLabel && (
        <div className="rs-chart-head">
          <p className="rs-chart-title">{yLabel}</p>
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Histogram">
        <g className="rs-chart-plot">
          {grid &&
            yTicks.map((t) => {
              const y = MT + plotH - (t / max) * plotH;
              return (
                <g key={t}>
                  <line className="rs-chart-grid" x1={ML} x2={W - MR} y1={y} y2={y} />
                  <text className="rs-chart-axis" x={ML - 6} y={y + 3.5} textAnchor="end">
                    {format(t)}
                  </text>
                </g>
              );
            })}
          <line className="rs-chart-baseline" x1={ML} x2={W - MR} y1={MT + plotH} y2={MT + plotH} />
          {bins.map((b, i) => {
            const h = (b.count / max) * plotH;
            const x = ML + i * (bw + gap);
            const y = MT + plotH - h;
            return (
              <g key={b.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <rect className={spot ? "rs-chart-hist rs-chart-bar-spot" : "rs-chart-hist"} x={x} y={y} width={bw} height={h} />
                <text className="rs-chart-axis" x={x + bw / 2} y={height - 4} textAnchor="middle">
                  {b.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      {active && (
        <ChartTip
          left={`${((ML + (hover ?? 0) * (bw + gap) + bw / 2) / W) * 100}%`}
          top={`${((MT + plotH - (active.count / max) * plotH) / height) * 100}%`}
          label={active.label}
          rows={[{ value: format(active.count) }]}
        />
      )}
      {unit && (
        <div className="rs-chart-legend" aria-hidden="true">
          <span className="rs-chart-legend-item">{unit}</span>
        </div>
      )}
      <SrTable
        caption="Histogram"
        labels={bins.map((b) => b.label)}
        series={[{ name: "count", values: bins.map((b) => b.count) }]}
      />
    </ChartField>
  );
}
