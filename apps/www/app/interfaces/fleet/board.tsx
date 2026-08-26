"use client";

import * as React from "react";
import {
  Alert,
  Badge,
  Item,
  ScrollArea,
} from "@noordvc/raster-react";
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
  { id: "Bike 14", where: "Spoor", meta: "Parked" },
  { id: "Boat 06", where: "Haven", meta: "Idle" },
  { id: "Van 22", where: "Beverkoog", meta: "Parked" },
];

export function Board() {
  const [pick, setPick] = React.useState("Van 04");

  return (
    <main className="if-board if-fleet" aria-label="Fleet">
      <FleetMap />
      <section className="if-float if-float-a" aria-label="Active fleet">
        <p className="if-kicker">Active fleet</p>
        <ScrollArea maxHeight={280}>
          {ACTIVE.map((unit) => (
            <Item
              key={unit.id}
              title={unit.id}
              description={unit.where}
              meta={
                <Badge variant={unit.id === pick ? "solid" : "outline"}>{unit.meta}</Badge>
              }
              onClick={() => setPick(unit.id)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </ScrollArea>
      </section>
      <section className="if-float if-float-b" aria-label="Inactive objects">
        <p className="if-kicker">Inactive objects</p>
        <ScrollArea maxHeight={280}>
          {INACTIVE.map((unit) => (
            <Item key={unit.id} title={unit.id} description={unit.where} meta={unit.meta} />
          ))}
        </ScrollArea>
      </section>
      <section className="if-float if-float-c" aria-label="Alerts">
        <Alert title="Density drop on plate 09">
          Boat 02 is holding on the Oudegracht. Van 11 is two minutes out.
        </Alert>
        <div
          className="if-field-spot"
          style={{ marginTop: 12, ["--rs-chart-spot" as string]: "#E30613" }}
        >
          <p className="if-kicker">Alert field</p>
          <Item
            title="Boat 02"
            description="Hold · Oudegracht"
            meta={<Badge variant="solid">Alert</Badge>}
          />
        </div>
      </section>
    </main>
  );
}
