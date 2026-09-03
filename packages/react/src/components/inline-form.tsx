import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
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
      ["@media (max-width: 640px)"]: "stretch",
    },
    gap: 8,
    width: "100%",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: {
      default: raster.divider,
      ":focus-within": raster.accent,
    },
    borderRadius: {
      default: raster.radiusSm,
      ["@media (max-width: 640px)"]: 0,
    },
    backgroundColor: raster.paper,
    paddingBlock: {
      default: 4,
      ["@media (max-width: 640px)"]: 0,
    },
    paddingInlineStart: {
      default: 12,
      ["@media (max-width: 640px)"]: 0,
    },
    paddingInlineEnd: {
      default: 6,
      ["@media (max-width: 640px)"]: 0,
    },
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    transition: `border-color ${raster.durationSnap} ${raster.ease}`,
  },
  input: {
    flexGrow: 1,
    minWidth: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: {
      default: 14,
      ["@media (max-width: 640px)"]: 16,
    },
    letterSpacing: "-0.01em",
    color: raster.ink,
    outline: "none",
    paddingBlock: {
      default: 7,
      ["@media (max-width: 640px)"]: 0,
    },
    paddingInline: {
      default: 0,
      ["@media (max-width: 640px)"]: 14,
    },
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
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
    maxWidth: 160,
    opacity: 1,
  },
  btn: {
    height: {
      default: 28,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    paddingInline: {
      default: 16,
      ["@media (max-width: 640px)"]: 16,
    },
    fontSize: {
      default: 12.5,
      ["@media (max-width: 640px)"]: raster.controlFs,
    },
    minWidth: 0,
    borderRadius: {
      default: 0,
      ["@media (max-width: 640px)"]: 0,
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
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    animationName: fadeIn,
    animationDuration: raster.durationConfirm,
    animationTimingFunction: raster.ease,
  },
});

/** One field, one action; the action sits inside the field. */
export function InlineForm({
  placeholder = "Your e-mail",
  buttonLabel = "Subscribe",
  successLabel = "You're on the list",
  validate = (v) => /.+@.+\..+/.test(v),
  onSubmit,
  className,
  style,
  inputProps,
  ...props
}: InlineFormProps) {
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
  const btn = rs(["rs-btn-primary", "rs-inline-btn"], styles.btn);

  return (
    <form
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
}
