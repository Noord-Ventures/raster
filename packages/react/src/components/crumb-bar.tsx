"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface CrumbBarItem {
  label: React.ReactNode;
  href?: string;
}

export interface CrumbBarProps extends React.HTMLAttributes<HTMLElement> {
  trail: CrumbBarItem[];
  /** Pixels of scroll before the bar solidifies and the crumbs fade in. */
  threshold?: number;
  /** Root crumb, held in the TOC column from 900px. */
  root?: CrumbBarItem;
  /** Abbreviated root shown on phones in place of the full label. */
  rootShort?: React.ReactNode;
}

const styles = stylex.create({
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 160,
    display: "flex",
    alignItems: "center",
    height: {
      default: 72,
      [mq.phone]: 64,
    },
    fontSize: {
      default: 13,
      [mq.phone]: 12,
    },
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
    backgroundColor: "transparent",
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    transition: raster.transition,
  },
  scrolled: {
    backgroundColor: raster.paper,
    borderBottomColor: raster.divider,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    gap: {
      default: 20,
      [mq.at899]: 6,
    },
    width: "100%",
    minWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: {
      default: 56,
      [mq.phone]: 50,
      [mq.mobileGrid]: 56,
    },
    paddingLeft: {
      default: 76,
      [mq.rail]: raster.pad,
      [mq.phone]: 62,
      [mq.mobileGrid]: 74,
    },
    marginLeft: {
      default: null,
      [mq.rail]: 204,
    },
  },
  crumbs: {
    margin: 0,
    minWidth: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    opacity: 0,
    pointerEvents: "none",
    transition: `opacity ${raster.duration} ${raster.ease}`,
    fontSize: {
      default: 13,
      [mq.phone]: raster.controlFs,
    },
    color: raster.ink,
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: {
      default: "baseline",
      [mq.phone]: "center",
    },
    flexWrap: {
      default: null,
      [mq.phone]: "wrap",
    },
    gap: {
      default: 8,
      [mq.phone]: 6,
    },
  },
  crumbsOn: {
    opacity: 1,
    pointerEvents: "auto",
  },
  root: {
    flexShrink: 0,
    color: {
      default: raster.ink,
      ":link": raster.ink,
      ":visited": raster.ink,
    },
    textDecoration: "none",
    transition: `color ${raster.durationSnap} ${raster.ease}`,
    width: {
      default: null,
      [mq.at900]: 184,
    },
    fontWeight: {
      default: 500,
      [mq.at899]: 600,
    },
  },
  rootFull: {
    display: {
      default: null,
      [mq.phone]: "none",
    },
  },
  rootShort: {
    display: {
      default: "none",
      [mq.phone]: "inline",
    },
  },
  link: {
    color: {
      default: raster.ink,
      ":link": raster.ink,
      ":visited": raster.ink,
      ":hover": raster.ink,
      ":active": raster.ink,
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
  },
  sep: {
    color: raster.ink,
    opacity: 0.4,
  },
  here: {
    color: raster.ink,
    opacity: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  },
});

/**
 * The fixed top bar of the house chrome. Transparent at rest; once the
 * page cover scrolls away it gains the paper background and its bottom
 * hairline, and the breadcrumbs fade in.
 */
export function CrumbBar({ trail, threshold = 110, root, rootShort, className, style, ...props }: CrumbBarProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const bar = rs(["rs-crumb-bar", scrolled && "rs-crumb-bar-scrolled", className], styles.bar, scrolled && styles.scrolled);
  const inner = rs(["rs-crumb-bar-inner"], styles.inner);
  const crumbs = rs(["rs-crumbs", "rs-crumb-crumbs", scrolled && "rs-crumb-crumbs-on"], styles.crumbs, scrolled && styles.crumbsOn);
  const rootSx = rs(["rs-crumb-root"], styles.root);
  const rootFull = rs(["rs-crumb-root-full"], styles.rootFull);
  const rootShortSx = rs(["rs-crumb-root-short"], styles.rootShort);
  const link = rs(["rs-crumbs-link", "rs-crumb-link"], styles.link);
  const sep = rs(["rs-crumbs-sep", "rs-crumb-sep"], styles.sep);
  const here = rs(["rs-crumbs-here", "rs-crumb-here"], styles.here);

  const rootLabel = rootShort ? (
    <>
      <span className={rootFull.className} style={rootFull.style}>
        {root?.label}
      </span>
      <span className={rootShortSx.className} style={rootShortSx.style}>
        {rootShort}
      </span>
    </>
  ) : (
    root?.label
  );

  return (
    <nav aria-label="Breadcrumbs" {...props} className={bar.className} style={{ ...bar.style, ...style }}>
      <div className={inner.className} style={inner.style}>
        {root &&
          (root.href ? (
            <a className={rootSx.className} style={rootSx.style} href={root.href}>
              {rootLabel}
            </a>
          ) : (
            <span className={rootSx.className} style={rootSx.style}>
              {rootLabel}
            </span>
          ))}
        <p className={crumbs.className} style={crumbs.style}>
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span className={sep.className} style={sep.style} aria-hidden="true">
                    /
                  </span>
                )}
                {last ? (
                  <span className={here.className} style={here.style}>
                    {crumb.label}
                  </span>
                ) : crumb.href ? (
                  <a className={link.className} style={link.style} href={crumb.href}>
                    {crumb.label}
                  </a>
                ) : (
                  <span className={link.className} style={link.style}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </p>
      </div>
    </nav>
  );
}
