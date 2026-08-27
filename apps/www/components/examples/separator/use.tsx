import { Separator } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="separator">
      <h3 className="rs-use-type">Rule</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">Above the fold.</p>
        <Separator />
        <p className="rs-use-copy">Below it. One hairline.</p>
      </div>
    </article>
  );
}
