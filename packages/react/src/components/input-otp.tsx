import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";

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
    gap: 8,
    width: {
      default: null,
      ["@media (max-width: 640px)"]: "100%",
    },
  },
  cell: {
    width: {
      default: 40,
      ["@media (max-width: 640px)"]: "auto",
    },
    flexGrow: {
      default: null,
      ["@media (max-width: 640px)"]: 1,
    },
    minWidth: {
      default: null,
      ["@media (max-width: 640px)"]: 0,
    },
    height: {
      default: 48,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    appearance: "none",
    WebkitAppearance: "none",
    color: "var(--text)",
    caretColor: "var(--text)",
    backgroundColor: "var(--bg)",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: {
      default: raster.divider,
      ":focus": raster.accent,
    },
    borderRadius: {
      default: raster.radiusSm,
      ["@media (max-width: 640px)"]: 0,
    },
    outline: "none",
    fontFamily: "inherit",
    padding: 0,
    ":-webkit-autofill": {
      WebkitTextFillColor: "var(--text)",
      caretColor: "var(--text)",
      backgroundColor: "var(--bg)",
      boxShadow: "inset 0 0 0 1000px var(--bg)",
    },
  },
});

/** One cell per character. Auto-advance, backspace, paste. */
export function InputOTP({
  length = 6,
  onChange,
  onComplete,
  className,
  style,
  "aria-label": ariaLabel = "One-time code",
  ...props
}: InputOTPProps) {
  const [chars, setChars] = React.useState<string[]>(() => Array(length).fill(""));
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);

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
  const cell = rs([], styles.cell);

  return (
    <div className={sx.className} style={{ ...sx.style, ...style }} role="group" aria-label={ariaLabel} {...props}>
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
}
