import * as React from "react";
import { cx } from "../cx";
import { DropdownMenu, type DropdownMenuItem } from "./dropdown-menu";

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  menus: Array<{ label: React.ReactNode; items: DropdownMenuItem[] }>;
}

/** Dropdown menus in a hairline strip. */
export function Menubar({ menus, className, ...props }: MenubarProps) {
  return (
    <div role="menubar" className={cx("rs-menubar", className)} {...props}>
      {menus.map((menu, index) => (
        <DropdownMenu key={index} label={menu.label} items={menu.items} />
      ))}
    </div>
  );
}
