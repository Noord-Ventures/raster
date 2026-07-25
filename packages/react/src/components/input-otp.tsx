import * as React from "react";
import { cx } from "../cx";

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number;
  onChange?: (code: string) => void;
  /** Called once every cell is filled. */
  onComplete?: (code: string) => void;
  "aria-label"?: string;
}

/** One quiet cell per character: auto-advance, backspace, and paste all work. */
export function InputOTP({
  length = 6,
  onChange,
  onComplete,
  className,
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

  return (
    <div className={cx("rs-otp", className)} role="group" aria-label={ariaLabel} {...props}>
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
