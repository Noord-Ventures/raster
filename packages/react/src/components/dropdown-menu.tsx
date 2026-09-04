"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

import { Icon } from "./icon";

export interface DropdownMenuItem {
  label?: React.ReactNode;
  /** Plain text for type-ahead when `label` is not a string. */
  searchText?: string;
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
      [mq.phone]: "block",
    },
    minWidth: {
      default: 180,
      [mq.phone]: 0,
    },
    width: {
      default: null,
      [mq.phone]: "100%",
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
      [mq.phone]: 12,
    },
    paddingInline: {
      default: 12,
      [mq.phone]: 14,
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    fontSize: {
      default: 14,
      [mq.phone]: raster.controlFs,
    },
    color: raster.ink,
    letterSpacing: "-0.01em",
    cursor: "pointer",
    fontFamily: "inherit",
    backgroundColor: "transparent",
    width: "100%",
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    outlineWidth: {
      default: null,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: null,
      ":focus-visible": raster.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
  },
  menu: {
    boxSizing: "border-box",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    marginTop: {
      default: 6,
      [mq.phone]: 0,
    },
    overflow: "hidden",
    backgroundColor: raster.paper,
    boxShadow: {
      default: "0 8px 24px rgba(0,0,0,0.06)",
      [mq.phone]: "none",
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
      [mq.phone]: "flex",
    },
    alignItems: {
      default: null,
      [mq.phone]: "center",
    },
    paddingBlock: {
      default: 9,
      [mq.phone]: 12,
    },
    paddingInline: {
      default: 12,
      [mq.phone]: 14,
    },
    fontSize: {
      default: 14,
      [mq.phone]: raster.controlFs,
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
      [mq.phone]: raster.hit,
    },
    /* The menu clips at its edge, so the ring sits inside the row. */
    outlineWidth: {
      default: null,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: null,
      ":focus-visible": raster.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": -2,
    },
  },
  itemActive: {
    backgroundColor: raster.dividerSubtle,
  },
  itemDisabled: {
    color: raster.gray,
    cursor: "default",
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

/** Text a menu item answers to for type-ahead. */
export function menuItemText(item: DropdownMenuItem): string {
  if (item.searchText) return item.searchText;
  return typeof item.label === "string" ? item.label : "";
}

/**
 * Next index whose text starts with `query`, searching forward from `from`
 * and wrapping. A repeated single letter cycles through its matches.
 */
export function typeAheadIndex(texts: string[], from: number, query: string): number {
  const q = query.toLowerCase();
  const repeated = q.length > 1 && q.split("").every((c) => c === q[0]);
  const needle = repeated ? q[0]! : q;
  const start = repeated || q.length === 1 ? from + 1 : from;
  for (let k = 0; k < texts.length; k++) {
    const i = (start + k + texts.length) % texts.length;
    if (texts[i]!.toLowerCase().startsWith(needle)) return i;
  }
  return -1;
}

/** Why a menu closed; decides whether focus goes back to the trigger. */
export type MenuCloseReason = "escape" | "select" | "tab" | "outside" | "arrow";

export interface MenuPanelProps {
  id: string;
  items: DropdownMenuItem[];
  /** Class and style from an rs() call; the panel adds nothing of its own. */
  className?: string;
  style?: React.CSSProperties;
  labelledBy?: string;
  /** Which item takes focus on open (ArrowUp opens on the last). */
  initial?: "first" | "last";
  onClose: (reason: MenuCloseReason) => void;
  /** ArrowLeft/ArrowRight, for a menubar to move to the neighbour menu. */
  onHorizontal?: (dir: -1 | 1) => void;
  /** The `role="menu"` element, for outside-click checks. */
  panelRef?: React.Ref<HTMLDivElement>;
}

/**
 * The open `role="menu"` list: roving tabindex, arrows wrap, Home/End,
 * type-ahead, Escape and Tab close. Focus lands on the first item on mount.
 */
export function MenuPanel({
  id,
  items,
  className,
  style,
  labelledBy,
  initial = "first",
  onClose,
  onHorizontal,
  panelRef,
}: MenuPanelProps) {
  const actionable = items.filter((item) => !item.separator);
  const enabled = actionable.map((item, index) => (item.disabled ? -1 : index)).filter((i) => i >= 0);
  const [active, setActive] = React.useState(() =>
    initial === "last" ? (enabled[enabled.length - 1] ?? 0) : (enabled[0] ?? 0),
  );
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const typed = React.useRef({ buffer: "", at: 0 });
  const typedTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    itemRefs.current[active]?.focus();
  }, [active]);

  React.useEffect(() => () => clearTimeout(typedTimer.current), []);

  const choose = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    onClose("select");
    item.onSelect?.();
  };

  const step = (dir: -1 | 1) => {
    if (enabled.length === 0) return;
    const pos = enabled.indexOf(active);
    setActive(enabled[(pos + dir + enabled.length) % enabled.length]!);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        step(1);
        return;
      case "ArrowUp":
        e.preventDefault();
        step(-1);
        return;
      case "Home":
        e.preventDefault();
        if (enabled.length) setActive(enabled[0]!);
        return;
      case "End":
        e.preventDefault();
        if (enabled.length) setActive(enabled[enabled.length - 1]!);
        return;
      case "ArrowLeft":
      case "ArrowRight":
        if (onHorizontal) {
          e.preventDefault();
          onHorizontal(e.key === "ArrowLeft" ? -1 : 1);
        }
        return;
      case "Escape":
        e.preventDefault();
        onClose("escape");
        return;
      case "Tab":
        onClose("tab");
        return;
      case "Enter":
      case " ": {
        e.preventDefault();
        const item = actionable[active];
        if (item) choose(item);
        return;
      }
      default:
        break;
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      const now = Date.now();
      const buffer = now - typed.current.at < 500 ? typed.current.buffer + e.key : e.key;
      typed.current = { buffer, at: now };
      clearTimeout(typedTimer.current);
      typedTimer.current = setTimeout(() => {
        typed.current = { buffer: "", at: 0 };
      }, 500);
      const texts = actionable.map((item) => (item.disabled ? "" : menuItemText(item)));
      const next = typeAheadIndex(texts, active, buffer);
      if (next >= 0) setActive(next);
    }
  };

  let actionIndex = -1;
  return (
    <div
      ref={panelRef}
      id={id}
      role="menu"
      aria-labelledby={labelledBy}
      className={className}
      style={style}
      onKeyDown={onKeyDown}
    >
      {items.map((item, index) => {
        if (item.separator) {
          const sep = rs(["rs-menu-sep"], menuStyles.sep);
          return <hr key={`sep-${index}`} className={sep.className} style={sep.style} />;
        }
        actionIndex++;
        const current = actionIndex;
        const row = rs(
          ["rs-menu-item", current === active && "rs-menu-item-active", item.disabled && "rs-menu-item-disabled"],
          menuStyles.item,
          current === active && menuStyles.itemActive,
          item.disabled && menuStyles.itemDisabled,
        );
        return (
          <button
            key={index}
            id={`${id}-item-${current}`}
            ref={(el) => {
              itemRefs.current[current] = el;
            }}
            type="button"
            role="menuitem"
            tabIndex={current === active ? 0 : -1}
            aria-disabled={item.disabled || undefined}
            className={row.className}
            style={row.style}
            onPointerEnter={() => {
              if (!item.disabled) setActive(current);
            }}
            onClick={() => choose(item)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/** Action menu with menu semantics and keyboard navigation. */
export function DropdownMenu({ label, items, className, style, ...props }: DropdownMenuProps) {
  const idBase = React.useId();
  const triggerId = `${idBase}-trigger`;
  const menuId = `${idBase}-menu`;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [initial, setInitial] = React.useState<"first" | "last">("first");

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openMenu = (at: "first" | "last") => {
    setInitial(at);
    setOpen(true);
  };

  const close = (reason: MenuCloseReason) => {
    setOpen(false);
    if (reason !== "outside") triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMenu("first");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        openMenu("last");
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      close("escape");
    }
  };

  const root = rs(["rs-select", className], menuStyles.select);
  const trigger = rs(["rs-dropdown"], menuStyles.dropdown);
  const menu = rs(["rs-menu"], menuStyles.menu, menuStyles.menuOverlay);
  return (
    <div ref={rootRef} className={root.className} style={{ ...root.style, ...style }} {...props}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className={trigger.className}
        style={trigger.style}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close("select") : openMenu("first"))}
        onKeyDown={onTriggerKeyDown}
      >
        <span>{label}</span>
        <Icon name="chevron-right" rotate={90} />
      </button>
      {open && (
        <MenuPanel
          id={menuId}
          items={items}
          labelledBy={triggerId}
          initial={initial}
          className={menu.className}
          style={menu.style}
          onClose={close}
        />
      )}
    </div>
  );
}
