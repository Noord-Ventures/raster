import type { CSSProperties } from "react";
import * as stylex from "@stylexjs/stylex";
import type { CompiledStyles, InlineStyles } from "@stylexjs/stylex";
import { cx } from "./cx";

type Nested<T> = T | ReadonlyArray<Nested<T>>;

/** Exactly what stylex.props accepts: compiled leaves, falsy, nested arrays, or a leaf with inline styles. */
export type Leaves = ReadonlyArray<Nested<null | undefined | CompiledStyles | boolean | Readonly<[CompiledStyles, InlineStyles]>>>;

type StyleXProps = { className?: string; style?: CSSProperties };

/**
 * The one seam every component styles through: semantic rs-* class names
 * (the CSS-first contract, and what packages/core generates CSS for) merged
 * with the compiled StyleX leaves that paint the React tree.
 */
export function rs(classNames: Array<string | false | null | undefined>, ...styles: Leaves): StyleXProps {
  const sx = stylex.props(...styles) as StyleXProps;
  return {
    className: cx(...classNames, sx.className),
    style: sx.style,
  };
}
