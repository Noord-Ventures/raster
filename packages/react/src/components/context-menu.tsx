import * as React from "react";
import { cx } from "../cx";
import type { DropdownMenuItem } from "./dropdown-menu";

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DropdownMenuItem[];
}

/** Right-click (or long-press) opens the shared menu surface at the pointer. */
export function ContextMenu({ items, className, children, ...props }: ContextMenuProps) {
  const [at, setAt] = React.useState<{ x: number; y: number } | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!at) return;
    const close = () => setAt(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [at]);

  return (
    <div
      className={className}
      onContextMenu={(e) => {
        e.preventDefault();
        setAt({ x: e.clientX, y: e.clientY });
      }}
      {...props}
    >
      {children}
      {at && (
        <div
          ref={menuRef}
          role="menu"
          className="rs-menu"
          style={{ position: "fixed", left: at.x, top: at.y, minWidth: 160, zIndex: 220, marginTop: 0 }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {items.map((item, index) =>
            item.separator ? (
              <hr key={`sep-${index}`} className="rs-menu-sep" />
            ) : (
              <button
                key={index}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className="rs-menu-item"
                onClick={() => {
                  setAt(null);
                  item.onSelect?.();
                }}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
