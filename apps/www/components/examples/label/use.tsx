import { Input, Label } from "@noorddev/vlak-react";
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
          <Input plain id="use-city" defaultValue="Alkmaar" />
        </div>
      </div>
    </UseField>
  );
}
