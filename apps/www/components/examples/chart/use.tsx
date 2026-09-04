"use client";

import * as React from "react";
import { LineChart, ToggleGroup } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SHEETS = [12, 18, 15, 26, 24];
const PROOFS = [4, 6, 5, 9, 7];

export function Use() {
  const [mode, setMode] = React.useState("run");
  return (
    <UseField name="chart">
      <h3 className="rs-use-type">Run</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Sheets this week</p>
          <p className="rs-use-copy">
            Two textures on one field. Spot is a single Crouwel red — not a rainbow.
          </p>
          <ToggleGroup
            value={mode}
            onValueChange={setMode}
            options={[
              { value: "run", label: "Run" },
              { value: "spot", label: "Spot" },
              { value: "invert", label: "Invert" },
            ]}
          />
        </div>
        <LineChart
          height={184}
          labels={DAYS}
          series={[
            { name: "Sheets", values: SHEETS },
            { name: "Proofs", values: PROOFS },
          ]}
          unit="sheets"
          locale="en"
          annotations={[{ at: 3, label: "Press" }]}
          spot={mode === "spot"}
          inverted={mode === "invert"}
        />
      </div>
    </UseField>
  );
}
