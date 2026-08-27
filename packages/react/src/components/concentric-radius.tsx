import * as React from "react";
import { cx } from "../cx";

/** inner = max(0, outer − padding) */
export function concentricInner(outer: number, padding: number): number {
  return Math.max(0, outer - padding);
}

/** outer = inner + padding */
export function concentricOuter(inner: number, padding: number): number {
  return Math.max(0, inner) + Math.max(0, padding);
}

const NestInnerRadius = React.createContext<number | null>(null);

function nestVars(out?: number, gap?: number): React.CSSProperties {
  const style: Record<string, string> = {};
  if (out != null) style["--rs-out"] = `${out}px`;
  if (gap != null) style["--rs-gap"] = `${gap}px`;
  return style as React.CSSProperties;
}

export interface NestProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer radius in px. Nested nests inherit the parent inner radius. */
  radius?: number;
  /** Padding in px. Subtracted from the outer radius. */
  pad?: number;
}

export function Nest({ radius, pad, style, className, children, ...props }: NestProps) {
  const inherited = React.useContext(NestInnerRadius);
  const out = radius ?? inherited ?? undefined;
  const next = out != null && pad != null ? concentricInner(out, pad) : inherited;

  return (
    <NestInnerRadius.Provider value={next ?? null}>
      <div className={cx("rs-nest", className)} style={{ ...nestVars(out, pad), ...style }} {...props}>
        {children}
      </div>
    </NestInnerRadius.Provider>
  );
}

export function NestInner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("rs-nest-in", className)} {...props} />;
}
