import { Slider } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="slider">
      <h3 className="rs-use-type">Ink</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Density</p>
          <Slider defaultValue={70} aria-label="Ink density" />
        </div>
      </div>
    </article>
  );
}
