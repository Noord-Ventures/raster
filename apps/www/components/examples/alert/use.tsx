import { Alert } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="alert">
      <h3 className="rs-use-type">Hold</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <Alert title="Press paused">Ink density drifted on the 184. Recheck the sheet.</Alert>
          <Alert variant="solid" title="Plate locked" live="polite">
            Issue 03 is on the cylinder. No more changes.
          </Alert>
        </div>
      </div>
    </UseField>
  );
}
