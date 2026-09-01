import type { Metadata } from "next";
import { RasterMark } from "@/components/raster-mark";
import { SWAG } from "./catalog";
import "./swag.css";

export const metadata: Metadata = {
  title: "Swag — Raster",
  description: "Raster merch. Coming soon.",
};

function PrintMark({ sheet }: { sheet?: boolean }) {
  const unit = (
    <span className="swag-print-mark">
      <RasterMark className="swag-print-svg swag-print-knockout" />
      <RasterMark className="swag-print-svg" />
    </span>
  );
  if (!sheet) return unit;
  return (
    <div className="swag-print-sheet" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="swag-print-mark">
          <RasterMark className="swag-print-svg swag-print-knockout" />
          <RasterMark className="swag-print-svg" />
        </span>
      ))}
    </div>
  );
}

export default function SwagPage() {
  return (
    <main className="swag-page" aria-label="Swag">
      <div className="swag-field">
        <section className="swag-cell swag-cell-head">
          <div className="swag-mark" aria-hidden="true">
            <RasterMark />
          </div>
          <p className="swag-kicker">Store</p>
          <h1 className="swag-face">Swag</h1>
          <div className="swag-copy">
            <p>
              Blanks with a print area. The mark sits on the fabric — not around it.
            </p>
            <p>Coming soon.</p>
          </div>
        </section>

        {SWAG.map((item) => (
          <article key={item.slug} className="swag-cell swag-card" id={item.slug}>
            <figure className="swag-still">
              <img src={item.still} alt={`${item.title}, ${item.print.toLowerCase()} print`} />
              <div aria-hidden="true">{item.slug === "stickers" ? <PrintMark sheet /> : <PrintMark />}</div>
            </figure>
            <div className="swag-meta">
              <h2>{item.title}</h2>
              <p className="swag-print">{item.print}</p>
              <p className="swag-soon">Coming soon</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
