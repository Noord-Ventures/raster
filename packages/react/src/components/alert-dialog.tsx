import * as React from "react";
import { cx } from "../cx";

export interface AlertDialogProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
}

/**
 * A native <dialog> that demands an answer: Escape is swallowed and
 * there is no light dismiss — the only way out is one of the actions.
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
