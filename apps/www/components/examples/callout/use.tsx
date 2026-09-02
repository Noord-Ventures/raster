import { Callout } from "@noorddev/raster-react";

/** Press ticket: a note on the sheet. Hairline all sides, no left bar. */
export function Use() {
  return (
    <article className="rs-use" data-use="callout">
      <h3 className="rs-use-type">Note</h3>
      <div className="rs-use-body">
        <Callout>
          <p><strong>Fixed fee.</strong> The number on the cover is the number on the invoice.</p>
        </Callout>
      </div>
    </article>
  );
}
