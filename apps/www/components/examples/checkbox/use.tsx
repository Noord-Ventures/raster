import { Checkbox } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="checkbox">
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
    </article>
  );
}
