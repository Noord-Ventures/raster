import { Assistant, AssistantMsg, AssistantReply, AssistantUserBlock } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="assistant">
      <h3 className="rs-use-type">Ask</h3>
      <div className="rs-use-body">
        <p className="rs-use-kicker">On the sheet</p>
        <Assistant>
          <AssistantMsg user>
            <AssistantUserBlock>Make the intro tighter.</AssistantUserBlock>
          </AssistantMsg>
          <AssistantReply>Done. Two sentences, same claim.</AssistantReply>
        </Assistant>
      </div>
    </UseField>
  );
}
