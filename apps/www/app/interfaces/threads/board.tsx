"use client";

import * as React from "react";
import { threadSerif } from "../scene-fonts";

type Reply = { who: string; initials: string; body: string; fresh?: boolean };

type Post = {
  id: string;
  who: string;
  initials: string;
  kind: "note" | "image" | "quote";
  body: string;
  photo?: string;
  likes: number;
  replies: Reply[];
};

const STARTED: Post[] = [
  {
    id: "grid",
    who: "Renn",
    initials: "RV",
    kind: "note",
    body: "The module is the only join. If a pane needs a second line, it is a second module.",
    likes: 12,
    replies: [
      { who: "Noord", initials: "NO", body: "Keep the hairline on the active tab only." },
      { who: "Sheet", initials: "SH", body: "The rail stays 184. The gutter is not a stroke." },
    ],
  },
  {
    id: "proof",
    who: "Noord",
    initials: "NO",
    kind: "image",
    body: "Proof 09 on the press. Same ink, no second color in the chrome.",
    photo: "/interfaces/threads/press-sheet.jpg",
    likes: 9,
    replies: [
      { who: "Renn", initials: "RV", body: "Hold the spot for the field, not the frame." },
      { who: "Press", initials: "PR", body: "Sheet is up at 06:00." },
    ],
  },
  {
    id: "cite",
    who: "Sheet",
    initials: "SH",
    kind: "quote",
    body: "A grid is a plan, not a decoration.",
    likes: 7,
    replies: [{ who: "Renn", initials: "RV", body: "Cite hangs in the gutter. The claim stays in the measure." }],
  },
  {
    id: "stack",
    who: "Press",
    initials: "PR",
    kind: "image",
    body: "Morning stack. Registration holds.",
    photo: "/interfaces/threads/posters.jpg",
    likes: 4,
    replies: [{ who: "Noord", initials: "NO", body: "Leave the crumb bar off the poster." }],
  },
];

export function Board() {
  const [posts, setPosts] = React.useState(STARTED);
  const [open, setOpen] = React.useState("proof");
  const [liked, setLiked] = React.useState<Record<string, boolean>>({});
  const [draft, setDraft] = React.useState("");
  const post = posts.find((item) => item.id === open) ?? posts[0]!;

  function like(id: string) {
    setLiked((map) => ({ ...map, [id]: !map[id] }));
    setPosts((rows) =>
      rows.map((item) =>
        item.id === id ? { ...item, likes: item.likes + (liked[id] ? -1 : 1) } : item,
      ),
    );
  }

  function reply() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setPosts((rows) =>
      rows.map((item) =>
        item.id === open
          ? { ...item, replies: [...item.replies, { who: "You", initials: "YO", body: text, fresh: true }] }
          : item,
      ),
    );
  }

  return (
    <main className={`if-board sc-th ${threadSerif.variable}`} aria-label="Threads">
      <section className="sc-th-feed" aria-label="Feed">
        <h1>Today</h1>
        {posts.map((item) => (
          <article key={item.id} className="sc-th-post" aria-current={open === item.id}>
            <div className="sc-th-who">
              <span className="sc-th-avatar">{item.initials}</span>
              <strong>{item.who}</strong>
              <span>{item.kind}</span>
            </div>
            {item.kind === "quote" ? <p className="sc-th-quote">{item.body}</p> : <p className="sc-th-body">{item.body}</p>}
            {item.photo ? <img className="sc-th-photo" src={item.photo} alt="" /> : null}
            <div className="sc-th-actions">
              <button type="button" aria-pressed={!!liked[item.id]} onClick={() => like(item.id)}>
                {item.likes} like
              </button>
              <button type="button" onClick={() => setOpen(item.id)}>
                {item.replies.length} replies
              </button>
            </div>
          </article>
        ))}
      </section>

      <aside className="sc-th-pane" aria-label="Thread">
        <h2>{post.who}</h2>
        <p className="sc-th-body">{post.body}</p>
        {post.replies.map((item, i) => (
          <div key={i} className={item.fresh ? "sc-th-reply sc-fresh" : "sc-th-reply"}>
            <strong>{item.who}</strong>
            {item.body}
          </div>
        ))}
        <form
          className="sc-th-composer"
          onSubmit={(event) => {
            event.preventDefault();
            reply();
          }}
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write a reply"
            aria-label="Reply"
          />
          <button type="submit">Reply</button>
        </form>
      </aside>
    </main>
  );
}
