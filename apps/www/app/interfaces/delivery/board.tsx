"use client";

import * as React from "react";
import { foodDisplay } from "../scene-fonts";

type Kind = "kitchen" | "counter" | "bakery";

type Place = {
  id: string;
  name: string;
  kind: Kind;
  rating: string;
  time: string;
  area: string;
  tag: string;
  photo: string;
  dish: string;
};

type Dish = { name: string; price: string; photo: string };

const PLACES: Place[] = [
  {
    id: "buren",
    name: "De Buren",
    kind: "kitchen",
    rating: "4.8",
    time: "22 min",
    area: "Alkmaar",
    tag: "Open",
    photo: "/interfaces/food/de-buren.jpg",
    dish: "Roast chicken, tonight",
  },
  {
    id: "kaas",
    name: "Kaasbar",
    kind: "counter",
    rating: "4.6",
    time: "18 min",
    area: "Kaasmarkt",
    tag: "Busy",
    photo: "/interfaces/food/kaasbar.jpg",
    dish: "Aged cheese board",
  },
  {
    id: "canal",
    name: "Canal kitchen",
    kind: "kitchen",
    rating: "4.7",
    time: "27 min",
    area: "Oudegracht",
    tag: "Open",
    photo: "/interfaces/food/canal.jpg",
    dish: "Saffron fish stew",
  },
  {
    id: "lunch",
    name: "Press lunch",
    kind: "counter",
    rating: "4.4",
    time: "14 min",
    area: "Spoor",
    tag: "Open",
    photo: "/interfaces/food/lunch.jpg",
    dish: "Ricotta toast",
  },
  {
    id: "north",
    name: "North plate",
    kind: "kitchen",
    rating: "4.9",
    time: "31 min",
    area: "Beverkoog",
    tag: "Later",
    photo: "/interfaces/food/north.jpg",
    dish: "Duck with cherries",
  },
  {
    id: "bakery",
    name: "Sheet bakery",
    kind: "bakery",
    rating: "4.5",
    time: "16 min",
    area: "Centrum",
    tag: "Open",
    photo: "/interfaces/food/bakery.jpg",
    dish: "Morning loaves",
  },
];

const DISHES: Record<string, Dish[]> = {
  buren: [
    { name: "Roast chicken", price: "18", photo: "/interfaces/food/de-buren.jpg" },
    { name: "Beet salad", price: "11", photo: "/interfaces/food/dish-salad.jpg" },
    { name: "Leek soup", price: "9", photo: "/interfaces/food/dish-soup.jpg" },
  ],
  kaas: [
    { name: "Cheese board", price: "16", photo: "/interfaces/food/kaasbar.jpg" },
    { name: "Rye and honey", price: "8", photo: "/interfaces/food/dish-pastry.jpg" },
  ],
  canal: [
    { name: "Fish stew", price: "21", photo: "/interfaces/food/canal.jpg" },
    { name: "Green salad", price: "10", photo: "/interfaces/food/dish-salad.jpg" },
  ],
  lunch: [
    { name: "Ricotta toast", price: "12", photo: "/interfaces/food/lunch.jpg" },
    { name: "Almond pastry", price: "6", photo: "/interfaces/food/dish-pastry.jpg" },
  ],
  north: [
    { name: "Duck plate", price: "24", photo: "/interfaces/food/north.jpg" },
    { name: "Winter soup", price: "10", photo: "/interfaces/food/dish-soup.jpg" },
  ],
  bakery: [
    { name: "Country loaf", price: "7", photo: "/interfaces/food/bakery.jpg" },
    { name: "Almond pastry", price: "5", photo: "/interfaces/food/dish-pastry.jpg" },
  ],
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "kitchen", label: "Kitchen" },
  { value: "counter", label: "Counter" },
  { value: "bakery", label: "Bakery" },
] as const;

export function Board() {
  const [tab, setTab] = React.useState("browse");
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [pick, setPick] = React.useState("buren");
  const [bag, setBag] = React.useState<{ name: string; fresh?: boolean }[]>([]);

  const shown = PLACES.filter((place) => {
    const kindOk = filter === "all" || place.kind === filter;
    const q = query.trim().toLowerCase();
    const textOk = !q || `${place.name} ${place.area} ${place.dish}`.toLowerCase().includes(q);
    return kindOk && textOk;
  });
  const place = PLACES.find((item) => item.id === pick) ?? PLACES[0]!;
  const dishes = DISHES[place.id] ?? [];

  return (
    <main className={`if-board sc-food ${foodDisplay.variable}`} aria-label="Food delivery">
      <header className="sc-food-bar">
        <p className="sc-food-where">Alkmaar</p>
        <nav className="sc-food-nav" aria-label="Food">
          {[
            { id: "browse", label: "Browse" },
            { id: "orders", label: "Orders" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={tab === item.id}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button type="button" className="sc-food-bag" onClick={() => setTab("orders")}>
          <span key={bag.length} className={bag.length ? "sc-fresh" : undefined}>Bag {bag.length}</span>
        </button>
      </header>

      <div className="sc-food-body">
        {tab === "orders" ? (
          <section className="sc-food-menu" aria-label="Bag">
            <h2>{bag.length ? "Tonight" : "Bag is empty"}</h2>
            <p>{bag.length ? `${bag.length} in the bag.` : "Open a kitchen and add a plate."}</p>
            {bag.map((item, i) => (
              <p key={`${item.name}-${i}`} className={item.fresh ? "sc-fresh" : undefined}>{item.name}</p>
            ))}
          </section>
        ) : (
          <>
            <section className="sc-food-hero" aria-label="Tonight">
              <img src={place.photo} alt="" />
              <div className="sc-food-hero-copy">
                <p>{place.area} · {place.time}</p>
                <h2>{place.dish}</h2>
              </div>
            </section>

            <div className="sc-food-tools">
              <input
                className="sc-food-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Kitchen, street, dish"
                aria-label="Search"
              />
              {FILTERS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className="sc-food-chip"
                  aria-pressed={filter === item.value}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="sc-food-grid">
              {shown.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="sc-food-card"
                  aria-current={pick === item.id}
                  onClick={() => setPick(item.id)}
                >
                  <img src={item.photo} alt="" />
                  <div className="sc-food-card-body">
                    <p className="sc-food-card-meta">
                      {item.area} · {item.tag}
                    </p>
                    <h3>{item.name}</h3>
                    <div className="sc-food-card-row">
                      <span className="sc-food-star">{item.rating} rating</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <section className="sc-food-menu" aria-label={`${place.name} menu`}>
              <h2>{place.name}</h2>
              <p>
                {place.rating} rating · {place.kind} · {place.time}
              </p>
              <div className="sc-food-dishes">
                {dishes.map((dish) => (
                  <button
                    key={dish.name}
                    type="button"
                    className="sc-food-dish"
                    onClick={() =>
                      setBag((rows) => [
                        ...rows.map((entry) => ({ ...entry, fresh: false })),
                        { name: dish.name, fresh: true },
                      ])
                    }
                  >
                    <img src={dish.photo} alt="" />
                    <div>
                      <h3>{dish.name}</h3>
                      <p>{dish.price} · add</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
