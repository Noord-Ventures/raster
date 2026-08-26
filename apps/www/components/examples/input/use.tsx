import { Input } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="input">
      <h3 className="rs-use-type">Name</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">On the invoice</p>
          <p className="rs-use-copy">One field. The name is as it prints.</p>
          <Input label="E-mail" placeholder="renn@noord.vc" />
        </div>
      </div>
    </article>
  );
}
