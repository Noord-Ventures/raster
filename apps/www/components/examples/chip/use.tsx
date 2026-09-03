import { Chip } from "@noorddev/raster-react";
import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="chip">
      <h3 className="rs-use-type">Id</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The job</p>
          <p className="rs-use-copy">A name and a version. Flush, no pill radius.</p>
        </div>
        <div className="rs-use-actions">
          <Chip>/noord-brand</Chip>
          <Chip>0.3.0</Chip>
        </div>
      </div>
    </UseField>
  );
}
