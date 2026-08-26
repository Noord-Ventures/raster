import * as React from "react";
import { cx } from "../cx";

export interface DrawerProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
}

/**
 * A native <dialog> from the bottom edge. The platform provides the
 * focus trap, Escape, and the backdrop.
 */
export function Drawer({ open, onClose, className, children, ...props }: DrawerProps) {
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
      className={cx("rs-drawer", className)}
      onClose={() => onClose?.()}
      {...props}
    >
      {children}
    </dialog>
  );
}

export function DrawerTitle({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("rs-drawer-title", className)} {...props} />;
}

export function DrawerBody({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("rs-drawer-body", className)} {...props} />;
}
