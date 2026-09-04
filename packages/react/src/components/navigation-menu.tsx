import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{ label: React.ReactNode; href: string; current?: boolean }>;
}

const styles = stylex.create({
  nav: {
    display: "flex",
    alignItems: "center",
    gap: {
      default: 22,
      [mq.phone]: 0,
    },
    flexWrap: {
      default: null,
      [mq.phone]: "wrap",
    },
  },
  link: {
    display: {
      default: null,
      [mq.phone]: "inline-flex",
    },
    alignItems: {
      default: null,
      [mq.phone]: "center",
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    paddingInline: {
      default: null,
      [mq.phone]: 12,
    },
    fontSize: {
      default: 14,
      [mq.phone]: raster.controlFs,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: {
      default: raster.gray,
      ":link": raster.gray,
      ":visited": raster.gray,
      ":hover": raster.ink,
      '[aria-current="page"]': raster.ink,
    },
    textDecoration: "none",
    transition: `color ${raster.durationSnap} ${raster.ease}`,
  },
});

/** Links in a row; the current page is ink. */
export function NavigationMenu({ items, className, style, ...props }: NavigationMenuProps) {
  const nav = rs(["rs-nav", className], styles.nav);
  const link = rs(["rs-nav-link"], styles.link);
  return (
    <nav {...props} className={nav.className} style={{ ...nav.style, ...style }}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={link.className}
          style={link.style}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
