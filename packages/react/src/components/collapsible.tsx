"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface CollapsibleProps
  extends Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: React.ReactNode;
  defaultOpen?: boolean;
}

const styles = stylex.create({
  summary: {
    listStyle: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    minHeight: {
      default: 24,
      [mq.phone]: raster.hit,
    },
    fontSize: {
      default: 13.5,
      [mq.phone]: 17,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: raster.ink,
    "::-webkit-details-marker": {
      display: "none",
    },
    outlineWidth: {
      default: null,
      ":focus-visible": 2,
    },
    outlineStyle: {
      default: null,
      ":focus-visible": "solid",
    },
    outlineColor: {
      default: null,
      ":focus-visible": raster.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
  },
  chevron: {
    transition: {
      default: `transform ${raster.duration} ${raster.ease}`,
      [mq.reduce]: "none",
    },
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  body: {
    paddingTop: {
      default: 10,
      [mq.phone]: 12,
    },
    paddingInlineEnd: 0,
    paddingBottom: 0,
    paddingInlineStart: 0,
    fontSize: {
      default: 13.5,
      [mq.phone]: 16,
    },
    lineHeight: 1.6,
    color: raster.gray,
  },
});

/** A bare native <details>. */
export function Collapsible({
  title,
  defaultOpen,
  className,
  style,
  children,
  onToggle,
  open,
  ...props
}: CollapsibleProps) {
  const [innerOpen, setInnerOpen] = React.useState(!!defaultOpen);
  const isOpen = open ?? innerOpen;
  const root = rs(["rs-disclosure", className]);
  const summary = rs(["rs-disclosure-summary"], styles.summary);
  const chevron = rs(["rs-acc-chevron", "rs-disclosure-chevron", isOpen && "rs-disclosure-chevron-open"], styles.chevron, isOpen && styles.chevronOpen);
  const body = rs(["rs-disclosure-body"], styles.body);
  return (
    <details
      open={open ?? (defaultOpen || undefined)}
      onToggle={(e) => {
        setInnerOpen(e.currentTarget.open);
        onToggle?.(e);
      }}
      {...props}
      className={root.className}
      style={{ ...root.style, ...style }}
    >
      <summary className={summary.className} style={summary.style}>
        {title}
        <Icon name="chevron-right" rotate={90} className={chevron.className} style={chevron.style} />
      </summary>
      <div className={body.className} style={body.style}>
        {children}
      </div>
    </details>
  );
}
