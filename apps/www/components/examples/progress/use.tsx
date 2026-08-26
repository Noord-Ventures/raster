import { Progress } from "@noordvc/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="progress">
      <h3 className="rs-use-type">Run</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Alkmaar / 06:00</p>
          <p className="rs-use-copy">Issue 03 is on the cylinder. Forty percent through the run.</p>
          <Progress value={40} label="On press" />
        </div>
      </div>
    </article>
  );
}
