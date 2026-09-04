import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
import { rs } from "../rs";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** 2px rules, ink cells. */
  total?: boolean;
}
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  total?: boolean;
}
export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}


const styles = stylex.create({
  table: {
    width: {
      default: "calc(100% + 40px)",
      [mq.phone]: "calc(100% + 2 * var(--pad))",
    },
    borderCollapse: "collapse",
    marginTop: "1rem",
    marginBottom: "1.5rem",
    marginInlineStart: {
      default: "-1.25rem",
      [mq.phone]: "calc(-1 * var(--pad))",
    },
    marginInlineEnd: {
      default: 0,
      [mq.phone]: "calc(-1 * var(--pad))",
    },
    fontSize: {
      default: "0.875rem",
      [mq.phone]: "1rem",
    },
  },
  th: {
    textAlign: {
      default: "start",
      ":last-child": "end",
    },
    fontWeight: 600,
    color: "var(--text)",
    letterSpacing: "-0.01em",
    paddingTop: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingBottom: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingInlineStart: {
      default: "0.75rem",
      ":first-child": "1.25rem",
      [mq.phone]: "0.75rem",
    },
    paddingInlineEnd: {
      default: "1rem",
      ":last-child": "1.25rem",
      [mq.phone]: "0.75rem",
    },
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    fontSize: {
      default: "0.8125rem",
      [mq.phone]: "0.9375rem",
    },
  },
  td: {
    paddingTop: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingBottom: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingInlineStart: {
      default: "0.75rem",
      ":first-child": "1.25rem",
      [mq.phone]: "0.75rem",
    },
    paddingInlineEnd: {
      default: "1rem",
      ":last-child": "1.25rem",
      [mq.phone]: "0.75rem",
    },
    color: raster.gray,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    verticalAlign: "top",
    textAlign: {
      default: "start",
      ":last-child": "end",
    },
  },
  row: {
    backgroundColor: {
      default: "transparent",
      ":nth-child(even)": "var(--table-alt)",
    },
  },
  total: {
    fontWeight: 500,
    color: "var(--text)",
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: raster.divider,
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    backgroundColor: "transparent",
  },
  totalCell: {
    fontWeight: 500,
    color: "var(--text)",
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
});

/** Open grid, 1px row rules, last column right-aligned. */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, style, ...props },
  ref,
) {
  const sx = rs(["rs-table", className], styles.table);
  return <table ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const TableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(function TableHead(
  { className, style, ...props },
  ref,
) {
  return <thead ref={ref} className={className} style={style} {...props} />;
});

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(function TableBody(
  { className, style, ...props },
  ref,
) {
  return <tbody ref={ref} className={className} style={style} {...props} />;
});

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { total, className, style, ...props },
  ref,
) {
  const sx = rs([total && "rs-total-row", className, "rs-table-row"], styles.row, total && styles.total);
  return <tr ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const TableTh = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(function TableTh(
  { className, style, ...props },
  ref,
) {
  const sx = rs([className, "rs-table-th"], styles.th);
  return <th ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});

export const TableTd = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableTd(
  { total, className, style, ...props },
  ref,
) {
  const sx = rs([className, "rs-table-td", total && "rs-table-total-cell"], styles.td, total && styles.totalCell);
  return <td ref={ref} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
});
