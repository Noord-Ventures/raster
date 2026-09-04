"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { vlak, mq } from "../tokens.stylex";
import { rs } from "../rs";
import { Icon } from "./icon";

export interface DataTableColumn<Row> {
  key: string;
  header: React.ReactNode;
  /** Cell renderer; defaults to the row's value at `key`. */
  render?: (row: Row) => React.ReactNode;
  sortable?: boolean;
  /** Sort accessor; defaults to the row's value at `key`. */
  sortValue?: (row: Row) => string | number;
}

export interface DataTableProps<Row> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Array<DataTableColumn<Row>>;
  rows: Row[];
  rowKey?: (row: Row, index: number) => React.Key;
  emptyLabel?: React.ReactNode;
}

type Dir = "asc" | "desc";

const styles = stylex.create({
  table: {
    width: {
      default: "calc(100% + 40px)",
      [mq.phone]: `calc(100% + 2 * ${vlak.pad})`,
    },
    borderCollapse: "collapse",
    marginTop: "1rem",
    marginBottom: "1.5rem",
    marginInlineStart: {
      default: "-1.25rem",
      [mq.phone]: `calc(-1 * ${vlak.pad})`,
    },
    marginInlineEnd: {
      default: 0,
      [mq.phone]: `calc(-1 * ${vlak.pad})`,
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
    color: vlak.ink,
    letterSpacing: "-0.01em",
    paddingTop: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingInlineEnd: {
      default: "1rem",
      [mq.phone]: "0.75rem",
      ":last-child": {
        default: 20,
        [mq.phone]: vlak.pad,
      },
    },
    paddingBottom: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingInlineStart: {
      default: "0.75rem",
      [mq.phone]: "0.75rem",
      ":first-child": {
        default: 20,
        [mq.phone]: vlak.pad,
      },
    },
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: vlak.divider,
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
    paddingInlineEnd: {
      default: "1rem",
      [mq.phone]: "0.75rem",
      ":last-child": {
        default: 20,
        [mq.phone]: vlak.pad,
      },
    },
    paddingBottom: {
      default: "0.625rem",
      [mq.phone]: "0.875rem",
    },
    paddingInlineStart: {
      default: "0.75rem",
      [mq.phone]: "0.75rem",
      ":first-child": {
        default: 20,
        [mq.phone]: vlak.pad,
      },
    },
    color: vlak.gray,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    borderBottomWidth: vlak.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: vlak.divider,
    verticalAlign: "top",
    fontSize: {
      default: null,
      [mq.phone]: "1rem",
    },
    textAlign: {
      default: null,
      ":last-child": "end",
    },
  },
  tdAlt: {
    backgroundColor: vlak.tableAlt,
  },
  sort: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    padding: 0,
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: 600,
    letterSpacing: "inherit",
    color: "inherit",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3125rem",
    minHeight: "1.5rem",
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
      ":focus-visible": vlak.ink,
    },
    outlineOffset: {
      default: null,
      ":focus-visible": 2,
    },
  },
  /* Unsorted columns show a neutral sort mark in gray; the active one is an ink arrow. */
  sortIcon: {
    color: vlak.gray,
    opacity: 1,
  },
  sortIconOn: {
    color: vlak.ink,
  },
  empty: {
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    paddingInline: "1.25rem",
    textAlign: "center",
    fontSize: "0.8125rem",
    letterSpacing: "-0.01em",
    color: vlak.gray,
  },
});

/** Sortable rows over the plain rs-table. */
export const DataTable = React.forwardRef(function DataTable<Row extends Record<string, unknown>>({
  columns,
  rows,
  rowKey = (_, i) => i,
  emptyLabel = "Nothing here yet.",
  className,
  style,
  ...props
}: DataTableProps<Row>, ref: React.ForwardedRef<HTMLDivElement>) {
  const [sort, setSort] = React.useState<{ key: string; dir: Dir } | null>(null);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    const get = column?.sortValue ?? ((row: Row) => row[sort.key] as string | number);
    return [...rows].sort((a, b) => {
      const av = get(a);
      const bv = get(b);
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [rows, sort, columns]);

  const toggle = (key: string) =>
    setSort((s) => (s?.key === key ? (s.dir === "asc" ? { key, dir: "desc" } : null) : { key, dir: "asc" }));

  const table = rs(["rs-table", "rs-datatable-table"], styles.table);
  const th = rs(["rs-datatable-th"], styles.th);
  const empty = rs(["rs-datatable-empty"], styles.empty);

  return (
    <div ref={ref} {...props} className={className} style={style}>
      <table className={table.className} style={table.style}>
        <thead>
          <tr>
            {columns.map((column) => {
              const active = sort?.key === column.key;
              const sortBtn = rs(["rs-datatable-sort"], styles.sort);
              const sortIcon = rs(["rs-datatable-sort-icon", active && "rs-datatable-sort-icon-on"], styles.sortIcon, active && styles.sortIconOn);
              return (
                <th
                  key={column.key}
                  className={th.className}
                  style={th.style}
                  aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className={sortBtn.className}
                      style={sortBtn.style}
                      data-active={active}
                      onClick={() => toggle(column.key)}
                    >
                      {column.header}
                      <Icon
                        name={active ? (sort.dir === "desc" ? "arrow-down" : "arrow-up") : "sort"}
                        size={12}
                        className={sortIcon.className}
                        style={sortIcon.style}
                      />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, index) => (
            <tr key={rowKey(row, index)}>
              {columns.map((column) => {
                const cell = rs(["rs-datatable-td", index % 2 === 1 && "rs-datatable-td-alt"], styles.td, index % 2 === 1 && styles.tdAlt);
                return (
                  <td key={column.key} className={cell.className} style={cell.style}>
                    {column.render ? column.render(row) : (row[column.key] as React.ReactNode)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className={empty.className} style={empty.style}>
          {emptyLabel}
        </div>
      )}
    </div>
  );
  /* forwardRef cannot carry the row type parameter, so the export restates it. */
}) as <Row extends Record<string, unknown>>(
  props: DataTableProps<Row> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement;
