import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="workflow">
      <h3 className="rs-use-type">Pipe</h3>
      <div className="rs-use-body">
        <p className="rs-use-kicker">The job, in order</p>
        <div className="rs-flow">
          <div className="rs-flow-step">
            <span className="rs-flow-num">1</span>
            <h4>Proposal</h4>
            <p>Scope, timeline, and fee on one page.</p>
          </div>
        </div>
      </div>
    </UseField>
  );
}
