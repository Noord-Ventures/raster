import { Stepper } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="stepper">
      <h3 className="rs-use-type">Job</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Issue 03</p>
          <p className="rs-use-copy">The job is in design. Brief is behind. Build is next.</p>
          <Stepper steps={[{ name: "Brief" }, { name: "Design" }, { name: "Build" }]} current={1} />
        </div>
      </div>
    </UseField>
  );
}
