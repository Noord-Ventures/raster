import { LineChart } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="chart">
      <h3 className="rs-use-type">Run</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Sheets this week</p>
          <p className="rs-use-copy">One series, one ink. The field is the picture.</p>
          <LineChart
            height={120}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
            series={[{ name: "Sheets", values: [12, 18, 15, 26, 24] }]}
            area
          />
        </div>
      </div>
    </article>
  );
}
