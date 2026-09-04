import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { Dialog, type DialogProps } from "./dialog";

const styles = stylex.create({
  lock: {
    borderRadius: raster.radiusSm,
    boxShadow: "none",
  },
});

export interface AlertDialogProps extends Omit<DialogProps, "dismissable" | "lightDismiss" | "closeLabel"> {}

/**
 * A native <dialog> that requires an explicit answer. Escape and
 * light dismiss are off (closedby="none"); the actions close it.
 */
export const AlertDialog = React.forwardRef<HTMLDialogElement, AlertDialogProps>(function AlertDialog(
  { className, extraStyles, ...props },
  ref,
) {
  return (
    <Dialog
      ref={ref}
      role="alertdialog"
      dismissable={false}
      className={className ? `rs-alert-dialog ${className}` : "rs-alert-dialog"}
      extraStyles={[styles.lock, ...(extraStyles ?? [])]}
      {...props}
    />
  );
});

export {
  DialogTitle as AlertDialogTitle,
  DialogBody as AlertDialogBody,
  DialogActions as AlertDialogActions,
} from "./dialog";
