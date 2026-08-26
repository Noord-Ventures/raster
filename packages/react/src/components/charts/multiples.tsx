import * as React from "react";
import { cx } from "../../cx";
import { LineChart, type LineChartProps } from "./line";

export type SmallMultiple = {
  title: string;
  series: LineChartProps["series"];
  labels: string[];
};

export interface SmallMultiplesProps extends React.HTMLAttributes<HTMLDivElement> {
  panels: SmallMultiple[];
  height?: number;
  unit?: string;
  grid?: boolean;
  ticks?: number;
  spot?: boolean | string;
}

export function SmallMultiples({
  panels,
  height = 136,
  unit,
  grid = true,
  ticks = 3,
  className,
  spot,
  ...props
}: SmallMultiplesProps) {
  return (
    <div className={cx("rs-chart-multi", className)} {...props}>
      {panels.map((p) => (
        <figure key={p.title} className="rs-chart-multi-item">
          <figcaption className="rs-chart-multi-cap">{p.title}</figcaption>
          <LineChart
            series={p.series}
            labels={p.labels}
            height={height}
            unit={unit}
            grid={grid}
            ticks={ticks}
            spot={spot}
          />
        </figure>
      ))}
    </div>
  );
}
