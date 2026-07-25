import * as React from "react";
import { cx } from "../cx";
import { Calendar } from "./calendar";

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: (date: Date) => string;
}

const defaultDateFormat = (d: Date) =>
  d.toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" });

/** The hairline trigger with a calendar overlay. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  format = defaultDateFormat,
  className,
  ...props
}: DatePickerProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cx("rs-select", className)} {...props}>
      <button
        type="button"
        className="rs-dropdown"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value ? format(value) : placeholder}</span>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <rect x="2.75" y="3.75" width="10.5" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2.75 6.75h10.5M5.5 2v2.5M10.5 2v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="rs-menu" style={{ padding: 12, right: "auto" }}>
          <Calendar
            value={value}
            onSelect={(d) => {
              onChange?.(d);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
