import { Donut, Share } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="donut">
      <h3 className="rs-use-type">Share</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">This issue</p>
          <p className="rs-use-copy">A ring against its whole, then a flush strip. Hairline, not a pie.</p>
          <Donut value={72} max={100} size={184} label="printed" />
        </div>
        <Share
          slices={[
            { label: "Sheet", value: 72 },
            { label: "Proof", value: 18 },
            { label: "Waste", value: 10 },
          ]}
        />
      </div>
    </UseField>
  );
}
