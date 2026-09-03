import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone as phoneMq } from "../tokens.stylex";
import { rs } from "../rs";

/** StyleX cannot read a string const from a defineVars file; keep the token import. */
const phone = "@media (max-width: 640px)" as typeof phoneMq;

export interface DialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
  /** Extra StyleX leaves merged after the dialog frame (command palette). */
  extraStyles?: unknown[];
}

export const dialogStyles = stylex.create({
  frame: {
    boxSizing: "border-box",
    maxWidth: {
      default: 320,
      [phone]: "calc(100vw - 32px)",
    },
    width: {
      default: null,
      [phone]: "calc(100vw - 32px)",
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: raster.radiusSm,
    padding: {
      default: 20,
      [phone]: "24px 20px",
    },
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
    marginBottom: {
      default: 6,
      [phone]: 10,
    },
  },
  body: {
    fontSize: {
      default: 13.5,
      [phone]: 16,
    },
    color: raster.gray,
    letterSpacing: "-0.01em",
    lineHeight: 1.55,
    marginTop: 0,
    marginRight: 0,
    marginBottom: {
      default: 16,
      [phone]: 20,
    },
    marginLeft: 0,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: {
      default: "row",
      [phone]: "column",
    },
    alignItems: {
      default: "flex-end",
      [phone]: "stretch",
    },
    gap: {
      default: 8,
      [phone]: 10,
    },
  },
});

/**
 * A native <dialog>. Focus trapping, Escape, and the backdrop come
 * from the platform.
 */
export function Dialog({
  open,
  onClose,
  className,
  style,
  children,
  extraStyles,
  ...props
}: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const sx = rs(["rs-dialog", className], dialogStyles.frame, ...(extraStyles ?? []));
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

export function DialogTitle({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const sx = rs(["rs-dialog-title", className], dialogStyles.title);
  return <span {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function DialogBody({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-dialog-body", className], dialogStyles.body);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function DialogActions({ className, style, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-dialog-actions", className], dialogStyles.actions);
  return (
    <div {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<{ style?: React.CSSProperties }>(child)) return child;
        return React.cloneElement(child, {
          style: { ...child.props.style, borderRadius: 0 },
        });
      })}
    </div>
  );
}
