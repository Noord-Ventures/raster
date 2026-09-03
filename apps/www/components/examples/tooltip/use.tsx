import { Tooltip } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="tooltip">
      <h3 className="rs-use-type">Hint</h3>
      <div className="rs-use-body">
        <Tooltip tip="204px module">
          <span className="rs-use-copy">Hover the measure.</span>
        </Tooltip>
      </div>
    </UseField>
  );
}
