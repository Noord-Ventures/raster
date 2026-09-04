import { Combobox } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="combobox">
      <h3 className="rs-use-type">Find</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Studio city</p>
          <p className="rs-use-copy">Type to find the town. The list stays ink.</p>
          <Combobox
            options={[
              { value: "alkmaar", label: "Alkmaar" },
              { value: "delft", label: "Delft" },
              { value: "haarlem", label: "Haarlem" },
            ]}
            placeholder="Search towns…"
          />
        </div>
      </div>
    </UseField>
  );
}
