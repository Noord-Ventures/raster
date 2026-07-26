import * as React from "react";
import { cx } from "../cx";

export interface DialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
}

/**
 * A native <dialog>. Focus trapping, Escape, and the backdrop come
 * from the platform.
 */
export function Dialog({ open, onClose, className, children, ...props }: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className={cx("rs-dialog", className)} onClose={() => onClose?.()} {...props}>
      {children}
    </dialog>
  );
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("rs-dialog-title", className)} {...props} />;
}

export function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("rs-dialog-body", className)} {...props} />;
}

export function DialogActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("rs-dialog-actions", className)} {...props} />;
}
