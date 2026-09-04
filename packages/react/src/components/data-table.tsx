"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, mq } from "../tokens.stylex";
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
      [mq.phone]: `calc(100% + 2 * ${raster.pad})`,
    },
    borderCollapse: "collapse",
    marginTop: 16,
    marginBottom: 24,
    marginLeft: {
      default: -20,
      [mq.phone]: `calc(-1 * ${raster.pad})`,
    },
    marginRight: {
      default: 0,
      [mq.phone]: `calc(-1 * ${raster.pad})`,
    },
    fontSize: {
      default: 14,
      [mq.phone]: 16,
    },
  },
  th: {
    textAlign: {
      default: "left",
      ":last-child": "right",
    },
    fontWeight: 600,
    color: raster.ink,
    letterSpacing: "-0.01em",
    paddingTop: {
      default: 10,
      [mq.phone]: 14,
    },
    paddingRight: {
      default: 16,
      [mq.phone]: 12,
      ":last-child": {
        default: 20,
        [mq.phone]: raster.pad,
      },
    },
    paddingBottom: {
      default: 10,
      [mq.phone]: 14,
    },
    paddingLeft: {
      default: 12,
      [mq.phone]: 12,
      ":first-child": {
        default: 20,
        [mq.phone]: raster.pad,
      },
    },
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    fontSize: {
      default: 13,
      [mq.phone]: 15,
    },
  },
  td: {
    paddingTop: {
      default: 10,
      [mq.phone]: 14,
    },
    paddingRight: {
      default: 16,
      [mq.phone]: 12,
      ":last-child": {
        default: 20,
        [mq.phone]: raster.pad,
      },
    },
    paddingBottom: {
      default: 10,
      [mq.phone]: 14,
    },
    paddingLeft: {
      default: 12,
      [mq.phone]: 12,
      ":first-child": {
        default: 20,
        [mq.phone]: raster.pad,
      },
    },
    color: raster.gray,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    borderBottomWidth: raster.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    verticalAlign: "top",
    fontSize: {
      default: null,
      [mq.phone]: 16,
    },
    textAlign: {
      default: null,
      ":last-child": "right",
    },
  },
  tdAlt: {
    backgroundColor: raster.tableAlt,
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
    gap: 5,
    minHeight: 24,
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
  /* Unsorted columns show a neutral sort mark in gray; the active one is an ink arrow. */
  sortIcon: {
    color: raster.gray,
    opacity: 1,
  },
  sortIconOn: {
    color: raster.ink,
  },
  empty: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingInline: 20,
    textAlign: "center",
    fontSize: 13,
    letterSpacing: "-0.01em",
    color: raster.gray,
  },
});

/** Sortable rows over the plain rs-table. */
export function DataTable<Row extends Record<string, unknown>>({
  columns,
  rows,
  rowKey = (_, i) => i,
  emptyLabel = "Nothing here yet.",
  className,
  style,
  ...props
}: DataTableProps<Row>) {
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
    <div {...props} className={className} style={style}>
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
}
