import { DataTable } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="data-table">
      <h3 className="rs-use-type">Sort</h3>
      <div className="rs-use-body">
        <DataTable
          columns={[
            { key: "phase", header: "Phase" },
            { key: "weeks", header: "Weeks" },
          ]}
          rows={[
            { phase: "Identity", weeks: 4 },
            { phase: "Strategy", weeks: 2 },
          ]}
        />
      </div>
    </article>
  );
}
