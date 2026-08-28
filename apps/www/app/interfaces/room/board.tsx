"use client";

import * as React from "react";
import { Icon } from "@noorddev/raster-react";
import { Brand } from "../mark";
import { Face, type FaceId } from "../people";

const CHANNELS = [
  { id: "desk", name: "desk", count: 12 },
  { id: "press", name: "press", count: 4 },
  { id: "yard", name: "yard", count: 2 },
];

const PEOPLE: { id: FaceId; name: string; state: string; mark: "user-check" | "activity" | "moon" | "users" }[] = [
  { id: "ilana", name: "Ilana", state: "At the desk", mark: "user-check" },
  { id: "aziez", name: "Aziez", state: "On a line", mark: "activity" },
  { id: "jenny", name: "Jenny", state: "Away", mark: "moon" },
  { id: "christian", name: "Christian", state: "In the room", mark: "users" },
  { id: "katie", name: "Katie", state: "At the desk", mark: "user-check" },
  { id: "koen", name: "Koen", state: "On a line", mark: "activity" },
];

type Msg = { id: string; who: FaceId; name: string; text: string; when: string; replies: number };

const LINES: Record<string, Msg[]> = {
  desk: [
    { id: "d1", who: "ilana", name: "Ilana", text: "The room holds the line. Keep the thread on this post.", when: "09:14", replies: 2 },
    { id: "d2", who: "aziez", name: "Aziez", text: "I left the sheet on the west wall.", when: "09:16", replies: 0 },
    { id: "d3", who: "jenny", name: "Jenny", text: "Read. I will take the next one.", when: "09:18", replies: 1 },
    { id: "d4", who: "katie", name: "Katie", text: "Logged. Weeks 4–7. I will keep the timeline under the fee.", when: "09:19", replies: 0 },
  ],
  press: [
    { id: "p1", who: "christian", name: "Christian", text: "Form 12 is on the stone.", when: "08:41", replies: 1 },
    { id: "p2", who: "ilana", name: "Ilana", text: "Hold the second pass.", when: "08:50", replies: 0 },
    { id: "p3", who: "koen", name: "Koen", text: "Density is within the band.", when: "08:52", replies: 0 },
  ],
  yard: [
    { id: "y1", who: "aziez", name: "Aziez", text: "Van 04 is back.", when: "07:12", replies: 1 },
    { id: "y2", who: "christian", name: "Christian", text: "Yard is quiet. Hold the loop.", when: "07:20", replies: 0 },
  ],
};

const THREAD: Record<string, { who: FaceId; name: string; text: string }[]> = {
  d1: [
    { who: "aziez", name: "Aziez", text: "Which post?" },
    { who: "ilana", name: "Ilana", text: "West. The one that holds." },
  ],
  d3: [{ who: "katie", name: "Katie", text: "I have it." }],
  p1: [{ who: "ilana", name: "Ilana", text: "Keep the same ink." }],
  y1: [{ who: "koen", name: "Koen", text: "Logged." }],
};

export function Board() {
  const [channel, setChannel] = React.useState("desk");
  const [pane, setPane] = React.useState<"none" | "thread" | "person">("none");
  const [line, setLine] = React.useState("d1");
  const [who, setWho] = React.useState<FaceId>("ilana");
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
      who: "katie",
      name: "Katie",
      text,
      when: "Now",
      replies: 0,
    };
    setExtra((map) => ({ ...map, [channel]: [...(map[channel] ?? []), msg] }));
    setLine(msg.id);
  }

  return (
    <main className="if-board sc-room" aria-label="Room">
      <aside className="sc-room-rail" aria-label="People">
        <div className="sc-room-brand">
          <Brand slug="room" title="Room" />
          <p className="sc-room-voice">In the room</p>
        </div>
        <p className="sc-room-label if-ico-row">
          <Icon name="hash" size={12} />
          Channels
        </p>
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
            <b className="if-ico-row">
              <Icon name="hash" size={16} />
              {row.name}
            </b>
            <i>{row.count}</i>
          </button>
        ))}
        <p className="sc-room-label if-ico-row">
          <Icon name="users" size={12} />
          People
        </p>
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
              <i className="if-ico-row">
                <Icon name={row.mark} size={12} />
                {row.state}
              </i>
            </span>
          </button>
        ))}
      </aside>

      <section className="sc-room-chat" aria-label="Channel">
        <header className="sc-room-head">
          <p className="if-ico-row">
            <Icon name="hash" size={16} />
            {room.name}
          </p>
          <span className="if-ico-row">
            <Icon name="users" size={12} />
            {room.count} in the room
          </span>
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
                  {row.name}{" "}
                  <em className="if-ico-row">
                    <Icon name="clock" size={12} />
                    {row.when}
                  </em>
                </b>
                {row.text}
                {row.replies ? (
                  <i className="if-ico-row">
                    <Icon name="reply" size={12} />
                    {row.replies} replies
                  </i>
                ) : null}
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
          <label className="sc-room-field">
            <Icon name="message" size={16} />
            <input
              value={draft}
              placeholder={`Message #${room.name}`}
              aria-label="Message"
              onChange={(event) => setDraft(event.target.value)}
            />
          </label>
          <button type="submit" disabled={!draft.trim()}>
            <Icon name="send" size={16} />
            Send
          </button>
        </form>
      </section>

      <aside className={`if-inspect${pane !== "none" ? " is-open" : ""}`} aria-label="Thread">
        {pane === "thread" ? (
          <div key={selected.id} className="sc-room-inspect sc-fresh">
            <p className="sc-room-label if-ico-row">
              <Icon name="reply" size={12} />
              Thread
            </p>
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
              <Icon name="close" size={12} />
              Close
            </button>
          </div>
        ) : null}
        {pane === "person" ? (
          <div key={person.id} className="sc-room-inspect sc-fresh">
            <p className="sc-room-label if-ico-row">
              <Icon name="user" size={12} />
              Person
            </p>
            <div className="sc-room-card">
              <Face who={person.id} size={48} />
              <b>{person.name}</b>
              <i className="if-ico-row">
                <Icon name={person.mark} size={12} />
                {person.state}
              </i>
            </div>
            <p>People stay in the rail. A face opens the room around them.</p>
            <button type="button" className="sc-room-ghost" onClick={() => setPane("none")}>
              <Icon name="close" size={12} />
              Close
            </button>
          </div>
        ) : null}
      </aside>
    </main>
  );
}
