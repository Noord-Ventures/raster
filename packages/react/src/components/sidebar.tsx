import * as React from "react";
import { cx } from "../cx";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

/** One 204 module rail. Flush items, hairline edge. */
export function Sidebar({ className, ...props }: SidebarProps) {
  return <aside className={cx("rs-sidebar", className)} {...props} />;
}

export function SidebarHead({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("rs-sidebar-head", className)} {...props} />;
}

export function SidebarNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={cx("rs-sidebar-nav", className)} {...props} />;
}

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  current?: boolean;
}

export function SidebarItem({ current, className, ...props }: SidebarItemProps) {
  return (
    <a className={cx("rs-sidebar-item", className)} aria-current={current ? "page" : undefined} {...props} />
  );
}

export function SidebarLabel({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("rs-sidebar-label", className)} {...props} />;
}

export function SidebarFoot({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("rs-sidebar-foot", className)} {...props} />;
}
