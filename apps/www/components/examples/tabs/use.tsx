"use client";

import * as React from "react";
import { Tab, TabList, TabPanel, Tabs } from "@noordvc/raster-react";

/** An issue board. The panel fades in — 0.22s, ease, no bounce. */
export function Use() {
  const [page, setPage] = React.useState("overview");
  return (
    <article className="rs-use rs-use-tabs" data-use="tabs">
      <h3 className="rs-use-type">Issue</h3>
      <div className="rs-use-body">
        <Tabs value={page} onValueChange={setPage}>
          <TabList>
            <Tab value="overview">Overview</Tab>
            <Tab value="proof">Proof</Tab>
            <Tab value="type">Type</Tab>
          </TabList>
          <TabPanel value="overview">
            <div key={page} className="rs-use-panel rs-use-stack">
              <p className="rs-use-kicker">204 module</p>
              <p className="rs-use-copy">A poster you can install. Hairline on the active tab only.</p>
            </div>
          </TabPanel>
          <TabPanel value="proof">
            <div key={page} className="rs-use-panel rs-use-stack">
              <p className="rs-use-kicker">Press check</p>
              <p className="rs-use-copy">Ink density even across the 184 column. No second color.</p>
            </div>
          </TabPanel>
          <TabPanel value="type">
            <div key={page} className="rs-use-panel rs-use-stack">
              <p className="rs-use-kicker">Inter, SIL OFL 1.1</p>
              <p className="rs-use-copy">The face is the picture. Weight and size do the work.</p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </article>
  );
}
