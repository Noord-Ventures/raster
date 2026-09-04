import { InlineForm } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="inline-form">
      <h3 className="rs-use-type">List</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Press notes</p>
          <p className="rs-use-copy">One field, one action, inside the same hairline.</p>
          <InlineForm
            placeholder="you@example.com"
            buttonLabel="Send"
            successLabel="Noted"
            onSubmit={() => {}}
          />
        </div>
      </div>
    </UseField>
  );
}
