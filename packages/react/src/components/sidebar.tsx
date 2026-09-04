import * as React from "react";
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
    paddingBlock: "1rem",
    paddingInline: "1.25rem",
    fontSize: {
      default: "0.8125rem",
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
    paddingTop: "0.5rem",
    paddingInlineEnd: 0,
    paddingBottom: "2rem",
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
      default: "0.5rem",
      [mq.phone]: "0.75rem",
    },
    paddingInlineEnd: "1.25rem",
    paddingBottom: {
      default: "0.5rem",
      [mq.phone]: "0.75rem",
      ":last-child": "2rem",
    },
    paddingInlineStart: "1.25rem",
    fontSize: {
      default: "0.8125rem",
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
    paddingTop: "1rem",
    paddingInlineEnd: "1.25rem",
    paddingBottom: {
      default: "0.25rem",
      [mq.phone]: "0.5rem",
    },
    paddingInlineStart: "1.25rem",
    fontSize: {
      default: "0.75rem",
      [mq.phone]: raster.controlLabel,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.gray,
  },
  foot: {
    boxSizing: "border-box",
    paddingTop: "0.75rem",
    paddingInlineEnd: "1.25rem",
    paddingBottom: "0.75rem",
    paddingInlineStart: "1.25rem",
    borderTopWidth: raster.hairline,
    borderTopStyle: "solid",
    borderTopColor: raster.divider,
    fontSize: {
      default: "0.75rem",
      [mq.phone]: "0.875rem",
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
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-sidebar", className], styles.sidebar);
  return <aside ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const SidebarHead = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarHead(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-sidebar-head", className], styles.head);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Landmark name; pages carry several navs. */
  "aria-label"?: string;
}

export const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(function SidebarNav(
  { className, style, "aria-label": ariaLabel = "Sidebar", ...props },
  ref,
) {
  const sx = rs(["rs-sidebar-nav", className], styles.nav);
  return (
    <nav
      ref={ref}
      aria-label={props["aria-labelledby"] ? undefined : ariaLabel}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
});

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
}

export const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(function SidebarItem(
  { current, className, style, ...props },
  ref,
) {
  const sx = rs(["rs-sidebar-item", className], styles.item);
  return (
    <a
      ref={ref}
      aria-current={current ? "page" : undefined}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
});

export const SidebarLabel = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(function SidebarLabel(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-sidebar-label", className], styles.label);
  return <p ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const SidebarFoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarFoot(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-sidebar-foot", className], styles.foot);
  return <div ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
