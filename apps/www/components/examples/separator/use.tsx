import { Separator } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="separator">
      <h3 className="rs-use-type">Rule</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">Above the fold.</p>
        <Separator />
        <p className="rs-use-copy">Below it. One hairline.</p>
      </div>
    </UseField>
  );
}
