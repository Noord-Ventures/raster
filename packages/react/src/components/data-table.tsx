import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { raster, phone } from "../tokens.stylex";
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
      ["@media (max-width: 640px)"]: `calc(100% + 2 * ${raster.pad})`,
    },
    borderCollapse: "collapse",
    marginTop: 16,
    marginBottom: 24,
    marginLeft: {
      default: -20,
      ["@media (max-width: 640px)"]: `calc(-1 * ${raster.pad})`,
    },
    marginRight: {
      default: 0,
      ["@media (max-width: 640px)"]: `calc(-1 * ${raster.pad})`,
    },
    fontSize: {
      default: 14,
      ["@media (max-width: 640px)"]: 16,
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
      ["@media (max-width: 640px)"]: 14,
    },
    paddingRight: {
      default: 16,
      ["@media (max-width: 640px)"]: 12,
      ":last-child": {
        default: 20,
        ["@media (max-width: 640px)"]: raster.pad,
      },
    },
    paddingBottom: {
      default: 10,
      ["@media (max-width: 640px)"]: 14,
    },
    paddingLeft: {
      default: 12,
      ["@media (max-width: 640px)"]: 12,
      ":first-child": {
        default: 20,
        ["@media (max-width: 640px)"]: raster.pad,
      },
    },
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: raster.divider,
    fontSize: {
      default: 13,
      ["@media (max-width: 640px)"]: 15,
    },
  },
  td: {
    paddingTop: {
      default: 10,
      ["@media (max-width: 640px)"]: 14,
    },
    paddingRight: {
      default: 16,
      ["@media (max-width: 640px)"]: 12,
      ":last-child": {
        default: 20,
        ["@media (max-width: 640px)"]: raster.pad,
      },
    },
    paddingBottom: {
      default: 10,
      ["@media (max-width: 640px)"]: 14,
    },
    paddingLeft: {
      default: 12,
      ["@media (max-width: 640px)"]: 12,
      ":first-child": {
        default: 20,
        ["@media (max-width: 640px)"]: raster.pad,
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
      ["@media (max-width: 640px)"]: 16,
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
  },
  sortIcon: {
    opacity: 0.45,
  },
  sortIconOn: {
    opacity: 1,
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

  const table = rs(["rs-table"], styles.table);
  const th = rs([], styles.th);
  const empty = rs(["rs-datatable-empty"], styles.empty);

  return (
    <div {...props} className={className} style={style}>
      <table className={table.className} style={table.style}>
        <thead>
          <tr>
            {columns.map((column) => {
              const active = sort?.key === column.key;
              const sortBtn = rs(["rs-datatable-sort"], styles.sort);
              const sortIcon = rs([], styles.sortIcon, active && styles.sortIconOn);
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
                        name={active && sort.dir === "desc" ? "arrow-down" : "arrow-up"}
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
                const cell = rs([], styles.td, index % 2 === 1 && styles.tdAlt);
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
