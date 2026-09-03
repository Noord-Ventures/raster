import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { Dialog } from "./dialog";

const styles = stylex.create({
  lock: {
    borderRadius: raster.radiusSm,
    boxShadow: "none",
  },
});

export interface AlertDialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
}

/**
 * A native <dialog> that requires an explicit answer. Escape and
 * light dismiss are disabled.
 */
export function AlertDialog({ open, onClose, ...props }: AlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      role="alertdialog"
      onCancel={(e) => e.preventDefault()}
      extraStyles={[styles.lock]}
      {...props}
    />
  );
}

export {
  DialogTitle as AlertDialogTitle,
  DialogBody as AlertDialogBody,
  DialogActions as AlertDialogActions,
} from "./dialog";
