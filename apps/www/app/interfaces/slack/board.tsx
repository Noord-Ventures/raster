"use client";

import * as React from "react";

type Kind = "person" | "agent";
type Line = { who: string; initials: string; kind: Kind; body: string; fresh?: boolean };

const CHANNELS = [
  { id: "press", label: "#press" },
  { id: "studio", label: "#studio" },
  { id: "raster", label: "#raster" },
] as const;

const PEOPLE = [
  { id: "renn", label: "Renn", kind: "person" as const },
  { id: "sheet", label: "Sheet", kind: "agent" as const },
  { id: "proof", label: "Proof", kind: "agent" as const },
];

const START: Record<string, Line[]> = {
  press: [
    { who: "Renn", initials: "RV", kind: "person", body: "Press run 14 is on the sheet. Fee is on page one." },
    { who: "Sheet", initials: "SH", kind: "agent", body: "Logged. Weeks 4–7. I will keep the timeline under the fee." },
    { who: "Noord", initials: "NO", kind: "person", body: "Proofs stay in the same ink." },
    { who: "Proof", initials: "PR", kind: "agent", body: "Watching the plate. I will ping if the density drops." },
  ],
  studio: [
    { who: "Noord", initials: "NO", kind: "person", body: "Alkmaar desk is in." },
    { who: "Sheet", initials: "SH", kind: "agent", body: "Calendar is on week 34. Three jobs in proof." },
    { who: "Renn", initials: "RV", kind: "person", body: "Leave the crumb bar off the poster." },
  ],
  raster: [
    { who: "Renn", initials: "RV", kind: "person", body: "Interfaces is a sibling of Components." },
    { who: "Proof", initials: "PR", kind: "agent", body: "Six routes. I will fail CI if one disappears." },
    { who: "Sheet", initials: "SH", kind: "agent", body: "Catalog only. No second kit on the chrome." },
  ],
  renn: [{ who: "Renn", initials: "RV", kind: "person", body: "Hold the spot for the field." }],
  sheet: [
    { who: "Sheet", initials: "SH", kind: "agent", body: "I read the brief. Two sentences, same claim." },
    { who: "You", initials: "YO", kind: "person", body: "Apply it on the canvas, not in chat." },
  ],
  proof: [{ who: "Proof", initials: "PR", kind: "agent", body: "Plate 09 is within density." }],
};

export function Board() {
  const [room, setRoom] = React.useState("press");
  const [lines, setLines] = React.useState<Record<string, Line[]>>(START);
  const [draft, setDraft] = React.useState("");
  const [reacted, setReacted] = React.useState<Record<string, boolean>>({});
  const title =
    CHANNELS.find((item) => item.id === room)?.label ??
    PEOPLE.find((item) => item.id === room)?.label ??
    room;
  const thread = lines[room] ?? [];
  const mixed = thread.some((line) => line.kind === "agent");

  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setLines((map) => ({
      ...map,
      [room]: [...(map[room] ?? []), { who: "You", initials: "YO", kind: "person", body: text, fresh: true }],
    }));
  }

  return (
    <main className="if-board sc-sl" aria-label="Slack">
      <aside className="sc-sl-rail" aria-label="Workspace">
        <p className="sc-sl-ws">Studio</p>
        <p className="sc-sl-label">Channels</p>
        {CHANNELS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={room === item.id}
            onClick={() => setRoom(item.id)}
          >
            {item.label}
          </button>
        ))}
        <p className="sc-sl-label">People</p>
        {PEOPLE.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={room === item.id}
            onClick={() => setRoom(item.id)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <section className="sc-sl-main" aria-label="Chat">
        <div className="sc-sl-head">
          <h1>{title}</h1>
          <span>{mixed ? "People and agents" : "People"}</span>
        </div>
        <div className="sc-sl-thread">
          {thread.map((line, i) => {
            const key = `${room}-${i}`;
            return (
              <article key={key} className={line.fresh ? "sc-sl-line sc-fresh" : "sc-sl-line"}>
                <span className="sc-sl-ava" data-kind={line.kind}>
                  {line.initials}
                </span>
                <div>
                  <p className="sc-sl-who">
                    {line.who}
                    {line.kind === "agent" ? <em>Agent</em> : null}
                  </p>
                  <p className="sc-sl-text">{line.body}</p>
                  <button
                    type="button"
                    className="sc-sl-react"
                    aria-pressed={!!reacted[key]}
                    onClick={() => setReacted((map) => ({ ...map, [key]: !map[key] }))}
                  >
                    {reacted[key] ? "Noted" : "Note"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <form
          className="sc-sl-composer"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <textarea
            rows={2}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={`Message ${title}`}
            aria-label="Message"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
          />
          <button type="submit">Send</button>
        </form>
      </section>

      <aside className="sc-sl-side" aria-label="Room">
        <h2>In the room</h2>
        <p className="sc-sl-person">
          Renn <span>Person</span>
        </p>
        <p className="sc-sl-person">
          Noord <span>Person</span>
        </p>
        <p className="sc-sl-person">
          Sheet <span>Agent</span>
        </p>
        <p className="sc-sl-person">
          Proof <span>Agent</span>
        </p>
      </aside>
    </main>
  );
}
