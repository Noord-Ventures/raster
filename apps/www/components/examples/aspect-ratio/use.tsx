import { AspectRatio } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="aspect-ratio">
      <h3 className="rs-use-type">Frame</h3>
      <div className="rs-use-body">
        <AspectRatio ratio={16 / 9}>
          <p className="rs-use-copy">The field is the picture.</p>
        </AspectRatio>
      </div>
    </UseField>
  );
}
