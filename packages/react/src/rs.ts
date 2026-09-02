import type { CSSProperties } from "react";
import * as stylex from "@stylexjs/stylex";
import { cx } from "./cx";

type StyleXProps = { className?: string; style?: CSSProperties };

/** Merge Raster class names with StyleX props. CSS-first classes stay on the node. */
export function rs(classNames: Array<string | false | null | undefined>, ...styles: unknown[]): StyleXProps {
  const sx = (stylex.props as (...args: unknown[]) => StyleXProps)(...styles);
  return {
    className: cx(...classNames, sx.className),
    style: sx.style,
  };
}
