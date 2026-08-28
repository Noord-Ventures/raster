"use client";

import * as React from "react";
import { Brand } from "../mark";
import { Face, type FaceId } from "../people";

type Post = {
  id: string;
  who: FaceId;
  name: string;
  when: string;
  text: string;
  photo?: string;
  likes: number;
};

const FEED: Post[] = [
  {
    id: "m1",
    who: "inez",
    name: "Inez Veld",
    when: "09:14",
    text: "The west window is the one that holds. North is just weather.",
    photo: "/interfaces/threads/press-sheet.jpg",
    likes: 12,
  },
  {
    id: "m2",
    who: "karel",
    name: "Karel Vos",
    when: "09:02",
    text: "Paper first. Then the street. Then the room.",
    likes: 8,
  },
  {
    id: "m3",
    who: "loes",
    name: "Loes Hart",
    when: "08:41",
    text: "I left a note on the third post. It is still there.",
    photo: "/interfaces/threads/posters.jpg",
    likes: 5,
  },
  {
    id: "m4",
    who: "bram",
    name: "Bram Nijk",
    when: "08:12",
    text: "Morning stack. Registration holds.",
    likes: 3,
  },
];

const PEOPLE: { id: FaceId; name: string; line: string }[] = [
  { id: "inez", name: "Inez Veld", line: "On the west post" },
  { id: "karel", name: "Karel Vos", line: "Paper first" },
  { id: "loes", name: "Loes Hart", line: "Third post" },
  { id: "bram", name: "Bram Nijk", line: "Quiet today" },
];

const THREAD: Record<string, { who: FaceId; name: string; text: string }[]> = {
  m1: [
    { who: "karel", name: "Karel Vos", text: "Which window?" },
    { who: "inez", name: "Inez Veld", text: "West. Always west." },
    { who: "loes", name: "Loes Hart", text: "I can see it from here." },
  ],
  m2: [
    { who: "inez", name: "Inez Veld", text: "Keep the hairline on the active tab only." },
    { who: "bram", name: "Bram Nijk", text: "The rail stays 184." },
  ],
  m3: [{ who: "karel", name: "Karel Vos", text: "Cite hangs in the gutter." }],
  m4: [{ who: "loes", name: "Loes Hart", text: "Leave the crumb bar off the poster." }],
};

export function Board() {
  const [post, setPost] = React.useState("m1");
  const [pane, setPane] = React.useState<"none" | "profile">("none");
  const [who, setWho] = React.useState<FaceId>("inez");
  const item = FEED.find((row) => row.id === post) ?? FEED[0]!;
  const person = PEOPLE.find((row) => row.id === who) ?? PEOPLE[0]!;
  const replies = THREAD[post] ?? [];

  function openProfile(id: FaceId) {
    setWho(id);
    setPane("profile");
  }

  return (
    <main className="if-board sc-wall" aria-label="Wall">
      <aside className="sc-wall-rail" aria-label="Today">
        <div className="sc-wall-brand">
          <Brand slug="wall" title="Wall" />
          <p className="sc-wall-voice">On the wall</p>
        </div>
        <p className="sc-wall-label">Today</p>
        {FEED.map((row) => (
          <button
            key={row.id}
            type="button"
            className="sc-wall-post"
            aria-current={post === row.id}
            onClick={() => {
              setPost(row.id);
              setPane("none");
              setWho(row.who);
            }}
          >
            <Face who={row.who} />
            <span>
              <b>{row.name}</b>
              <i>{row.text}</i>
            </span>
          </button>
        ))}
        <p className="sc-wall-label">People</p>
        {PEOPLE.map((row) => (
          <button
            key={row.id}
            type="button"
            className="sc-wall-person"
            aria-current={who === row.id && pane === "profile"}
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

      <section className="sc-wall-thread" aria-label="Thread">
        <header className="sc-wall-head">
          <button type="button" className="sc-wall-who" onClick={() => openProfile(item.who)}>
            <Face who={item.who} />
            <span>
              <b>{item.name}</b>
              <i>
                {item.when} · {replies.length} replies
              </i>
            </span>
          </button>
          <button type="button" className="sc-wall-ghost" onClick={() => openProfile(item.who)}>
            Profile
          </button>
        </header>
        <article className="sc-wall-lead">
          {item.photo ? <img src={item.photo} alt="" /> : null}
          <p>{item.text}</p>
          <p className="sc-wall-meta">{item.likes} likes · {replies.length} replies</p>
        </article>
        <div className="sc-wall-replies">
          {replies.map((row) => (
            <button key={row.text} type="button" className="sc-wall-reply" onClick={() => openProfile(row.who)}>
              <Face who={row.who} />
              <span>
                <b>{row.name}</b>
                {row.text}
              </span>
            </button>
          ))}
        </div>
      </section>

      <aside className={`if-inspect${pane === "profile" ? " is-open" : ""}`} aria-label="Profile">
        {pane === "profile" ? (
          <div key={person.id} className="sc-wall-inspect sc-fresh">
            <p className="sc-wall-label">Profile</p>
            <div className="sc-wall-card">
              <Face who={person.id} size={48} />
              <b>{person.name}</b>
              <i>{person.line}</i>
            </div>
            <p>Posts on the wall stay in the street. A face is enough to find them again.</p>
            <button type="button" className="sc-wall-ghost" onClick={() => setPane("none")}>
              Close
            </button>
          </div>
        ) : null}
      </aside>
    </main>
  );
}
