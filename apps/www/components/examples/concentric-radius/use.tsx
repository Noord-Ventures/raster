import { Button, Nest, NestInner } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="concentric-radius">
      <h3 className="rs-use-type">Rule</h3>
      <div className="rs-use-body">
        <Nest radius={28} pad={16} style={{ width: 184 }}>
          <NestInner>
            <Button size="sm">Save</Button>
          </NestInner>
        </Nest>
        <p className="rs-use-copy">
          Nested corners share a position. Inner radius = outer − inset, clamped at 0.
        </p>
      </div>
    </article>
  );
}
