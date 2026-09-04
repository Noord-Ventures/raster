import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { DropdownMenu, type DropdownMenuItem } from "./dropdown-menu";

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  menus: Array<{ label: React.ReactNode; items: DropdownMenuItem[] }>;
}

const styles = stylex.create({
  bar: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    width: {
      default: null,
      [mq.phone]: "100%",
    },
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    padding: {
      default: 2,
      [mq.phone]: 0,
    },
  },
});

/** Dropdown menus in a hairline strip. */
export function Menubar({ menus, className, style, ...props }: MenubarProps) {
  const sx = rs(["rs-menubar", className], styles.bar);
  return (
    <div role="menubar" {...props} className={sx.className} style={{ ...sx.style, ...style }}>
      {menus.map((menu, index) => (
        <DropdownMenu key={index} label={menu.label} items={menu.items} />
      ))}
    </div>
  );
}
