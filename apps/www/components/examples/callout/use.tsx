import { Callout } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

/** Press ticket: a note on the sheet. Hairline all sides, no left bar. */
export function Use() {
  return (
    <UseField name="callout">
      <h3 className="rs-use-type">Note</h3>
      <div className="rs-use-body">
        <Callout>
          <p><strong>Fixed fee.</strong> The number on the cover is the number on the invoice.</p>
        </Callout>
      </div>
    </UseField>
  );
}
