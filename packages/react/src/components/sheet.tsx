import * as React from "react";
import { cx } from "../cx";

export interface SheetProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
  side?: "left" | "right";
}

/**
 * A native <dialog> at the screen edge. The platform provides the
 * focus trap, Escape, and the backdrop.
 */
export function Sheet({ open, onClose, side = "right", className, children, ...props }: SheetProps) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cx("rs-sheet", side === "left" && "rs-sheet-left", className)}
      onClose={() => onClose?.()}
      {...props}
    >
      {children}
    </dialog>
  );
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("rs-sheet-title", className)} {...props} />;
}

export function SheetBody({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("rs-sheet-body", className)} {...props} />;
}
