"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";

import { Button } from "./button";
import { popoverTargetAttrs } from "../compat";

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trigger content, rendered in a ghost button. */
  trigger: React.ReactNode;
  /** Where the panel sits relative to the trigger. */
  align?: "start" | "end";
}

const GAP = 6;
const EDGE = 8;

const styles = stylex.create({
  panel: {
    boxSizing: "border-box",
    position: "fixed",
    inset: "auto",
    margin: 0,
    borderWidth: vlak.hairline,
    borderStyle: "solid",
    borderColor: vlak.divider,
    borderRadius: {
      default: vlak.radius,
      [mq.phone]: 0,
    },
    backgroundColor: vlak.paper,
    color: vlak.ink,
    boxShadow: {
      default: "0 8px 24px rgba(0,0,0,0.06)",
      [mq.phone]: "none",
    },
    padding: {
      default: "0.875rem",
      [mq.phone]: "1rem",
    },
    width: {
      default: "15rem",
      [mq.phone]: "min(320px, calc(100vw - 32px))",
    },
    fontSize: {
      default: "0.8125rem",
      [mq.phone]: "1rem",
    },
    lineHeight: 1.45,
    letterSpacing: "-0.01em",
  },
  title: {
    display: "block",
    fontSize: {
      default: "0.8125rem",
      [mq.phone]: "1rem",
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: vlak.ink,
    marginBottom: "0.25rem",
  },
  body: {
    color: vlak.gray,
    margin: 0,
  },
});

/** CSS Anchor Positioning: the platform places, flips, and follows scroll. */
function supportsAnchor(): boolean {
  return typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("anchor-name", "none");
}

/**
 * The native Popover API. The panel lives in the top layer; light
 * dismiss comes from the platform. Anchor positioning places it where
 * supported; otherwise it is measured, follows scroll and resize, and
 * flips above the trigger when there is no room below.
 */
export function Popover({ trigger, align = "start", className, style, children, onToggle, ...props }: PopoverProps) {
  const id = React.useId();
  const anchorName = `--rs-anchor-${id.replace(/[^\w-]/g, "")}`;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [anchored, setAnchored] = React.useState(false);
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(null);

  React.useEffect(() => {
    setAnchored(supportsAnchor());
  }, []);

  const position = React.useCallback(() => {
    const anchor = triggerRef.current;
    const panel = panelRef.current;
    if (!anchor || !panel) return;
    const rect = anchor.getBoundingClientRect();
    const height = panel.offsetHeight;
    const width = panel.offsetWidth;
    const below = rect.bottom + GAP;
    const above = rect.top - GAP - height;
    const fitsBelow = below + height <= window.innerHeight - EDGE;
    setCoords({
      top: fitsBelow || above < EDGE ? below : above,
      left: align === "end" ? Math.max(EDGE, rect.right - width) : Math.min(rect.left, window.innerWidth - width - EDGE),
    });
  }, [align]);

  React.useEffect(() => {
    if (!open || anchored) return;
    position();
    window.addEventListener("scroll", position, true);
    window.addEventListener("resize", position);
    return () => {
      window.removeEventListener("scroll", position, true);
      window.removeEventListener("resize", position);
    };
  }, [open, anchored, position]);

  const placement: React.CSSProperties = anchored
    ? ({
        positionAnchor: anchorName,
        positionArea: align === "end" ? "bottom span-left" : "bottom span-right",
        positionTryFallbacks: "flip-block",
        margin: `${GAP}px 0`,
      } as React.CSSProperties)
    : coords
      ? { top: coords.top, left: coords.left }
      : {};

  const sx = rs(["rs-popover", className], styles.panel);
  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="sm"
        {...popoverTargetAttrs(id)}
        style={anchored ? ({ anchorName } as React.CSSProperties) : undefined}
      >
        {trigger}
      </Button>
      <div
        ref={panelRef}
        id={id}
        popover="auto"
        {...props}
        className={sx.className}
        style={{ ...sx.style, ...style, ...placement }}
        onToggle={(e) => {
          onToggle?.(e);
          setOpen((e.nativeEvent as ToggleEvent).newState === "open");
        }}
      >
        {children}
      </div>
    </>
  );
}

export const PopoverTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function PopoverTitle(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-popover-title", className], styles.title);
  return <span ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const PopoverBody = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function PopoverBody(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-popover-body", className], styles.body);
  return <p ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
