import { Label } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="label">
      <h3 className="rs-use-type">Mark</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The studio</p>
          <p className="rs-use-copy">The mark sits above the field. Twelve pixels.</p>
          <Label htmlFor="use-city">City</Label>
          <input id="use-city" className="rs-input rs-input-full" defaultValue="Alkmaar" />
        </div>
      </div>
    </UseField>
  );
}
