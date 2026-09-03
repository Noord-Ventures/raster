import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";
import { Calendar } from "./calendar";
import { Icon } from "./icon";
import { menuStyles } from "./dropdown-menu";

const styles = stylex.create({
  calMenu: {
    right: "auto",
    padding: 12,
    backgroundColor: raster.paper,
  },
});

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: (date: Date) => string;
}

const defaultDateFormat = (d: Date) =>
  d.toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" });

/** Hairline trigger with a calendar overlay. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  format = defaultDateFormat,
  className,
  style,
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

  const root = rs(["rs-select", className], menuStyles.select);
  const trigger = rs(["rs-dropdown"], menuStyles.dropdown);
  const menu = rs(["rs-menu"], menuStyles.menu, menuStyles.menuOverlay, menuStyles.menuCal, styles.calMenu);

  return (
    <div ref={rootRef} className={root.className} style={{ ...root.style, ...style }} {...props}>
      <button
        type="button"
        className={trigger.className}
        style={trigger.style}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value ? format(value) : placeholder}</span>
        <Icon name="calendar" size={16} />
      </button>
      {open && (
        <div className={menu.className} style={menu.style}>
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
