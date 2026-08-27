import { Tooltip } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="tooltip">
      <h3 className="rs-use-type">Hint</h3>
      <div className="rs-use-body">
        <Tooltip tip="204px module">
          <span className="rs-use-copy">Hover the measure.</span>
        </Tooltip>
      </div>
    </article>
  );
}
