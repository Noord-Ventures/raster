import { Link } from "@noorddev/vlak-react";
import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="link">
      <h3 className="rs-use-type">Cite</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Running copy</p>
          <p className="rs-use-copy">
            Read the <Link underline href="/docs">install notes</Link>. The link is ink, never a second color.
          </p>
        </div>
        <Link href="/components">Open the kit</Link>
      </div>
    </UseField>
  );
}
