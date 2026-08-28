"use client";

import * as React from "react";
import { Icon } from "@noorddev/raster-react";
import { Brand } from "../mark";
import { Scene } from "./map";

const UNITS = [
  { id: "04", name: "Van 04", state: "Moving", where: "Market / 3rd", trip: "Pier 70 → Mission", mark: "activity" as const },
  { id: "19", name: "Van 19", state: "Hold", where: "Embarcadero", trip: "Ferry → Folsom", mark: "pause" as const },
  { id: "03", name: "Van 03", state: "Yard", where: "16th / Rhode Island", trip: "Potrero loop", mark: "building" as const },
  { id: "11", name: "Van 11", state: "Moving", where: "Van Ness", trip: "Civic → Geary", mark: "activity" as const },
];

export function Board() {
  const [unit, setUnit] = React.useState("04");
  const [pane, setPane] = React.useState<"none" | "trip">("none");
  const item = UNITS.find((row) => row.id === unit) ?? UNITS[0]!;

  return (
    <main className="if-board sc-night" aria-label="Night" style={{ ["--if-spot" as string]: "#E30613" }}>
      <aside className="sc-night-rail" aria-label="Fleet">
        <div className="sc-night-brand">
          <Brand slug="night" title="Night" />
          <p className="sc-night-voice">On the street</p>
        </div>
        <p className="sc-night-label if-ico-row">
          <Icon name="truck" size={12} />
          Fleet
        </p>
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
            <b className="if-ico-row">
              <Icon name="truck" size={16} />
              {row.name}
            </b>
            <i className="if-ico-row">
              <Icon name={row.mark} size={12} />
              {row.state}
            </i>
            <em className="if-ico-row">
              <Icon name="map-pin" size={12} />
              {row.where}
            </em>
          </button>
        ))}
      </aside>

      <section className="sc-night-field">
        <header className="sc-night-head">
          <p className="if-ico-row">
            <Icon name="truck" size={16} />
            {item.name}
            <Icon name={item.mark} size={12} />
            {item.state}
          </p>
          <button type="button" className="sc-night-ghost" onClick={() => setPane("trip")}>
            <Icon name="compass" size={12} />
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
            <p className="sc-night-label if-ico-row">
              <Icon name="map" size={12} />
              Trip
            </p>
            <p className="sc-night-trip if-ico-row">
              <Icon name="flag" size={12} />
              {item.trip}
            </p>
            <p className="if-ico-row">
              <Icon name="globe" size={12} />
              San Francisco field. Streets, water, traffic, one selected unit.
            </p>
            <dl>
              <div>
                <dt className="if-ico-row">
                  <Icon name="truck" size={12} />
                  Unit
                </dt>
                <dd>{item.name}</dd>
              </div>
              <div>
                <dt className="if-ico-row">
                  <Icon name={item.mark} size={12} />
                  State
                </dt>
                <dd>{item.state}</dd>
              </div>
              <div>
                <dt className="if-ico-row">
                  <Icon name="map-pin" size={12} />
                  Now
                </dt>
                <dd>{item.where}</dd>
              </div>
            </dl>
            <button type="button" className="sc-night-ghost" onClick={() => setPane("none")}>
              <Icon name="close" size={12} />
              Close
            </button>
          </div>
        ) : null}
      </aside>
    </main>
  );
}
