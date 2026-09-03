import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { useStyles } from "./use.stylex";

function bind(className: string, style: unknown, extra?: string, inline?: CSSProperties) {
  const next = (stylex.props as (...args: unknown[]) => { className?: string; style?: CSSProperties })(style);
  return {
    className: [className, extra, next.className].filter(Boolean).join(" "),
    style: inline ? { ...next.style, ...inline } : next.style,
  };
}

type Box = { children?: ReactNode; className?: string; style?: CSSProperties };

export function UseField({
  name,
  className,
  children,
}: Box & { name: string }) {
  return (
    <article {...bind("rs-use", useStyles.use, className)} data-use={name}>
      {children}
    </article>
  );
}

export function UseType({ children, className }: Box) {
  return <h3 {...bind("rs-use-type", useStyles.type, className)}>{children}</h3>;
}

export function UseBody({ children, className }: Box) {
  return <div {...bind("rs-use-body", useStyles.body, className)}>{children}</div>;
}

export function UseKicker({ children, className }: Box) {
  return <p {...bind("rs-use-kicker", useStyles.kicker, className)}>{children}</p>;
}

export function UseCopy({
  children,
  className,
  as: Tag = "p",
}: Box & { as?: "p" | "span" }) {
  return <Tag {...bind("rs-use-copy", useStyles.copy, className)}>{children}</Tag>;
}

export function UseActions({ children, className }: Box) {
  return <div {...bind("rs-use-actions", useStyles.actions, className)}>{children}</div>;
}

export function UseStack({
  children,
  className,
  ...rest
}: Box & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} {...bind("rs-use-stack", useStyles.stack, className, rest.style)}>
      {children}
    </div>
  );
}

export function UseCompare({ children, className }: Box) {
  return <div {...bind("rs-use-compare", useStyles.compare, className)}>{children}</div>;
}

export function UsePanel({ children, className }: Box) {
  const stacked = className?.includes("rs-use-stack");
  const next = (
    stylex.props as (...args: unknown[]) => { className?: string; style?: CSSProperties }
  )(useStyles.panel, stacked ? useStyles.stack : null);
  return (
    <div className={["rs-use-panel", className, next.className].filter(Boolean).join(" ")} style={next.style}>
      {children}
    </div>
  );
}
