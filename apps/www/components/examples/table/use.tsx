import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="table">
      <h3 className="rs-use-type">Plan</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The job</p>
          <p className="rs-use-copy">Phases in weeks. Hairline rows, no zebra hue.</p>
        </div>
        <table className="rs-table">
          <thead><tr><th>Phase</th><th>Weeks</th></tr></thead>
          <tbody>
            <tr><td>Strategy</td><td>2</td></tr>
            <tr><td>Identity</td><td>4</td></tr>
          </tbody>
        </table>
      </div>
    </UseField>
  );
}
