import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster } from "../tokens.stylex";
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

const phone = "@media (max-width: 640px)";

const styles = stylex.create({
  table: {
    width: {
      default: "calc(100% + 40px)",
      [phone]: "calc(100% + 2 * var(--pad))",
    },
    borderCollapse: "collapse",
    marginTop: 16,
    marginBottom: 24,
    marginLeft: {
      default: -20,
      [phone]: "calc(-1 * var(--pad))",
    },
    marginRight: {
      default: 0,
      [phone]: "calc(-1 * var(--pad))",
    },
    fontSize: {
      default: 14,
      [phone]: 16,
    },
  },
  th: {
    textAlign: {
      default: "left",
      ":last-child": "right",
    },
    fontWeight: 600,
    color: "var(--text)",
    letterSpacing: "-0.01em",
    paddingTop: {
      default: 10,
      [phone]: 14,
    },
    paddingBottom: {
      default: 10,
      [phone]: 14,
    },
    paddingLeft: {
      default: 12,
      ":first-child": 20,
      [phone]: 12,
    },
    paddingRight: {
      default: 16,
      ":last-child": 20,
      [phone]: 12,
    },
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    fontSize: {
      default: 13,
      [phone]: 15,
    },
  },
  td: {
    paddingTop: {
      default: 10,
      [phone]: 14,
    },
    paddingBottom: {
      default: 10,
      [phone]: 14,
    },
    paddingLeft: {
      default: 12,
      ":first-child": 20,
      [phone]: 12,
    },
    paddingRight: {
      default: 16,
      ":last-child": 20,
      [phone]: 12,
    },
    color: raster.gray,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    verticalAlign: "top",
    textAlign: {
      default: "left",
      ":last-child": "right",
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

export function TableHead({ className, style, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={className} style={style} {...props} />;
}

export function TableBody({ className, style, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} style={style} {...props} />;
}

export function TableRow({ total, className, style, ...props }: TableRowProps) {
  const sx = rs([total && "rs-total-row", className], styles.row, total && styles.total);
  return <tr {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function TableTh({ className, style, ...props }: TableHeaderCellProps) {
  const sx = rs([className], styles.th);
  return <th {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}

export function TableTd({ total, className, style, ...props }: TableCellProps) {
  const sx = rs([className], styles.td, total && styles.totalCell);
  return <td {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
