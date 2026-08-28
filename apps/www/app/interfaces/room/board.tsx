"use client";

import * as React from "react";
import { Brand } from "../mark";
import { Face, type FaceId } from "../people";

const CHANNELS = [
  { id: "desk", name: "desk", count: 12 },
  { id: "press", name: "press", count: 4 },
  { id: "yard", name: "yard", count: 2 },
];

const PEOPLE: { id: FaceId; name: string; state: string; kind: "person" | "agent" }[] = [
  { id: "inez", name: "Inez Veld", state: "At the desk", kind: "person" },
  { id: "karel", name: "Karel Vos", state: "On a line", kind: "person" },
  { id: "maya", name: "Maya Ort", state: "Away", kind: "person" },
  { id: "owen", name: "Owen Hart", state: "In the room", kind: "person" },
  { id: "sheet", name: "Sheet", state: "Agent", kind: "agent" },
  { id: "proof", name: "Proof", state: "Agent", kind: "agent" },
];

type Msg = { id: string; who: FaceId; name: string; text: string; when: string; replies: number };

const LINES: Record<string, Msg[]> = {
  desk: [
    { id: "d1", who: "inez", name: "Inez Veld", text: "The room holds the line. Keep the thread on this post.", when: "09:14", replies: 2 },
    { id: "d2", who: "karel", name: "Karel Vos", text: "I left the sheet on the west wall.", when: "09:16", replies: 0 },
    { id: "d3", who: "maya", name: "Maya Ort", text: "Read. I will take the next one.", when: "09:18", replies: 1 },
    { id: "d4", who: "sheet", name: "Sheet", text: "Logged. Weeks 4–7. I will keep the timeline under the fee.", when: "09:19", replies: 0 },
  ],
  press: [
    { id: "p1", who: "owen", name: "Owen Hart", text: "Form 12 is on the stone.", when: "08:41", replies: 1 },
    { id: "p2", who: "inez", name: "Inez Veld", text: "Hold the second pass.", when: "08:50", replies: 0 },
    { id: "p3", who: "proof", name: "Proof", text: "Density is within the band.", when: "08:52", replies: 0 },
  ],
  yard: [
    { id: "y1", who: "karel", name: "Karel Vos", text: "Van 04 is back.", when: "07:12", replies: 1 },
    { id: "y2", who: "owen", name: "Owen Hart", text: "Yard is quiet. Hold the loop.", when: "07:20", replies: 0 },
  ],
};

const THREAD: Record<string, { who: FaceId; name: string; text: string }[]> = {
  d1: [
    { who: "karel", name: "Karel Vos", text: "Which post?" },
    { who: "inez", name: "Inez Veld", text: "West. The one that holds." },
  ],
  d3: [{ who: "sheet", name: "Sheet", text: "I have it." }],
  p1: [{ who: "inez", name: "Inez Veld", text: "Keep the same ink." }],
  y1: [{ who: "proof", name: "Proof", text: "Logged." }],
};

export function Board() {
  const [channel, setChannel] = React.useState("desk");
  const [pane, setPane] = React.useState<"none" | "thread" | "person">("none");
  const [line, setLine] = React.useState("d1");
  const [who, setWho] = React.useState<FaceId>("inez");
  const [draft, setDraft] = React.useState("");
  const [extra, setExtra] = React.useState<Record<string, Msg[]>>({});
  const room = CHANNELS.find((row) => row.id === channel) ?? CHANNELS[0]!;
  const messages = [...(LINES[channel] ?? LINES.desk!), ...(extra[channel] ?? [])];
  const person = PEOPLE.find((row) => row.id === who) ?? PEOPLE[0]!;
  const selected = messages.find((row) => row.id === line) ?? messages[0]!;
  const replies = THREAD[line] ?? [];

  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const msg: Msg = {
      id: `you-${Date.now()}`,
      who: "owen",
      name: "You",
      text,
      when: "Now",
      replies: 0,
    };
    setExtra((map) => ({ ...map, [channel]: [...(map[channel] ?? []), msg] }));
    setLine(msg.id);
  }

  return (
    <main className="if-board sc-room" aria-label="Room">
      <aside className="sc-room-rail" aria-label="Rooms">
        <div className="sc-room-brand">
          <Brand slug="room" title="Room" />
          <p className="sc-room-voice">In the room</p>
        </div>
        <p className="sc-room-label">Channels</p>
        {CHANNELS.map((row) => (
          <button
            key={row.id}
            type="button"
            className="sc-room-ch"
            aria-current={channel === row.id && pane !== "person"}
            onClick={() => {
              setChannel(row.id);
              setPane("none");
              setLine((LINES[row.id] ?? LINES.desk!)[0]!.id);
            }}
          >
            <b>#{row.name}</b>
            <i>{row.count}</i>
          </button>
        ))}
        <p className="sc-room-label">People</p>
        {PEOPLE.map((row) => (
          <button
            key={row.id}
            type="button"
            className="sc-room-person"
            aria-current={who === row.id && pane === "person"}
            onClick={() => {
              setWho(row.id);
              setPane("person");
            }}
          >
            <Face who={row.id} />
            <span>
              <b>{row.name}</b>
              <i>{row.state}</i>
            </span>
          </button>
        ))}
      </aside>

      <section className="sc-room-chat" aria-label="Channel">
        <header className="sc-room-head">
          <p>#{room.name}</p>
          <span>{room.count} in the room</span>
        </header>
        <div className="sc-room-lines">
          {messages.map((row) => (
            <button
              key={row.id}
              type="button"
              className="sc-room-msg"
              aria-current={line === row.id && pane === "thread"}
              onClick={() => {
                setLine(row.id);
                setWho(row.who);
                setPane("thread");
              }}
            >
              <Face who={row.who} />
              <span>
                <b>
                  {row.name} <em>{row.when}</em>
                </b>
                {row.text}
                {row.replies ? <i>{row.replies} replies</i> : null}
              </span>
            </button>
          ))}
        </div>
        <form
          className="sc-room-dock"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <input
            value={draft}
            placeholder={`Message #${room.name}`}
            aria-label="Message"
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" disabled={!draft.trim()}>
            Send
          </button>
        </form>
      </section>

      <aside className={`if-inspect${pane !== "none" ? " is-open" : ""}`} aria-label="Thread">
        {pane === "thread" ? (
          <div key={selected.id} className="sc-room-inspect sc-fresh">
            <p className="sc-room-label">Thread</p>
            <p className="sc-room-lead">{selected.text}</p>
            {replies.map((row) => (
              <button
                key={row.text}
                type="button"
                className="sc-room-reply"
                onClick={() => {
                  setWho(row.who);
                  setPane("person");
                }}
              >
                <Face who={row.who} />
                <span>
                  <b>{row.name}</b>
                  {row.text}
                </span>
              </button>
            ))}
            <button type="button" className="sc-room-ghost" onClick={() => setPane("none")}>
              Close
            </button>
          </div>
        ) : null}
        {pane === "person" ? (
          <div key={person.id} className="sc-room-inspect sc-fresh">
            <p className="sc-room-label">{person.kind === "agent" ? "Agent" : "Person"}</p>
            <div className="sc-room-card">
              <Face who={person.id} size={48} />
              <b>{person.name}</b>
              <i>{person.state}</i>
            </div>
            <p>People stay in the rail. A face opens the room around them.</p>
            <button type="button" className="sc-room-ghost" onClick={() => setPane("none")}>
              Close
            </button>
          </div>
        ) : null}
      </aside>
    </main>
  );
}
