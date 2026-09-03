import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../../tokens.stylex";
import { rs } from "../../rs";
import { ChartField, ChartLegend, ChartLegendItem, ChartTitle, chartStyles, defaultFormat } from "./frame";

const styles = stylex.create({
  donut: {
    display: "block",
  },
  track: {
    fill: "none",
    stroke: raster.divider,
    strokeWidth: 1,
  },
  value: {
    fill: "none",
    stroke: "var(--rs-chart-spot)",
    strokeWidth: 1,
    strokeLinecap: "butt",
  },
  label: {
    fill: raster.ink,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  caption: {
    fill: raster.gray,
    fontSize: 8,
    fontWeight: 500,
    letterSpacing: "0.06em",
  },
  share: {
    display: "flex",
    height: 8,
    width: "100%",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: 0,
    boxShadow: "none",
  },
  seg: {
    height: "100%",
    borderRadius: 0,
    backgroundColor: {
      default: raster.ink,
      ":nth-child(2)": raster.gray,
      ":nth-child(3)": raster.divider,
    },
    transition: "fill var(--duration-snap) var(--ease), opacity var(--duration-snap) var(--ease)",
  },
  segSpot: {
    backgroundColor: "var(--rs-chart-spot)",
  },
});

export interface DonutProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  label?: React.ReactNode;
  unit?: string;
  valueFormat?: (value: number) => string;
  spot?: boolean | string;
}

const R = 36;
const C = 2 * Math.PI * R;

export function Donut({
  value,
  max = 100,
  size = 184,
  label,
  unit,
  valueFormat,
  className,
  spot,
  ...props
}: DonutProps) {
  const format = valueFormat ?? ((v: number) => `${Math.round((v / max) * 100)}%`);
  const pct = Math.max(0, Math.min(1, max === 0 ? 0 : value / max));
  const caption = typeof label === "string" ? label : undefined;
  const svg = rs(["rs-chart-plot", "rs-chart-donut"], chartStyles.svg, chartStyles.plot, styles.donut);
  const track = rs(["rs-chart-donut-track"], styles.track);
  const valueSx = rs(["rs-chart-donut-value"], styles.value);
  const labelSx = rs(["rs-chart-donut-label"], styles.label);
  const captionSx = rs(["rs-chart-donut-caption"], styles.caption);
  return (
    <ChartField spot={spot} className={className ? `rs-chart-donut-wrap ${className}` : "rs-chart-donut-wrap"} {...props}>
      <svg
        className={svg.className}
        style={svg.style}
        width={size}
        height={size}
        viewBox="0 0 96 96"
        role="img"
        aria-label={`${format(value)}${caption ? ` ${caption}` : ""}`}
      >
        <circle className={track.className} style={track.style} cx="48" cy="48" r={R} />
        <circle
          className={valueSx.className}
          style={valueSx.style}
          cx="48"
          cy="48"
          r={R}
          strokeDasharray={`${pct * C} ${C}`}
          transform="rotate(-90 48 48)"
        />
        <text className={labelSx.className} style={labelSx.style} x="48" y={caption ? 46 : 49} textAnchor="middle">
          {format(value)}
          {unit ? ` ${unit}` : ""}
        </text>
        {caption && (
          <text className={captionSx.className} style={captionSx.style} x="48" y="57" textAnchor="middle">
            {caption}
          </text>
        )}
      </svg>
      {label && !caption ? <ChartTitle>{label}</ChartTitle> : null}
    </ChartField>
  );
}

export type ShareSlice = { label: string; value: number };

export interface ShareProps extends React.HTMLAttributes<HTMLDivElement> {
  slices: ShareSlice[];
  unit?: string;
  valueFormat?: (n: number) => string;
  spot?: boolean | string;
}

export function Share({
  slices,
  unit,
  valueFormat,
  className,
  spot,
  ...props
}: ShareProps) {
  const format = valueFormat ?? ((v: number) => defaultFormat(v, unit));
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const share = rs(["rs-chart-share"], styles.share);
  return (
    <ChartField spot={spot} className={className} {...props}>
      <div className={share.className} style={share.style} role="img" aria-label="Share">
        {slices.map((s, i) => {
          const seg = rs(
            ["rs-chart-share-seg", i === 0 && "rs-chart-share-seg-spot"],
            styles.seg,
            i === 0 && styles.segSpot,
          );
          return (
            <div
              key={s.label}
              className={seg.className}
              style={{ ...seg.style, flex: `${s.value} 1 0` }}
              title={`${s.label} ${format(s.value)}`}
            />
          );
        })}
      </div>
      <ChartLegend aria-hidden="true">
        {slices.map((s) => (
          <ChartLegendItem key={s.label}>
            {s.label} {defaultFormat((s.value / total) * 100)}%
          </ChartLegendItem>
        ))}
      </ChartLegend>
    </ChartField>
  );
}
