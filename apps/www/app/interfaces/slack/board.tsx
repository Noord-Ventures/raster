"use client";

import * as React from "react";
import {
  Avatar,
  Badge,
  Item,
  ScrollArea,
  Separator,
  Sidebar,
  SidebarFoot,
  SidebarHead,
  SidebarItem,
  SidebarLabel,
  SidebarNav,
  Textarea,
} from "@noordvc/raster-react";

type Kind = "person" | "agent";

type Line = {
  who: string;
  initials: string;
  kind: Kind;
  body: string;
};

const CHANNELS = [
  { id: "press", label: "#press" },
  { id: "studio", label: "#studio" },
  { id: "raster", label: "#raster" },
] as const;

const PEOPLE = [
  { id: "renn", label: "Renn", kind: "person" as const },
  { id: "sheet", label: "Sheet", kind: "agent" as const },
  { id: "proof", label: "Proof", kind: "agent" as const },
];

const LINES: Record<string, Line[]> = {
  press: [
    { who: "Renn", initials: "RV", kind: "person", body: "Press run 14 is on the sheet. Fee is on page one." },
    { who: "Sheet", initials: "SH", kind: "agent", body: "Logged. Weeks 4–7. I will keep the timeline under the fee." },
    { who: "Noord", initials: "NO", kind: "person", body: "Proofs stay in the same ink. No hue in the chrome." },
    { who: "Proof", initials: "PR", kind: "agent", body: "Watching the plate. I will ping if the density drops." },
    { who: "Renn", initials: "RV", kind: "person", body: "Good. Agents report in the thread, not a second channel." },
  ],
  studio: [
    { who: "Noord", initials: "NO", kind: "person", body: "Alkmaar desk is in. The rail is 204." },
    { who: "Sheet", initials: "SH", kind: "agent", body: "Calendar is on week 34. Three jobs in proof." },
    { who: "Renn", initials: "RV", kind: "person", body: "Leave the crumb bar off the poster." },
  ],
  raster: [
    { who: "Renn", initials: "RV", kind: "person", body: "Interfaces is a sibling of Components. Not a buried page." },
    { who: "Proof", initials: "PR", kind: "agent", body: "Six routes. I will fail CI if one disappears." },
    { who: "Sheet", initials: "SH", kind: "agent", body: "Catalog only. No second kit." },
  ],
  renn: [
    { who: "Renn", initials: "RV", kind: "person", body: "Hold the spot for the field." },
    { who: "You", initials: "YO", kind: "person", body: "Chrome stays ink." },
  ],
  sheet: [
    { who: "Sheet", initials: "SH", kind: "agent", body: "I read the brief. Two sentences, same claim." },
    { who: "You", initials: "YO", kind: "person", body: "Apply it on the canvas, not in chat." },
    { who: "Sheet", initials: "SH", kind: "agent", body: "Applied. Widget is in the feed." },
  ],
  proof: [
    { who: "Proof", initials: "PR", kind: "agent", body: "Plate 09 is within density." },
    { who: "You", initials: "YO", kind: "person", body: "Keep watching through the run." },
  ],
};

export function Board() {
  const [room, setRoom] = React.useState("press");
  const lines = LINES[room] ?? LINES.press!;
  const title =
    CHANNELS.find((c) => c.id === room)?.label ?? PEOPLE.find((p) => p.id === room)?.label ?? room;
  const agentRoom = PEOPLE.find((p) => p.id === room)?.kind === "agent" || lines.some((l) => l.kind === "agent");

  return (
    <main className="if-board" aria-label="Slack">
      <div className="if-app">
        <Sidebar>
          <SidebarHead>Studio</SidebarHead>
          <SidebarNav>
            <SidebarLabel>Channels</SidebarLabel>
            {CHANNELS.map((item) => (
              <SidebarItem
                key={item.id}
                href={`#${item.id}`}
                current={room === item.id}
                onClick={() => setRoom(item.id)}
              >
                {item.label}
              </SidebarItem>
            ))}
            <SidebarLabel>People</SidebarLabel>
            {PEOPLE.map((item) => (
              <SidebarItem
                key={item.id}
                href={`#${item.id}`}
                current={room === item.id}
                onClick={() => setRoom(item.id)}
              >
                {item.label}
              </SidebarItem>
            ))}
          </SidebarNav>
          <SidebarFoot>3 people · 2 agents</SidebarFoot>
        </Sidebar>

        <section className="if-main" aria-label="Chat">
          <div className="if-head">
            <p className="if-head-title">{title}</p>
            <Badge variant={agentRoom ? "muted" : "outline"}>{agentRoom ? "Mixed" : "People"}</Badge>
          </div>
          <ScrollArea maxHeight="none" style={{ flex: 1, maxHeight: "none", padding: "8px 20px" }}>
            {lines.map((line, i) => (
              <article key={i} className="if-msg">
                <Avatar initials={line.initials} size="sm" />
                <div className="if-msg-body">
                  <p className="if-msg-who">
                    {line.who}
                    {line.kind === "agent" ? (
                      <>
                        {" "}
                        <Badge variant="muted">Agent</Badge>
                      </>
                    ) : null}
                  </p>
                  {line.kind === "agent" ? (
                    <p className="rs-ai-reply">{line.body}</p>
                  ) : (
                    <p className="if-msg-text">{line.body}</p>
                  )}
                </div>
              </article>
            ))}
          </ScrollArea>
          <div className="if-composer">
            <Textarea label="Message" placeholder={`Write in ${title}`} rows={2} />
          </div>
        </section>

        <aside className="if-col-narrow if-col" aria-label="Room">
          <div className="if-head">
            <p className="if-head-title">In the room</p>
          </div>
          <div className="if-pane">
            <Item title="Renn" description="Person" meta="Here" />
            <Item title="Noord" description="Person" meta="Here" />
            <Item title="Sheet" description="Agent · writes on the canvas" meta="On" />
            <Item title="Proof" description="Agent · watches the plate" meta="On" />
            <Separator />
            <p className="if-kicker">Law</p>
            <p className="if-copy">Agents sit in the same list as people. The badge is the only tell.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
