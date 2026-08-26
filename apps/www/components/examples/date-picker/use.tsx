import { DatePicker } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="date-picker">
      <h3 className="rs-use-type">When</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Press day</p>
          <p className="rs-use-copy">Issue 03 goes on the cylinder. Pick the morning.</p>
          <DatePicker placeholder="Press date" />
        </div>
      </div>
    </article>
  );
}
