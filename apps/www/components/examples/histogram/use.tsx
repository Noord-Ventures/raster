import { Histogram } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="histogram">
      <h3 className="rs-use-type">Bin</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Line length</p>
          <p className="rs-use-copy">Adjacent bins, one hairline between. A density field on the 204.</p>
        </div>
        <Histogram
          height={184}
          yLabel="Count"
          unit="lines"
          bins={[
            { label: "0–1", count: 4 },
            { label: "1–2", count: 11 },
            { label: "2–3", count: 18 },
            { label: "3–4", count: 9 },
            { label: "4–5", count: 3 },
          ]}
        />
      </div>
    </article>
  );
}
