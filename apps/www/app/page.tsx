import Link from "next/link";
import type { Metadata } from "next";
import { CopyControl } from "@/components/code-block";
import { COMMAND, LAW, POSTER, WORD } from "./specimen";
import { SpecimenKit } from "./specimen-kit";
import { SpecimenPrinciples } from "./specimen-principles";
import "./specimen.css";

export const metadata: Metadata = {
  title: { absolute: WORD },
  description: LAW,
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

        <SpecimenPrinciples />

        <section className="specimen-cell specimen-cell-note">
          <p className="specimen-poster">{POSTER}</p>
        </section>

        <section className="specimen-cell specimen-cell-command">
          <div className="specimen-command-row">
            <p className="specimen-command">{COMMAND}</p>
            <CopyControl text={COMMAND} />
          </div>
          <p className="specimen-command-meta">
            <Link href="/docs">Getting started</Link>
            <span aria-hidden="true"> · </span>
            MIT
          </p>
        </section>

        <SpecimenKit />
      </div>
    </main>
  );
}
