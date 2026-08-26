"use client";

import { Button, toast, Toaster } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="toast">
      <h3 className="rs-use-type">Ping</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Issue 03</p>
          <p className="rs-use-copy">A quiet confirm. One line, then it leaves.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => toast("Sheet saved", { description: "Issue 03 is on the press." })}>
          Save the sheet
        </Button>
        <Toaster />
      </div>
    </article>
  );
}
