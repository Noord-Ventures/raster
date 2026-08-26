import { Kbd } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="kbd">
      <h3 className="rs-use-type">Key</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">
          Save with <Kbd>⌘</Kbd> <Kbd>S</Kbd>
        </p>
      </div>
    </article>
  );
}
