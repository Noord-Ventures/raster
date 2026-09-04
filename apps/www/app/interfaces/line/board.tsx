"use client";

import * as React from "react";
import { Button, Icon, Input, InputGroup } from "@noorddev/vlak-react";
import { PhoneV1Chrome } from "../v1-chrome";
import { interfaceBySlug } from "../catalog";
import { InspectorClose } from "../inspector-close";

const WHAT = interfaceBySlug("line")!.what;

type Role = "you" | "line";
type Msg = { id: string; role: Role; text: string; fresh?: boolean };
type Inspect = { kind: "line"; id: string } | { kind: "settings" } | null;

const CHATS = [
  { id: "brief", title: "Project brief", preview: "Shorten the introduction and keep the fee…", when: "Now" },
  { id: "press", title: "Print schedule", preview: "Alkmaar · plates ready at 06:00", when: "Today" },
  { id: "invoice", title: "Invoice summary", preview: "Keep weeks 4–7 below the fee", when: "Yesterday" },
  { id: "desk", title: "Studio update", preview: "Keep feedback attached to the message", when: "Today" },
  { id: "wall", title: "Morning review", preview: "Review the latest proof before lunch", when: "Today" },
] as const;

const STARTED: Record<string, Msg[]> = {
  brief: [
    { id: "b1", role: "you", text: "Make the intro tighter. Keep the fee on the first page." },
    {
      id: "b2",
      role: "line",
      text: "I tightened it to two sentences and kept the fee on the first page. The timeline now follows the total.",
    },
    { id: "b3", role: "you", text: "Good. Where should the timeline sit?" },
    {
      id: "b4",
      role: "line",
      text: "Place it directly below the fee. Keep it to two lines; if the schedule grows, move the additional dates to a second sheet.",
    },
  ],
  press: [
    { id: "p1", role: "you", text: "Press starts week 4. What do I tell the floor?" },
    {
      id: "p2",
      role: "line",
      text: "One note: same ink, no second color on the plate. Proofs stay in the run. If density drops, stop the sheet and ping the thread.",
    },
  ],
  invoice: [
    { id: "i1", role: "you", text: "The invoice has to match the cover." },
    {
      id: "i2",
      role: "line",
      text: "Use the number on page one. Do not add a second total. Date the sheet to the week the press starts.",
    },
  ],
  desk: [
    { id: "d1", role: "you", text: "Keep the feedback attached to this message." },
    { id: "d2", role: "line", text: "Done. The conversation will stay linked to the original note." },
  ],
  wall: [
    { id: "w1", role: "you", text: "Summarize the latest proof review." },
    { id: "w2", role: "line", text: "The grid is approved. Increase the caption size before the next print." },
  ],
};

const HINTS = ["Tighten the intro", "Move the timeline", "Write the invoice line"];

const REPLIES = [
  "I’ve shortened the copy and kept the key detail on the first page.",
  "Place it below the fee. Move any extra dates to the following sheet.",
  "Done. The total stays first, followed by one concise note.",
  "I’ve reduced the interface copy and kept the emphasis on the content.",
];

export function Board() {
  const [chat, setChat] = React.useState("brief");
  const [messages, setMessages] = React.useState<Msg[]>(STARTED.brief ?? []);
  const [draft, setDraft] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [inspect, setInspect] = React.useState<Inspect>(null);
  const [phonePane, setPhonePane] = React.useState<"inbox" | "thread">("inbox");
  const end = React.useRef<HTMLDivElement>(null);
  const box = React.useRef<HTMLInputElement>(null);
  const piece = CHATS.find((item) => item.id === chat)?.title ?? "New chat";
  const looked = inspect?.kind === "line" ? messages.find((msg) => msg.id === inspect.id) : null;

  React.useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [messages, pending]);

  function openChat(id: string) {
    setChat(id);
    setMessages(STARTED[id] ?? []);
    setDraft("");
    setPending(false);
    setInspect(null);
    setPhonePane("thread");
  }

  function fresh() {
    setChat("new");
    setMessages([]);
    setDraft("");
    setPending(false);
    setInspect(null);
    setPhonePane("thread");
    box.current?.focus();
  }

  function send(text?: string) {
    const value = (text ?? draft).trim();
    if (!value || pending) return;
    setDraft("");
    const you: Msg = { id: `y-${Date.now()}`, role: "you", text: value, fresh: true };
    setMessages((rows) => [...rows, you]);
    setPending(true);
    window.setTimeout(() => {
      const reply = REPLIES[value.length % REPLIES.length]!;
      setMessages((rows) => [
        ...rows,
        { id: `l-${Date.now()}`, role: "line", text: reply, fresh: true },
      ]);
      setPending(false);
    }, 700);
  }

  return (
    <section className="if-board sc-ai" data-pane={phonePane} aria-label={WHAT}>
      <PhoneV1Chrome heading="AI chat" action="New" onAction={fresh} />
      <aside className="sc-ai-rail" aria-label="Chats">
        <div className="sc-ai-brand">
          <p className="if-app">AI chat</p>
          <p className="sc-ai-voice">Writing assistant</p>
        </div>
        <button type="button" className="rs-btn-ghost sc-ai-new" onClick={fresh}>
          New chat
        </button>
        <p className="sc-ai-label">Chats</p>
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
              <span className="sc-ai-chat-when">{item.when}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="sc-ai-stage" aria-label="Chat">
        <header className="sc-ai-head">
          <button type="button" className="sc-ai-back" onClick={() => setPhonePane("inbox")}>
            <Icon name="arrow-left" size={16} />
            Chats
          </button>
          <h1 className="if-ico-row">
            <Icon name="message" size={16} />
            {piece}
          </h1>
          <button
            type="button"
            className="sc-ai-gear"
            aria-pressed={inspect?.kind === "settings"}
            onClick={() => setInspect((cur) => (cur?.kind === "settings" ? null : { kind: "settings" }))}
          >
            <Icon name="sliders" size={16} />
            Settings
          </button>
        </header>
        <div className="sc-ai-thread">
          <div className="sc-ai-measure">
            {messages.length === 0 ? (
              <div className="sc-ai-empty">
                <p className="sc-ai-hello">What would you like to revise?</p>
                <div className="sc-ai-hints">
                  {HINTS.map((hint) => (
                    <button key={hint} type="button" className="sc-ai-hint" onClick={() => send(hint)}>
                      <Icon name="quote" size={12} />
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) =>
                msg.role === "you" ? (
                  <article key={msg.id} className={`sc-ai-msg sc-ai-msg-you${msg.fresh ? " sc-fresh" : ""}`}>
                    <p className="sc-ai-bubble">{msg.text}</p>
                  </article>
                ) : (
                  <article key={msg.id} className={`sc-ai-msg sc-ai-msg-line${msg.fresh ? " sc-fresh" : ""}`}>
                    <p className="sc-ai-who">Assistant</p>
                    <p className="sc-ai-reply">{msg.text}</p>
                    <button
                      type="button"
                      className="sc-ai-open"
                      aria-pressed={inspect?.kind === "line" && inspect.id === msg.id}
                      onClick={() =>
                        setInspect((cur) =>
                          cur?.kind === "line" && cur.id === msg.id ? null : { kind: "line", id: msg.id },
                        )
                      }
                    >
                      <Icon name="expand" size={12} />
                      Open line
                    </button>
                  </article>
                ),
              )
            )}
            {pending ? (
              <p className="sc-ai-pending if-ico-row" aria-live="polite">
                <Icon name="activity" size={12} />
                Writing
              </p>
            ) : null}
            <div ref={end} />
          </div>
        </div>
      </section>
      <div className="sc-ai-dock">
          <form
            className="sc-ai-composer-form"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <InputGroup className="sc-ai-composer">
              <span className="sc-ai-composer-mark" aria-hidden="true"><Icon name="quote" size={16} /></span>
              <Input
                ref={box}
                type="text"
                value={draft}
                placeholder="Write a message"
                aria-label="Message"
                autoComplete="off"
                onChange={(event) => setDraft(event.target.value)}
              />
              <Button type="submit" grouped className="sc-ai-send" style={{ width: "auto" }} disabled={!draft.trim() || pending}>
                <Icon name="send" size={16} />
                Send
              </Button>
            </InputGroup>
          </form>
        </div>

      <nav className="if-thumb" aria-label={WHAT}>
        <button
          type="button"
          aria-current={phonePane === "inbox"}
          onClick={() => {
            setPhonePane("inbox");
            setInspect(null);
          }}
        >
          <Icon name="inbox" size={16} />
          Chats
        </button>
        <button
          type="button"
          aria-current={phonePane === "thread"}
          onClick={() => setPhonePane("thread")}
        >
          <Icon name="message" size={16} />
          Line
        </button>
      </nav>

      <aside className={`if-inspect${inspect ? " is-open" : ""}`} aria-label="Inspector">
        {inspect ? <InspectorClose onClick={() => setInspect(null)} /> : null}
        <div className="sc-ai-inspect">
          {inspect?.kind === "settings" ? (
            <div key="settings" className="sc-fresh">
              <h2 className="if-ico-row">
                <Icon name="sliders" size={16} />
                Settings
              </h2>
              <p className="if-ico-row">
                <Icon name="terminal" size={12} />
                Model · local
              </p>
              <p className="if-ico-row">
                <Icon name="quote" size={12} />
                Voice · the next line
              </p>
              <p className="if-ico-row">
                <Icon name="shield" size={12} />
                No live model. Replies stay on this sheet.
              </p>
            </div>
          ) : looked ? (
            <div key={looked.id} className="sc-fresh">
              <h2 className="if-ico-row">
                <Icon name="expand" size={16} />
                This line
              </h2>
              <p>{looked.text}</p>
              <button
                type="button"
                onClick={() => {
                  send("Rewrite that line, shorter.");
                  setInspect(null);
                }}
              >
                <Icon name="edit" size={12} />
                Rewrite
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </section>
  );
}
