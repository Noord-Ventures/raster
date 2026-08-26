import { Calendar } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="calendar">
      <h3 className="rs-use-type">Day</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The run</p>
          <p className="rs-use-copy">Today is a hairline. The selected day is ink.</p>
          <Calendar weekStart={1} />
        </div>
      </div>
    </article>
  );
}
