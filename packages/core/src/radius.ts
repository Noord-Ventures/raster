/**
 * Vlak concentric radius.
 *
 * Steve Ruiz’s innerRadius: sample the −padding isosurface of a circular
 * corner SDF, then fit a circle whose center stays at the known concentric
 * center. The initial guess R = outerRadius is the wrong answer (copying the
 * outer radius onto the inner corner). Clamp at 0.
 *
 * https://x.com/steveruizok/status/2072651352908370013
 */

export interface InnerRadiusOptions {
  /** Gradient-descent step size. */
  lr?: number;
  /** Fit iterations. */
  epochs?: number;
}

const STEVE = { lr: 0.1, epochs: 5000 } as const;
const cache = new Map<string, number>();

function clampRadius(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const rounded = Math.round(value * 1e6) / 1e6;
  const nearest = Math.round(rounded);
  return Math.abs(rounded - nearest) < 1e-4 ? nearest : rounded;
}

/**
 * Perfect concentric inner radius for a circular corner of `outerRadius`
 * inset by `padding`.
 */
export function innerRadius(
  outerRadius: number,
  padding: number,
  { lr = STEVE.lr, epochs = STEVE.epochs }: InnerRadiusOptions = {},
): number {
  const key = `${outerRadius}:${padding}:${lr}:${epochs}`;
  const hit = cache.get(key);
  if (hit != null) return hit;

  const result = computeInnerRadius(outerRadius, padding, lr, epochs);
  cache.set(key, result);
  return result;
}

function computeInnerRadius(outerRadius: number, padding: number, lr: number, epochs: number): number {
  if (!Number.isFinite(outerRadius) || outerRadius <= 0) return 0;
  if (!Number.isFinite(padding) || padding <= 0) return clampRadius(outerRadius);
  // The −padding isosurface of a disk of radius R only exists for padding < R.
  if (padding >= outerRadius) return 0;

  // SDF of a circular corner of radius R centered at (R, R).
  const sdf = (x: number, y: number) => Math.hypot(x - outerRadius, y - outerRadius) - outerRadius;

  // Sample the −padding level set along the corner's angular sweep.
  const targets: Array<[number, number]> = [];
  for (let t = Math.PI; t <= 1.5 * Math.PI; t += 0.01) {
    // March along the ray from the corner center until sdf == −padding.
    let r = outerRadius;
    for (let i = 0; i < 100; i++) {
      const x = outerRadius + r * Math.cos(t);
      const y = outerRadius + r * Math.sin(t);
      r -= sdf(x, y) + padding; // Newton-ish
    }
    targets.push([outerRadius + r * Math.cos(t), outerRadius + r * Math.sin(t)]);
  }

  // Fit a circle (center fixed at the known concentric center) to those points.
  let R = outerRadius; // initial guess: the wrong answer
  const n = targets.length;
  for (let e = 0; e < epochs; e++) {
    let grad = 0;
    for (const [x, y] of targets) {
      const d = Math.hypot(x - outerRadius, y - outerRadius);
      grad += 2 * (R - d); // d/dR of (R − d)^2
    }
    R -= lr * (grad / n);
  }
  return clampRadius(R);
}

/** Nested inner radius: Steve’s innerRadius, clamped at 0. */
export function concentricInner(outer: number, padding: number): number {
  return innerRadius(outer, padding);
}

/** Outer radius that keeps `inner` concentric across `padding`. */
export function concentricOuter(inner: number, padding: number): number {
  return Math.max(0, inner) + Math.max(0, padding);
}

/**
 * CSS closed form of innerRadius for a circular corner: the fit converges
 * to max(0, outer − padding). Surfaces set --rs-out and --rs-gap.
 */
export const concentricInnerCss = "max(0px, calc(var(--rs-out) - var(--rs-gap)))";
