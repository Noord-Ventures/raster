import { Slider } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="slider">
      <h3 className="rs-use-type">Ink</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Density</p>
          <Slider defaultValue={70} aria-label="Ink density" />
        </div>
      </div>
    </UseField>
  );
}
