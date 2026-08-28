import * as React from "react";
import { cx } from "../cx";
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

/** Month grid. Selected is ink; today is a hairline. */
export function Calendar({ value, onSelect, defaultMonth, weekStart = 1, className, ...props }: CalendarProps) {
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

  return (
    <div className={cx("rs-cal", className)} {...props}>
      <div className="rs-cal-head">
        <span className="rs-cal-title" aria-live="polite">
          {title}
        </span>
        <span className="rs-cal-nav">
          <button type="button" className="rs-page" aria-label="Previous month" onClick={() => shift(-1)}>
            <Icon name="chevron-left" size={12} />
          </button>
          <button type="button" className="rs-page" aria-label="Next month" onClick={() => shift(1)}>
            <Icon name="chevron-right" size={12} />
          </button>
        </span>
      </div>
      <div className="rs-cal-grid" role="grid">
        {dows.map((d) => (
          <span key={d} className="rs-cal-dow" role="columnheader">
            {d}
          </span>
        ))}
        {days.map((d) => {
          const out = d.getMonth() !== month.getMonth();
          const selected = sameDay(value, d);
          return (
            <button
              key={d.toISOString()}
              type="button"
              className={cx(
                "rs-cal-day",
                out && "rs-cal-day-out",
                sameDay(today, d) && "rs-cal-day-today",
                selected && "rs-cal-day-selected",
              )}
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
