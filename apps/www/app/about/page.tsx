import type { Metadata } from "next";
import { CopyControl } from "@/components/code-block";
import { DOOR } from "../specimen";
import {
  era,
  featured,
  field,
  history,
  lead,
  license,
  noord,
  person,
  program,
  specimen,
  typeface,
  usage,
} from "./facts";
import { AboutNotes } from "./about-notes";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: lead.what,
  alternates: { canonical: `${DOOR}/about/` },
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
          <p className="field-kicker">{lead.kicker}</p>
          <div className="field-copy">
            <p>{lead.what}</p>
            <p>{lead.who}</p>
          </div>
        </section>

        <section className="field-cell field-cell-use" aria-labelledby="usage-heading">
          <p className="field-kicker" id="usage-heading">
            {usage.kicker}
          </p>
          <div className="field-copy">
            <p>{usage.intro}</p>
          </div>
          <div className="field-code-stack">
            <div className="field-step">
              <p className="field-kicker">{usage.commandWhere}</p>
              <div className="field-code-row">
                <pre className="field-code">
                  <code>{usage.command}</code>
                </pre>
                <CopyControl text={usage.command} />
              </div>
            </div>
            <div className="field-step">
              <p className="field-kicker">{usage.htmlWhere}</p>
              <div className="field-code-row">
                <pre className="field-code">
                  <code>{usage.html}</code>
                </pre>
                <CopyControl text={usage.html} />
              </div>
            </div>
            <div className="field-step">
              <p className="field-kicker">{usage.controlWhere}</p>
              <div className="field-code-row">
                <pre className="field-code">
                  <code>{usage.control}</code>
                </pre>
                <CopyControl text={usage.control} />
              </div>
            </div>
          </div>
          <div className="field-copy">
            <p>{usage.landing}</p>
            <p>{usage.files}</p>
          </div>
          <p className="field-mark">{usage.after}</p>
        </section>

        <section className="field-cell field-cell-free">
          <p className="field-kicker">{license.kicker}</p>
          <div className="field-copy">
            <p>{license.body}</p>
            <p>
              {license.type}{" "}
              <a href={typeface.url}>{typeface.url.replace("https://", "")}</a>
            </p>
          </div>
        </section>

        <section className="field-cell field-cell-spec" aria-labelledby="specimen-heading">
          <p className="field-kicker" id="specimen-heading">
            {specimen.kicker}
          </p>
          <p className="field-spec-type" aria-hidden="true">
            Raster
          </p>
          <div className="field-copy field-copy-wide">
            <p>{specimen.body}</p>
            <p>{specimen.mid}</p>
            <p>{specimen.long}</p>
          </div>
        </section>

        <section className="field-cell field-cell-mod" aria-label="204 module">
          <p className="field-kicker">{program.module.kicker}</p>
          <div className="field-spec field-spec-module" aria-label="204 module: 184 column and 20 gutter">
            <div className="field-mod204">
              <div className="field-col184" />
              <div className="field-gut20" />
            </div>
            <div className="field-mod-dim">
              <span>184</span>
              <span>20</span>
            </div>
          </div>
          <p className="field-mark">{program.module.law}</p>
        </section>

        <section className="field-cell field-cell-hair" aria-label="Hairlines">
          <p className="field-kicker">{program.hairline.kicker}</p>
          <div className="field-spec field-spec-hair" aria-hidden="true" />
          <p className="field-mark">{program.hairline.law}</p>
        </section>

        <section className="field-cell field-cell-flush" aria-label="Flush cells">
          <p className="field-kicker">{program.flush.kicker}</p>
          <div className="field-spec field-spec-flush" aria-hidden="true">
            <div className="field-flush-row" />
            <div className="field-flush-row" />
            <div className="field-flush-row" />
          </div>
          <p className="field-mark">{program.flush.law}</p>
        </section>

        <section className="field-cell field-cell-grot" aria-label="Grotesque">
          <p className="field-kicker">{program.grotesque.kicker}</p>
          <p className="field-grotesque" aria-hidden="true">
            {program.grotesque.mark}
          </p>
          <p className="field-mark">{program.grotesque.law}</p>
        </section>

        <section className="field-cell field-cell-hist">
          <p className="field-kicker">{history.kicker}</p>
          <div className="field-copy">
            <p>{history.body}</p>
          </div>
        </section>

        {featured.map((figure) => (
          <section
            key={figure.id}
            className={`field-cell field-cell-${figure.id}${figure.work ? " field-cell-has-work" : ""}`}
            aria-label={figure.name}
          >
            {figure.work ? (
              <div className="field-work">
                <img src={figure.work.src} alt={figure.work.alt} />
              </div>
            ) : null}
            {figure.work ? (
              <div className="field-matter">
                <p className="field-kicker">
                  {figure.years} · {figure.place}
                </p>
                <h2 className="field-name field-name-feature">{figure.name}</h2>
                <p className="field-mark">{figure.mark}</p>
              </div>
            ) : (
              <>
                <p className="field-kicker">
                  {figure.years} · {figure.place}
                </p>
                <h2 className="field-name field-name-feature">{figure.name}</h2>
                <p className="field-mark">{figure.mark}</p>
              </>
            )}
          </section>
        ))}

        {field.map((entry, i) => {
          const work = "work" in entry ? entry.work : undefined;
          return (
            <section
              key={entry.name}
              className={`field-cell field-cell-n${String(i + 1).padStart(2, "0")}${work ? " field-cell-has-work" : ""}`}
              aria-label={entry.name}
            >
              {work ? (
                <div className="field-work">
                  <img src={work.src} alt={work.alt} />
                </div>
              ) : null}
              {work ? (
                <div className="field-matter">
                  <p className="field-kicker">
                    {entry.years} · {entry.place}
                  </p>
                  <h2 className="field-name">{entry.name}</h2>
                  <p className="field-mark">{entry.mark}</p>
                </div>
              ) : (
                <>
                  <p className="field-kicker">
                    {entry.years} · {entry.place}
                  </p>
                  <h2 className="field-name">{entry.name}</h2>
                  <p className="field-mark">{entry.mark}</p>
                </>
              )}
            </section>
          );
        })}

        <section className="field-cell field-cell-faq" aria-labelledby="notes-heading">
          <p className="field-kicker" id="notes-heading">
            Notes
          </p>
          <div className="field-notes">
            <AboutNotes />
          </div>
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
              <a href={person.repo}>github.com/Noord-Ventures/raster</a>
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
