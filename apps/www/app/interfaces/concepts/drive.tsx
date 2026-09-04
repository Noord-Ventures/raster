"use client";

import * as React from "react";
import { Button, Card, CardLabel, Icon, Progress, ToggleGroup } from "@noorddev/vlak-react";

type DriveMode = "vehicle" | "journey" | "energy";

const views = [
  { value: "vehicle", label: "Vehicle" },
  { value: "journey", label: "Journey" },
  { value: "energy", label: "Energy" },
];

export function Drive() {
  const [mode, setMode] = React.useState<DriveMode>("vehicle");
  const [temp, setTemp] = React.useState(20);
  const [playing, setPlaying] = React.useState(true);
  const [locked, setLocked] = React.useState(true);
  const [lights, setLights] = React.useState(false);
  const [navigating, setNavigating] = React.useState(false);
  const [scheduled, setScheduled] = React.useState(false);
  const [connected, setConnected] = React.useState(true);
  const [chargeLimit, setChargeLimit] = React.useState(90);
  const [playhead, setPlayhead] = React.useState(38);

  function toggleConnection() {
    setConnected((value) => !value);
    if (connected) setPlaying(false);
  }

  return (
    <div className="cx cx-drive" data-view={mode} data-playing={playing && connected}>
      <header>
        <span className="cx-ev-time">09:41</span>
        <b>Vehicle systems</b>
        <span className="cx-ev-connection"><span>18°C</span><Icon name="wifi" size={16} /><span>{connected ? "Connected" : "Offline"}</span></span>
      </header>

      <section className="cx-ev-vehicle" aria-label="Evoque electric concept">
        <div className="cx-ev-overview">
          <div className="cx-ev-model"><b>Evoque</b><span>Electric concept</span></div>
          <ToggleGroup className="cx-ev-modes" style={{ height: "auto", borderRadius: "var(--radius-sm)" }} aria-label="Vehicle view" value={mode} options={views} onValueChange={(value) => setMode(value as DriveMode)} />
        </div>

        <div className="cx-ev-illustration" data-lights={lights}>
          <div className="cx-ev-ground" aria-hidden="true" />
          <img src="/interfaces/concepts/evoque-line-v5.png" alt="Evoque electric concept, side-profile line illustration" draggable="false" />
          <span className="cx-ev-headlight" aria-hidden="true" />
        </div>

        <div className="cx-ev-view-detail" key={mode}>
          {mode === "vehicle" && (
            <>
              <div className="cx-ev-state" aria-live="polite"><span className="cx-ev-status-dot" /><div><b>{locked ? "Ready when you are" : "Vehicle unlocked"}</b><span>{locked ? "Doors locked · parked" : "Doors unlocked · parked"}</span></div></div>
              <div className="cx-ev-view-actions">
                <Button variant="ghost" aria-pressed={locked} onClick={() => setLocked((value) => !value)}><Icon name={locked ? "lock" : "unlock"} size={16} />{locked ? "Locked" : "Unlocked"}</Button>
                <Button variant="ghost" aria-pressed={lights} onClick={() => setLights((value) => !value)}><Icon name="sun" size={16} />{lights ? "Lights on" : "Lights off"}</Button>
              </div>
            </>
          )}
          {mode === "journey" && (
            <>
              <div className="cx-ev-state" aria-live="polite"><Icon name="compass" size={16} /><div><b>Utrecht Centraal</b><span>{navigating ? "Route active · 24 min · 31 km" : "Via A2 · 24 min · arrive 10:05"}</span></div></div>
              <Button variant="ghost" className="cx-ev-view-action" aria-pressed={navigating} onClick={() => setNavigating((value) => !value)}>{navigating ? "End route" : "Start route"}<Icon name={navigating ? "close" : "arrow-right"} size={16} /></Button>
            </>
          )}
          {mode === "energy" && (
            <>
              <div className="cx-ev-state" aria-live="polite"><Icon name="activity" size={16} /><div><b>{scheduled ? "Charge scheduled for 23:00" : "Set your next charge"}</b><span>{scheduled ? `Home charger · limit ${chargeLimit}%` : "Home charger · off-peak from 23:00"}</span></div></div>
              <Button variant="ghost" className="cx-ev-view-action" aria-pressed={scheduled} onClick={() => setScheduled((value) => !value)}>{scheduled ? "Cancel schedule" : "Schedule charge"}<Icon name={scheduled ? "close" : "clock"} size={16} /></Button>
            </>
          )}
        </div>
      </section>

      <section className="cx-ev-panels" aria-label="Vehicle controls">
        <Card className="cx-ev-card">
          <CardLabel>Range</CardLabel>
          <div className="cx-ev-card-content">
            <div className="cx-ev-value"><strong>386</strong><span>km</span></div>
            <span className="cx-ev-caption">{navigating ? "355 km after arrival" : "Estimated range"}</span>
            <span className="cx-ev-footnote"><Icon name="compass" size={12} />{navigating ? "31 km to destination" : "Ready for your next journey"}</span>
          </div>
        </Card>

        <Card className="cx-ev-card">
          <CardLabel>Battery</CardLabel>
          <div className="cx-ev-card-content">
            <div className="cx-ev-value"><strong>84</strong><span>%</span></div>
            <Progress className="cx-ev-battery" value={84} aria-label="Battery charge" />
            <Button variant="ghost" className="cx-ev-text-control" onClick={() => setChargeLimit((value) => value === 90 ? 100 : 90)} aria-label={`Charge limit ${chargeLimit} percent. Change to ${chargeLimit === 90 ? 100 : 90} percent`}>Limit {chargeLimit}%<Icon name="chevron-right" size={12} /></Button>
          </div>
        </Card>

        <Card className="cx-ev-card">
          <CardLabel>Cabin</CardLabel>
          <div className="cx-ev-card-content">
            <div className="cx-ev-temperature"><Button variant="ghost" aria-label="Lower temperature" disabled={temp <= 16} onClick={() => setTemp((value) => value - 1)}><Icon name="minus" size={16} /></Button><strong aria-live="polite">{temp}<span>°</span></strong><Button variant="ghost" aria-label="Raise temperature" disabled={temp >= 28} onClick={() => setTemp((value) => value + 1)}><Icon name="plus" size={16} /></Button></div>
            <span className="cx-ev-caption">Climate on · both zones</span>
            <span className="cx-ev-footnote"><Icon name="sun" size={12} />Comfort temperature</span>
          </div>
        </Card>

        <Card className="cx-ev-card cx-ev-media">
          <CardLabel>Media</CardLabel>
          <div className="cx-ev-card-content">
            <div className="cx-ev-track"><b>Fortress Down</b><span>Loathe</span></div>
            <div className="cx-ev-player">
              <Button variant="ghost" aria-label="Restart track" disabled={!connected} onClick={() => setPlayhead(0)}><Icon name="skip-back" size={16} /></Button>
              <Button className="cx-ev-play" aria-label={playing ? "Pause playback" : "Resume playback"} disabled={!connected} aria-pressed={playing && connected} onClick={() => setPlaying((value) => !value)}><Icon name={playing && connected ? "pause" : "play"} size={16} /></Button>
              <Button variant="ghost" aria-label="Skip ahead" disabled={!connected} onClick={() => setPlayhead((value) => Math.min(100, value + 10))}><Icon name="skip-forward" size={16} /></Button>
              <span className="cx-ev-audio-level" aria-label={playing && connected ? "Playing" : "Paused"}><i /><i /><i /><i /></span>
            </div>
            <Progress className="cx-ev-playhead" value={playhead} aria-label="Track progress" />
            <Button variant="ghost" className="cx-ev-text-control" onClick={toggleConnection} aria-label={connected ? "Disconnect Mara’s phone" : "Connect Mara’s phone"}><Icon name="smartphone" size={12} />{connected ? "Mara’s phone" : "Connect phone"}</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
