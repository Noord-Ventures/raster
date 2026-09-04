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
  { id: "brief", title: "Digital Bath imagery", preview: "Why beauty and menace coexist", when: "Now" },
  { id: "press", title: "Change and distance", preview: "Transformation without a stable narrator", when: "Today" },
  { id: "invoice", title: "Be Quiet and Drive", preview: "Escape as place, motion, and pressure", when: "Yesterday" },
  { id: "desk", title: "White Pony sequence", preview: "How the album keeps changing temperature", when: "Today" },
  { id: "wall", title: "Rosemary atmosphere", preview: "Scale, suspension, and the long build", when: "Today" },
] as const;

const STARTED: Record<string, Msg[]> = {
  brief: [
    { id: "b1", role: "you", text: "How do you read the contrast in Digital Bath?" },
    {
      id: "b2",
      role: "line",
      text: "The song places luxurious sensory detail beside implied danger. That friction makes the scene feel intimate and threatening at the same time.",
    },
    { id: "b3", role: "you", text: "Does the arrangement reinforce that reading?" },
    {
      id: "b4",
      role: "line",
      text: "Yes. The verses leave negative space around the voice, then the chorus arrives with physical weight. The music turns the same scene from private to overwhelming.",
    },
  ],
  press: [
    { id: "p1", role: "you", text: "Who is changing in Change: the subject, the narrator, or both?" },
    {
      id: "p2",
      role: "line",
      text: "The ambiguity is the point. The narrator watches a transformation but also sounds implicated in it, so distance becomes a form of self-protection rather than certainty.",
    },
  ],
  invoice: [
    { id: "i1", role: "you", text: "Why does Be Quiet and Drive feel like escape rather than arrival?" },
    {
      id: "i2",
      role: "line",
      text: "The song values motion over destination. Place names fall away, and the emotional demand is simply to get elsewhere before the present closes in.",
    },
  ],
  desk: [
    { id: "d1", role: "you", text: "What holds White Pony together when its songs feel so different?" },
    { id: "d2", role: "line", text: "A shared tension between control and surrender. The production changes shape, but intimacy repeatedly tips into unease." },
  ],
  wall: [
    { id: "w1", role: "you", text: "What makes Rosemary feel so vast?" },
    { id: "w2", role: "line", text: "Its scale comes from patience: suspended guitar figures, distant imagery, and a gradual increase in mass rather than a sudden reveal." },
  ],
};

const HINTS = ["Read Digital Bath", "Discuss Change", "Trace the mood of Rosemary"];

const REPLIES = [
  "That reading fits the band’s recurring tension between closeness and threat. The image feels inviting until the surrounding music changes its emotional temperature.",
  "The song keeps its subject deliberately unstable. What first sounds observational gradually implicates the person doing the watching.",
  "Listen to how the arrangement withholds release. The emotional force comes from accumulation, not from a single lyrical explanation.",
  "Across the album, physical spaces often stand in for psychological distance. Movement becomes a way to describe pressure without naming it directly.",
];

export function Board() {
  const [chat, setChat] = React.useState("brief");
  const [messages, setMessages] = React.useState<Msg[]>(STARTED.brief ?? []);
  const [draft, setDraft] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [inspect, setInspect] = React.useState<Inspect>(null);
  const [phonePane, setPhonePane] = React.useState<"inbox" | "thread">("inbox");
  const thread = React.useRef<HTMLDivElement>(null);
  const box = React.useRef<HTMLInputElement>(null);
  const piece = CHATS.find((item) => item.id === chat)?.title ?? "New chat";
  const looked = inspect?.kind === "line" ? messages.find((msg) => msg.id === inspect.id) : null;

  React.useEffect(() => {
    if (thread.current) thread.current.scrollTop = thread.current.scrollHeight;
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
          <p className="sc-ai-voice">Deftones listening notes</p>
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
          <h2 className="if-ico-row">
            <Icon name="message" size={16} />
            {piece}
          </h2>
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
        <div className="sc-ai-thread" ref={thread}>
          <div className="sc-ai-measure">
            {messages.length === 0 ? (
              <div className="sc-ai-empty">
                <p className="sc-ai-hello">Which Deftones song would you like to discuss?</p>
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
                      Explore response
                    </button>
                  </article>
                ),
              )
            )}
            {pending ? (
              <p className="sc-ai-pending if-ico-row" aria-live="polite">
                <Icon name="activity" size={12} />
                Thinking
              </p>
            ) : null}
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
                placeholder="Ask about a song"
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
          Conversation
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
                Topic · Deftones
              </p>
              <p className="if-ico-row">
                <Icon name="quote" size={12} />
                Method · close reading
              </p>
              <p className="if-ico-row">
                <Icon name="shield" size={12} />
                Sample conversation. New messages receive a preset reply.
              </p>
            </div>
          ) : looked ? (
            <div key={looked.id} className="sc-fresh">
              <h2 className="if-ico-row">
                <Icon name="expand" size={16} />
                Close reading
              </h2>
              <p>{looked.text}</p>
              <button
                type="button"
                onClick={() => {
                  send("Take that reading further.");
                  setInspect(null);
                }}
              >
                <Icon name="edit" size={12} />
                Go deeper
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </section>
  );
}
