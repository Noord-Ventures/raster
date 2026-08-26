"use client";

import * as React from "react";
import {
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Item,
  ScrollArea,
  Separator,
  Sidebar,
  SidebarFoot,
  SidebarHead,
  SidebarItem,
  SidebarLabel,
  SidebarNav,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@noordvc/raster-react";

type Post = {
  id: string;
  who: string;
  initials: string;
  kind: "note" | "image" | "quote";
  body: string;
  meta: string;
  replies: Array<{ who: string; initials: string; body: string }>;
};

const POSTS: Post[] = [
  {
    id: "grid",
    who: "Renn",
    initials: "RV",
    kind: "note",
    body: "The 204 module is the only join. If a pane needs a second line, it is a second module.",
    meta: "12 replies",
    replies: [
      { who: "Noord", initials: "NO", body: "Keep the hairline on the active tab only." },
      { who: "Sheet", initials: "SH", body: "The rail stays 184. The gutter is not a stroke." },
      { who: "Renn", initials: "RV", body: "Agreed. Flush on the left. Internal lines only." },
    ],
  },
  {
    id: "proof",
    who: "Noord",
    initials: "NO",
    kind: "image",
    body: "Proof 09 on the press. Same ink, no second color in the chrome.",
    meta: "4 replies",
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
    meta: "7 replies",
    replies: [
      { who: "Renn", initials: "RV", body: "Cite hangs in the gutter. The claim stays in the measure." },
      { who: "Noord", initials: "NO", body: "Sentence case on the label." },
    ],
  },
];

export function Board() {
  const [tab, setTab] = React.useState("feed");
  const [open, setOpen] = React.useState("grid");
  const post = POSTS.find((p) => p.id === open) ?? POSTS[0]!;

  return (
    <main className="if-board" aria-label="Threads">
      <div className="if-app">
        <Sidebar>
          <SidebarHead>Thread</SidebarHead>
          <SidebarNav>
            <SidebarLabel>Topics</SidebarLabel>
            <SidebarItem href="#grid" current={open === "grid"} onClick={() => setOpen("grid")}>
              Grid
            </SidebarItem>
            <SidebarItem href="#proof" current={open === "proof"} onClick={() => setOpen("proof")}>
              Proof
            </SidebarItem>
            <SidebarItem href="#cite" current={open === "cite"} onClick={() => setOpen("cite")}>
              Cite
            </SidebarItem>
          </SidebarNav>
          <SidebarFoot>Following 3</SidebarFoot>
        </Sidebar>

        <section className="if-main" aria-label="Feed">
          <div className="if-head">
            <p className="if-head-title">Feed</p>
            <Badge variant="muted">Discussion</Badge>
          </div>
          <div className="if-pane">
            <Tabs value={tab} onValueChange={setTab}>
              <TabList>
                <Tab value="feed">Feed</Tab>
                <Tab value="thread">Thread</Tab>
              </TabList>
              <TabPanel value="feed">
                <div className="if-feed" style={{ marginTop: 8 }}>
                  {POSTS.map((item) => (
                    <article key={item.id} className="if-post">
                      <div className="if-post-meta">
                        <Avatar initials={item.initials} size="sm" />
                        <span className="if-head-title">{item.who}</span>
                        <Badge variant={item.kind === "note" ? "outline" : item.kind === "image" ? "solid" : "muted"}>
                          {item.kind === "note" ? "Note" : item.kind === "image" ? "Image" : "Quote"}
                        </Badge>
                      </div>
                      {item.kind === "quote" ? (
                        <div className="if-sheet">
                          <p className="if-kicker">Quoted</p>
                          <p className="if-copy">{item.body}</p>
                        </div>
                      ) : (
                        <p className="if-copy">{item.body}</p>
                      )}
                      {item.kind === "image" ? (
                        <div style={{ marginTop: 12 }}>
                          <AspectRatio ratio={16 / 9}>
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                background: "var(--table-alt)",
                                border: "1px solid var(--divider)",
                              }}
                            />
                          </AspectRatio>
                        </div>
                      ) : null}
                      <div style={{ marginTop: 12 }}>
                        <Button variant="ghost" size="sm" onClick={() => { setOpen(item.id); setTab("thread"); }}>
                          {item.meta}
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="thread">
                <div style={{ marginTop: 16 }}>
                  <div className="if-post-meta">
                    <Avatar initials={post.initials} />
                    <div>
                      <p className="if-head-title">{post.who}</p>
                      <p className="if-kicker" style={{ margin: 0 }}>
                        {post.meta}
                      </p>
                    </div>
                  </div>
                  <p className="if-copy" style={{ marginTop: 12 }}>
                    {post.body}
                  </p>
                  <Separator />
                  <ScrollArea maxHeight={320}>
                    {post.replies.map((reply, i) => (
                      <Item
                        key={i}
                        title={
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <Avatar initials={reply.initials} size="sm" />
                            {reply.who}
                          </span>
                        }
                        description={reply.body}
                      />
                    ))}
                  </ScrollArea>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </section>
      </div>
    </main>
  );
}
