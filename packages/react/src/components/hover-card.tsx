"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { describeTrigger } from "./tooltip";

export interface HoverCardProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** A focusable element is used as is; anything else gets one tab stop. */
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
    insetInlineStart: 0,
    zIndex: raster.zFloat,
    width: {
      default: "16.25rem",
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
    padding: "0.875rem",
    fontSize: {
      default: "0.8125rem",
      [mq.phone]: "0.9375rem",
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
    // Bridges the 8px gap so the pointer can move onto the panel.
    "::before": {
      content: '""',
      position: "absolute",
      bottom: "100%",
      insetInlineStart: 0,
      insetInlineEnd: 0,
      height: "0.5rem",
    },
  },
});

/**
 * Preview panel on hover or keyboard focus. CSS shows it; the panel
 * describes the trigger, and Escape hides it until the pointer leaves.
 */
export const HoverCard = React.forwardRef<HTMLSpanElement, HoverCardProps>(function HoverCard(
  { trigger, className, style, children, onKeyDown, onPointerLeave, onBlur, ...props },
  ref,
) {
  const id = React.useId();
  const [dismissed, setDismissed] = React.useState(false);
  const sx = rs(["rs-hover-card", className], styles.root, stylex.defaultMarker());
  const panel = rs(["rs-hover-card-panel"], styles.panel);
  const anchor = React.isValidElement(trigger) ? (
    describeTrigger(trigger, id)
  ) : (
    <span tabIndex={0} aria-describedby={id}>
      {trigger}
    </span>
  );
  return (
    <span
      ref={ref}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape") setDismissed(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setDismissed(false);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDismissed(false);
      }}
    >
      {anchor}
      <span className={panel.className} style={panel.style} role="tooltip" id={id} hidden={dismissed}>
        {children}
      </span>
    </span>
  );
});
