import { Alert } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="alert">
      <h3 className="rs-use-type">Hold</h3>
      <div className="rs-use-body">
        <Alert title="Press paused">Ink density drifted on the 184. Recheck the sheet.</Alert>
      </div>
    </UseField>
  );
}
