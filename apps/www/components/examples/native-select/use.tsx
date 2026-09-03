import { NativeSelect } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="native-select">
      <h3 className="rs-use-type">City</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Where the desk is</p>
          <p className="rs-use-copy">The platform list. Raster chrome.</p>
        </div>
        <NativeSelect label="Studio city" defaultValue="alkmaar">
          <option value="alkmaar">Alkmaar</option>
          <option value="delft">Delft</option>
          <option value="rotterdam">Rotterdam</option>
        </NativeSelect>
      </div>
    </UseField>
  );
}
