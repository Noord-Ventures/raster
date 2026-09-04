"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { DialogCloseButton, DialogContext, dialogStyles, useDialogPart, useNativeDialog, type NativeDialogOptions } from "./dialog";

export interface DrawerProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open" | "onClose">,
    NativeDialogOptions {}

const styles = stylex.create({
  frame: {
    boxSizing: "border-box",
    position: "fixed",
    top: "auto",
    insetInlineEnd: 0,
    bottom: 0,
    insetInlineStart: 0,
    margin: 0,
    width: "100%",
    maxWidth: "none",
    height: "auto",
    maxHeight: "85dvh",
    borderWidth: 0,
    borderStyle: "solid",
    borderTopWidth: vlak.hairline,
    borderColor: vlak.divider,
    borderStartStartRadius: vlak.radiusSm,
    borderStartEndRadius: vlak.radiusSm,
    borderEndEndRadius: 0,
    borderEndStartRadius: 0,
    paddingBlock: "1.5rem",
    paddingInline: "1.25rem",
    backgroundColor: vlak.paper,
    color: vlak.ink,
    boxShadow: "none",
    "::backdrop": {
      backgroundColor: ["rgba(0,0,0,0.25)", `color-mix(in srgb, ${vlak.paper} 55%, transparent)`],
    },
  },
  title: {
    display: "block",
    fontSize: {
      default: "0.9375rem",
      [mq.phone]: "1.125rem",
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: vlak.ink,
    marginTop: 0,
    marginInlineEnd: 0,
    marginBottom: "0.375rem",
    marginInlineStart: 0,
  },
  body: {
    fontSize: {
      default: "0.84375rem",
      [mq.phone]: "1rem",
    },
    lineHeight: 1.6,
    letterSpacing: "-0.01em",
    color: vlak.gray,
    margin: 0,
  },
});

/**
 * A native <dialog> from the bottom edge. The platform provides the
 * focus trap, Escape, and the backdrop; the title names it.
 */
export const Drawer = React.forwardRef<HTMLDialogElement, DrawerProps>(function Drawer(
  { open, onClose, dismissable, lightDismiss, closeLabel, className, style, children, ...props },
  forwardedRef,
) {
  const { ref, context, dialogProps } = useNativeDialog({ open, onClose, dismissable, lightDismiss }, props, forwardedRef);
  const sx = rs(["rs-drawer", className], styles.frame);
  const close = rs(["rs-drawer-close"], dialogStyles.close);
  return (
    <DialogContext.Provider value={context}>
      <dialog ref={ref} {...props} {...dialogProps} className={sx.className} style={{ ...sx.style, ...style }}>
        {closeLabel != null && (
          <DialogCloseButton label={closeLabel} className={close.className} style={close.style} onClick={() => onClose?.()} />
        )}
        {children}
      </dialog>
    </DialogContext.Provider>
  );
});

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(function DrawerTitle(
  { as: Tag = "h2", className, style, id, ...props },
  ref,
) {
  const titleId = useDialogPart("title", id);
  const sx = rs(["rs-drawer-title", className], styles.title);
  return <Tag ref={ref as React.Ref<never>} {...props} id={titleId} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const DrawerBody = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function DrawerBody(
  { className, style, id, ...props },
  ref,
) {
  const bodyId = useDialogPart("body", id);
  const sx = rs(["rs-drawer-body", className], styles.body);
  return <p ref={ref} {...props} id={bodyId} className={sx.className} style={{ ...sx.style, ...style }} />;
});
