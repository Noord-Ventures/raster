import { Textarea } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="textarea">
      <h3 className="rs-use-type">Note</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">For the printer</p>
          <p className="rs-use-copy">A note that travels with the sheet.</p>
          <Textarea label="Press note" defaultValue="Keep the 184 clean. No second ink." />
        </div>
      </div>
    </UseField>
  );
}
