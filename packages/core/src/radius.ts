/**
 * Concentric-radius law: nested corners share a center.
 * inner = max(0, outer − padding); outer = inner + padding.
 */

export function concentricInner(outer: number, padding: number): number {
  return Math.max(0, outer - padding);
}

export function concentricOuter(inner: number, padding: number): number {
  return Math.max(0, inner) + Math.max(0, padding);
}
