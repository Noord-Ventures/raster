"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

import { Dialog } from "./dialog";

export interface CommandItem {
  label: string;
  hint?: React.ReactNode;
  keywords?: string;
  onSelect?: () => void;
}

export interface CommandGroup {
  label?: string;
  items: CommandItem[];
}

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  groups: CommandGroup[];
  placeholder?: string;
  emptyLabel?: React.ReactNode;
  onDone?: () => void;
}

const styles = stylex.create({
  palette: {
    width: {
      default: 480,
      [mq.phone]: "100%",
    },
    maxWidth: {
      default: "90vw",
      [mq.phone]: "100%",
    },
    padding: 0,
    overflow: "hidden",
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: {
      default: 14,
      [mq.phone]: 16,
    },
    letterSpacing: "-0.01em",
    color: raster.ink,
    paddingBlock: 14,
    paddingInline: 16,
    outline: "none",
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    "::placeholder": {
      color: raster.gray,
    },
  },
  list: {
    maxHeight: 320,
    overflowY: "auto",
    padding: 6,
  },
  group: {
    fontSize: {
      default: 11,
      [mq.phone]: 13,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.gray,
    paddingTop: {
      default: 8,
      [mq.phone]: 12,
    },
    paddingRight: {
      default: 10,
      [mq.phone]: 14,
    },
    paddingBottom: {
      default: 4,
      [mq.phone]: 6,
    },
    paddingLeft: {
      default: 10,
      [mq.phone]: 14,
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    textAlign: "left",
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: {
      default: 13.5,
      [mq.phone]: raster.controlFs,
    },
    letterSpacing: "-0.01em",
    color: raster.ink,
    paddingBlock: {
      default: 8,
      [mq.phone]: 12,
    },
    paddingInline: {
      default: 10,
      [mq.phone]: 14,
    },
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    cursor: "pointer",
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
  },
  itemActive: {
    backgroundColor: raster.dividerSubtle,
  },
  hint: {
    fontSize: 11,
    color: raster.gray,
  },
  empty: {
    padding: {
      default: 20,
      [mq.phone]: 24,
    },
    textAlign: "center",
    fontSize: {
      default: 13,
      [mq.phone]: 15,
    },
    color: raster.gray,
  },
});

/** Filter, arrows, enter. */
export function Command({
  groups,
  placeholder = "Type a command or search…",
  emptyLabel = "Nothing found.",
  onDone,
  className,
  style,
  ...props
}: CommandProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const q = query.toLowerCase();
  const filtered = groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => item.label.toLowerCase().includes(q) || item.keywords?.toLowerCase().includes(q),
      ),
    }))
    .filter((group) => group.items.length > 0);
  const flat = filtered.flatMap((group) => group.items);

  const run = (item: CommandItem) => {
    onDone?.();
    item.onSelect?.();
  };

  const input = rs(["rs-command-input"], styles.input);
  const list = rs(["rs-command-list"], styles.list);
  const empty = rs(["rs-command-empty"], styles.empty);
  const groupSx = rs(["rs-command-group"], styles.group);
  const hint = rs(["rs-command-hint"], styles.hint);

  let cursor = -1;
  return (
    <div className={className} style={style} {...props}>
      <input
        className={input.className}
        style={input.style}
        autoFocus
        placeholder={placeholder}
        role="combobox"
        aria-expanded="true"
        aria-label="Command"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(flat.length - 1, i + 1));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(0, i - 1));
          }
          if (e.key === "Enter") {
            e.preventDefault();
            const item = flat[activeIndex];
            if (item) run(item);
          }
        }}
      />
      <div className={list.className} style={list.style} role="listbox">
        {flat.length === 0 && (
          <div className={empty.className} style={empty.style}>
            {emptyLabel}
          </div>
        )}
        {filtered.map((group, gi) => (
          <React.Fragment key={gi}>
            {group.label && (
              <div className={groupSx.className} style={groupSx.style}>
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              cursor++;
              const index = cursor;
              const row = rs(
                ["rs-command-item", index === activeIndex && "rs-command-item-active"],
                styles.item,
                index === activeIndex && styles.itemActive,
              );
              return (
                <button
                  key={item.label}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={row.className}
                  style={row.style}
                  onPointerEnter={() => setActiveIndex(index)}
                  onClick={() => run(item)}
                >
                  <span>{item.label}</span>
                  {item.hint != null && (
                    <span className={hint.className} style={hint.style}>
                      {item.hint}
                    </span>
                  )}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export interface CommandDialogProps extends CommandProps {
  open: boolean;
  onClose?: () => void;
}

/** The palette in a native <dialog>. Wire ⌘K in your app to setOpen(true). */
export function CommandDialog({ open, onClose, className, ...props }: CommandDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={["rs-command", "rs-command-dialog", className].filter(Boolean).join(" ")}
      extraStyles={[styles.palette]}
    >
      {open && <Command onDone={onClose} {...props} />}
    </Dialog>
  );
}
