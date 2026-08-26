import { Split } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="resizable">
      <h3 className="rs-use-type">Split</h3>
      <div className="rs-use-body">
        <Split style={{ height: 88, width: "100%" }}>
          <p className="rs-use-kicker">Type</p>
          <p className="rs-use-kicker">Field</p>
        </Split>
      </div>
    </article>
  );
}
