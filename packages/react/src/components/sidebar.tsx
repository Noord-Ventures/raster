import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone } from "../tokens.stylex";
import { rs } from "../rs";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const styles = stylex.create({
  sidebar: {
    boxSizing: "border-box",
    width: {
      default: 204,
      ["@media (max-width: 640px)"]: "100%",
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
      ["@media (max-width: 640px)"]: raster.controlFs,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    display: {
      default: null,
      ["@media (max-width: 640px)"]: "flex",
    },
    alignItems: {
      default: null,
      ["@media (max-width: 640px)"]: "center",
    },
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 8,
    paddingRight: 0,
    paddingBottom: 32,
    paddingLeft: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  item: {
    display: {
      default: "block",
      ["@media (max-width: 640px)"]: "flex",
    },
    alignItems: {
      default: null,
      ["@media (max-width: 640px)"]: "center",
    },
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    paddingTop: {
      default: 8,
      ["@media (max-width: 640px)"]: 12,
    },
    paddingRight: 20,
    paddingBottom: {
      default: 8,
      ["@media (max-width: 640px)"]: 12,
      ":last-child": 32,
    },
    paddingLeft: 20,
    fontSize: {
      default: 13,
      ["@media (max-width: 640px)"]: raster.controlFs,
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
    paddingRight: 20,
    paddingBottom: {
      default: 4,
      ["@media (max-width: 640px)"]: 8,
    },
    paddingLeft: 20,
    fontSize: {
      default: 12,
      ["@media (max-width: 640px)"]: raster.controlLabel,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.gray,
  },
  foot: {
    boxSizing: "border-box",
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 12,
    paddingLeft: 20,
    borderTopWidth: raster.hairline,
    borderTopStyle: "solid",
    borderTopColor: raster.divider,
    fontSize: {
      default: 12,
      ["@media (max-width: 640px)"]: 14,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: raster.gray,
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
    display: {
      default: null,
      ["@media (max-width: 640px)"]: "flex",
    },
    alignItems: {
      default: null,
      ["@media (max-width: 640px)"]: "center",
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

export function SidebarNav({ className, style, ...props }: React.HTMLAttributes<HTMLElement>) {
  const sx = rs(["rs-sidebar-nav", className], styles.nav);
  return <nav {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
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
