import { Button } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

/** Press ticket: one primary, one ghost. The sheet is the product. */
export function Use() {
  return (
    <UseField name="button">
      <h3 className="rs-use-type">Print</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Studio / Alkmaar</p>
          <p className="rs-use-copy">Issue 03 goes on the press at 06:00. One primary per view.</p>
        </div>
        <div className="rs-use-actions">
          <Button>Print the sheet</Button>
          <Button variant="ghost">Hold</Button>
        </div>
      </div>
    </UseField>
  );
}
