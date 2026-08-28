"use client";

import * as React from "react";
import { Brand } from "../mark";
import { FleetMap } from "./map";

const ACTIVE = [
  { id: "Van 04", where: "Kennemerstraatweg", meta: "En route" },
  { id: "Van 11", where: "Spoorbrug", meta: "En route" },
  { id: "Bike 08", where: "Kaasmarkt", meta: "Pickup" },
  { id: "Boat 02", where: "Oudegracht", meta: "Hold" },
];

const INACTIVE = [
  { id: "Van 19", where: "Yard north", meta: "Parked" },
  { id: "Van 03", where: "Yard north", meta: "Service" },
];

export function Board() {
  const [pick, setPick] = React.useState("Van 04");
  const [alert, setAlert] = React.useState(true);
  const chosen = ACTIVE.find((unit) => unit.id === pick) ?? ACTIVE[0]!;

  return (
    <main className="if-board sc-fleet" aria-label="Nacht">
      <aside className="sc-fleet-rail" aria-label="Nacht">
        <Brand slug="fleet" title="Nacht" />
        <p className="sc-fleet-voice">Night</p>
        <h2>Active</h2>
        {ACTIVE.map((unit) => (
          <button
            key={unit.id}
            type="button"
            className="sc-fleet-unit"
            aria-current={pick === unit.id}
            onClick={() => setPick(unit.id)}
          >
            <span>
              {unit.id}
              <br />
              <small>{unit.where}</small>
            </span>
            <span className="sc-fleet-live">{unit.meta}</span>
          </button>
        ))}
        <h2>Yard</h2>
        {INACTIVE.map((unit) => (
          <div key={unit.id} className="sc-fleet-unit">
            <span>
              {unit.id}
              <br />
              <small>{unit.where}</small>
            </span>
            <span>{unit.meta}</span>
          </div>
        ))}
      </aside>
      <FleetMap selected={pick} />
      <section className="sc-fleet-c" aria-label="Alerts">
        {alert ? (
          <div className="sc-fleet-alert">
            <p>
              <strong>Density drop on plate 09.</strong> {chosen.id} is selected. Boat 02 is holding on
              the Oudegracht.
            </p>
            <button type="button" onClick={() => setAlert(false)}>
              Acknowledge
            </button>
          </div>
        ) : (
          <p className="sc-fleet-quiet sc-fresh">No open alerts. {chosen.id} stays selected.</p>
        )}
      </section>
    </main>
  );
}
