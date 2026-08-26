import { Toggle } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="toggle">
      <h3 className="rs-use-type">Grid</h3>
      <div className="rs-use-body">
        <Toggle defaultPressed>Show the 204</Toggle>
      </div>
    </article>
  );
}
