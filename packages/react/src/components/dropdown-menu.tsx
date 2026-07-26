import * as React from "react";
import { cx } from "../cx";

export interface DropdownMenuItem {
  label?: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  separator?: boolean;
}

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  items: DropdownMenuItem[];
}

/** Action menu with menu semantics and keyboard navigation. */
export function DropdownMenu({ label, items, className, ...props }: DropdownMenuProps) {
  const idBase = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const actionable = items.filter((item) => !item.separator);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const select = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    setOpen(false);
    triggerRef.current?.focus();
    item.onSelect?.();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setActiveIndex(0);
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(actionable.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    }
    if (e.key === "Home") setActiveIndex(0);
    if (e.key === "End") setActiveIndex(actionable.length - 1);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const item = actionable[activeIndex];
      if (item) select(item);
    }
  };

  let actionIndex = -1;
  return (
    <div ref={rootRef} className={cx("rs-select", className)} onKeyDown={onKeyDown} {...props}>
      <button
        ref={triggerRef}
        type="button"
        className="rs-dropdown"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${idBase}-menu`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{label}</span>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div id={`${idBase}-menu`} role="menu" className="rs-menu">
          {items.map((item, index) => {
            if (item.separator) return <hr key={`sep-${index}`} className="rs-menu-sep" />;
            actionIndex++;
            const current = actionIndex;
            return (
              <button
                key={index}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={cx("rs-menu-item", current === activeIndex && "rs-menu-item-active")}
                onPointerEnter={() => setActiveIndex(current)}
                onClick={() => select(item)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
