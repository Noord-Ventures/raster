import type { CSSProperties } from "react";
import * as stylex from "@stylexjs/stylex";
import { cx } from "./cx";

/** Merge Raster class names with StyleX props. CSS-first classes stay on the node. */
export function rs(
  classNames: Array<string | false | null | undefined>,
  ...styles: Parameters<typeof stylex.props>
): { className: string; style?: CSSProperties } {
  const sx = stylex.props(...styles);
  return {
    className: cx(...classNames, sx.className),
    style: sx.style as CSSProperties | undefined,
  };
}
