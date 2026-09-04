import { Spinner } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="spinner">
      <h3 className="rs-use-type">Now</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Composing</p>
          <p className="rs-use-copy">The press is still. One mark turns.</p>
        </div>
        <Spinner label="Setting type" />
      </div>
    </UseField>
  );
}
