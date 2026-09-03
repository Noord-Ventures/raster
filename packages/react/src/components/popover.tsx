import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone as phoneMq } from "../tokens.stylex";
import { rs } from "../rs";

/** StyleX cannot read a string const from a defineVars file; keep the token import. */
const phone = "@media (max-width: 640px)" as typeof phoneMq;
import { Button } from "./button";

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trigger content, rendered in a ghost button. */
  trigger: React.ReactNode;
  /** Where the panel sits relative to the trigger. */
  align?: "start" | "end";
}

const styles = stylex.create({
  panel: {
    boxSizing: "border-box",
    position: "fixed",
    inset: "auto",
    margin: 0,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radius,
      [phone]: 0,
    },
    backgroundColor: raster.paper,
    color: raster.ink,
    boxShadow: {
      default: "0 8px 24px rgba(0,0,0,0.06)",
      [phone]: "none",
    },
    padding: {
      default: 14,
      [phone]: 16,
    },
    width: {
      default: 240,
      [phone]: "min(320px, calc(100vw - 32px))",
    },
    fontSize: {
      default: 13,
      [phone]: 16,
    },
    lineHeight: 1.55,
    letterSpacing: "-0.01em",
  },
  title: {
    display: "block",
    fontSize: {
      default: 13,
      [phone]: 16,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    marginBottom: 4,
  },
  body: {
    color: raster.gray,
    margin: 0,
  },
});

/**
 * The native Popover API. The panel lives in the top layer; light
 * dismiss comes from the platform.
 */
export function Popover({ trigger, align = "start", className, style, children, ...props }: PopoverProps) {
  const id = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(null);

  const position = () => {
    const anchor = triggerRef.current;
    const panel = panelRef.current;
    if (!anchor || !panel) return;
    const rect = anchor.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 6,
      left:
        align === "end"
          ? Math.max(8, rect.right - panel.offsetWidth)
          : Math.min(rect.left, window.innerWidth - panel.offsetWidth - 8),
    });
  };

  const sx = rs(["rs-popover", className], styles.panel);
  return (
    <>
      <Button ref={triggerRef} type="button" variant="ghost" size="sm" popoverTarget={id}>
        {trigger}
      </Button>
      <div
        ref={panelRef}
        id={id}
        popover="auto"
        className={sx.className}
        style={{ ...sx.style, ...style, ...(coords ? { top: coords.top, left: coords.left } : {}) }}
        onToggle={(e) => {
          if ((e as unknown as ToggleEvent).newState === "open") position();
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

export function PopoverTitle({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-popover-title", className], styles.title);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function PopoverBody({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-popover-body", className], styles.body);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
