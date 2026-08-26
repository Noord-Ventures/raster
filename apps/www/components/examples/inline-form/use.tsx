import { InlineForm } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="inline-form">
      <h3 className="rs-use-type">List</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Press notes</p>
          <p className="rs-use-copy">One field, one action, inside the same hairline.</p>
          <InlineForm
            placeholder="renn@noord.vc"
            buttonLabel="Send"
            successLabel="Noted"
            onSubmit={() => {}}
          />
        </div>
      </div>
    </article>
  );
}
