import { Select } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="select">
      <h3 className="rs-use-type">Face</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The only face</p>
          <p className="rs-use-copy">Inter, or Inter. Weight and size do the rest.</p>
          <Select
            aria-label="Typeface"
            options={[
              { value: "inter", label: "Inter" },
              { value: "inter-tight", label: "Inter tight" },
            ]}
            defaultValue="inter"
          />
        </div>
      </div>
    </UseField>
  );
}
