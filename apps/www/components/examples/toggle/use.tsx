import { Toggle } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="toggle">
      <h3 className="rs-use-type">Grid</h3>
      <div className="rs-use-body">
        <Toggle defaultPressed>Show the 204</Toggle>
      </div>
    </UseField>
  );
}
