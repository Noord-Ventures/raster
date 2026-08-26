"use client";

import * as React from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  ScrollArea,
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
  Textarea,
} from "@noordvc/raster-react";

const SHEETS = [
  { href: "#brief", label: "Brief", current: true },
  { href: "#press", label: "Press run" },
  { href: "#invoice", label: "Invoice note" },
];

export function Board() {
  const [tab, setTab] = React.useState("brief");
  const [note, setNote] = React.useState("Cut the opening. Keep the fee on the first page.");

  return (
    <main className="if-board" aria-label="AI tool">
      <div className="if-app">
        <Sidebar>
          <SidebarHead>Sheet</SidebarHead>
          <SidebarNav>
            <SidebarLabel>Open</SidebarLabel>
            {SHEETS.map((item) => (
              <SidebarItem key={item.href} href={item.href} current={item.current}>
                {item.label}
              </SidebarItem>
            ))}
            <SidebarLabel>Library</SidebarLabel>
            <SidebarItem href="#proofs">Proofs</SidebarItem>
            <SidebarItem href="#refs">References</SidebarItem>
          </SidebarNav>
          <SidebarFoot>Local · 3 sheets</SidebarFoot>
        </Sidebar>

        <section className="if-main" aria-label="Canvas">
          <div className="if-head">
            <p className="if-head-title">Brief</p>
            <ButtonGroup>
              <Button variant="ghost" size="sm">
                Write
              </Button>
              <Button variant="ghost" size="sm">
                Review
              </Button>
            </ButtonGroup>
          </div>
          <div className="if-pane">
            <Tabs value={tab} onValueChange={setTab}>
              <TabList>
                <Tab value="brief">Brief</Tab>
                <Tab value="notes">Notes</Tab>
              </TabList>
              <TabPanel value="brief">
                <div className="if-stack" style={{ marginTop: 20 }}>
                  <div className="if-sheet">
                    <p className="if-kicker">Page 1</p>
                    <p className="if-copy">
                      One sheet. Scope, weeks, and the fee. The number on the cover is the number on
                      the invoice.
                    </p>
                    <p className="if-copy" style={{ marginTop: 12 }}>
                      Press starts week 4. Proofs stay in the same ink. No second color in the chrome.
                    </p>
                  </div>
                  <article className="rs-ai-card">
                    <span className="rs-ai-tag">Widget</span>
                    <p className="rs-ai-text">Move the timeline under the fee. Two lines, not a list.</p>
                    <p className="rs-ai-done">
                      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                        <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      Applied to the brief
                    </p>
                  </article>
                  <article className="rs-ai-card">
                    <span className="rs-ai-tag">Widget</span>
                    <p className="rs-ai-text">The refs hang in the gutter. Keep the cite box after the claim.</p>
                    <div style={{ marginTop: 12 }}>
                      <Button variant="ghost" size="sm">
                        Apply
                      </Button>
                    </div>
                  </article>
                </div>
              </TabPanel>
              <TabPanel value="notes">
                <div style={{ marginTop: 20 }}>
                  <Textarea
                    label="Scratch"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </section>

        <aside className="if-col" aria-label="AI chat">
          <div className="if-head">
            <p className="if-head-title">Assistant</p>
            <Badge variant="muted">On the sheet</Badge>
          </div>
          <ScrollArea maxHeight="none" style={{ flex: 1, maxHeight: "none" }}>
            <div className="rs-ai" style={{ border: "none", padding: 20 }}>
              <div className="rs-ai-head">
                <p className="rs-ai-title">Sheet</p>
                <p className="rs-ai-status">
                  <i />
                  Reading brief
                </p>
              </div>
              <div className="rs-ai-msg rs-ai-user">
                <div className="rs-ai-user-block">Make the intro tighter.</div>
              </div>
              <p className="rs-ai-reply">
                Two sentences, same claim. The fee stays on the first page; the weeks follow it.
              </p>
              <div className="rs-ai-msg rs-ai-user">
                <div className="rs-ai-user-block">Show the edit as a widget in the canvas.</div>
              </div>
              <p className="rs-ai-reply">Applied. The timeline sits under the fee now.</p>
              <article className="rs-ai-card">
                <span className="rs-ai-tag">In feed</span>
                <p className="rs-ai-text">Next: hang the Müller-Brockmann cite on the grid claim.</p>
              </article>
            </div>
          </ScrollArea>
          <div className="if-composer">
            <div className="rs-ai-input">
              <span>Ask the sheet…</span>
              <span className="rs-ai-send">Send</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
