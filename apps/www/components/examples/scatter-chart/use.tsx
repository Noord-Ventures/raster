import { ScatterChart } from "@noordvc/raster-react";

const MARKS = [
  { x: 12, y: 18, label: "Alkmaar", group: "Press" },
  { x: 20, y: 28, label: "Delft", group: "Press" },
  { x: 28, y: 16, label: "Haarlem", group: "Press" },
  { x: 36, y: 34, label: "Utrecht", group: "Press" },
  { x: 48, y: 22, label: "Rotterdam", group: "Proof" },
  { x: 56, y: 40, label: "Eindhoven", group: "Proof" },
  { x: 68, y: 26, label: "Groningen", group: "Proof" },
  { x: 80, y: 44, label: "Amsterdam", group: "Proof" },
];

export function Use() {
  return (
    <article className="rs-use" data-use="scatter-chart">
      <h3 className="rs-use-type">Mark</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Press check</p>
          <p className="rs-use-copy">Module against density. Marks, not bubbles. One ink on the field.</p>
        </div>
        <ScatterChart
          height={184}
          points={MARKS}
          xLabel="Module"
          yLabel="Density"
          annotations={[{ at: 40, label: "204" }]}
        />
      </div>
    </article>
  );
}
