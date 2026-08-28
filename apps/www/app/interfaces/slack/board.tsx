"use client";

import * as React from "react";
import { Brand } from "../mark";

type Kind = "person" | "agent";
type Line = { who: string; kind: Kind; body: string; fresh?: boolean };

const CHANNELS = [
  { id: "press", label: "Press" },
  { id: "studio", label: "Studio" },
  { id: "floor", label: "Floor" },
] as const;

const PEOPLE = [
  { id: "inez", label: "Inez", kind: "person" as const },
  { id: "sheet", label: "Sheet", kind: "agent" as const },
  { id: "proof", label: "Proof", kind: "agent" as const },
];

const START: Record<string, Line[]> = {
  press: [
    { who: "Inez", kind: "person", body: "Press run 14 is on the sheet. Fee is on page one." },
    { who: "Sheet", kind: "agent", body: "Logged. Weeks 4–7. I will keep the timeline under the fee." },
    { who: "Karel", kind: "person", body: "Proofs stay in the same ink." },
    { who: "Proof", kind: "agent", body: "Watching the plate. I will ping if the density drops." },
  ],
  studio: [
    { who: "Karel", kind: "person", body: "Alkmaar desk is in." },
    { who: "Sheet", kind: "agent", body: "Calendar is on week 34. Three jobs in proof." },
    { who: "Inez", kind: "person", body: "Leave the crumb bar off the poster." },
  ],
  floor: [
    { who: "Inez", kind: "person", body: "Plate 09 goes up at six." },
    { who: "Proof", kind: "agent", body: "Density is within the band." },
    { who: "Sheet", kind: "agent", body: "I will keep the run on one ink." },
  ],
  inez: [{ who: "Inez", kind: "person", body: "Hold the spot for the field." }],
  sheet: [
    { who: "Sheet", kind: "agent", body: "I read the brief. Two sentences, same claim." },
    { who: "You", kind: "person", body: "Apply it on the canvas, not in chat." },
  ],
  proof: [{ who: "Proof", kind: "agent", body: "Plate 09 is within density." }],
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
      [room]: [...(map[room] ?? []), { who: "You", kind: "person", body: text, fresh: true }],
    }));
  }

  return (
    <main className="if-board sc-sl" aria-label="Kamer">
      <aside className="sc-sl-rail" aria-label="Rooms">
        <Brand slug="slack" title="Kamer" />
        <p className="sc-sl-voice">In the room</p>
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

      <section className="sc-sl-main" aria-label="Thread">
        <div className="sc-sl-head">
          <h1>{title}</h1>
          <span>{mixed ? "People and agents" : "People"}</span>
        </div>
        <div className="sc-sl-thread">
          {thread.map((line, i) => {
            const key = `${room}-${i}`;
            return (
              <article key={key} className={line.fresh ? "sc-sl-line sc-fresh" : "sc-sl-line"}>
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
    </main>
  );
}
