import * as React from "react";
import { cx } from "../cx";
import { Icon } from "./icon";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current 1-based page. */
  page: number;
  count: number;
  onPageChange?: (page: number) => void;
  /** Pages kept visible around the current one. */
  siblings?: number;
}

function pageItems(page: number, count: number, siblings: number): Array<number | "gap"> {
  const wanted = new Set<number>([1, count]);
  for (let p = page - siblings; p <= page + siblings; p++) {
    if (p >= 1 && p <= count) wanted.add(p);
  }
  const sorted = [...wanted].sort((a, b) => a - b);
  const items: Array<number | "gap"> = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev === 2) items.push(prev + 1);
    else if (prev && p - prev > 2) items.push("gap");
    items.push(p);
    prev = p;
  }
  return items;
}

export function Pagination({
  page,
  count,
  onPageChange,
  siblings = 1,
  className,
  ...props
}: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cx("rs-pages", className)} {...props}>
      <button
        type="button"
        className="rs-page"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
      >
        <Icon name="chevron-left" size={12} />
      </button>
      {pageItems(page, count, siblings).map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} className="rs-page rs-page-gap" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={cx("rs-page", item === page && "rs-page-on")}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange?.(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className="rs-page"
        aria-label="Next page"
        disabled={page >= count}
        onClick={() => onPageChange?.(page + 1)}
      >
        <Icon name="chevron-right" size={12} />
      </button>
    </nav>
  );
}
