import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone } from "../tokens.stylex";
import { rs } from "../rs";

export interface Crumb {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Crumb[];
}

const styles = stylex.create({
  crumbs: {
    fontSize: {
      default: 13,
      ["@media (max-width: 640px)"]: raster.controlFs,
    },
    color: raster.ink,
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: {
      default: "baseline",
      ["@media (max-width: 640px)"]: "center",
    },
    flexWrap: {
      default: null,
      ["@media (max-width: 640px)"]: "wrap",
    },
    gap: {
      default: 8,
      ["@media (max-width: 640px)"]: 6,
    },
  },
  link: {
    color: {
      default: raster.ink,
      ":link": raster.ink,
      ":visited": raster.ink,
      ":hover": raster.ink,
      ":active": raster.ink,
      ":focus": raster.ink,
      ":focus-visible": raster.ink,
    },
    textDecoration: "none",
    backgroundColor: "transparent",
    opacity: {
      default: 0.55,
      ":hover": 1,
      ":focus-visible": 1,
    },
    display: {
      default: null,
      ["@media (max-width: 640px)"]: "inline-flex",
    },
    alignItems: {
      default: null,
      ["@media (max-width: 640px)"]: "center",
    },
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
  },
  sep: {
    color: raster.ink,
    opacity: 0.4,
  },
  here: {
    color: raster.ink,
    opacity: 1,
    display: {
      default: null,
      ["@media (max-width: 640px)"]: "inline-flex",
    },
    alignItems: {
      default: null,
      ["@media (max-width: 640px)"]: "center",
    },
    minHeight: {
      default: null,
      ["@media (max-width: 640px)"]: raster.hit,
    },
  },
});

export function Breadcrumbs({ items, className, style, ...props }: BreadcrumbsProps) {
  const nav = rs(["rs-crumbs", className], styles.crumbs);
  const link = rs(["rs-crumbs-link"], styles.link);
  const sep = rs(["rs-crumbs-sep"], styles.sep);
  const here = rs(["rs-crumbs-here"], styles.here);
  return (
    <nav aria-label="Breadcrumbs" {...props} className={nav.className} style={{ ...nav.style, ...style }}>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className={sep.className} style={sep.style} aria-hidden="true">
                /
              </span>
            )}
            {last ? (
              <span className={here.className} style={here.style} aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <a className={link.className} style={link.style} href={item.href}>
                {item.label}
              </a>
            ) : (
              <span className={link.className} style={link.style}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
