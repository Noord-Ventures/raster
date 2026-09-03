import { Calendar } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="calendar">
      <h3 className="rs-use-type">Day</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The run</p>
          <p className="rs-use-copy">Today is a hairline. The selected day is ink.</p>
          <Calendar weekStart={1} />
        </div>
      </div>
    </UseField>
  );
}
