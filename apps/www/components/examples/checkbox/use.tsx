import { Checkbox } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="checkbox">
      <h3 className="rs-use-type">Pass</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Proof checklist</p>
          <p className="rs-use-copy">The sheet leaves when every box is ink.</p>
          <Checkbox label="Brand" defaultChecked />
          <Checkbox label="Product" />
          <Checkbox label="Type" />
        </div>
      </div>
    </UseField>
  );
}
