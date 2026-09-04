"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface InlineFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string;
  buttonLabel?: React.ReactNode;
  successLabel?: React.ReactNode;
  /** The action only appears once this returns true. Defaults to a loose e-mail check. */
  validate?: (value: string) => boolean;
  onSubmit?: (value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const fadeIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const styles = stylex.create({
  field: {
    display: "flex",
    alignItems: {
      default: "center",
      [mq.phone]: "stretch",
    },
    gap: "0.5rem",
    width: "100%",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: {
      default: raster.divider,
      ":focus-within": raster.accent,
    },
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    backgroundColor: "var(--bg)",
    paddingBlock: {
      default: "0.25rem",
      [mq.phone]: 0,
    },
    paddingInlineStart: {
      default: "0.75rem",
      [mq.phone]: 0,
    },
    paddingInlineEnd: {
      default: "0.375rem",
      [mq.phone]: 0,
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    transition: `border-color ${raster.durationSnap} ${raster.ease}`,
  },
  input: {
    flexGrow: 1,
    minWidth: 0,
    appearance: "none",
    WebkitAppearance: "none",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "var(--text)",
    caretColor: "var(--text)",
    fontFamily: "inherit",
    fontSize: {
      default: "0.875rem",
      [mq.phone]: "1rem",
    },
    letterSpacing: "-0.01em",
    outline: "none",
    paddingBlock: {
      default: "0.4375rem",
      [mq.phone]: 0,
    },
    paddingInline: {
      default: 0,
      [mq.phone]: "0.875rem",
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    "::placeholder": {
      color: raster.gray,
    },
  },
  reveal: {
    maxWidth: 0,
    opacity: 0,
    overflow: "hidden",
    transition: `max-width ${raster.duration} ${raster.ease}, opacity ${raster.duration} ${raster.ease}`,
  },
  revealIn: {
    maxWidth: "10rem",
    opacity: 1,
  },
  btn: {
    height: {
      default: "1.75rem",
      [mq.phone]: raster.hit,
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    paddingInline: {
      default: "1rem",
      [mq.phone]: "1rem",
    },
    fontSize: {
      default: "0.78125rem",
      [mq.phone]: raster.controlFs,
    },
    minWidth: 0,
    borderRadius: {
      default: 0,
      [mq.phone]: 0,
    },
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: raster.ink,
    color: raster.paper,
    borderWidth: 0,
  },
  subscribed: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    animationName: fadeIn,
    animationDuration: raster.durationConfirm,
    animationTimingFunction: raster.ease,
  },
});

/** One field, one action; the action sits inside the field. */
export const InlineForm = React.forwardRef<HTMLFormElement, InlineFormProps>(function InlineForm({
  placeholder = "Your e-mail",
  buttonLabel = "Subscribe",
  successLabel = "You're on the list",
  validate = (v) => /.+@.+\..+/.test(v),
  onSubmit,
  className,
  style,
  inputProps,
  ...props
}: InlineFormProps, ref: React.ForwardedRef<HTMLFormElement>) {
  const [value, setValue] = React.useState("");
  const [done, setDone] = React.useState(false);
  const valid = validate(value);

  if (done) {
    const ok = rs(["rs-subscribed"], styles.subscribed);
    return (
      <div className={ok.className} style={ok.style}>
        <Icon name="check" size={16} />
        {successLabel}
      </div>
    );
  }

  const sx = rs(["rs-inline-field", className], styles.field);
  const input = rs(["rs-inline-input"], styles.input);
  const reveal = rs(["rs-reveal", valid && "rs-reveal-in"], styles.reveal, valid && styles.revealIn);
  const btn = rs(["rs-btn-primary", "rs-inline-btn", "rs-inline-field-btn"], styles.btn);

  return (
    <form
      ref={ref}
      className={sx.className}
      style={{ ...sx.style, ...style }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        onSubmit?.(value);
        setDone(true);
      }}
      {...props}
    >
      <input
        className={input.className}
        style={input.style}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...inputProps}
      />
      <span className={reveal.className} style={reveal.style}>
        <button type="submit" className={btn.className} style={btn.style} tabIndex={valid ? 0 : -1}>
          {buttonLabel}
        </button>
      </span>
    </form>
  );
});
