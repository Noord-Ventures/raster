import Link from "next/link";
import type { Metadata } from "next";
import { COMMAND, LAW, WORD } from "./specimen";
import { SpecimenKit } from "./specimen-kit";
import "./specimen.css";

export const metadata: Metadata = {
  title: "Raster",
  description: `${LAW} ${COMMAND}`,
};

export default function Home() {
  return (
    <main className="specimen-page" aria-label="Raster specimen">
      <div className="specimen">
        <section className="specimen-cell specimen-cell-face" aria-label="Face">
          <p className="specimen-face">{WORD}</p>
        </section>

        <section className="specimen-cell specimen-cell-law">
          <h1 className="specimen-law">{LAW}</h1>
        </section>

        <section className="specimen-cell specimen-cell-command">
          <p className="specimen-command">{COMMAND}</p>
          <p className="specimen-command-meta">
            <Link href="/docs">Getting started</Link>
            <span aria-hidden="true"> · </span>
            MIT
          </p>
        </section>

        <SpecimenKit />

        <div className="specimen-cell specimen-cell-empty" aria-hidden="true" />
      </div>
    </main>
  );
}
