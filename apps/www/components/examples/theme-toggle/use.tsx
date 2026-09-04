import { ThemeToggle } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";

export function Use() {
  return (
    <UseField name="theme-toggle">
      <h3 className="rs-use-type">Sun</h3>
      <div className="rs-use-body">
        <p className="rs-use-kicker">Paper / black</p>
        <p className="rs-use-copy">The choice stays. The grid does not move.</p>
        <ThemeToggle />
      </div>
    </UseField>
  );
}
