import type { Metadata } from "next";
import { noord, person, typeface } from "./facts";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: noord.what,
};

export default function AboutPage() {
  return (
    <main className="field-page" aria-label="About Raster">
      <div className="field">
        <section className="field-cell field-cell-word" aria-labelledby="masthead-noord">
          <h1 id="masthead-noord" className="field-face">
            {noord.heading}
          </h1>
        </section>

        <section className="field-cell field-cell-lead">
          <p className="field-kicker">{noord.span}</p>
          <div className="field-copy">
            <p>{noord.what}</p>
            <p>{noord.built}</p>
            <p>{noord.who}</p>
          </div>
        </section>

        <section className="field-cell field-cell-inter" aria-labelledby="masthead-typeface">
          <h2 id="masthead-typeface" className="field-face field-face-sub">
            {typeface.name}
          </h2>
        </section>

        <section className="field-cell field-cell-type">
          <p className="field-kicker">
            {typeface.heading} · {typeface.license}
          </p>
          <div className="field-copy">
            <p>
              Designed by {typeface.designer}. {typeface.ofl}.{" "}
              <a href={typeface.url}>{typeface.url.replace("https://", "")}</a>
            </p>
            <p>{typeface.why}</p>
          </div>
        </section>

        <section className="field-cell field-cell-pkg">
          <p className="field-kicker">Packages</p>
          <ul className="field-names">
            {noord.packages.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>

        <section className="field-cell field-cell-door">
          <p className="field-kicker">Door</p>
          <p className="field-url">
            <a href={noord.door}>{noord.door.replace("https://", "")}</a>
          </p>
        </section>

        <section className="field-cell field-cell-host">
          <p className="field-kicker">Host</p>
          <p className="field-url">
            <a href={noord.host}>{noord.host.replace("https://", "")}</a>
          </p>
        </section>

        <section className="field-cell field-cell-who" aria-labelledby="masthead-renato">
          <h2 id="masthead-renato" className="field-name">
            {person.heading}
          </h2>
        </section>

        <section className="field-cell field-cell-mit">
          <p className="field-kicker">MIT</p>
          <div className="field-copy">
            <p>
              {person.copyright}, {person.year}.
            </p>
            <p>
              The repository is{" "}
              <a href={person.repo}>github.com/rennvaldes/raster</a>.
            </p>
            <p>
              <code className="rs-code">{noord.command}</code>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
