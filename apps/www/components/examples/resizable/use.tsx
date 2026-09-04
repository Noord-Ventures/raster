import { Split } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="resizable">
      <h3 className="rs-use-type">Split</h3>
      <div className="rs-use-body">
        <Split style={{ height: 88, width: "100%" }}>
          <p className="rs-use-kicker">Type</p>
          <p className="rs-use-kicker">Field</p>
        </Split>
      </div>
    </UseField>
  );
}
