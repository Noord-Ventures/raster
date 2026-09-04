import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../../tokens.stylex";
import { LineChart, type LineChartProps } from "./line";

const styles = stylex.create({
  area: {
    borderRadius: 0,
    boxShadow: "none",
    backgroundColor: raster.paper,
  },
});

export type AreaChartProps = Omit<LineChartProps, "area">;

/** Filled field. Same law as the line: hairlines, texture, one optional spot. */
export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(function AreaChart(props, ref) {
  void styles.area;
  return <LineChart ref={ref} {...props} area />;
});
