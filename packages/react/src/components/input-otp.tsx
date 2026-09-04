"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { useFieldControl } from "./field";

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number;
  onChange?: (code: string) => void;
  /** Called once every cell is filled. */
  onComplete?: (code: string) => void;
  "aria-label"?: string;
}

const styles = stylex.create({
  otp: {
    display: "flex",
    gap: "0.5rem",
    width: {
      default: null,
      [mq.phone]: "100%",
    },
  },
  cell: {
    width: {
      default: "2.5rem",
      [mq.phone]: "auto",
    },
    flexGrow: {
      default: null,
      [mq.phone]: 1,
    },
    minWidth: {
      default: null,
      [mq.phone]: 0,
    },
    height: {
      default: "3rem",
      [mq.phone]: vlak.hit,
    },
    minHeight: {
      default: null,
      [mq.phone]: vlak.hit,
    },
    textAlign: "center",
    fontSize: "1.125rem",
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    appearance: "none",
    WebkitAppearance: "none",
    color: "var(--text)",
    caretColor: "var(--text)",
    backgroundColor: "var(--bg)",
    borderWidth: vlak.hairline,
    borderStyle: "solid",
    borderColor: {
      default: vlak.controlBorder,
      ":focus": vlak.accent,
    },
    borderRadius: {
      default: vlak.radiusSm,
      [mq.phone]: 0,
    },
    outlineWidth: {
      default: 0,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: "none",
      ":focus-visible": "solid",
    },
    outlineColor: vlak.ink,
    outlineOffset: 2,
    fontFamily: "inherit",
    padding: 0,
    ":-webkit-autofill": {
      WebkitTextFillColor: "var(--text)",
      caretColor: "var(--text)",
      backgroundColor: "var(--bg)",
      boxShadow: "inset 0 0 0 1000px var(--bg)",
    },
  },
  invalid: {
    borderColor: vlak.ink,
  },
});

/** One cell per character. Auto-advance, backspace, paste. */
export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(function InputOTP({
  length = 6,
  onChange,
  onComplete,
  className,
  style,
  "aria-label": ariaLabel = "One-time code",
  ...props
}, ref) {
  const [chars, setChars] = React.useState<string[]>(() => Array(length).fill(""));
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const field = useFieldControl(props);
  const invalid = field.invalid;

  const commit = (next: string[]) => {
    setChars(next);
    const code = next.join("");
    onChange?.(code);
    if (code.length === length) onComplete?.(code);
  };

  const setAt = (index: number, value: string) => {
    const next = [...chars];
    next[index] = value;
    commit(next);
  };

  const paste = (index: number, text: string) => {
    const clean = text.replace(/\D/g, "").slice(0, length - index);
    if (!clean) return;
    const next = [...chars];
    for (let i = 0; i < clean.length; i++) next[index + i] = clean[i]!;
    commit(next);
    refs.current[Math.min(index + clean.length, length - 1)]?.focus();
  };

  const sx = rs(["rs-otp", className], styles.otp);
  const cell = rs(["rs-otp-cell", invalid && "rs-otp-cell-invalid"], styles.cell, invalid && styles.invalid);

  return (
    <div
      ref={ref}
      className={sx.className}
      style={{ ...sx.style, ...style }}
      role="group"
      aria-label={ariaLabel}
      {...props}
      aria-describedby={field["aria-describedby"]}
    >
      {chars.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={char}
          aria-label={`Digit ${index + 1}`}
          aria-invalid={field["aria-invalid"]}
          className={cell.className}
          style={cell.style}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length > 1) {
              paste(index, value);
              return;
            }
            setAt(index, value);
            if (value) refs.current[index + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !chars[index] && index > 0) {
              refs.current[index - 1]?.focus();
              setAt(index - 1, "");
            }
            if (e.key === "ArrowLeft") refs.current[index - 1]?.focus();
            if (e.key === "ArrowRight") refs.current[index + 1]?.focus();
          }}
          onPaste={(e) => {
            e.preventDefault();
            paste(index, e.clipboardData.getData("text"));
          }}
        />
      ))}
    </div>
  );
});
