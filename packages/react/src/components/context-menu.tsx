import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
import { rs } from "../rs";
import type { DropdownMenuItem } from "./dropdown-menu";
import { menuStyles } from "./dropdown-menu";

const styles = stylex.create({
  pin: {
    position: "fixed",
    zIndex: 50,
    backgroundColor: raster.paper,
  },
});

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DropdownMenuItem[];
}

/** Right-click menu at the pointer. */
export function ContextMenu({ items, className, style, children, ...props }: ContextMenuProps) {
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

  const menu = rs(["rs-menu"], menuStyles.menu, menuStyles.menuFixed, styles.pin);
  return (
    <div
      className={className}
      style={style}
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
          className={menu.className}
          style={{ ...menu.style, left: at.x, top: at.y }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {items.map((item, index) => {
            if (item.separator) {
              const sep = rs(["rs-menu-sep"], menuStyles.sep);
              return <hr key={`sep-${index}`} className={sep.className} style={sep.style} />;
            }
            const row = rs(["rs-menu-item"], menuStyles.item);
            return (
              <button
                key={index}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={row.className}
                style={row.style}
                onClick={() => {
                  setAt(null);
                  item.onSelect?.();
                }}
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
