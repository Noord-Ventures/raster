import { Switch } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="switch">
      <h3 className="rs-use-type">Night</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Paper / black</p>
          <p className="rs-use-copy">The grid stays. Only the ink inverts.</p>
        </div>
        <Switch defaultChecked aria-label="Dark paper" />
      </div>
    </article>
  );
}
