"use client";

import * as React from "react";
import { dashSans } from "../scene-fonts";

const WEEK = { sheets: 38, proofs: 12, press: 4, series: [12, 18, 15, 26, 24, 11, 9] };
const MONTH = { sheets: 142, proofs: 41, press: 9, series: [28, 34, 31, 42, 38, 22, 19] };

const JOBS = [
  { id: "14", name: "Press run 14", city: "Alkmaar", weeks: 4, state: "On press", note: "Plate is up at 06:00. Density watch on unit 09." },
  { id: "09", name: "Identity 09", city: "Delft", weeks: 6, state: "Proof", note: "Second proof due Friday. Same ink." },
  { id: "03", name: "Ledger 03", city: "Haarlem", weeks: 2, state: "Invoice", note: "Cover number matches the invoice." },
  { id: "22", name: "Poster 22", city: "Utrecht", weeks: 3, state: "Brief", note: "One sheet. Scope, weeks, fee." },
];

function Line({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const w = 560;
  const h = 180;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => `${i * step},${h - (v / max) * (h - 16)}`).join(" ");
  return (
    <svg className="sc-dash-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Sheets over the range">
      <polyline fill="none" stroke="#1f8a78" strokeWidth="3" strokeLinejoin="round" points={pts} />
      {values.map((v, i) => (
        <circle key={i} cx={i * step} cy={h - (v / max) * (h - 16)} r="4" fill="#1f8a78" />
      ))}
    </svg>
  );
}

export function Board() {
  const [range, setRange] = React.useState<"week" | "month">("week");
  const [page, setPage] = React.useState("overview");
  const [job, setJob] = React.useState("14");
  const data = range === "week" ? WEEK : MONTH;
  const selected = JOBS.find((item) => item.id === job) ?? JOBS[0]!;

  return (
    <main className={`if-board sc-dash ${dashSans.variable}`} aria-label="SaaS dashboard">
      <aside className="sc-dash-rail" aria-label="Studio">
        <p className="sc-dash-brand">Studio ledger</p>
        {[
          { id: "overview", label: "Overview" },
          { id: "jobs", label: "Jobs" },
          { id: "invoices", label: "Invoices" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={page === item.id}
            onClick={() => setPage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <section className="sc-dash-main">
        <div className="sc-dash-head">
          <h1>{page === "overview" ? "Overview" : page === "jobs" ? "Jobs" : "Invoices"}</h1>
          <div className="sc-dash-range" role="group" aria-label="Range">
            {(["week", "month"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={range === item}
                onClick={() => setRange(item)}
              >
                {item === "week" ? "Week" : "Month"}
              </button>
            ))}
          </div>
        </div>

        <div className="sc-dash-metrics">
          <article className="sc-dash-metric">
            <p>Sheets this {range}</p>
            <strong>{data.sheets}</strong>
          </article>
          <article className="sc-dash-metric">
            <p>Proofs</p>
            <strong>{data.proofs}</strong>
          </article>
          <article className="sc-dash-metric">
            <p>On press</p>
            <strong>{data.press}</strong>
          </article>
        </div>

        <div className="sc-dash-split">
          <article className="sc-dash-card">
            <h2>Throughput</h2>
            <Line values={data.series} />
          </article>
          <article className="sc-dash-card">
            <h2>{page === "invoices" ? "Open invoices" : "Jobs"}</h2>
            {JOBS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="sc-dash-job"
                aria-current={job === item.id}
                onClick={() => {
                  setJob(item.id);
                  setPage("jobs");
                }}
              >
                <span>
                  {item.name}
                  <br />
                  <small>{item.city} · {item.weeks} weeks</small>
                </span>
                <span>{item.state}</span>
              </button>
            ))}
            <div className="sc-dash-detail">
              <span className="sc-dash-dot" />
              {selected.note}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
