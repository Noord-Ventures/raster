import * as React from "react";
import { cx } from "../cx";

export interface AlertDialogProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
}

/**
 * A native <dialog> that requires an explicit answer. Escape and
 * light dismiss are disabled.
 */
export function AlertDialog({ open, onClose, className, children, ...props }: AlertDialogProps) {
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
      role="alertdialog"
      className={cx("rs-dialog", className)}
      onClose={() => onClose?.()}
      onCancel={(e) => e.preventDefault()}
      {...props}
    >
      {children}
    </dialog>
  );
}

export { DialogTitle as AlertDialogTitle, DialogBody as AlertDialogBody, DialogActions as AlertDialogActions } from "./dialog";
