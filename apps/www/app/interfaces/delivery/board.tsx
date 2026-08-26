"use client";

import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardLabel,
  CardTitle,
  Carousel,
  Input,
  Item,
  NavigationMenu,
  ToggleGroup,
} from "@noordvc/raster-react";

const PLACES = [
  { name: "De Buren", kind: "Kitchen", rating: "4.8", time: "22 min", area: "Alkmaar", tag: "Open" },
  { name: "Kaasbar", kind: "Counter", rating: "4.6", time: "18 min", area: "Kaasmarkt", tag: "Busy" },
  { name: "Canal kitchen", kind: "Kitchen", rating: "4.7", time: "27 min", area: "Oudegracht", tag: "Open" },
  { name: "Press lunch", kind: "Counter", rating: "4.4", time: "14 min", area: "Spoor", tag: "Open" },
  { name: "North plate", kind: "Kitchen", rating: "4.9", time: "31 min", area: "Beverkoog", tag: "Later" },
  { name: "Sheet bakery", kind: "Bakery", rating: "4.5", time: "16 min", area: "Centrum", tag: "Open" },
];

export function Board() {
  const [filter, setFilter] = React.useState("all");
  const shown = PLACES.filter((p) => filter === "all" || p.kind.toLowerCase() === filter);

  return (
    <main className="if-board" aria-label="Food delivery">
      <div className="if-app" style={{ flexDirection: "column" }}>
        <header className="if-head" style={{ paddingLeft: 20, paddingRight: 20 }}>
          <p className="if-head-title">Alkmaar</p>
          <NavigationMenu
            items={[
              { label: "Browse", href: "#browse", current: true },
              { label: "Orders", href: "#orders" },
              { label: "Account", href: "#account" },
            ]}
          />
          <Badge variant="solid">Open</Badge>
        </header>

        <div className="if-pane">
          <div className="if-stack">
            <Input label="Search" placeholder="Kitchen, street, dish" />
            <ToggleGroup
              value={filter}
              onValueChange={setFilter}
              options={[
                { value: "all", label: "All" },
                { value: "kitchen", label: "Kitchen" },
                { value: "counter", label: "Counter" },
                { value: "bakery", label: "Bakery" },
              ]}
            />
            <div>
              <p className="if-kicker">Tonight</p>
              <Carousel aria-label="Places">
                {PLACES.slice(0, 4).map((place) => (
                  <Card key={place.name} style={{ width: 184 }}>
                    <CardLabel>{place.kind}</CardLabel>
                    <CardTitle>{place.name}</CardTitle>
                    <CardBody>
                      {place.rating} · {place.time}
                    </CardBody>
                  </Card>
                ))}
              </Carousel>
            </div>
            <div className="if-grid-2">
              {shown.map((place) => (
                <article key={place.name} className="if-sheet">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <p className="if-kicker" style={{ margin: 0 }}>
                      {place.area}
                    </p>
                    <Badge variant={place.tag === "Open" ? "solid" : place.tag === "Busy" ? "outline" : "muted"}>
                      {place.tag}
                    </Badge>
                  </div>
                  <h2 className="rs-card-title" style={{ marginTop: 8 }}>
                    {place.name}
                  </h2>
                  <Item title={`${place.rating} rating`} description={place.kind} meta={place.time} />
                  <Button variant="ghost" size="sm">
                    Open menu
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
