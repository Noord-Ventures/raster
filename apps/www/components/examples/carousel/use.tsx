import { Carousel } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="carousel">
      <h3 className="rs-use-type">Flip</h3>
      <div className="rs-use-body">
        <Carousel>
          <p className="rs-use-copy">Sheet 01 — the cover.</p>
          <p className="rs-use-copy">Sheet 02 — the law.</p>
          <p className="rs-use-copy">Sheet 03 — the kit.</p>
        </Carousel>
      </div>
    </article>
  );
}
