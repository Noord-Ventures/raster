import * as React from "react";
import { cx } from "../cx";
import type { SelectOption } from "./select";

export interface ComboboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyLabel?: React.ReactNode;
}

/** The quiet field with a filtered overlay — combobox semantics throughout. */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Search…",
  emptyLabel = "Nothing found.",
  className,
  ...props
}: ComboboxProps) {
  const idBase = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const selected = options.find((o) => o.value === value);
  const matches = options.filter((o) =>
    String(o.label).toLowerCase().includes(query.toLowerCase()),
  );

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const pick = (option: SelectOption) => {
    onValueChange?.(option.value);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cx("rs-combobox", className)} {...props}>
      <input
        className="rs-input rs-input-full"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${idBase}-listbox`}
        aria-autocomplete="list"
        placeholder={placeholder}
        value={open ? query : String(selected?.label ?? "")}
        onFocus={() => {
          setQuery("");
          setActiveIndex(0);
          setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "Escape") setOpen(false);
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(matches.length - 1, i + 1));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(0, i - 1));
          }
          if (e.key === "Enter") {
            e.preventDefault();
            const match = matches[activeIndex];
            if (match) pick(match);
          }
        }}
      />
      {open && (
        <div id={`${idBase}-listbox`} role="listbox" className="rs-menu">
          {matches.length === 0 && <div className="rs-combobox-empty">{emptyLabel}</div>}
          {matches.map((option, index) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={cx("rs-menu-item", index === activeIndex && "rs-menu-item-active")}
              onPointerEnter={() => setActiveIndex(index)}
              onClick={() => pick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
