import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const styles = stylex.create({
  sidebar: {
    boxSizing: "border-box",
    width: {
      default: 204,
      [mq.phone]: "100%",
    },
    minHeight: 204,
    display: "flex",
    flexDirection: "column",
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    backgroundColor: raster.paper,
    borderRadius: 0,
  },
  head: {
    boxSizing: "border-box",
    paddingBlock: 16,
    paddingInline: 20,
    fontSize: {
      default: 13,
      [mq.phone]: raster.controlFs,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    display: {
      default: null,
      [mq.phone]: "flex",
    },
    alignItems: {
      default: null,
      [mq.phone]: "center",
    },
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 8,
    paddingInlineEnd: 0,
    paddingBottom: 32,
    paddingInlineStart: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  item: {
    display: {
      default: "block",
      [mq.phone]: "flex",
    },
    alignItems: {
      default: null,
      [mq.phone]: "center",
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    paddingTop: {
      default: 8,
      [mq.phone]: 12,
    },
    paddingInlineEnd: 20,
    paddingBottom: {
      default: 8,
      [mq.phone]: 12,
      ":last-child": 32,
    },
    paddingInlineStart: 20,
    fontSize: {
      default: 13,
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
  },
  label: {
    paddingTop: 16,
    paddingInlineEnd: 20,
    paddingBottom: {
      default: 4,
      [mq.phone]: 8,
    },
    paddingInlineStart: 20,
    fontSize: {
      default: 12,
      [mq.phone]: raster.controlLabel,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.gray,
  },
  foot: {
    boxSizing: "border-box",
    paddingTop: 12,
    paddingInlineEnd: 20,
    paddingBottom: 12,
    paddingInlineStart: 20,
    borderTopWidth: raster.hairline,
    borderTopStyle: "solid",
    borderTopColor: raster.divider,
    fontSize: {
      default: 12,
      [mq.phone]: 14,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: raster.gray,
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    display: {
      default: null,
      [mq.phone]: "flex",
    },
    alignItems: {
      default: null,
      [mq.phone]: "center",
    },
  },
});

/** One 204 module rail. Flush items, hairline edge. */
export function Sidebar({ className, style, ...props }: SidebarProps) {
  const sx = rs(["rs-sidebar", className], styles.sidebar);
  return <aside {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function SidebarHead({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-sidebar-head", className], styles.head);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Landmark name; pages carry several navs. */
  "aria-label"?: string;
}

export function SidebarNav({ className, style, "aria-label": ariaLabel = "Sidebar", ...props }: SidebarNavProps) {
  const sx = rs(["rs-sidebar-nav", className], styles.nav);
  return (
    <nav
      aria-label={props["aria-labelledby"] ? undefined : ariaLabel}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
}

export function SidebarItem({ current, className, style, ...props }: SidebarItemProps) {
  const sx = rs(["rs-sidebar-item", className], styles.item);
  return (
    <a
      aria-current={current ? "page" : undefined}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}

export function SidebarLabel({ className, style, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const sx = rs(["rs-sidebar-label", className], styles.label);
  return <p {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function SidebarFoot({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-sidebar-foot", className], styles.foot);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
