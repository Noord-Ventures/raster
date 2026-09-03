import { Collapsible } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="collapsible">
      <h3 className="rs-use-type">Fold</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Under the fold</p>
          <p className="rs-use-copy">A native disclosure. The law is one sentence.</p>
        </div>
        <Collapsible title="The law" defaultOpen>
          A poster you can install.
        </Collapsible>
      </div>
    </UseField>
  );
}
