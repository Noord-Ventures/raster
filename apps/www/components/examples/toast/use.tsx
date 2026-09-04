"use client";

import { Button, toast, Toaster } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="toast">
      <h3 className="rs-use-type">Ping</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Issue 03</p>
          <p className="rs-use-copy">A quiet confirm. One line, then it leaves.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => toast("Sheet saved", { description: "Issue 03 is on the press." })}>
          Save the sheet
        </Button>
        <Toaster closeLabel="Dismiss" />
      </div>
    </UseField>
  );
}
