"use client";

import * as React from "react";
import { Brand } from "../mark";
import { Scene } from "./map";

const UNITS = [
  { id: "04", name: "Van 04", state: "Moving", where: "Market / 3rd", trip: "Pier 70 → Mission" },
  { id: "19", name: "Van 19", state: "Hold", where: "Embarcadero", trip: "Ferry → Folsom" },
  { id: "03", name: "Van 03", state: "Yard", where: "16th / Rhode Island", trip: "Potrero loop" },
  { id: "11", name: "Van 11", state: "Moving", where: "Van Ness", trip: "Civic → Geary" },
];

export function Board() {
  const [unit, setUnit] = React.useState("04");
  const [pane, setPane] = React.useState<"none" | "trip">("none");
  const item = UNITS.find((row) => row.id === unit) ?? UNITS[0]!;

  return (
    <main className="if-board sc-night" aria-label="Night" style={{ ["--if-spot" as string]: "#E30613" }}>
      <aside className="sc-night-rail" aria-label="Field">
        <div className="sc-night-brand">
          <Brand slug="night" title="Night" />
          <p className="sc-night-voice">On the street</p>
        </div>
        <p className="sc-night-label">Field</p>
        {UNITS.map((row) => (
          <button
            key={row.id}
            type="button"
            className="sc-night-unit"
            aria-current={unit === row.id}
            onClick={() => {
              setUnit(row.id);
              setPane("none");
            }}
          >
            <b>{row.name}</b>
            <i>{row.state}</i>
            <em>{row.where}</em>
          </button>
        ))}
      </aside>

      <section className="sc-night-field">
        <header className="sc-night-head">
          <p>
            {item.name} · {item.state}
          </p>
          <button type="button" className="sc-night-ghost" onClick={() => setPane("trip")}>
            Open trip
          </button>
        </header>
        <div className="sc-night-map">
          <Scene selected={unit} />
        </div>
      </section>

      <aside className={`if-inspect${pane === "trip" ? " is-open" : ""}`} aria-label="Trip">
        {pane === "trip" ? (
          <div key={item.id} className="sc-night-inspect sc-fresh">
            <p className="sc-night-label">Trip</p>
            <p className="sc-night-trip">{item.trip}</p>
            <p>San Francisco field. Streets, water, traffic, one selected unit.</p>
            <dl>
              <div>
                <dt>Unit</dt>
                <dd>{item.name}</dd>
              </div>
              <div>
                <dt>State</dt>
                <dd>{item.state}</dd>
              </div>
              <div>
                <dt>Now</dt>
                <dd>{item.where}</dd>
              </div>
            </dl>
            <button type="button" className="sc-night-ghost" onClick={() => setPane("none")}>
              Close
            </button>
          </div>
        ) : null}
      </aside>
    </main>
  );
}
