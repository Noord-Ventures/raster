import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone, mobileGrid, rail } from "../tokens.stylex";
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
      ["@media (max-width: 640px)"]: 64,
    },
    fontSize: {
      default: 13,
      ["@media (max-width: 640px)"]: 12,
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
      ["@media (max-width: 899px)"]: 6,
    },
    width: "100%",
    minWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: {
      default: 56,
      ["@media (max-width: 640px)"]: 50,
      ["@media (max-width: 480px)"]: 56,
    },
    paddingLeft: {
      default: 76,
      ["@media (min-width: 1024px)"]: raster.pad,
      ["@media (max-width: 640px)"]: 62,
      ["@media (max-width: 480px)"]: 74,
    },
    marginLeft: {
      default: null,
      ["@media (min-width: 1024px)"]: 204,
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
      ["@media (min-width: 900px)"]: 184,
    },
    fontWeight: {
      default: 500,
      ["@media (max-width: 899px)"]: 600,
    },
  },
  rootFull: {
    display: {
      default: null,
      ["@media (max-width: 640px)"]: "none",
    },
  },
  rootShort: {
    display: {
      default: "none",
      ["@media (max-width: 640px)"]: "inline",
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
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  const crumbs = rs(["rs-crumbs"], styles.crumbs, scrolled && styles.crumbsOn);
  const rootSx = rs(["rs-crumb-root"], styles.root);
  const rootFull = rs(["rs-crumb-root-full"], styles.rootFull);
  const rootShortSx = rs(["rs-crumb-root-short"], styles.rootShort);
  const link = rs(["rs-crumbs-link"], styles.link);
  const sep = rs(["rs-crumbs-sep"], styles.sep);
  const here = rs(["rs-crumbs-here"], styles.here);

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
