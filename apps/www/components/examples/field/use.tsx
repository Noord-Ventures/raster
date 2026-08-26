import { Field, FieldHint, FieldLabel } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="field">
      <h3 className="rs-use-type">Fee</h3>
      <div className="rs-use-body">
        <Field>
          <FieldLabel htmlFor="use-fee">Fixed fee</FieldLabel>
          <input id="use-fee" className="rs-input rs-input-full" defaultValue="12.000" />
          <FieldHint>The number on the cover is the number on the invoice.</FieldHint>
        </Field>
      </div>
    </article>
  );
}
