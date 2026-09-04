"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

/**
 * Steve Ruiz innerRadius: fit a circle to the −padding isosurface of a
 * circular corner SDF. The initial guess R = outerRadius is the wrong answer.
 * Clamp at 0. https://x.com/steveruizok/status/2072651352908370013
 */
export function innerRadius(
  outerRadius: number,
  padding: number,
  { lr = 0.1, epochs = 5000 }: { lr?: number; epochs?: number } = {},
): number {
  const key = `${outerRadius}:${padding}:${lr}:${epochs}`;
  const hit = innerRadiusCache.get(key);
  if (hit != null) return hit;
  const result = computeInnerRadius(outerRadius, padding, lr, epochs);
  innerRadiusCache.set(key, result);
  return result;
}

const innerRadiusCache = new Map<string, number>();

function computeInnerRadius(
  outerRadius: number,
  padding: number,
  lr: number,
  epochs: number,
): number {
  if (!Number.isFinite(outerRadius) || outerRadius <= 0) return 0;
  if (!Number.isFinite(padding) || padding <= 0) return Math.max(0, outerRadius);
  if (padding >= outerRadius) return 0;

  const sdf = (x: number, y: number) => Math.hypot(x - outerRadius, y - outerRadius) - outerRadius;
  const targets: Array<[number, number]> = [];
  for (let t = Math.PI; t <= 1.5 * Math.PI; t += 0.01) {
    let r = outerRadius;
    for (let i = 0; i < 100; i++) {
      const x = outerRadius + r * Math.cos(t);
      const y = outerRadius + r * Math.sin(t);
      r -= sdf(x, y) + padding;
    }
    targets.push([outerRadius + r * Math.cos(t), outerRadius + r * Math.sin(t)]);
  }

  let R = outerRadius; // initial guess: the wrong answer
  const n = targets.length;
  for (let e = 0; e < epochs; e++) {
    let grad = 0;
    for (const [x, y] of targets) {
      const d = Math.hypot(x - outerRadius, y - outerRadius);
      grad += 2 * (R - d);
    }
    R -= lr * (grad / n);
  }
  if (!Number.isFinite(R) || R <= 0) return 0;
  const rounded = Math.round(R * 1e6) / 1e6;
  const nearest = Math.round(rounded);
  return Math.abs(rounded - nearest) < 1e-4 ? nearest : rounded;
}

export function concentricInner(outer: number, padding: number): number {
  return innerRadius(outer, padding);
}

export function concentricOuter(inner: number, padding: number): number {
  return Math.max(0, inner) + Math.max(0, padding);
}

const NestInnerRadius = React.createContext<number | null>(null);

function nestVars(out?: number, gap?: number): React.CSSProperties {
  const style: Record<string, string> = {
    "--rs-in": "max(0px, calc(var(--rs-out) - var(--rs-gap)))",
  };
  if (out != null) style["--rs-out"] = `${out}px`;
  if (gap != null) style["--rs-gap"] = `${gap}px`;
  return style as React.CSSProperties;
}

const styles = stylex.create({
  nest: {
    boxSizing: "border-box",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: "var(--rs-out, var(--radius-sm))",
    padding: "var(--rs-gap, var(--pad))",
    backgroundColor: raster.paper,
  },
  inner: {
    boxSizing: "border-box",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: "var(--rs-in)",
    minHeight: 72,
    backgroundColor: raster.paper,
    display: "flex",
    alignItems: "flex-end",
  },
});

export interface NestProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer radius in px. Nested nests inherit the parent inner radius. */
  radius?: number;
  /** Padding in px. Inset for Steve’s innerRadius. */
  pad?: number;
}

export const Nest = React.forwardRef<HTMLDivElement, NestProps>(function Nest(
  { radius, pad, style, className, children, ...props },
  ref,
) {
  const inherited = React.useContext(NestInnerRadius);
  const out = radius ?? inherited ?? undefined;
  const next = out != null && pad != null ? concentricInner(out, pad) : inherited;

  const sx = rs(["rs-nest", className], styles.nest);
  return (
    <NestInnerRadius.Provider value={next ?? null}>
      <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...nestVars(out, pad), ...style }}>
        {children}
      </div>
    </NestInnerRadius.Provider>
  );
});

export const NestInner = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function NestInner(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-nest-in", className], styles.inner);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
