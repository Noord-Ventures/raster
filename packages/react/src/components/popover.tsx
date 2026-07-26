import * as React from "react";
import { cx } from "../cx";

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trigger content, rendered in a ghost button. */
  trigger: React.ReactNode;
  /** Where the panel sits relative to the trigger. */
  align?: "start" | "end";
}

/**
 * The native Popover API. The panel lives in the top layer; light
 * dismiss comes from the platform.
 */
export function Popover({ trigger, align = "start", className, children, ...props }: PopoverProps) {
  const id = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const position = () => {
    const anchor = triggerRef.current;
    const panel = panelRef.current;
    if (!anchor || !panel) return;
    const rect = anchor.getBoundingClientRect();
    panel.style.top = `${rect.bottom + 6}px`;
    panel.style.left =
      align === "end"
        ? `${Math.max(8, rect.right - panel.offsetWidth)}px`
        : `${Math.min(rect.left, window.innerWidth - panel.offsetWidth - 8)}px`;
  };

  return (
    <>
      <button ref={triggerRef} type="button" className="rs-btn-ghost rs-btn-sm" popoverTarget={id}>
        {trigger}
      </button>
      <div
        ref={panelRef}
        id={id}
        popover="auto"
        className={cx("rs-popover", className)}
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

export function PopoverTitle({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("rs-popover-title", className)} {...props} />;
}

export function PopoverBody({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("rs-popover-body", className)} {...props} />;
}
