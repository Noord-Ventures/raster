"use client";

import * as React from "react";
import { Brand } from "../mark";

type Kind = "kitchen" | "counter";

type Place = {
  id: string;
  name: string;
  kind: Kind;
  time: string;
  area: string;
  photo: string;
  dish: string;
};

type Dish = { id: string; name: string; note: string; photo: string };

const PLACES: Place[] = [
  {
    id: "buren",
    name: "De Buren",
    kind: "kitchen",
    time: "22 min",
    area: "Alkmaar",
    photo: "/interfaces/food/de-buren.jpg",
    dish: "Roast chicken, tonight",
  },
  {
    id: "kaas",
    name: "Kaasbar",
    kind: "counter",
    time: "18 min",
    area: "Kaasmarkt",
    photo: "/interfaces/food/kaasbar.jpg",
    dish: "Aged cheese board",
  },
  {
    id: "canal",
    name: "Canal kitchen",
    kind: "kitchen",
    time: "27 min",
    area: "Oudegracht",
    photo: "/interfaces/food/canal.jpg",
    dish: "Saffron fish stew",
  },
  {
    id: "lunch",
    name: "Press lunch",
    kind: "counter",
    time: "14 min",
    area: "Spoor",
    photo: "/interfaces/food/lunch.jpg",
    dish: "Ricotta toast",
  },
];

const DISHES: Record<string, Dish[]> = {
  buren: [
    { id: "chicken", name: "Roast chicken", note: "Held at the pass", photo: "/interfaces/food/de-buren.jpg" },
    { id: "salad", name: "Beet salad", note: "Cold plate", photo: "/interfaces/food/dish-salad.jpg" },
    { id: "soup", name: "Leek soup", note: "Slow", photo: "/interfaces/food/dish-soup.jpg" },
  ],
  kaas: [
    { id: "board", name: "Cheese board", note: "Ready", photo: "/interfaces/food/kaasbar.jpg" },
    { id: "rye", name: "Rye and honey", note: "Last loaf", photo: "/interfaces/food/dish-pastry.jpg" },
  ],
  canal: [
    { id: "stew", name: "Fish stew", note: "On the fire", photo: "/interfaces/food/canal.jpg" },
    { id: "greens", name: "Green salad", note: "Cold plate", photo: "/interfaces/food/dish-salad.jpg" },
  ],
  lunch: [
    { id: "toast", name: "Ricotta toast", note: "Ready", photo: "/interfaces/food/lunch.jpg" },
    { id: "pastry", name: "Almond pastry", note: "Evening only", photo: "/interfaces/food/dish-pastry.jpg" },
  ],
};

export function Board() {
  const [kitchen, setKitchen] = React.useState("buren");
  const [pane, setPane] = React.useState<"none" | "plate">("none");
  const [plate, setPlate] = React.useState("chicken");
  const [bag, setBag] = React.useState(0);
  const room = PLACES.find((row) => row.id === kitchen) ?? PLACES[0]!;
  const cards = DISHES[kitchen] ?? DISHES.buren!;
  const dish = cards.find((row) => row.id === plate) ?? cards[0]!;

  return (
    <main className="if-board sc-evening" aria-label="Evening">
      <aside className="sc-evening-rail" aria-label="Kitchens">
        <div className="sc-evening-brand">
          <Brand slug="evening" title="Evening" />
          <p className="sc-evening-voice">Tonight</p>
        </div>
        <p className="sc-evening-label">Kitchens</p>
        {PLACES.map((row) => (
          <button
            key={row.id}
            type="button"
            className="sc-evening-kit"
            aria-current={kitchen === row.id}
            onClick={() => {
              setKitchen(row.id);
              setPane("none");
              setPlate((DISHES[row.id] ?? DISHES.buren!)[0]!.id);
            }}
          >
            <img src={row.photo} alt="" />
            <span>
              <b>{row.name}</b>
              <i>
                {row.area} · {row.time}
              </i>
            </span>
          </button>
        ))}
      </aside>

      <section className="sc-evening-menu" aria-label="Menu">
        <header className="sc-evening-head">
          <p>{room.name}</p>
          <span>
            {room.time}
            {bag ? ` · bag ${bag}` : ""}
          </span>
        </header>
        <div className="sc-evening-hero">
          <img src={room.photo} alt="" />
          <p>{room.dish}</p>
        </div>
        <div className="sc-evening-grid">
          {cards.map((row) => (
            <button
              key={row.id}
              type="button"
              className="sc-evening-card"
              aria-current={plate === row.id && pane === "plate"}
              onClick={() => {
                setPlate(row.id);
                setPane("plate");
              }}
            >
              <img src={row.photo} alt="" />
              <b>{row.name}</b>
              <i>{row.note}</i>
            </button>
          ))}
        </div>
      </section>

      <aside className={`if-inspect${pane === "plate" ? " is-open" : ""}`} aria-label="Plate">
        {pane === "plate" ? (
          <div key={dish.id} className="sc-evening-inspect sc-fresh">
            <p className="sc-evening-label">Plate</p>
            <img src={dish.photo} alt="" />
            <p className="sc-evening-dish">{dish.name}</p>
            <p>{dish.note}. The evening desk keeps the kitchen and the street on one sheet.</p>
            <button
              type="button"
              className="sc-evening-ghost"
              onClick={() => {
                setBag((n) => n + 1);
                setPane("none");
              }}
            >
              Add to bag
            </button>
            <button type="button" className="sc-evening-ghost" onClick={() => setPane("none")}>
              Close
            </button>
          </div>
        ) : null}
      </aside>
    </main>
  );
}
