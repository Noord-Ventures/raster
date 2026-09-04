"use client";

import * as React from "react";
import { Button, Icon, Input, InputGroup } from "@noorddev/vlak-react";
import { Brand } from "../mark";
import { PhoneV1Chrome } from "../v1-chrome";
import { interfaceBySlug } from "../catalog";

const WHAT = interfaceBySlug("line")!.what;

type Role = "you" | "line";
type Msg = { id: string; role: Role; text: string; fresh?: boolean };
type Inspect = { kind: "line"; id: string } | { kind: "settings" } | null;

const CHATS = [
  { id: "brief", title: "Tighten the brief", preview: "Make the intro tighter. Keep the fee…", when: "Now", icon: "quote" as const },
  { id: "press", title: "Press run 14", preview: "Alkmaar · plate up at 06:00", when: "Today", icon: "printer" as const },
  { id: "invoice", title: "Invoice note", preview: "Weeks 4–7 under the fee", when: "Yesterday", icon: "receipt" as const },
  { id: "desk", title: "Room desk", preview: "Keep the thread on this post", when: "Today", icon: "hash" as const },
  { id: "wall", title: "Wall morning", preview: "Paper first. Then the street.", when: "Today", icon: "rows" as const },
] as const;

const STARTED: Record<string, Msg[]> = {
  brief: [
    { id: "b1", role: "you", text: "Make the intro tighter. Keep the fee on the first page." },
    {
      id: "b2",
      role: "line",
      text: "Two sentences, same claim. The fee stays on the first page; the weeks follow it. Cut the opening clause and let the number do the work.",
    },
    { id: "b3", role: "you", text: "Good. Where should the timeline sit?" },
    {
      id: "b4",
      role: "line",
      text: "Directly under the fee. Two lines, not a list. If a third week appears, it becomes a second sheet.",
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
    { id: "d1", role: "you", text: "Keep the thread on this post." },
    { id: "d2", role: "line", text: "The room holds the line. Two sentences, same claim." },
  ],
  wall: [
    { id: "w1", role: "you", text: "Paper first. Then the street." },
    { id: "w2", role: "line", text: "Then the room. Leave the type on the sheet." },
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
      <PhoneV1Chrome heading="Line" action="New" onAction={fresh} />
      <aside className="sc-ai-rail" aria-label="Chats">
        <div className="sc-ai-brand">
          <Brand slug="line" />
          <p className="sc-ai-voice">The next line</p>
        </div>
        <button type="button" className="rs-btn-ghost sc-ai-new" onClick={fresh}>
          <Icon name="plus" size={16} />
          New chat
        </button>
        <p className="sc-ai-label if-ico-row">
          <Icon name="inbox" size={12} />
          Chats
        </p>
        <div className="sc-ai-chats">
          {CHATS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="sc-ai-chat"
              aria-current={chat === item.id}
              onClick={() => openChat(item.id)}
            >
              <span className="sc-ai-chat-title">
                <Icon name={item.icon} size={16} />
                {item.title}
              </span>
              <span className="sc-ai-chat-preview">{item.preview}</span>
              <span className="sc-ai-chat-when if-ico-row">
                <Icon name="clock" size={12} />
                {item.when}
              </span>
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
                <p className="sc-ai-hello">The next line.</p>
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
                    <p className="sc-ai-who">Line</p>
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
                placeholder="The next line."
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
