import * as React from "react";
import { cx } from "../cx";
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

/** One input, everything reachable — filter, arrows, enter. */
export function Command({
  groups,
  placeholder = "Type a command or search…",
  emptyLabel = "Nothing found.",
  onDone,
  className,
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

  let cursor = -1;
  return (
    <div className={cx(className)} {...props}>
      <input
        className="rs-command-input"
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
      <div className="rs-command-list" role="listbox">
        {flat.length === 0 && <div className="rs-command-empty">{emptyLabel}</div>}
        {filtered.map((group, gi) => (
          <React.Fragment key={gi}>
            {group.label && <div className="rs-command-group">{group.label}</div>}
            {group.items.map((item) => {
              cursor++;
              const index = cursor;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={cx("rs-command-item", index === activeIndex && "rs-command-item-active")}
                  onPointerEnter={() => setActiveIndex(index)}
                  onClick={() => run(item)}
                >
                  <span>{item.label}</span>
                  {item.hint != null && <span className="rs-command-hint">{item.hint}</span>}
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
    <Dialog open={open} onClose={onClose} className={cx("rs-command", className)}>
      {open && <Command onDone={onClose} {...props} />}
    </Dialog>
  );
}
