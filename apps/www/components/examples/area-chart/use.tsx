import { AreaChart } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="area-chart">
      <h3 className="rs-use-type">Sheet</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Density this run</p>
          <p className="rs-use-copy">The field is filled, not shaded. One series, one ink, one press mark.</p>
        </div>
        <AreaChart
          height={184}
          labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
          series={[{ name: "Sheets", values: [8, 14, 12, 22, 18] }]}
          unit="sheets"
          yLabel="Sheets"
          annotations={[{ at: 3, label: "Press" }]}
        />
      </div>
    </UseField>
  );
}
