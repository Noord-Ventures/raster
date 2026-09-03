"use client";

import * as React from "react";
import { BarChart, ToggleGroup } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

const CITIES = [
  { label: "Alkmaar", value: 42 },
  { label: "Delft", value: 28 },
  { label: "Haarlem", value: 21 },
  { label: "Utrecht", value: 16 },
];

export function Use() {
  const [orientation, setOrientation] = React.useState("vertical");
  return (
    <UseField name="bar-chart">
      <h3 className="rs-use-type">Press</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Issues by city</p>
          <p className="rs-use-copy">Thin ink bars. Flush, no radius. Vertical or across.</p>
          <ToggleGroup
            value={orientation}
            onValueChange={setOrientation}
            options={[
              { value: "vertical", label: "Vertical" },
              { value: "horizontal", label: "Horizontal" },
            ]}
          />
        </div>
        <BarChart
          height={184}
          data={CITIES}
          unit="issues"
          yLabel="This issue"
          orientation={orientation === "horizontal" ? "horizontal" : "vertical"}
        />
      </div>
    </UseField>
  );
}
