import { Kbd } from "@noorddev/raster-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="kbd">
      <h3 className="rs-use-type">Key</h3>
      <div className="rs-use-body">
        <p className="rs-use-copy">
          Save with <Kbd>⌘</Kbd> <Kbd>S</Kbd>
        </p>
      </div>
    </UseField>
  );
}
