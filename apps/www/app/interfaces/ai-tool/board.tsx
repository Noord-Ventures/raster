"use client";

import * as React from "react";
import { aiSerif } from "../scene-fonts";

type Role = "user" | "assistant";
type Msg = { role: Role; text: string };

const CHATS = [
  { id: "brief", title: "Tighten the brief", preview: "Two sentences, same claim." },
  { id: "press", title: "Press run 14", preview: "Keep the weeks under the fee." },
  { id: "invoice", title: "Invoice note", preview: "The number on the cover." },
] as const;

const STARTED: Record<string, Msg[]> = {
  brief: [
    { role: "user", text: "Make the intro tighter. Keep the fee on the first page." },
    {
      role: "assistant",
      text: "Two sentences, same claim. The fee stays on the first page; the weeks follow it. I would cut the opening clause and let the number do the work.",
    },
    { role: "user", text: "Good. Where should the timeline sit?" },
    {
      role: "assistant",
      text: "Directly under the fee. Two lines, not a list. If a third week appears, it becomes a second sheet.",
    },
  ],
  press: [
    { role: "user", text: "Press starts week 4. What do I tell the floor?" },
    {
      role: "assistant",
      text: "One note: same ink, no second color on the plate. Proofs stay in the run. If density drops, stop the sheet and ping the thread.",
    },
  ],
  invoice: [
    { role: "user", text: "The invoice has to match the cover." },
    {
      role: "assistant",
      text: "Use the number on page one. Do not add a second total. Date the sheet to the week the press starts.",
    },
  ],
};

const HINTS = ["Tighten the intro", "Move the timeline", "Write the invoice line"];

const REPLIES = [
  "I can keep that on the sheet. Two sentences, same claim.",
  "Place it under the fee. If it needs a third line, it is a second module.",
  "Done as a note, not a list. The number stays first.",
  "I would leave the chrome quiet and put the color on the field only.",
];

function Spark() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 1.2 9.1 6.4 14.8 8 9.1 9.6 8 14.8 6.9 9.6 1.2 8l5.7-1.6L8 1.2Z" />
    </svg>
  );
}

export function Board() {
  const [chat, setChat] = React.useState<string>("brief");
  const [messages, setMessages] = React.useState<Msg[]>(STARTED.brief ?? []);
  const [draft, setDraft] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const end = React.useRef<HTMLDivElement>(null);
  const box = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [messages, pending]);

  function openChat(id: string) {
    setChat(id);
    setMessages(STARTED[id] ?? []);
    setDraft("");
    setPending(false);
  }

  function fresh() {
    setChat("new");
    setMessages([]);
    setDraft("");
    setPending(false);
    box.current?.focus();
  }

  function send(text?: string) {
    const value = (text ?? draft).trim();
    if (!value || pending) return;
    setDraft("");
    setMessages((rows) => [...rows, { role: "user", text: value }]);
    setPending(true);
    window.setTimeout(() => {
      const reply = REPLIES[value.length % REPLIES.length]!;
      setMessages((rows) => [...rows, { role: "assistant", text: reply }]);
      setPending(false);
    }, 700);
  }

  return (
    <main className={`if-board sc-ai ${aiSerif.variable}`} aria-label="AI tool">
      <aside className="sc-ai-rail" aria-label="Chats">
        <button type="button" className="sc-ai-new" onClick={fresh}>
          New chat
        </button>
        <div className="sc-ai-chats">
          {CHATS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="sc-ai-chat"
              aria-current={chat === item.id}
              onClick={() => openChat(item.id)}
            >
              <span className="sc-ai-chat-title">{item.title}</span>
              <span className="sc-ai-chat-preview">{item.preview}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="sc-ai-stage" aria-label="Conversation">
        <div className="sc-ai-thread">
          <div className="sc-ai-measure">
            {messages.length === 0 ? (
              <div className="sc-ai-empty">
                <span className="sc-ai-mark">
                  <Spark />
                </span>
                <h1 className="sc-ai-hello">How can I help?</h1>
                <div className="sc-ai-hints">
                  {HINTS.map((hint) => (
                    <button key={hint} type="button" className="sc-ai-hint" onClick={() => send(hint)}>
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) =>
                msg.role === "user" ? (
                  <article key={i} className="sc-ai-msg sc-ai-msg-user">
                    <p className="sc-ai-who">You</p>
                    <p className="sc-ai-bubble">{msg.text}</p>
                  </article>
                ) : (
                  <article key={i} className="sc-ai-msg">
                    <p className="sc-ai-who">Assistant</p>
                    <p className="sc-ai-reply">{msg.text}</p>
                  </article>
                ),
              )
            )}
            {pending ? (
              <p className="sc-ai-pending" aria-live="polite">
                <i />
                <i />
                <i />
                <span>Writing</span>
              </p>
            ) : null}
            <div ref={end} />
          </div>
        </div>

        <div className="sc-ai-dock">
          <form
            className="sc-ai-composer"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <textarea
              ref={box}
              rows={1}
              value={draft}
              placeholder="Ask anything"
              aria-label="Message"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
            />
            <button type="submit" className="sc-ai-send" disabled={!draft.trim() || pending}>
              Send
            </button>
          </form>
          <p className="sc-ai-note">Local replies. No live model on this sheet.</p>
        </div>
      </section>
    </main>
  );
}
