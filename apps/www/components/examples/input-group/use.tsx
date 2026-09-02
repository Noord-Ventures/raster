import { InputAddon, InputGroup } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="input-group">
      <h3 className="rs-use-type">Host</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Where it lives</p>
          <p className="rs-use-copy">Addon and field share one hairline.</p>
          <InputGroup>
            <InputAddon>https://</InputAddon>
            <input className="rs-input" defaultValue="getraster.com" />
          </InputGroup>
        </div>
      </div>
    </article>
  );
}
