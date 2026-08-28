import { Nest, NestInner } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="concentric-radius">
      <h3 className="rs-use-type">Frames</h3>
      <div className="rs-use-body">
        <div className="rs-use-compare">
          <div className="rs-use-stack">
            <p className="rs-use-kicker">Copied</p>
            <div className="rs-use-copied">
              <div className="rs-use-copied-in" />
            </div>
          </div>
          <div className="rs-use-stack">
            <p className="rs-use-kicker">Fitted</p>
            <Nest radius={28} pad={16} style={{ width: 184 }}>
              <NestInner />
            </Nest>
          </div>
        </div>
        <p className="rs-use-copy">Steve Ruiz innerRadius, clamped at 0.</p>
      </div>
    </article>
  );
}
