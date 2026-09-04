"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  "aria-label"?: string;
}

const fade =
  "linear-gradient(to right, transparent 0, black 28px, black calc(100% - 36px), transparent 100%)";

const styles = stylex.create({
  carousel: {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
  },
  track: {
    display: "flex",
    gap: raster.gutter,
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    scrollBehavior: {
      default: "smooth",
      [mq.reduce]: "auto",
    },
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
    maskImage: fade,
    paddingTop: 2,
    paddingBottom: 2,
    paddingInline: 0,
  },
  nav: {
    display: "flex",
    gap: {
      default: 5,
      [mq.phone]: 8,
    },
    marginTop: {
      default: 10,
      [mq.phone]: 14,
    },
  },
  page: {
    boxSizing: "border-box",
    width: {
      default: 26,
      [mq.phone]: raster.hit,
    },
    height: {
      default: 26,
      [mq.phone]: raster.hit,
    },
    minWidth: {
      default: null,
      [mq.phone]: raster.hit,
    },
    minHeight: {
      default: null,
      [mq.phone]: raster.hit,
    },
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: {
      default: 13,
      [mq.phone]: raster.controlFs,
    },
    color: raster.gray,
    borderWidth: raster.hairline,
    borderStyle: "solid",
    borderColor: raster.divider,
    padding: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    cursor: "pointer",
  },
  icon: {
    display: "block",
    color: "inherit",
  },
  slide: {
    flexShrink: 0,
    scrollSnapAlign: "start",
    borderRadius: {
      default: raster.radiusSm,
      [mq.phone]: 0,
    },
  },
});

export function CarouselSlide({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const sx = rs(["rs-carousel-slide", className], styles.slide);
  return <div {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

/** Native scroll snap; the buttons nudge. */
export function Carousel({ className, style, children, "aria-label": ariaLabel = "Carousel", ...props }: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * track.clientWidth * 0.8 });
  };
  const root = rs(["rs-carousel", className], styles.carousel);
  const track = rs(["rs-carousel-track"], styles.track);
  const nav = rs(["rs-carousel-nav"], styles.nav);
  const page = rs(["rs-page", "rs-carousel-page"], styles.page);
  const icon = rs(["rs-carousel-icon"], styles.icon);
  return (
    <div role="group" aria-label={ariaLabel} {...props} className={root.className} style={{ ...root.style, ...style }}>
      <div ref={trackRef} className={track.className} style={track.style} tabIndex={0}>
        {children}
      </div>
      <div className={nav.className} style={nav.style}>
        <button type="button" className={page.className} style={page.style} aria-label="Previous" onClick={() => nudge(-1)}>
          <Icon name="chevron-left" size={12} className={icon.className} style={icon.style} />
        </button>
        <button type="button" className={page.className} style={page.style} aria-label="Next" onClick={() => nudge(1)}>
          <Icon name="chevron-right" size={12} className={icon.className} style={icon.style} />
        </button>
      </div>
    </div>
  );
}
