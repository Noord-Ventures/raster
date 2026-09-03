import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../../tokens.stylex";
import { rs } from "../../rs";
import {
  ChartField,
  ChartHead,
  ChartLegend,
  ChartLegendItem,
  ChartTip,
  ChartTitle,
  PLOT,
  SrTable,
  chartStyles,
  defaultFormat,
  niceMax,
  ticksFor,
} from "./frame";

const styles = stylex.create({
  hist: {
    fill: raster.divider,
    stroke: "none",
    borderRadius: 0,
  },
});

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
  const format = valueFormat ?? ((v: number) => defaultFormat(v));
  const tip = valueFormat ?? ((v: number) => defaultFormat(v, unit));
  const [hover, setHover] = React.useState<number | null>(null);
  const { W, ML, MR, MT, MB } = PLOT;
  const plotW = W - ML - MR;
  const plotH = height - MT - MB;
  const max = niceMax(Math.max(...bins.map((b) => b.count), 1));
  const yTicks = ticksFor(max, ticks);
  const gap = 1;
  const bw = (plotW - gap * Math.max(0, bins.length - 1)) / bins.length;
  const active = hover != null ? bins[hover] : null;

  const svg = rs([], chartStyles.svg);
  const plot = rs(["rs-chart-plot"], chartStyles.plot);
  const gridSx = rs(["rs-chart-grid"], chartStyles.grid);
  const axis = rs(["rs-chart-axis"], chartStyles.axis);
  const baseline = rs(["rs-chart-baseline"], chartStyles.baseline);
  const hist = rs(["rs-chart-hist", spot && "rs-chart-bar-spot"], styles.hist, spot && chartStyles.barSpot);

  return (
    <ChartField spot={spot} className={className} {...props}>
      {yLabel && (
        <ChartHead>
          <ChartTitle>{yLabel}</ChartTitle>
        </ChartHead>
      )}
      <svg className={svg.className} style={svg.style} viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Histogram">
        <g className={plot.className} style={plot.style}>
          {grid &&
            yTicks.map((t) => {
              const y = MT + plotH - (t / max) * plotH;
              return (
                <g key={t}>
                  <line className={gridSx.className} style={gridSx.style} x1={ML} x2={W - MR} y1={y} y2={y} />
                  <text className={axis.className} style={axis.style} x={ML - 6} y={y + 3.5} textAnchor="end">
                    {format(t)}
                  </text>
                </g>
              );
            })}
          <line className={baseline.className} style={baseline.style} x1={ML} x2={W - MR} y1={MT + plotH} y2={MT + plotH} />
          {bins.map((b, i) => {
            const h = (b.count / max) * plotH;
            const x = ML + i * (bw + gap);
            const y = MT + plotH - h;
            return (
              <g key={b.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <rect className={hist.className} style={hist.style} x={x} y={y} width={bw} height={h} />
                <text className={axis.className} style={axis.style} x={x + bw / 2} y={height - 4} textAnchor="middle">
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
          rows={[{ value: tip(active.count) }]}
        />
      )}
      {unit && (
        <ChartLegend aria-hidden="true">
          <ChartLegendItem>{unit}</ChartLegendItem>
        </ChartLegend>
      )}
      <SrTable
        caption="Histogram"
        labels={bins.map((b) => b.label)}
        series={[{ name: "count", values: bins.map((b) => b.count) }]}
      />
    </ChartField>
  );
}
