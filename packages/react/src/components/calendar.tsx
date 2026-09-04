"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect" | "defaultValue"> {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  /** @deprecated Use `onValueChange`. */
  onSelect?: (date: Date) => void;
  defaultMonth?: Date;
  /** 0 = Sunday, 1 = Monday. */
  weekStart?: 0 | 1;
  /** Move focus to the roving day on mount (a date picker opening). */
  autoFocus?: boolean;
}

const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const DOW_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function sameDay(a: Date | undefined, b: Date): boolean {
  return (
    !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}
const sameMonth = (a: Date | undefined, b: Date) =>
  !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
/** Same day-of-month `n` months on, clamped to the target month's length. */
function addMonths(d: Date, n: number): Date {
  const first = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return new Date(first.getFullYear(), first.getMonth(), Math.min(d.getDate(), last));
}
const longDate = (d: Date) =>
  d.toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

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
  icon: {
    display: "block",
    color: "inherit",
  },
  grid: {
    width: 252,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 36px)",
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
  /* Gray at full opacity stays above 4.5:1 on paper and on the dark ground. */
  out: {
    color: raster.gray,
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

/**
 * Month grid with one roving tab stop. Arrows move by day and week,
 * Home/End to the week's ends, PageUp/PageDown by month (Shift: year).
 * Selected is ink; today is a hairline.
 */
export function Calendar({
  value,
  defaultValue,
  onValueChange,
  onSelect,
  defaultMonth,
  weekStart = 1,
  autoFocus,
  className,
  style,
  onKeyDown,
  ...props
}: CalendarProps) {
  const idBase = React.useId();
  const titleId = `${idBase}-title`;
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const selectedDate = isControlled ? value : inner;
  const today = new Date();

  const [month, setMonth] = React.useState(() => startOfMonth(selectedDate ?? defaultMonth ?? today));
  const [focusDate, setFocusDate] = React.useState(
    () => selectedDate ?? (sameMonth(today, month) ? today : month),
  );
  const cellRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const focusPending = React.useRef(false);

  /* Follow the value when it changes underneath: show its month, rove to it. */
  const valueKey = selectedDate ? dayKey(selectedDate) : "";
  const seenValueKey = React.useRef(valueKey);
  React.useEffect(() => {
    if (seenValueKey.current === valueKey) return;
    seenValueKey.current = valueKey;
    if (selectedDate) {
      setMonth(startOfMonth(selectedDate));
      setFocusDate(selectedDate);
    }
  }, [valueKey, selectedDate]);

  /* The roving cell is always inside the shown month. */
  const roving = sameMonth(focusDate, month)
    ? focusDate
    : sameMonth(selectedDate, month)
      ? selectedDate!
      : sameMonth(today, month)
        ? today
        : month;

  React.useEffect(() => {
    if (!focusPending.current) return;
    focusPending.current = false;
    cellRefs.current.get(dayKey(roving))?.focus();
  });

  /* Only on mount: the picker asks once, when it opens. */
  const rovingOnMount = React.useRef(roving);
  React.useEffect(() => {
    if (autoFocus) cellRefs.current.get(dayKey(rovingOnMount.current))?.focus();
  }, [autoFocus]);

  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() - weekStart + 7) % 7;
  const start = new Date(month.getFullYear(), month.getMonth(), 1 - lead);
  const weeks = Array.from({ length: 6 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)),
  );
  const title = month.toLocaleDateString("en", { month: "long", year: "numeric" });
  const dows = weekStart === 1 ? DOW : ["Su", ...DOW.slice(0, 6)];
  const dowsLong = weekStart === 1 ? DOW_LONG : ["Sunday", ...DOW_LONG.slice(0, 6)];

  const shift = (delta: number) => {
    const next = addMonths(month, delta);
    setMonth(startOfMonth(next));
    setFocusDate(addMonths(roving, delta));
  };

  const moveFocus = (next: Date) => {
    setFocusDate(next);
    if (!sameMonth(next, month)) setMonth(startOfMonth(next));
    focusPending.current = true;
  };

  const choose = (d: Date) => {
    if (!isControlled) setInner(d);
    onValueChange?.(d);
    onSelect?.(d);
    setFocusDate(d);
    if (!sameMonth(d, month)) setMonth(startOfMonth(d));
  };

  const onGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const from = roving;
    const dow = (from.getDay() - weekStart + 7) % 7;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        moveFocus(addDays(from, -1));
        return;
      case "ArrowRight":
        e.preventDefault();
        moveFocus(addDays(from, 1));
        return;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(addDays(from, -7));
        return;
      case "ArrowDown":
        e.preventDefault();
        moveFocus(addDays(from, 7));
        return;
      case "Home":
        e.preventDefault();
        moveFocus(addDays(from, -dow));
        return;
      case "End":
        e.preventDefault();
        moveFocus(addDays(from, 6 - dow));
        return;
      case "PageUp":
        e.preventDefault();
        moveFocus(addMonths(from, e.shiftKey ? -12 : -1));
        return;
      case "PageDown":
        e.preventDefault();
        moveFocus(addMonths(from, e.shiftKey ? 12 : 1));
        return;
      default:
        return;
    }
  };

  const cal = rs(["rs-cal", className], styles.cal);
  const head = rs(["rs-cal-head"], styles.head);
  const titleSx = rs(["rs-cal-title"], styles.title);
  const nav = rs(["rs-cal-nav"], styles.nav);
  const page = rs(["rs-page", "rs-cal-page"], styles.page);
  const icon = rs(["rs-cal-icon"], styles.icon);
  const grid = rs(["rs-cal-grid"], styles.grid);
  const row = rs(["rs-cal-row"], styles.row);
  const dow = rs(["rs-cal-dow"], styles.dow);

  return (
    <div {...props} className={cal.className} style={{ ...cal.style, ...style }}>
      <div className={head.className} style={head.style}>
        <span id={titleId} className={titleSx.className} style={titleSx.style} aria-live="polite">
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
      <div className={grid.className} style={grid.style} role="grid" aria-labelledby={titleId} onKeyDown={onGridKeyDown}>
        <div className={row.className} style={row.style} role="row">
          {dows.map((d, i) => (
            <span key={d} className={dow.className} style={dow.style} role="columnheader" aria-label={dowsLong[i]}>
              {d}
            </span>
          ))}
        </div>
        {weeks.map((week, w) => (
          <div key={w} className={row.className} style={row.style} role="row">
            {week.map((d) => {
              const out = d.getMonth() !== month.getMonth();
              const selected = sameDay(selectedDate, d);
              const isToday = sameDay(today, d);
              const key = dayKey(d);
              const day = rs(
                ["rs-cal-day", out && "rs-cal-day-out", isToday && "rs-cal-day-today", selected && "rs-cal-day-selected"],
                styles.day,
                out && styles.out,
                isToday && styles.today,
                selected && styles.selected,
              );
              return (
                <button
                  key={key}
                  ref={(el) => {
                    if (el) cellRefs.current.set(key, el);
                    else cellRefs.current.delete(key);
                  }}
                  type="button"
                  role="gridcell"
                  tabIndex={!out && sameDay(roving, d) ? 0 : -1}
                  className={day.className}
                  style={day.style}
                  aria-selected={selected}
                  aria-current={isToday ? "date" : undefined}
                  aria-label={longDate(d)}
                  onClick={() => choose(d)}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
