"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
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
      backgroundColor: ["rgba(0,0,0,0.25)", `color-mix(in srgb, ${raster.paper} 55%, transparent)`],
    },
  },
  title: {
    display: "block",
    fontSize: {
      default: 15,
      [mq.phone]: 18,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 6,
    marginLeft: 0,
  },
  body: {
    fontSize: {
      default: 13.5,
      [mq.phone]: 16,
    },
    lineHeight: 1.6,
    letterSpacing: "-0.01em",
    color: raster.gray,
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

export function DrawerTitle({ as: Tag = "h2", className, style, id, ...props }: DrawerTitleProps) {
  const titleId = useDialogPart("title", id);
  const sx = rs(["rs-drawer-title", className], styles.title);
  return <Tag {...props} id={titleId} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function DrawerBody({ className, style, id, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const bodyId = useDialogPart("body", id);
  const sx = rs(["rs-drawer-body", className], styles.body);
  return <p {...props} id={bodyId} className={sx.className} style={{ ...sx.style, ...style }} />;
}
