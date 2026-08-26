"use client";

import * as React from "react";
import {
  Badge,
  BarChart,
  DataTable,
  Donut,
  Item,
  LineChart,
  ScrollArea,
  Sidebar,
  SidebarFoot,
  SidebarHead,
  SidebarItem,
  SidebarLabel,
  SidebarNav,
  Split,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  ToggleGroup,
} from "@noordvc/raster-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SHEETS = [12, 18, 15, 26, 24, 11, 9];
const PROOFS = [4, 6, 5, 9, 7, 3, 2];

const ROWS = [
  { job: "Press run 14", city: "Alkmaar", weeks: 4, state: "On press" },
  { job: "Identity 09", city: "Delft", weeks: 6, state: "Proof" },
  { job: "Ledger 03", city: "Haarlem", weeks: 2, state: "Invoice" },
  { job: "Poster 22", city: "Utrecht", weeks: 3, state: "Brief" },
];

export function Board() {
  const [range, setRange] = React.useState("week");
  const [tab, setTab] = React.useState("overview");

  return (
    <main className="if-board" aria-label="SaaS dashboard">
      <div className="if-app">
        <Sidebar>
          <SidebarHead>Ledger</SidebarHead>
          <SidebarNav>
            <SidebarLabel>Studio</SidebarLabel>
            <SidebarItem href="#overview" current>
              Overview
            </SidebarItem>
            <SidebarItem href="#jobs">Jobs</SidebarItem>
            <SidebarItem href="#invoices">Invoices</SidebarItem>
            <SidebarLabel>Field</SidebarLabel>
            <SidebarItem href="#press">Press</SidebarItem>
            <SidebarItem href="#proofs">Proofs</SidebarItem>
          </SidebarNav>
          <SidebarFoot>Week 34</SidebarFoot>
        </Sidebar>

        <section className="if-main" aria-label="Dashboard">
          <div className="if-head">
            <p className="if-head-title">Overview</p>
            <ToggleGroup
              value={range}
              onValueChange={setRange}
              options={[
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
              ]}
            />
          </div>
          <div className="if-pane">
            <Tabs value={tab} onValueChange={setTab}>
              <TabList>
                <Tab value="overview">Overview</Tab>
                <Tab value="jobs">Jobs</Tab>
              </TabList>
              <TabPanel value="overview">
                <div className="if-stack" style={{ marginTop: 20 }}>
                  <Split initial={62} min={40} max={75}>
                    <div className="if-stack">
                      <p className="if-kicker">Sheets this {range}</p>
                      <LineChart
                        height={204}
                        labels={DAYS}
                        series={[
                          { name: "Sheets", values: SHEETS },
                          { name: "Proofs", values: PROOFS },
                        ]}
                        unit="sheets"
                        annotations={[{ at: 3, label: "Press" }]}
                        spot
                      />
                      <BarChart
                        height={184}
                        orientation="horizontal"
                        data={[
                          { label: "Alkmaar", value: 42 },
                          { label: "Delft", value: 28 },
                          { label: "Haarlem", value: 21 },
                          { label: "Utrecht", value: 16 },
                        ]}
                        unit="jobs"
                      />
                    </div>
                    <div className="if-stack">
                      <p className="if-kicker">Share</p>
                      <Donut value={72} max={100} size={184} label="printed" />
                      <ScrollArea maxHeight={204}>
                        <Item title="Press run 14" description="Alkmaar · four weeks" meta={<Badge variant="solid">On press</Badge>} />
                        <Item title="Identity 09" description="Delft · proofs due" meta={<Badge variant="muted">Proof</Badge>} />
                        <Item title="Ledger 03" description="Haarlem · invoice out" meta={<Badge>Invoice</Badge>} />
                        <Item title="Poster 22" description="Utrecht · brief open" meta={<Badge variant="muted">Brief</Badge>} />
                      </ScrollArea>
                    </div>
                  </Split>
                </div>
              </TabPanel>
              <TabPanel value="jobs">
                <div style={{ marginTop: 20 }}>
                  <DataTable
                    columns={[
                      { key: "job", header: "Job", sortable: true },
                      { key: "city", header: "City", sortable: true },
                      { key: "weeks", header: "Weeks", sortable: true },
                      { key: "state", header: "State" },
                    ]}
                    rows={ROWS}
                  />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </section>
      </div>
    </main>
  );
}
