import { SmallMultiples } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function Use() {
  return (
    <UseField name="small-multiples">
      <h3 className="rs-use-type">Set</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Three cities</p>
          <p className="rs-use-copy">The same axes, repeated. One 184 column each.</p>
        </div>
        <SmallMultiples
          height={120}
          unit="sheets"
          panels={[
            { title: "Alkmaar", labels: DAYS, series: [{ name: "Sheets", values: [12, 18, 15, 26, 24] }] },
            { title: "Delft", labels: DAYS, series: [{ name: "Sheets", values: [8, 11, 9, 16, 14] }] },
            { title: "Haarlem", labels: DAYS, series: [{ name: "Sheets", values: [6, 7, 10, 9, 12] }] },
          ]}
        />
      </div>
    </UseField>
  );
}
