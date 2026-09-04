"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value?: Date;
  onSelect?: (date: Date) => void;
  defaultMonth?: Date;
  /** 0 = Sunday, 1 = Monday. */
  weekStart?: 0 | 1;
}

const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function sameDay(a: Date | undefined, b: Date): boolean {
  return (
    !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

const styles = stylex.create({
  cal: {
    width: 252,
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: {
      default: 26,
      [mq.phone]: raster.hit,
    },
    marginBottom: 8,
  },
  title: {
    fontSize: {
      default: 13,
      [mq.phone]: raster.controlFs,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    lineHeight: "26px",
    color: raster.ink,
  },
  nav: {
    display: "flex",
    gap: {
      default: 5,
      [mq.phone]: 8,
    },
    flexShrink: 0,
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
    transform: "translateY(1px)",
  },
  icon: {
    display: "block",
    color: "inherit",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 36px)",
    width: 252,
  },
  dow: {
    fontSize: {
      default: 11,
      [mq.phone]: 13,
    },
    fontWeight: 500,
    color: raster.gray,
    textAlign: "center",
    paddingTop: 4,
    paddingBottom: 4,
    paddingInline: 0,
  },
  day: {
    boxSizing: "border-box",
    width: 36,
    height: 36,
    minWidth: 36,
    minHeight: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontVariantNumeric: "tabular-nums",
    color: raster.ink,
    backgroundColor: {
      default: "transparent",
      ":hover": raster.dividerSubtle,
      [mq.touch]: {
        ":hover": "transparent",
        ":active": raster.dividerSubtle,
      },
    },
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: "var(--rs-in, var(--radius-sm))",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: 0,
  },
  out: {
    color: raster.gray,
    opacity: 0.45,
  },
  today: {
    boxShadow: `inset 0 0 0 1px ${raster.divider}`,
  },
  selected: {
    backgroundColor: {
      default: raster.ink,
      ":hover": raster.ink,
    },
    color: raster.paper,
    fontWeight: 600,
  },
});

/** Month grid. Selected is ink; today is a hairline. */
export function Calendar({ value, onSelect, defaultMonth, weekStart = 1, className, style, ...props }: CalendarProps) {
  const [month, setMonth] = React.useState(() => {
    const base = value ?? defaultMonth ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() - weekStart + 7) % 7;
  const start = new Date(month.getFullYear(), month.getMonth(), 1 - lead);
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  const today = new Date();
  const title = month.toLocaleDateString("en", { month: "long", year: "numeric" });
  const dows = weekStart === 1 ? DOW : ["Su", ...DOW.slice(0, 6)];
  const shift = (delta: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  const cal = rs(["rs-cal", className], styles.cal);
  const head = rs(["rs-cal-head"], styles.head);
  const titleSx = rs(["rs-cal-title"], styles.title);
  const nav = rs(["rs-cal-nav"], styles.nav);
  const page = rs(["rs-page", "rs-cal-page"], styles.page);
  const icon = rs(["rs-cal-icon"], styles.icon);
  const grid = rs(["rs-cal-grid"], styles.grid);
  const dow = rs(["rs-cal-dow"], styles.dow);

  return (
    <div {...props} className={cal.className} style={{ ...cal.style, ...style }}>
      <div className={head.className} style={head.style}>
        <span className={titleSx.className} style={titleSx.style} aria-live="polite">
          {title}
        </span>
        <span className={nav.className} style={nav.style}>
          <button type="button" className={page.className} style={page.style} aria-label="Previous month" onClick={() => shift(-1)}>
            <Icon name="chevron-left" size={12} className={icon.className} style={icon.style} />
          </button>
          <button type="button" className={page.className} style={page.style} aria-label="Next month" onClick={() => shift(1)}>
            <Icon name="chevron-right" size={12} className={icon.className} style={icon.style} />
          </button>
        </span>
      </div>
      <div className={grid.className} style={grid.style} role="grid">
        {dows.map((d) => (
          <span key={d} className={dow.className} style={dow.style} role="columnheader">
            {d}
          </span>
        ))}
        {days.map((d) => {
          const out = d.getMonth() !== month.getMonth();
          const selected = sameDay(value, d);
          const day = rs(
            ["rs-cal-day", out && "rs-cal-day-out", sameDay(today, d) && "rs-cal-day-today", selected && "rs-cal-day-selected"],
            styles.day,
            out && styles.out,
            sameDay(today, d) && styles.today,
            selected && styles.selected,
          );
          return (
            <button
              key={d.toISOString()}
              type="button"
              className={day.className}
              style={day.style}
              aria-pressed={selected}
              aria-label={d.toDateString()}
              onClick={() => {
                onSelect?.(d);
                if (out) setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
