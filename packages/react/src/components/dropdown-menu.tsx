import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone as phoneMq } from "../tokens.stylex";
import { rs } from "../rs";

/** StyleX cannot read a string const from a defineVars file; keep the token import. */
const phone = "@media (max-width: 640px)" as typeof phoneMq;
import { Icon } from "./icon";

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

export const menuStyles = stylex.create({
  select: {
    position: "relative",
    display: {
      default: "inline-block",
      [phone]: "block",
    },
    minWidth: {
      default: 180,
      [phone]: 0,
    },
    width: {
      default: null,
      [phone]: "100%",
    },
  },
  dropdown: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingBlock: {
      default: 9,
      [phone]: 12,
    },
    paddingInline: {
      default: 12,
      [phone]: 14,
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radiusSm,
      [phone]: 0,
    },
    fontSize: {
      default: 14,
      [phone]: raster.controlFs,
    },
    color: raster.ink,
    letterSpacing: "-0.01em",
    cursor: "pointer",
    fontFamily: "inherit",
    backgroundColor: "transparent",
    width: "100%",
    minHeight: {
      default: null,
      [phone]: raster.hit,
    },
  },
  menu: {
    boxSizing: "border-box",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radiusSm,
      [phone]: 0,
    },
    marginTop: {
      default: 6,
      [phone]: 0,
    },
    overflow: "hidden",
    backgroundColor: raster.paper,
    boxShadow: {
      default: "0 8px 24px rgba(0,0,0,0.06)",
      [phone]: "none",
    },
  },
  menuOverlay: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 50,
  },
  menuFixed: {
    position: "fixed",
    zIndex: 220,
    marginTop: 0,
    minWidth: 160,
  },
  menuCal: {
    right: "auto",
    padding: 12,
  },
  menuCombobox: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 50,
    maxHeight: 240,
    overflowY: "auto",
  },
  item: {
    boxSizing: "border-box",
    display: {
      default: "block",
      [phone]: "flex",
    },
    alignItems: {
      default: null,
      [phone]: "center",
    },
    paddingBlock: {
      default: 9,
      [phone]: 12,
    },
    paddingInline: {
      default: 12,
      [phone]: 14,
    },
    fontSize: {
      default: 14,
      [phone]: raster.controlFs,
    },
    color: raster.ink,
    letterSpacing: "-0.01em",
    borderBottomWidth: {
      default: raster.hairline,
      ":last-child": 0,
    },
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    backgroundColor: "transparent",
    fontFamily: "inherit",
    minHeight: {
      default: null,
      [phone]: raster.hit,
    },
  },
  itemActive: {
    backgroundColor: raster.dividerSubtle,
  },
  sep: {
    borderWidth: 0,
    borderTopWidth: raster.hairline,
    borderTopStyle: "solid",
    borderTopColor: raster.divider,
    marginBlock: 4,
    marginInline: 0,
  },
});

/** Action menu with menu semantics and keyboard navigation. */
export function DropdownMenu({ label, items, className, style, ...props }: DropdownMenuProps) {
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
  const root = rs(["rs-select", className], menuStyles.select);
  const trigger = rs(["rs-dropdown"], menuStyles.dropdown);
  const menu = rs(["rs-menu"], menuStyles.menu, menuStyles.menuOverlay);
  return (
    <div
      ref={rootRef}
      className={root.className}
      style={{ ...root.style, ...style }}
      onKeyDown={onKeyDown}
      {...props}
    >
      <button
        ref={triggerRef}
        type="button"
        className={trigger.className}
        style={trigger.style}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${idBase}-menu`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{label}</span>
        <Icon name="chevron-right" rotate={90} />
      </button>
      {open && (
        <div id={`${idBase}-menu`} role="menu" className={menu.className} style={menu.style}>
          {items.map((item, index) => {
            if (item.separator) {
              const sep = rs(["rs-menu-sep"], menuStyles.sep);
              return <hr key={`sep-${index}`} className={sep.className} style={sep.style} />;
            }
            actionIndex++;
            const current = actionIndex;
            const row = rs(
              ["rs-menu-item", current === activeIndex && "rs-menu-item-active"],
              menuStyles.item,
              current === activeIndex && menuStyles.itemActive,
            );
            return (
              <button
                key={index}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={row.className}
                style={row.style}
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
