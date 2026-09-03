import type { Metadata } from "next";
import { CopyControl } from "@/components/code-block";
import { sx } from "@/lib/sx";
import { COMMAND, LAW, PACKAGES_PUBLISHED, POSTER, WORD } from "./specimen";
import { SpecimenKit } from "./specimen-kit";
import { SpecimenPrinciples } from "./specimen-principles";
import { specimen } from "./specimen.stylex";
import "./specimen.css";

export const metadata: Metadata = {
  title: { absolute: WORD },
  description: LAW,
};

export default function Home() {
  return (
    <main {...sx("specimen-page", specimen.page)} aria-label="Raster specimen">
      <div {...sx("specimen", specimen.field)}>
        <section
          {...sx("specimen-cell specimen-cell-face", specimen.cell, specimen.cellTall)}
          aria-label="Face"
        >
          <p className="specimen-face">{WORD}</p>
        </section>

        <section
          {...sx("specimen-cell specimen-cell-law", specimen.cell, specimen.cellTall, specimen.cellEnd)}
        >
          <h1 className="specimen-law">{LAW}</h1>
        </section>

        <section {...sx("specimen-cell specimen-cell-command", specimen.cell, specimen.cellCommand)}>
          {PACKAGES_PUBLISHED ? (
            <>
              <p className="specimen-command-kicker">Install</p>
              <div className="specimen-command-row">
                <p className="specimen-command">{COMMAND}</p>
                <CopyControl text={COMMAND} />
              </div>
              <p className="specimen-command-meta">
                <a href="/docs">Getting started</a>
                <span aria-hidden="true"> · </span>
                MIT
              </p>
            </>
          ) : (
            <>
              <p className="specimen-command-kicker">Source</p>
              <p className="specimen-command">Not on npm</p>
              <p className="specimen-command-meta">
                <a href="https://github.com/Noord-Ventures/raster">github.com/Noord-Ventures/raster</a>
                <span aria-hidden="true"> · </span>
                MIT
              </p>
            </>
          )}
        </section>

        <SpecimenPrinciples />

        <section {...sx("specimen-cell specimen-cell-note", specimen.cell, specimen.cellEnd)}>
          <p className="specimen-poster">{POSTER}</p>
        </section>

        <SpecimenKit />
      </div>
    </main>
  );
}
