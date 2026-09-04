"use client";

import * as React from "react";
import { Button, Icon, Input, InputGroup } from "@noorddev/vlak-react";
import { Brand } from "../mark";
import { Face, type FaceId } from "../people";
import { PhoneV1Chrome } from "../v1-chrome";
import { interfaceBySlug } from "../catalog";
import { InspectorClose } from "../inspector-close";

const WHAT = interfaceBySlug("room")!.what;

const CHANNELS = [
  { id: "desk", name: "desk", count: 12, preview: "12 in the room · The room holds the line." },
  { id: "press", name: "press", count: 4, preview: "4 · Plate is up at 06:00" },
  { id: "yard", name: "yard", count: 2, preview: "2 · Density watch on unit 09" },
];

const PEOPLE: { id: FaceId; name: string; state: string; mark: "user-check" | "activity" | "moon" | "users"; extra?: boolean }[] = [
  { id: "aziez", name: "Aziez", state: "On a line", mark: "activity" },
  { id: "jenny", name: "Jenny", state: "Away", mark: "moon" },
  { id: "koen", name: "Koen", state: "On a line", mark: "activity", extra: true },
  { id: "gianpiero", name: "Gianpiero", state: "At the desk", mark: "user-check", extra: true },
];

type Msg = { id: string; who: FaceId; name: string; text: string; when: string; replies: number };

const LINES: Record<string, Msg[]> = {
  desk: [
    { id: "d1", who: "gianpiero", name: "Gianpiero", text: "The room holds the line. Keep the thread on this post.", when: "09:14", replies: 2 },
    { id: "d2", who: "aziez", name: "Aziez", text: "I left the sheet on the west wall.", when: "09:16", replies: 0 },
    { id: "d3", who: "jenny", name: "Jenny", text: "Read. I will take the next one.", when: "09:18", replies: 1 },
    { id: "d4", who: "koen", name: "Koen", text: "Logged. Weeks 4–7. I will keep the timeline under the fee.", when: "09:19", replies: 0 },
  ],
  press: [
    { id: "p1", who: "gianpiero", name: "Gianpiero", text: "Form 12 is on the stone.", when: "08:41", replies: 1 },
    { id: "p2", who: "jenny", name: "Jenny", text: "Hold the second pass.", when: "08:50", replies: 0 },
    { id: "p3", who: "koen", name: "Koen", text: "Density is within the band.", when: "08:52", replies: 0 },
  ],
  yard: [
    { id: "y1", who: "aziez", name: "Aziez", text: "Van 04 is back.", when: "07:12", replies: 1 },
    { id: "y2", who: "koen", name: "Koen", text: "Yard is quiet. Hold the loop.", when: "07:20", replies: 0 },
  ],
};

const THREAD: Record<string, { who: FaceId; name: string; text: string }[]> = {
  d1: [
    { who: "aziez", name: "Aziez", text: "Which post?" },
    { who: "gianpiero", name: "Gianpiero", text: "West. The one that holds." },
  ],
  d3: [{ who: "koen", name: "Koen", text: "I have it." }],
  p1: [{ who: "jenny", name: "Jenny", text: "Keep the same ink." }],
  y1: [{ who: "koen", name: "Koen", text: "Logged." }],
};

export function Board() {
  const [channel, setChannel] = React.useState("desk");
  const [pane, setPane] = React.useState<"none" | "thread" | "person">("none");
  const [line, setLine] = React.useState("d1");
  const [who, setWho] = React.useState<FaceId>("aziez");
  const [draft, setDraft] = React.useState("");
  const [extra, setExtra] = React.useState<Record<string, Msg[]>>({});
  const [phonePane, setPhonePane] = React.useState<"channels" | "chat">("channels");
  const box = React.useRef<HTMLInputElement>(null);
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
      who: "jenny",
      name: "Jenny",
      text,
      when: "Now",
      replies: 0,
    };
    setExtra((map) => ({ ...map, [channel]: [...(map[channel] ?? []), msg] }));
    setLine(msg.id);
  }

  return (
    <section className="if-board sc-room" data-pane={phonePane} aria-label={WHAT}>
      <PhoneV1Chrome
        heading="Room"
        action="New"
        onAction={() => {
          setChannel("desk");
          setPane("none");
          setPhonePane("channels");
          box.current?.focus();
        }}
      />
      <aside className="sc-room-rail" aria-label="People">
        <div className="sc-room-brand">
          <Brand slug="room" />
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
              setPhonePane("chat");
            }}
          >
            <b className="if-ico-row">
              <Icon name="hash" size={16} />
              <span className="sc-room-ch-hash"># </span>
              {row.name}
            </b>
            <i className="sc-room-ch-count">{row.count}</i>
            <span className="sc-room-v1-copy">{row.preview}</span>
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
            className={`sc-room-person${row.extra ? " sc-room-extra" : ""}`}
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
      </section>

      <form
        className="sc-room-dock"
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <InputGroup className="sc-room-field">
          <span className="sc-room-field-mark" aria-hidden="true"><Icon name="message" size={16} /></span>
          <Input
            ref={box}
            value={draft}
            placeholder={`Message #${room.name}`}
            aria-label="Message"
            onChange={(event) => setDraft(event.target.value)}
          />
        </InputGroup>
        <Button type="submit" size="sm" style={{ width: "auto" }} disabled={!draft.trim()}>
          <Icon name="send" size={16} />
          Send
        </Button>
      </form>

      <nav className="if-thumb" aria-label={WHAT}>
        <button
          type="button"
          aria-current={phonePane === "channels"}
          onClick={() => {
            setPhonePane("channels");
            setPane("none");
          }}
        >
          <Icon name="hash" size={16} />
          Channels
        </button>
        <button
          type="button"
          aria-current={phonePane === "chat"}
          onClick={() => setPhonePane("chat")}
        >
          <Icon name="message" size={16} />
          Room
        </button>
      </nav>

      <aside className={`if-inspect${pane !== "none" ? " is-open" : ""}`} aria-label="Thread">
        {pane !== "none" ? <InspectorClose onClick={() => setPane("none")} /> : null}
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
          </div>
        ) : null}
      </aside>
    </section>
  );
}
