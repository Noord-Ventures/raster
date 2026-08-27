import type { Metadata } from "next";
import { era, featured, field, noord, person, programme, typeface } from "./facts";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: era.homage,
};

export default function AboutPage() {
  return (
    <main className="field-page" aria-label="About Raster">
      <div className="field">
        <section className="field-cell field-cell-era" aria-labelledby="era-heading">
          <p className="field-kicker">{era.kicker}</p>
          <h1 id="era-heading" className="field-face">
            {era.heading}
          </h1>
        </section>

        <section className="field-cell field-cell-lead">
          <p className="field-kicker">Homage</p>
          <div className="field-copy">
            <p>{era.homage}</p>
            <p>{era.programme}</p>
            <p>{era.pair}</p>
          </div>
        </section>

        {featured.map((figure) => (
          <section
            key={figure.id}
            className={`field-cell field-cell-${figure.id}`}
            aria-label={figure.name}
          >
            <p className="field-kicker">
              {figure.years} · {figure.place}
            </p>
            <h2 className="field-name field-name-feature">{figure.name}</h2>
            <p className="field-mark">{figure.mark}</p>
          </section>
        ))}

        {field.map((entry, i) => (
          <section
            key={entry.name}
            className={`field-cell field-cell-n${String(i + 1).padStart(2, "0")}`}
            aria-label={entry.name}
          >
            <p className="field-kicker">
              {entry.years} · {entry.place}
            </p>
            <h2 className="field-name">{entry.name}</h2>
            <p className="field-mark">{entry.mark}</p>
          </section>
        ))}

        <section className="field-cell field-cell-mod" aria-label="204 module">
          <p className="field-kicker">{programme.module.kicker}</p>
          <div className="field-spec field-spec-module" aria-hidden="true">
            <span>204</span>
            <span>184</span>
            <span>20</span>
            <span />
          </div>
          <p className="field-mark">{programme.module.law}</p>
        </section>

        <section className="field-cell field-cell-hair" aria-label="Hairlines">
          <p className="field-kicker">{programme.hairline.kicker}</p>
          <div className="field-spec field-spec-hair" aria-hidden="true" />
          <p className="field-mark">{programme.hairline.law}</p>
        </section>

        <section className="field-cell field-cell-flush" aria-label="Flush cells">
          <p className="field-kicker">{programme.flush.kicker}</p>
          <div className="field-spec field-spec-flush" aria-hidden="true">
            <span>0</span>
          </div>
          <p className="field-mark">{programme.flush.law}</p>
        </section>

        <section className="field-cell field-cell-grot" aria-label="Grotesque">
          <p className="field-kicker">{programme.grotesque.kicker}</p>
          <p className="field-grotesque" aria-hidden="true">
            {programme.grotesque.mark}
          </p>
          <p className="field-mark">{programme.grotesque.law}</p>
        </section>

        <section className="field-cell field-cell-colophon" aria-label="Colophon">
          <p className="field-kicker">Colophon</p>
          <div className="field-colophon">
            <p>
              {noord.heading} · {noord.span}
            </p>
            <p>{noord.what}</p>
            <p>
              {noord.built} {noord.who}
            </p>
            <p>
              {typeface.name}, {typeface.license} · {typeface.designer}. {typeface.ofl}.{" "}
              <a href={typeface.url}>{typeface.url.replace("https://", "")}</a>
            </p>
            <p>{noord.packages.join(" · ")}</p>
            <p>
              <a href={noord.door}>{noord.door.replace("https://", "")}</a>
              {" · "}
              <a href={noord.host}>{noord.host.replace("https://", "")}</a>
              {" · "}
              <a href={person.repo}>github.com/rennvaldes/raster</a>
            </p>
            <p>
              {person.copyright}, {person.year}.
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
