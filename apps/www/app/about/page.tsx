import type { Metadata } from "next";
import { credits, law, noord, person, typeface, word } from "./facts";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: `${word}. ${law}`,
};

export default function AboutPage() {
  return (
    <main className="masthead-page" aria-label="About Raster">
      <header className="masthead">
        <p className="masthead-word">{word}</p>
        <p className="masthead-law">{law}</p>
      </header>

      <section className="masthead-block" aria-labelledby="masthead-typeface">
        <h2 id="masthead-typeface">{typeface.heading}</h2>
        <div className="masthead-copy">
          <p className="masthead-kicker">
            {typeface.name} · {typeface.license}
          </p>
          <p>
            Designed by {typeface.designer}. {typeface.ofl}.{" "}
            <a href={typeface.url}>{typeface.url.replace("https://", "")}</a>
          </p>
          <p>{typeface.why}</p>
        </div>
      </section>

      <section className="masthead-block" aria-labelledby="masthead-noord">
        <h2 id="masthead-noord">{noord.heading}</h2>
        <div className="masthead-copy">
          <p>{noord.what}</p>
          <p>
            Host today:{" "}
            <a href={noord.host}>{noord.host.replace("https://", "")}</a>
            . Packages: {noord.packages.join(", ")}.
          </p>
          <p>
            <code className="rs-code">{noord.command}</code>
          </p>
        </div>
      </section>

      <section className="masthead-block" aria-labelledby="masthead-renato">
        <h2 id="masthead-renato">{person.heading}</h2>
        <div className="masthead-copy">
          <p>
            {person.copyright}, {person.year}. The repository is{" "}
            <a href={person.repo}>github.com/rennvaldes/raster</a>.
          </p>
        </div>
      </section>

      <section className="masthead-block" aria-labelledby="masthead-credits">
        <h2 id="masthead-credits">Credits</h2>
        <div className="masthead-copy">
          <p className="masthead-kicker">From the package list in this repo</p>
          <ul>
            {credits.map((item) => (
              <li key={item.name}>
                {item.href ? <a href={item.href}>{item.name}</a> : item.name}
                {item.license !== "—" ? ` · ${item.license}` : null}
                {". "}
                {item.note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
