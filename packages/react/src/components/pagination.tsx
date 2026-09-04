import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current 1-based page. */
  page: number;
  count: number;
  onPageChange?: (page: number) => void;
  /** Pages kept visible around the current one. */
  siblings?: number;
}

const styles = stylex.create({
  pages: {
    display: "flex",
    alignItems: "center",
    gap: {
      default: 5,
      [mq.phone]: 8,
    },
    flexWrap: {
      default: null,
      [mq.phone]: "wrap",
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
  on: {
    backgroundColor: raster.ink,
    color: raster.paper,
    fontWeight: 600,
    borderColor: "transparent",
  },
  gap: {
    borderColor: "transparent",
    cursor: "default",
  },
  icon: {
    display: "block",
    color: "inherit",
  },
});

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
  style,
  ...props
}: PaginationProps) {
  const nav = rs(["rs-pages", className], styles.pages);
  const icon = rs(["rs-pages-icon"], styles.icon);
  return (
    <nav aria-label="Pagination" {...props} className={nav.className} style={{ ...nav.style, ...style }}>
      <PageButton aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>
        <Icon name="chevron-left" size={12} className={icon.className} style={icon.style} />
      </PageButton>
      {pageItems(page, count, siblings).map((item, index) => {
        if (item === "gap") {
          const gap = rs(["rs-page", "rs-page-gap"], styles.page, styles.gap);
          return (
            <span key={`gap-${index}`} className={gap.className} style={gap.style} aria-hidden="true">
              …
            </span>
          );
        }
        return (
          <PageButton
            key={item}
            current={item === page}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange?.(item)}
          >
            {item}
          </PageButton>
        );
      })}
      <PageButton aria-label="Next page" disabled={page >= count} onClick={() => onPageChange?.(page + 1)}>
        <Icon name="chevron-right" size={12} className={icon.className} style={icon.style} />
      </PageButton>
    </nav>
  );
}

function PageButton({
  current,
  className,
  style,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { current?: boolean }) {
  const sx = rs(["rs-page", current && "rs-page-on", className], styles.page, current && styles.on);
  return <button type="button" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
