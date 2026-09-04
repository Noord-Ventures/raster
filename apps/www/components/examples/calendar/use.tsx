"use client";

import * as React from "react";
import { Calendar } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 6, 24));
  return (
    <UseField name="calendar">
      <h3 className="rs-use-type">Day</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The run</p>
          <p className="rs-use-copy">Today is a hairline. The selected day is ink. Arrow keys move the cursor.</p>
          <Calendar value={date} onValueChange={setDate} weekStart={1} aria-label="Press date" />
        </div>
      </div>
    </UseField>
  );
}
