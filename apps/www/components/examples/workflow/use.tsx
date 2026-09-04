import { Flow, FlowBody, FlowNum, FlowStep, FlowTitle } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="workflow">
      <h3 className="rs-use-type">Pipe</h3>
      <div className="rs-use-body">
        <p className="rs-use-kicker">The job, in order</p>
        <Flow>
          <FlowStep>
            <FlowNum>1</FlowNum>
            <FlowTitle>Proposal</FlowTitle>
            <FlowBody>Scope, timeline, and fee on one page.</FlowBody>
          </FlowStep>
        </Flow>
      </div>
    </UseField>
  );
}
