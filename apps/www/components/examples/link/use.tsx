import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="link">
      <h3 className="rs-use-type">Cite</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">Running copy</p>
          <p className="rs-use-copy">
            Read the <a className="rs-link-underline" href="/docs">install notes</a>. The link is ink, never a second color.
          </p>
        </div>
        <a className="rs-link" href="/components">Open the kit</a>
      </div>
    </UseField>
  );
}
