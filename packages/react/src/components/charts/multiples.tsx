import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../../tokens.stylex";
import { rs } from "../../rs";
import { LineChart, type LineChartProps } from "./line";

const styles = stylex.create({
  multi: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(184px, 1fr))",
    gap: 20,
  },
  cap: {
    marginTop: 0,
    marginInlineEnd: 0,
    marginBottom: 8,
    marginInlineStart: 0,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
  },
});

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
  /** BCP 47 tag for number formatting; undefined is the reader's own. */
  locale?: string;
}

export const SmallMultiples = React.forwardRef<HTMLDivElement, SmallMultiplesProps>(function SmallMultiples({
  panels,
  height = 136,
  unit,
  grid = true,
  ticks = 3,
  className,
  spot,
  locale,
  style,
  ...props
}, ref) {
  const sx = rs(["rs-chart-multi", className], styles.multi);
  const idBase = React.useId();
  return (
    <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {panels.map((p, i) => {
        const capId = `${idBase}-cap-${i}`;
        return (
          <figure key={p.title} className="rs-chart-multi-item">
            <figcaption id={capId} {...rs(["rs-chart-multi-cap"], styles.cap)}>
              {p.title}
            </figcaption>
            <LineChart
              series={p.series}
              labels={p.labels}
              height={height}
              unit={unit}
              grid={grid}
              ticks={ticks}
              spot={spot}
              locale={locale}
              aria-labelledby={capId}
            />
          </figure>
        );
      })}
    </div>
  );
});
