import type { CSSProperties } from "react";
import * as stylex from "@stylexjs/stylex";

/** Keep the semantic class for CI / CSS-first locks; StyleX owns the paint. */
export function sx(className: string, ...styles: unknown[]) {
  const next = (stylex.props as (...args: unknown[]) => { className?: string; style?: CSSProperties })(
    ...styles,
  );
  return {
    className: [className, next.className].filter(Boolean).join(" "),
    style: next.style,
  };
}
