"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { DialogCloseButton, DialogContext, dialogStyles, useDialogPart, useNativeDialog, type NativeDialogOptions } from "./dialog";

export interface SheetProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open" | "onClose">,
    NativeDialogOptions {
  side?: "left" | "right";
}

const styles = stylex.create({
  frame: {
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    insetInlineEnd: 0,
    bottom: 0,
    insetInlineStart: "auto",
    margin: 0,
    height: "100dvh",
    maxHeight: "none",
    width: {
      default: "22.5rem",
      [mq.phone]: "100%",
    },
    maxWidth: {
      default: "85vw",
      [mq.phone]: "100%",
    },
    borderWidth: 0,
    borderStyle: "solid",
    borderInlineStartWidth: raster.hairline,
    borderColor: raster.divider,
    borderStartStartRadius: raster.radiusSm,
    borderStartEndRadius: 0,
    borderEndEndRadius: 0,
    borderEndStartRadius: raster.radiusSm,
    paddingBlock: "1.5rem",
    paddingInline: "1.25rem",
    backgroundColor: raster.paper,
    color: raster.ink,
    boxShadow: "none",
    "::backdrop": {
      backgroundColor: ["rgba(0,0,0,0.25)", `color-mix(in srgb, ${raster.paper} 55%, transparent)`],
    },
  },
  left: {
    insetInlineEnd: "auto",
    insetInlineStart: 0,
    borderInlineStartWidth: 0,
    borderInlineEndWidth: raster.hairline,
    borderStartStartRadius: 0,
    borderStartEndRadius: raster.radiusSm,
    borderEndEndRadius: raster.radiusSm,
    borderEndStartRadius: 0,
    boxShadow: "none",
  },
  title: {
    display: "block",
    fontSize: {
      default: "0.9375rem",
      [mq.phone]: "1.125rem",
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
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
    color: raster.gray,
    margin: 0,
  },
});

/**
 * A native <dialog> at the screen edge. The platform provides the
 * focus trap, Escape, and the backdrop; the title names it.
 */
export const Sheet = React.forwardRef<HTMLDialogElement, SheetProps>(function Sheet(
  { open, onClose, dismissable, lightDismiss, closeLabel, side = "right", className, style, children, ...props },
  forwardedRef,
) {
  const { ref, context, dialogProps } = useNativeDialog({ open, onClose, dismissable, lightDismiss }, props, forwardedRef);
  const sx = rs(["rs-sheet", side === "left" && "rs-sheet-left", className], styles.frame, side === "left" && styles.left);
  const close = rs(["rs-sheet-close"], dialogStyles.close);
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

export interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(function SheetTitle(
  { as: Tag = "h2", className, style, id, ...props },
  ref,
) {
  const titleId = useDialogPart("title", id);
  const sx = rs(["rs-sheet-title", className], styles.title);
  return <Tag ref={ref as React.Ref<never>} {...props} id={titleId} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const SheetBody = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function SheetBody(
  { className, style, id, ...props },
  ref,
) {
  const bodyId = useDialogPart("body", id);
  const sx = rs(["rs-sheet-body", className], styles.body);
  return <p ref={ref} {...props} id={bodyId} className={sx.className} style={{ ...sx.style, ...style }} />;
});
