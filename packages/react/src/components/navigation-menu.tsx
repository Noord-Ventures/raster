import * as React from "react";
import { cx } from "../cx";

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{ label: React.ReactNode; href: string; current?: boolean }>;
}

/** Links in a row; the current page is ink. */
export function NavigationMenu({ items, className, ...props }: NavigationMenuProps) {
  return (
    <nav className={cx("rs-nav", className)} {...props}>
      {items.map((item, index) => (
        <a key={index} href={item.href} aria-current={item.current ? "page" : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
