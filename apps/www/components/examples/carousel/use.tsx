import { Carousel } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="carousel">
      <h3 className="rs-use-type">Flip</h3>
      <div className="rs-use-body">
        <Carousel>
          <p className="rs-use-copy">Sheet 01 — the cover.</p>
          <p className="rs-use-copy">Sheet 02 — the law.</p>
          <p className="rs-use-copy">Sheet 03 — the kit.</p>
        </Carousel>
      </div>
    </UseField>
  );
}
