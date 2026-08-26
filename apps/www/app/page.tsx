import Link from "next/link";
import type { Metadata } from "next";
import { COMMAND, FACE, LAW } from "./specimen";
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
          <p className="specimen-face">{FACE}</p>
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

        <section className="specimen-cell specimen-cell-demo specimen-cell-btn" aria-label="Button">
          <div className="specimen-demo-live">
            <button type="button" className="rs-btn-primary">
              Save
            </button>
          </div>
        </section>

        <section className="specimen-cell specimen-cell-demo specimen-cell-sw" aria-label="Switch">
          <div className="specimen-demo-live">
            <span className="rs-switch rs-switch-on">
              <i />
            </span>
          </div>
        </section>

        <section className="specimen-cell specimen-cell-demo specimen-cell-badge" aria-label="Badge">
          <div className="specimen-demo-live">
            <span className="rs-badge">Draft</span>
          </div>
        </section>

        <div className="specimen-cell specimen-cell-empty" aria-hidden="true" />
      </div>
    </main>
  );
}
