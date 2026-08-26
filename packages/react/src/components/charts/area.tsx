import * as React from "react";
import { LineChart, type LineChartProps } from "./line";

export type AreaChartProps = Omit<LineChartProps, "area">;

/** Filled field. Same law as the line: hairlines, texture, one optional spot. */
export function AreaChart(props: AreaChartProps) {
  return <LineChart {...props} area />;
}
