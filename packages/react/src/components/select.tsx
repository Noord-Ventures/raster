import * as React from "react";
import { cx } from "../cx";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: React.ReactNode;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

/** Listbox on a hairline trigger; the open menu overlays. */
export function Select({
  options,
  value,
  defaultValue,
  placeholder = "Select…",
  onValueChange,
  disabled,
  className,
  ...props
}: SelectProps) {
  const idBase = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const selectedIndex = options.findIndex((o) => o.value === current);
  const [activeIndex, setActiveIndex] = React.useState(Math.max(0, selectedIndex));

  const select = (next: string) => {
    if (!isControlled) setInner(next);
    onValueChange?.(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key) && !open) {
      e.preventDefault();
      setActiveIndex(Math.max(0, selectedIndex));
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const active = options[activeIndex];
      if (active) select(active.value);
    }
  };

  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  return (
    <div ref={rootRef} className={cx("rs-select", className)} {...props}>
      <button
        ref={triggerRef}
        type="button"
        className="rs-dropdown"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${idBase}-listbox`}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div id={`${idBase}-listbox`} role="listbox" className="rs-menu" aria-activedescendant={`${idBase}-opt-${activeIndex}`}>
          {options.map((option, index) => (
            <button
              key={option.value}
              id={`${idBase}-opt-${index}`}
              type="button"
              role="option"
              aria-selected={option.value === current}
              className={cx(
                "rs-menu-item",
                (option.value === current || index === activeIndex) && "rs-menu-item-active",
              )}
              onPointerEnter={() => setActiveIndex(index)}
              onClick={() => select(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
