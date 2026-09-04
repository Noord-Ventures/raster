import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { rs } from "../../rs";
import { CROUWEL_SPOT, chartStyles, lineMark } from "./frame";

const styles = stylex.create({
  spark: {
    display: "inline-block",
    verticalAlign: "middle",
  },
  svg: {
    display: "block",
    overflow: "visible",
  },
});

export interface SparklineProps extends React.HTMLAttributes<HTMLSpanElement> {
  values: number[];
  width?: number;
  height?: number;
  spot?: boolean | string;
}

export function Sparkline({
  values,
  width = 120,
  height = 28,
  className,
  spot,
  style,
  ...props
}: SparklineProps) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const x = (i: number) => (i / Math.max(values.length - 1, 1)) * (width - 4) + 2;
  const y = (v: number) => 2 + (1 - (v - min) / span) * (height - 4);
  const d = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(v)}`).join(" ");
  const last = values[values.length - 1] ?? 0;
  const color = spot === true ? CROUWEL_SPOT : typeof spot === "string" ? spot : undefined;
  const sx = rs(["rs-spark", className], styles.spark);
  const svg = rs(["rs-chart-svg"], styles.svg);
  const line = lineMark(0, Boolean(spot));
  const dot = rs(["rs-chart-dot"], chartStyles.dot);
  return (
    <span
      {...props}
      className={sx.className}
      style={{
        ...sx.style,
        ...(style as React.CSSProperties),
        ...(color ? ({ ["--rs-chart-spot" as string]: color } as React.CSSProperties) : null),
      }}
    >
      <svg
        className={svg.className}
        style={svg.style}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Trend ending at ${last}`}
      >
        <path className={line.className} style={line.style} d={d} />
        <circle className={dot.className} style={dot.style} cx={x(values.length - 1)} cy={y(last)} r={2} />
      </svg>
    </span>
  );
}
