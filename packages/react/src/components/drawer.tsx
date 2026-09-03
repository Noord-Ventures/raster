import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone as phoneMq } from "../tokens.stylex";
import { rs } from "../rs";

/** StyleX cannot read a string const from a defineVars file; keep the token import. */
const phone = "@media (max-width: 640px)" as typeof phoneMq;

export interface DrawerProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
}

const styles = stylex.create({
  frame: {
    boxSizing: "border-box",
    position: "fixed",
    top: "auto",
    right: 0,
    bottom: 0,
    left: 0,
    margin: 0,
    width: "100%",
    maxWidth: "none",
    height: "auto",
    maxHeight: "85dvh",
    borderWidth: 0,
    borderStyle: "solid",
    borderTopWidth: raster.hairline,
    borderColor: raster.divider,
    borderTopLeftRadius: raster.radiusSm,
    borderTopRightRadius: raster.radiusSm,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    paddingBlock: 24,
    paddingInline: 20,
    backgroundColor: raster.paper,
    color: raster.ink,
    boxShadow: "none",
    "::backdrop": {
      backgroundColor: "rgba(0,0,0,0.25)",
    },
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
 * A native <dialog> from the bottom edge. The platform provides the
 * focus trap, Escape, and the backdrop.
 */
export function Drawer({ open, onClose, className, style, children, ...props }: DrawerProps) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const sx = rs(["rs-drawer", className], styles.frame);
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

export function DrawerTitle({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-drawer-title", className], styles.title);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function DrawerBody({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-drawer-body", className], styles.body);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
