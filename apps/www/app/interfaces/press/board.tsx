"use client";

import * as React from "react";
import { Icon } from "@noorddev/vlak-react";
import { Brand } from "../mark";
import { PhoneV1Chrome } from "../v1-chrome";
import { interfaceBySlug } from "../catalog";

const WHAT = interfaceBySlug("press")!.what;

const WEEK = { sheets: 38, proofs: 12, press: 4, series: [12, 18, 15, 26, 24, 11, 9] };
const MONTH = { sheets: 142, proofs: 41, press: 9, series: [28, 34, 31, 42, 38, 22, 19] };

const JOBS = [
  { id: "14", name: "Press run 14", city: "Alkmaar", weeks: 4, state: "On press", line: "On press · Alkmaar", note: "Plate is up at 06:00. Density watch on unit 09.", sheet: "Fee on page one. Timeline under the fee. Same ink." },
  { id: "b", name: "Proof set B", city: "Delft", weeks: 4, state: "Proof", line: "Proof · 4 weeks", note: "Second proof due Friday. Same ink.", sheet: "One mark. No second color in the chrome." },
  { id: "09", name: "Invoice 09", city: "desk", weeks: 2, state: "Invoice", line: "Invoice · desk", note: "Cover number matches the invoice.", sheet: "Date the sheet to the week the press starts." },
  { id: "lock", name: "Brief lock", city: "interfaces", weeks: 3, state: "Brief", line: "Brief · interfaces", note: "One sheet. Scope, weeks, fee.", sheet: "A grid is a plan, not a decoration." },
];

function Line({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const w = 560;
  const h = 120;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => `${i * step},${h - (v / max) * (h - 16)}`).join(" ");
  return (
    <svg className="sc-dash-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Sheets over the range">
      <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" points={pts} />
    </svg>
  );
}

export function Board() {
  const [range, setRange] = React.useState<"week" | "month">("week");
  const [page, setPage] = React.useState("overview");
  const [job, setJob] = React.useState("14");
  const [sheet, setSheet] = React.useState(false);
  const [metricFresh, setMetricFresh] = React.useState(false);
  const data = range === "week" ? WEEK : MONTH;
  const selected = JOBS.find((item) => item.id === job) ?? JOBS[0]!;

  return (
    <section className="if-board sc-dash" aria-label={WHAT} style={{ ["--if-spot" as string]: "#E30613" }}>
      <PhoneV1Chrome heading="Press" action="Floor" onAction={() => { setPage("overview"); setSheet(false); }} />
      <aside className="sc-dash-rail" aria-label="Floor">
        <div className="sc-dash-brand">
          <Brand slug="press" />
          <p className="sc-dash-voice">On press</p>
        </div>
        <p className="sc-dash-label if-ico-row">
          <Icon name="layout" size={12} />
          Floor
        </p>
        {[
          { id: "overview", label: "Overview", meta: "Today", icon: "layout" as const },
          { id: "jobs", label: "Jobs", meta: "4", icon: "list" as const },
          { id: "invoices", label: "Invoices", meta: "2", icon: "receipt" as const },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            className="sc-dash-nav"
            aria-current={page === item.id}
            onClick={() => {
              setPage(item.id);
              setSheet(false);
            }}
          >
            <span className="if-ico-row">
              <Icon name={item.icon} size={16} />
              {item.label}
            </span>
            <em>{item.meta}</em>
          </button>
        ))}
      </aside>

      <section className="sc-dash-main">
        <div className="sc-dash-head">
          <h1 className="if-ico-row">
            <Icon name={page === "overview" ? "layout" : page === "jobs" ? "list" : "receipt"} size={16} />
            {page === "overview" ? "Overview" : page === "jobs" ? "Jobs" : "Invoices"}
          </h1>
          <div className="sc-dash-range" role="group" aria-label="Range">
            {(["week", "month"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={range === item}
                onClick={() => {
                  setRange(item);
                  setMetricFresh(true);
                }}
              >
                <Icon name={item === "week" ? "calendar" : "history"} size={12} />
                {item === "week" ? "Week" : "Month"}
              </button>
            ))}
          </div>
        </div>

        <div className="sc-dash-metrics">
          <article className="sc-dash-metric">
            <p className="if-ico-row"><Icon name="layers" size={12} /> <span className="sc-dash-metric-long">Sheets this {range}</span><span className="sc-dash-metric-short">Sheets</span></p>
            <strong key={range} className={metricFresh ? "sc-fresh" : undefined}>{data.sheets}</strong>
          </article>
          <article className="sc-dash-metric">
            <p className="if-ico-row"><Icon name="file-text" size={12} /> Proofs</p>
            <strong key={range} className={metricFresh ? "sc-fresh" : undefined}>{data.proofs}</strong>
          </article>
          <article className="sc-dash-metric">
            <p className="if-ico-row"><Icon name="printer" size={12} /> On press</p>
            <strong key={range} className={`sc-dash-spot${metricFresh ? " sc-fresh" : ""}`}>{data.press}</strong>
          </article>
        </div>

        <div className="sc-dash-split">
          <article className="sc-dash-card">
            <h2 className="if-ico-row"><Icon name="trending-up" size={12} /> Throughput</h2>
            <Line values={data.series} />
          </article>
          <article className="sc-dash-card sc-dash-jobs">
            <h2 className="if-ico-row">
              <Icon name={page === "invoices" ? "receipt" : "list"} size={12} />
              {page === "invoices" ? "Open invoices" : "Jobs"}
            </h2>
            {JOBS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="sc-dash-job"
                aria-current={job === item.id}
                onClick={() => {
                  setJob(item.id);
                  setPage("jobs");
                  setSheet(false);
                }}
              >
                <span className="if-ico-row">
                  <Icon
                    name={item.state === "On press" ? "printer" : item.state === "Proof" ? "eye" : item.state === "Invoice" ? "receipt" : "edit"}
                    size={16}
                  />
                  <span>
                    {item.name}
                    <br />
                    <small className="sc-dash-job-long">{item.city} · {item.weeks} weeks</small>
                    <small className="sc-dash-job-short">{item.line}</small>
                  </span>
                </span>
                <span>{item.state}</span>
              </button>
            ))}
            <div key={job} className="sc-dash-detail sc-fresh">
              <p>{selected.note}</p>
              <button type="button" onClick={() => setSheet(true)}>
                <Icon name="file" size={12} />
                Open sheet
              </button>
            </div>
          </article>
        </div>
      </section>

      <nav className="if-thumb" aria-label={WHAT}>
        {[
          { id: "overview", label: "Overview", icon: "layout" as const },
          { id: "jobs", label: "Jobs", icon: "list" as const },
          { id: "invoices", label: "Invoices", icon: "receipt" as const },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={page === item.id}
            onClick={() => {
              setPage(item.id);
              setSheet(false);
            }}
          >
            <Icon name={item.icon} size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      <aside className={`if-inspect${sheet ? " is-open" : ""}`} aria-label="Sheet">
        <div className="sc-dash-inspect">
          {sheet ? (
            <div key={job} className="sc-fresh">
              <h2 className="if-ico-row">
                <Icon name="file-text" size={16} />
                {selected.name}
              </h2>
              <p>{selected.sheet}</p>
              <p className="if-ico-row">
                <Icon name="map-pin" size={12} />
                {selected.city}
              </p>
              <p className="if-ico-row">
                <Icon name="calendar" size={12} />
                {selected.weeks} weeks
              </p>
              <p className="if-ico-row">
                <Icon
                  name={selected.state === "On press" ? "printer" : selected.state === "Proof" ? "eye" : selected.state === "Invoice" ? "receipt" : "edit"}
                  size={12}
                />
                {selected.state}
              </p>
            </div>
          ) : null}
        </div>
      </aside>
    </section>
  );
}
