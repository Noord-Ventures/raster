"use client";

import * as React from "react";
import { Brand } from "../mark";

type Role = "brief" | "lijn";
type Msg = { role: Role; text: string; fresh?: boolean };

const DRAFTS = [
  { id: "brief", title: "Tighten the brief", preview: "Two sentences, same claim." },
  { id: "press", title: "Press run 14", preview: "Keep the weeks under the fee." },
  { id: "invoice", title: "Invoice note", preview: "The number on the cover." },
] as const;

const STARTED: Record<string, Msg[]> = {
  brief: [
    { role: "brief", text: "Make the intro tighter. Keep the fee on the first page." },
    {
      role: "lijn",
      text: "Two sentences, same claim. The fee stays on the first page; the weeks follow it. Cut the opening clause and let the number do the work.",
    },
    { role: "brief", text: "Good. Where should the timeline sit?" },
    {
      role: "lijn",
      text: "Directly under the fee. Two lines, not a list. If a third week appears, it becomes a second sheet.",
    },
  ],
  press: [
    { role: "brief", text: "Press starts week 4. What do I tell the floor?" },
    {
      role: "lijn",
      text: "One note: same ink, no second color on the plate. Proofs stay in the run. If density drops, stop the sheet and ping the thread.",
    },
  ],
  invoice: [
    { role: "brief", text: "The invoice has to match the cover." },
    {
      role: "lijn",
      text: "Use the number on page one. Do not add a second total. Date the sheet to the week the press starts.",
    },
  ],
};

const HINTS = ["Tighten the intro", "Move the timeline", "Write the invoice line"];

const REPLIES = [
  "I can keep that on the sheet. Two sentences, same claim.",
  "Place it under the fee. If it needs a third line, it is a second module.",
  "Done as a note, not a list. The number stays first.",
  "Leave the chrome quiet and put the color on the field only.",
];

export function Board() {
  const [draftId, setDraftId] = React.useState<string>("brief");
  const [messages, setMessages] = React.useState<Msg[]>(STARTED.brief ?? []);
  const [draft, setDraft] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const end = React.useRef<HTMLDivElement>(null);
  const box = React.useRef<HTMLTextAreaElement>(null);
  const piece = DRAFTS.find((item) => item.id === draftId)?.title ?? "New draft";

  React.useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [messages, pending]);

  function openDraft(id: string) {
    setDraftId(id);
    setMessages(STARTED[id] ?? []);
    setDraft("");
    setPending(false);
  }

  function fresh() {
    setDraftId("new");
    setMessages([]);
    setDraft("");
    setPending(false);
    box.current?.focus();
  }

  function send(text?: string) {
    const value = (text ?? draft).trim();
    if (!value || pending) return;
    setDraft("");
    setMessages((rows) => [...rows, { role: "brief", text: value, fresh: true }]);
    setPending(true);
    window.setTimeout(() => {
      const reply = REPLIES[value.length % REPLIES.length]!;
      setMessages((rows) => [...rows, { role: "lijn", text: reply, fresh: true }]);
      setPending(false);
    }, 700);
  }

  return (
    <main className="if-board sc-ai" aria-label="Lijn">
      <aside className="sc-ai-rail" aria-label="Drafts">
        <Brand slug="ai-tool" title="Lijn" />
        <p className="sc-ai-voice">The next line</p>
        <button type="button" className="sc-ai-new" onClick={fresh}>
          New draft
        </button>
        <div className="sc-ai-chats">
          {DRAFTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="sc-ai-chat"
              aria-current={draftId === item.id}
              onClick={() => openDraft(item.id)}
            >
              <span className="sc-ai-chat-title">{item.title}</span>
              <span className="sc-ai-chat-preview">{item.preview}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="sc-ai-stage" aria-label="Draft">
        <header className="sc-ai-head">
          <h1>{piece}</h1>
        </header>
        <div className="sc-ai-thread">
          <div className="sc-ai-measure">
            {messages.length === 0 ? (
              <div className="sc-ai-empty">
                <p className="sc-ai-hello">The next line</p>
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
                msg.role === "brief" ? (
                  <article key={i} className={`sc-ai-msg sc-ai-msg-brief${msg.fresh ? " sc-fresh" : ""}`}>
                    <p className="sc-ai-bubble">{msg.text}</p>
                  </article>
                ) : (
                  <article key={i} className={`sc-ai-msg sc-ai-msg-lijn${msg.fresh ? " sc-fresh" : ""}`}>
                    <p className="sc-ai-who">Lijn</p>
                    <p className="sc-ai-reply">{msg.text}</p>
                  </article>
                ),
              )
            )}
            {pending ? (
              <p className="sc-ai-pending" aria-live="polite">
                Writing
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
              placeholder="The next line"
              aria-label="Line"
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
        </div>
      </section>
    </main>
  );
}
