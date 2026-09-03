import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone as phoneMq } from "../tokens.stylex";
import { rs } from "../rs";

/** StyleX cannot read a string const from a defineVars file; keep the token import. */
const phone = "@media (max-width: 640px)" as typeof phoneMq;

export interface SheetProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
  side?: "left" | "right";
}

const styles = stylex.create({
  frame: {
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: "auto",
    margin: 0,
    height: "100dvh",
    maxHeight: "none",
    width: {
      default: 360,
      [phone]: "100%",
    },
    maxWidth: {
      default: "85vw",
      [phone]: "100%",
    },
    borderWidth: 0,
    borderStyle: "solid",
    borderLeftWidth: raster.hairline,
    borderColor: raster.divider,
    borderTopLeftRadius: raster.radiusSm,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: raster.radiusSm,
    paddingBlock: 24,
    paddingInline: 20,
    backgroundColor: raster.paper,
    color: raster.ink,
    boxShadow: "none",
    "::backdrop": {
      backgroundColor: "rgba(0,0,0,0.25)",
    },
  },
  left: {
    right: "auto",
    left: 0,
    borderLeftWidth: 0,
    borderRightWidth: raster.hairline,
    borderTopLeftRadius: 0,
    borderTopRightRadius: raster.radiusSm,
    borderBottomRightRadius: raster.radiusSm,
    borderBottomLeftRadius: 0,
    boxShadow: "none",
  },
  title: {
    display: "block",
    fontSize: {
      default: 15,
      [phone]: 18,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    marginBottom: 6,
  },
  body: {
    fontSize: {
      default: 13.5,
      [phone]: 16,
    },
    lineHeight: 1.6,
    letterSpacing: "-0.01em",
    color: raster.gray,
    margin: 0,
  },
});

/**
 * A native <dialog> at the screen edge. The platform provides the
 * focus trap, Escape, and the backdrop.
 */
export function Sheet({ open, onClose, side = "right", className, style, children, ...props }: SheetProps) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const sx = rs(["rs-sheet", side === "left" && "rs-sheet-left", className], styles.frame, side === "left" && styles.left);
  return (
    <dialog
      ref={ref}
      className={sx.className}
      style={{ ...sx.style, ...style }}
      onClose={() => onClose?.()}
      {...props}
    >
      {children}
    </dialog>
  );
}

export function SheetTitle({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-sheet-title", className], styles.title);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function SheetBody({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-sheet-body", className], styles.body);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
