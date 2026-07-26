import * as React from "react";
import { cx } from "../cx";

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

/** Sortable rows over the plain rs-table. */
export function DataTable<Row extends Record<string, unknown>>({
  columns,
  rows,
  rowKey = (_, i) => i,
  emptyLabel = "Nothing here yet.",
  className,
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

  return (
    <div className={cx(className)} {...props}>
      <table className="rs-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} aria-sort={sort?.key === column.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}>
                {column.sortable ? (
                  <button type="button" className="rs-datatable-sort" data-active={sort?.key === column.key} onClick={() => toggle(column.key)}>
                    {column.header}
                    <svg viewBox="0 0 10 12" width="8" height="10" fill="none" aria-hidden="true">
                      {sort?.key === column.key && sort.dir === "desc" ? (
                        <path d="M5 10V2M2 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      ) : (
                        <path d="M5 2v8M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                    </svg>
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, index) => (
            <tr key={rowKey(row, index)}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row) : (row[column.key] as React.ReactNode)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="rs-datatable-empty">{emptyLabel}</div>}
    </div>
  );
}
