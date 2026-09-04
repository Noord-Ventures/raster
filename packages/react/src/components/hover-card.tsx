import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";


export interface HoverCardProps extends React.HTMLAttributes<HTMLSpanElement> {
  trigger: React.ReactNode;
}


const styles = stylex.create({
  root: {
    position: "relative",
    display: "inline-block",
  },
  panel: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    zIndex: 170,
    width: {
      default: 260,
      [mq.phone]: "min(280px, calc(100vw - 32px))",
    },
    backgroundColor: raster.paper,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radius,
      [mq.phone]: 0,
    },
    boxShadow: {
      default: "0 8px 24px rgba(0,0,0,0.06)",
      [mq.phone]: "none",
    },
    padding: 14,
    fontSize: {
      default: 13,
      [mq.phone]: 15,
    },
    lineHeight: 1.55,
    letterSpacing: "-0.01em",
    color: raster.gray,
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: {
        default: 1,
        [mq.touch]: 0,
      },
      [stylex.when.ancestor(":focus-within")]: 1,
      [stylex.when.ancestor(":active")]: {
        default: null,
        [mq.touch]: 1,
      },
    },
    visibility: {
      default: "hidden",
      [stylex.when.ancestor(":hover")]: {
        default: "visible",
        [mq.touch]: "hidden",
      },
      [stylex.when.ancestor(":focus-within")]: "visible",
      [stylex.when.ancestor(":active")]: {
        default: null,
        [mq.touch]: "visible",
      },
    },
    transition: `opacity ${raster.durationSnap} ${raster.ease} ${raster.durationSnap}, visibility ${raster.durationSnap} ${raster.ease} ${raster.durationSnap}`,
  },
});

/** Preview panel on hover or keyboard focus. CSS only. */
export function HoverCard({ trigger, className, style, children, ...props }: HoverCardProps) {
  const sx = rs(["rs-hover-card", className], styles.root, stylex.defaultMarker());
  const panel = rs(["rs-hover-card-panel"], styles.panel);
  return (
    <span {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      <span tabIndex={0}>{trigger}</span>
      <span className={panel.className} style={panel.style} role="tooltip">
        {children}
      </span>
    </span>
  );
}
