"use client";

import * as React from "react";
import { Icon } from "@noorddev/vlak-react";
import { Brand } from "../mark";
import { Face, type FaceId } from "../people";
import { PhoneV1Chrome } from "../v1-chrome";
import { interfaceBySlug } from "../catalog";

const WHAT = interfaceBySlug("wall")!.what;

type Post = {
  id: string;
  who: FaceId;
  name: string;
  when: string;
  text: string;
  photo?: string;
  ratio?: string;
  likes: number;
};

type Inspect = { kind: "post"; id: string } | { kind: "profile"; who: FaceId } | null;

const FEED: Post[] = [
  {
    id: "m1",
    who: "aziez",
    name: "Aziez",
    when: "09:14",
    text: "The west window is the one that holds.",
    photo: "/interfaces/threads/press-sheet.webp",
    ratio: "4 / 5",
    likes: 12,
  },
  {
    id: "m2",
    who: "jenny",
    name: "Jenny",
    when: "09:02",
    text: "Paper first. Then the street. Then the room.",
    likes: 8,
  },
  {
    id: "m3",
    who: "jenny",
    name: "Jenny",
    when: "08:41",
    text: "I left a note on the third post.",
    photo: "/interfaces/threads/posters.webp",
    ratio: "1 / 1",
    likes: 5,
  },
  {
    id: "m4",
    who: "koen",
    name: "Koen",
    when: "08:12",
    text: "Morning stack. Registration holds.",
    likes: 3,
  },
  {
    id: "m5",
    who: "gianpiero",
    name: "Gianpiero",
    when: "07:55",
    text: "On the rail before the street.",
    photo: "/interfaces/threads/press-sheet.webp",
    ratio: "5 / 4",
    likes: 7,
  },
  {
    id: "m6",
    who: "koen",
    name: "Koen",
    when: "07:40",
    text: "A grid is a plan, not a decoration.",
    likes: 9,
  },
  {
    id: "m7",
    who: "gianpiero",
    name: "Gianpiero",
    when: "07:11",
    text: "The rail stays 184.",
    photo: "/interfaces/threads/posters.webp",
    ratio: "3 / 4",
    likes: 4,
  },
];

const PEOPLE: { id: FaceId; name: string; line: string }[] = [
  { id: "aziez", name: "Aziez", line: "Paper first" },
  { id: "jenny", name: "Jenny", line: "Third post" },
  { id: "koen", name: "Koen", line: "In the gutter" },
  { id: "gianpiero", name: "Gianpiero", line: "On the rail" },
];

const COMMENTS: Record<string, { who: FaceId; name: string; text: string }[]> = {
  m1: [
    { who: "jenny", name: "Jenny", text: "Which window?" },
    { who: "aziez", name: "Aziez", text: "West. Always west." },
    { who: "koen", name: "Koen", text: "I can see it from here." },
  ],
  m2: [
    { who: "gianpiero", name: "Gianpiero", text: "Keep the hairline on the active tab only." },
    { who: "koen", name: "Koen", text: "The rail stays 184." },
  ],
  m3: [{ who: "aziez", name: "Aziez", text: "Cite hangs in the gutter." }],
  m4: [{ who: "jenny", name: "Jenny", text: "Leave the crumb bar off the poster." }],
  m5: [{ who: "koen", name: "Koen", text: "The number stays first." }],
  m6: [{ who: "aziez", name: "Aziez", text: "Put the color on the field only." }],
  m7: [{ who: "jenny", name: "Jenny", text: "One module. No second rail." }],
};

export function Board() {
  const [post, setPost] = React.useState("m1");
  const [inspect, setInspect] = React.useState<Inspect>(null);
  const item = FEED.find((row) => row.id === post) ?? FEED[0]!;
  const personId = inspect?.kind === "profile" ? inspect.who : item.who;
  const person = PEOPLE.find((row) => row.id === personId) ?? PEOPLE[0]!;
  const notes = COMMENTS[inspect?.kind === "post" ? inspect.id : post] ?? [];

  function openPost(id: string) {
    setPost(id);
    setInspect({ kind: "post", id });
  }

  function openProfile(id: FaceId) {
    setInspect({ kind: "profile", who: id });
  }

  return (
    <section className="if-board sc-wall" aria-label={WHAT}>
      <PhoneV1Chrome heading="Wall" action="Post" onAction={() => openPost("m1")} />
      <aside className="sc-wall-rail" aria-label="People">
        <div className="sc-wall-brand">
          <Brand slug="wall" />
          <p className="sc-wall-voice">On the wall</p>
        </div>
        <p className="sc-wall-label if-ico-row">
          <Icon name="users" size={12} />
          People
        </p>
        {PEOPLE.map((row) => (
          <button
            key={row.id}
            type="button"
            className="sc-wall-person"
            aria-current={inspect?.kind === "profile" && inspect.who === row.id}
            onClick={() => openProfile(row.id)}
          >
            <Face who={row.id} />
            <span>
              <b>{row.name}</b>
              <i>{row.line}</i>
            </span>
          </button>
        ))}
      </aside>

      <section className="sc-wall-feed" aria-label="Feed">
        <div className="sc-wall-faces" role="group" aria-label="People">
          {PEOPLE.map((row) => (
            <button
              key={row.id}
              type="button"
              className="sc-wall-person"
              aria-current={inspect?.kind === "profile" && inspect.who === row.id}
              onClick={() => openProfile(row.id)}
            >
              <Face who={row.id} />
              <span>
                <b>{row.name}</b>
              </span>
            </button>
          ))}
        </div>
        <header className="sc-wall-head">
          <p className="if-ico-row">
            <Icon name="rows" size={16} />
            Today
          </p>
        </header>
        <div className="sc-wall-stream">
          {FEED.map((row) => (
            <article key={row.id} className={`sc-wall-card${post === row.id ? " is-on" : ""}${["m1", "m3", "m4", "m5"].includes(row.id) ? " sc-wall-v1" : ""}`}>
              <button type="button" className="sc-wall-open" onClick={() => openPost(row.id)}>
                {row.photo ? <img src={row.photo} alt="" loading="lazy" decoding="async" /> : null}
                <span className="sc-wall-v1-line">
                  {row.name} · {row.when}
                </span>
                <span className="sc-wall-who">
                  <Face who={row.who} />
                  <b>{row.name}</b>
                  <i className="if-ico-row">
                    <Icon name="clock" size={12} />
                    {row.when}
                  </i>
                </span>
                <p>{row.text}</p>
                <em className="sc-wall-meta">
                  <span className="if-ico-row">
                    <Icon name="thumbs-up" size={12} />
                    {row.likes} likes
                  </span>
                  <span className="if-ico-row">
                    <Icon name="message" size={12} />
                    {(COMMENTS[row.id] ?? []).length} comments
                  </span>
                  {row.photo ? (
                    <span className="if-ico-row">
                      <Icon name="image" size={12} />
                      Photo
                    </span>
                  ) : (
                    <span className="if-ico-row">
                      <Icon name="quote" size={12} />
                      Note
                    </span>
                  )}
                </em>
              </button>
            </article>
          ))}
        </div>
      </section>

      <aside className={`if-inspect${inspect ? " is-open" : ""}`} aria-label={inspect?.kind === "profile" ? "Profile" : "Comments"}>
        {inspect?.kind === "profile" ? (
          <div key={person.id} className="sc-wall-inspect sc-fresh">
            <p className="sc-wall-label if-ico-row">
              <Icon name="user" size={12} />
              Profile
            </p>
            <div className="sc-wall-face">
              <Face who={person.id} size={48} />
              <b>{person.name}</b>
              <i>{person.line}</i>
            </div>
            <p>Posts on the wall stay in the street. A face is enough to find them again.</p>
            <button type="button" className="sc-wall-ghost" onClick={() => setInspect(null)}>
              <Icon name="close" size={12} />
              Close
            </button>
          </div>
        ) : inspect?.kind === "post" ? (
          <div key={item.id} className="sc-wall-inspect sc-fresh">
            <p className="sc-wall-label if-ico-row">
              <Icon name="message" size={12} />
              Comments
            </p>
            {notes.map((row) => (
              <button key={row.text} type="button" className="sc-wall-note" onClick={() => openProfile(row.who)}>
                <Face who={row.who} />
                <span>
                  <b>{row.name}</b>
                  {row.text}
                </span>
              </button>
            ))}
            <button type="button" className="sc-wall-ghost" onClick={() => setInspect(null)}>
              <Icon name="close" size={12} />
              Close
            </button>
          </div>
        ) : null}
      </aside>
    </section>
  );
}
