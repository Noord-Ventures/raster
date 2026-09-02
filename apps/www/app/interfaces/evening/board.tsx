"use client";

import * as React from "react";
import { Icon } from "@noorddev/raster-react";
import { Brand } from "../mark";
import { PhoneV1Chrome } from "../v1-chrome";
import { interfaceBySlug } from "../catalog";

const WHAT = interfaceBySlug("evening")!.what;

type Method = "delivery" | "pickup";
type Diet = "any" | "veg" | "fish";
type Inspect = { kind: "item"; id: string } | { kind: "bag" } | null;

type Store = {
  id: string;
  name: string;
  area: string;
  photo: string;
  rating: string;
  fee: string;
  eta: string;
  method: Method;
  diet: Diet;
  price: 1 | 2;
  dish: string;
};

type Item = {
  id: string;
  name: string;
  note: string;
  photo: string;
  price: number;
  cat: string;
};

type Line = { key: string; id: string; store: string; name: string; price: number };

const STORES: Store[] = [
  { id: "buren", name: "De Buren", area: "Alkmaar", photo: "/interfaces/food/de-buren.jpg", rating: "4.8", fee: "€2.40", eta: "22 min", method: "delivery", diet: "any", price: 2, dish: "Roast chicken, tonight" },
  { id: "kaas", name: "Kaasbar", area: "Kaasmarkt", photo: "/interfaces/food/kaasbar.jpg", rating: "4.6", fee: "€1.80", eta: "18 min", method: "pickup", diet: "veg", price: 2, dish: "Aged cheese board" },
  { id: "canal", name: "Canal kitchen", area: "Oudegracht", photo: "/interfaces/food/canal.jpg", rating: "4.7", fee: "€2.90", eta: "27 min", method: "delivery", diet: "fish", price: 2, dish: "Saffron fish stew" },
  { id: "lunch", name: "Press lunch", area: "Spoor", photo: "/interfaces/food/lunch.jpg", rating: "4.5", fee: "€1.40", eta: "14 min", method: "pickup", diet: "veg", price: 1, dish: "Ricotta toast" },
  { id: "north", name: "North bakery", area: "Kennemerstraatweg", photo: "/interfaces/food/north.jpg", rating: "4.9", fee: "€1.20", eta: "16 min", method: "delivery", diet: "veg", price: 1, dish: "Morning loaf" },
  { id: "folsom", name: "Folsom counter", area: "Mission", photo: "/interfaces/food/bakery.jpg", rating: "4.4", fee: "€2.10", eta: "24 min", method: "delivery", diet: "any", price: 1, dish: "Almond pastry" },
];

const MENUS: Record<string, Item[]> = {
  buren: [
    { id: "chicken", name: "Roast chicken", note: "Held at the pass", photo: "/interfaces/food/de-buren.jpg", price: 18, cat: "Plates" },
    { id: "salad", name: "Beet salad", note: "Cold plate", photo: "/interfaces/food/dish-salad.jpg", price: 9, cat: "Plates" },
    { id: "soup", name: "Leek soup", note: "Slow", photo: "/interfaces/food/dish-soup.jpg", price: 8, cat: "Soup" },
  ],
  kaas: [
    { id: "board", name: "Cheese board", note: "Ready", photo: "/interfaces/food/kaasbar.jpg", price: 16, cat: "Boards" },
    { id: "rye", name: "Rye and honey", note: "Last loaf", photo: "/interfaces/food/dish-pastry.jpg", price: 7, cat: "Bread" },
  ],
  canal: [
    { id: "stew", name: "Fish stew", note: "On the fire", photo: "/interfaces/food/canal.jpg", price: 21, cat: "Plates" },
    { id: "greens", name: "Green salad", note: "Cold plate", photo: "/interfaces/food/dish-salad.jpg", price: 8, cat: "Plates" },
  ],
  lunch: [
    { id: "toast", name: "Ricotta toast", note: "Ready", photo: "/interfaces/food/lunch.jpg", price: 9, cat: "Toast" },
    { id: "pastry", name: "Almond pastry", note: "Evening only", photo: "/interfaces/food/dish-pastry.jpg", price: 5, cat: "Sweet" },
  ],
  north: [
    { id: "loaf", name: "Morning loaf", note: "Still warm", photo: "/interfaces/food/north.jpg", price: 6, cat: "Bread" },
    { id: "bun", name: "Butter bun", note: "Two left", photo: "/interfaces/food/bakery.jpg", price: 4, cat: "Bread" },
  ],
  folsom: [
    { id: "tart", name: "Almond pastry", note: "Evening only", photo: "/interfaces/food/dish-pastry.jpg", price: 5, cat: "Sweet" },
    { id: "soup2", name: "Leek soup", note: "Cup", photo: "/interfaces/food/dish-soup.jpg", price: 7, cat: "Soup" },
  ],
};

const V1_KITCHENS = [
  { id: "buren", place: "Alkmaar" },
  { id: "canal", place: "Oudegracht" },
  { id: "north", place: "Kennemer" },
  { id: "folsom", place: "Mission" },
] as const;

function money(n: number) {
  return `€${n.toFixed(2)}`;
}

export function Board() {
  const [page, setPage] = React.useState<"market" | "store">("market");
  const [storeId, setStoreId] = React.useState("buren");
  const [method, setMethod] = React.useState<Method>("delivery");
  const [diet, setDiet] = React.useState<Diet>("any");
  const [band, setBand] = React.useState<0 | 1 | 2>(0);
  const [query, setQuery] = React.useState("");
  const [inspect, setInspect] = React.useState<Inspect>(null);
  const [bag, setBag] = React.useState<Line[]>([]);
  const store = STORES.find((row) => row.id === storeId) ?? STORES[0]!;
  const menu = MENUS[store.id] ?? MENUS.buren!;
  const item = inspect?.kind === "item" ? menu.find((row) => row.id === inspect.id) ?? menu[0]! : null;
  const rooms = STORES.filter((row) => {
    if (row.method !== method) return false;
    if (diet !== "any" && row.diet !== diet && row.diet !== "any") return false;
    if (band !== 0 && row.price !== band) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${row.name} ${row.area} ${row.dish}`.toLowerCase().includes(q);
  });
  const cats = [...new Set(menu.map((row) => row.cat))];
  const count = bag.length;
  const total = bag.reduce((sum, line) => sum + line.price, 0);

  function openStore(id: string) {
    setStoreId(id);
    setPage("store");
    setInspect(null);
  }

  function addItem(row: Item) {
    setBag((lines) => [
      ...lines,
      { key: `${row.id}-${Date.now()}`, id: row.id, store: store.name, name: row.name, price: row.price },
    ]);
    setInspect({ kind: "bag" });
  }

  return (
    <main className="if-board sc-evening" data-page={page} aria-label={WHAT}>
      <PhoneV1Chrome
        heading="Evening"
        action="Bag"
        onAction={() => setInspect((cur) => (cur?.kind === "bag" ? null : { kind: "bag" }))}
      />
      <section className="sc-evening-stage">
        <header className="sc-evening-bar">
          <Brand slug="evening" />
          <p className="sc-evening-addr if-ico-row">
            <Icon name="map-pin" size={12} />
            Langestraat 12
          </p>
          <label className="sc-evening-search">
            <Icon name="search" size={16} />
            <input
              type="search"
              value={query}
              placeholder="Search kitchens"
              aria-label="Search kitchens"
              onChange={(event) => {
                setQuery(event.target.value);
                setPage("market");
              }}
            />
          </label>
          <button
            type="button"
            className="sc-evening-bag"
            aria-pressed={inspect?.kind === "bag"}
            onClick={() => setInspect((cur) => (cur?.kind === "bag" ? null : { kind: "bag" }))}
          >
            <Icon name="bag" size={16} />
            Bag{count ? ` ${count}` : ""}
          </button>
        </header>

        {page === "market" ? (
          <>
            <div className="sc-evening-filters">
              <div className="sc-evening-seg" role="group" aria-label="Method">
                {(["delivery", "pickup"] as const).map((item) => (
                  <button key={item} type="button" aria-pressed={method === item} onClick={() => setMethod(item)}>
                    <Icon name={item === "delivery" ? "truck" : "package"} size={12} />
                    {item === "delivery" ? "Delivery" : "Pickup"}
                  </button>
                ))}
              </div>
              <div className="sc-evening-seg" role="group" aria-label="Diet">
                {(["any", "veg", "fish"] as const).map((item) => (
                  <button key={item} type="button" aria-pressed={diet === item} onClick={() => setDiet(item)}>
                    <Icon name={item === "any" ? "layers" : item === "veg" ? "tag" : "flag"} size={12} />
                    {item === "any" ? "Any" : item === "veg" ? "Veg" : "Fish"}
                  </button>
                ))}
              </div>
              <div className="sc-evening-seg" role="group" aria-label="Price">
                {([0, 1, 2] as const).map((item) => (
                  <button key={item} type="button" aria-pressed={band === item} onClick={() => setBand(item)}>
                    <Icon name={item === 0 ? "wallet" : "dollar"} size={12} />
                    {item === 0 ? "Any" : item === 1 ? "€" : "€€"}
                  </button>
                ))}
              </div>
            </div>
            <div className="sc-evening-stores" aria-label="Kitchens">
              {rooms.length === 0 ? (
                <p className="sc-evening-empty">No kitchens on that filter.</p>
              ) : (
                rooms.map((row) => (
                  <button key={row.id} type="button" className="sc-evening-store" onClick={() => openStore(row.id)}>
                    <img src={row.photo} alt="" />
                    <span>
                      <b>{row.name}</b>
                      <i className="if-ico-row">
                        <Icon name="star" size={12} />
                        {row.rating}
                        <Icon name="clock" size={12} />
                        {row.eta}
                      </i>
                      <em className="if-ico-row">
                        <Icon name="map-pin" size={12} />
                        {row.area} · {row.fee}
                      </em>
                    </span>
                  </button>
                ))
              )}
            </div>
            <div className="sc-evening-v1" aria-label="Kitchens">
              {V1_KITCHENS.map((item) => {
                const row = STORES.find((store) => store.id === item.id);
                if (!row) return null;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="sc-evening-v1-row"
                    aria-current={storeId === item.id}
                    onClick={() => openStore(item.id)}
                  >
                    <b>{row.name}</b>
                    <i>
                      {row.rating} · {row.eta} · {item.place} · {row.fee}
                    </i>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="sc-evening-menu" aria-label="Menu">
            <header className="sc-evening-head">
              <button type="button" className="sc-evening-back" onClick={() => setPage("market")}>
                <Icon name="arrow-left" size={12} />
                Stores
              </button>
              <p className="if-ico-row">
                <Icon name="home" size={16} />
                {store.name}
              </p>
              <span className="if-ico-row">
                <Icon name="star" size={12} />
                {store.rating}
                <Icon name="clock" size={12} />
                {store.eta}
              </span>
            </header>
            <div className="sc-evening-hero">
              <img src={store.photo} alt="" />
              <p>{store.dish}</p>
            </div>
            {cats.map((cat) => (
              <section key={cat} className="sc-evening-cat">
                <h2>{cat}</h2>
                {menu
                  .filter((row) => row.cat === cat)
                  .map((row) => (
                    <div key={row.id} className="sc-evening-item">
                      <button
                        type="button"
                        className="sc-evening-item-open"
                        onClick={() => setInspect({ kind: "item", id: row.id })}
                      >
                        <img src={row.photo} alt="" />
                        <span>
                          <b>{row.name}</b>
                          <i className="if-ico-row">
                            <Icon name="tag" size={12} />
                            {row.note}
                          </i>
                        </span>
                        <em className="if-ico-row">
                          <Icon name="dollar" size={12} />
                          {money(row.price)}
                        </em>
                      </button>
                      <button type="button" className="sc-evening-add" onClick={() => addItem(row)}>
                        <Icon name="plus" size={12} />
                        Add
                      </button>
                    </div>
                  ))}
              </section>
            ))}
          </div>
        )}
      </section>

      <nav className="if-thumb" aria-label={WHAT}>
        <button
          type="button"
          aria-current={page === "market" && inspect?.kind !== "bag"}
          onClick={() => {
            setPage("market");
            setInspect(null);
          }}
        >
          <Icon name="home" size={16} />
          Stores
        </button>
        <button
          type="button"
          aria-pressed={inspect?.kind === "bag"}
          onClick={() => setInspect((cur) => (cur?.kind === "bag" ? null : { kind: "bag" }))}
        >
          <Icon name="bag" size={16} />
          Bag{count ? ` ${count}` : ""}
        </button>
      </nav>

      <aside className={`if-inspect${inspect ? " is-open" : ""}`} aria-label={inspect?.kind === "bag" ? "Bag" : "Plate"}>
        {inspect?.kind === "bag" ? (
          <div key={`bag-${count}`} className="sc-evening-sheet sc-fresh">
            <p className="sc-evening-label if-ico-row">
              <Icon name="bag" size={12} />
              Bag
            </p>
            {bag.length === 0 ? (
              <p>The bag is empty.</p>
            ) : (
              <>
                {bag.map((line) => (
                  <div key={line.key} className="sc-evening-line">
                    <span className="if-ico-row">
                      <Icon name="package" size={16} />
                      <span>
                        <b>{line.name}</b>
                        <i>{line.store}</i>
                      </span>
                    </span>
                    <em>{money(line.price)}</em>
                  </div>
                ))}
                <p className="sc-evening-total if-ico-row">
                  <span className="if-ico-row">
                    <Icon name="wallet" size={12} />
                    Total
                  </span>
                  <strong>{money(total)}</strong>
                </p>
              </>
            )}
            <button type="button" className="sc-evening-ghost" onClick={() => setInspect(null)}>
              <Icon name="close" size={12} />
              Close
            </button>
          </div>
        ) : item ? (
          <div key={item.id} className="sc-evening-sheet sc-fresh">
            <p className="sc-evening-label if-ico-row">
              <Icon name="image" size={12} />
              Plate
            </p>
            <img src={item.photo} alt="" />
            <p className="sc-evening-dish">{item.name}</p>
            <p>
              {item.note}. {money(item.price)}.
            </p>
            <button type="button" className="sc-evening-ghost" onClick={() => addItem(item)}>
              <Icon name="plus" size={12} />
              Add to bag
            </button>
            <button type="button" className="sc-evening-ghost" onClick={() => setInspect(null)}>
              <Icon name="close" size={12} />
              Close
            </button>
          </div>
        ) : null}
      </aside>
    </main>
  );
}
