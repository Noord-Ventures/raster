import { DataTable } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="data-table">
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
    </UseField>
  );
}
