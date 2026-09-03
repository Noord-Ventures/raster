import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="assistant">
      <h3 className="rs-use-type">Ask</h3>
      <div className="rs-use-body">
        <p className="rs-use-kicker">On the sheet</p>
        <div className="rs-ai">
          <div className="rs-ai-msg rs-ai-user">
            <div className="rs-ai-user-block">Make the intro tighter.</div>
          </div>
          <p className="rs-ai-reply">Done. Two sentences, same claim.</p>
        </div>
      </div>
    </UseField>
  );
}
