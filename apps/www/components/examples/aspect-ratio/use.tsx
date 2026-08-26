import { AspectRatio } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="aspect-ratio">
      <h3 className="rs-use-type">Frame</h3>
      <div className="rs-use-body">
        <AspectRatio ratio={16 / 9}>
          <p className="rs-use-copy">The field is the picture.</p>
        </AspectRatio>
      </div>
    </article>
  );
}
