import { Input, InputAddon, InputGroup } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="input-group">
      <h3 className="rs-use-type">Host</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Where it lives</p>
          <p className="rs-use-copy">Addon and field share one hairline.</p>
          <InputGroup>
            <InputAddon>https://</InputAddon>
            <Input defaultValue="getraster.com" aria-label="Domain" />
          </InputGroup>
        </div>
      </div>
    </UseField>
  );
}
