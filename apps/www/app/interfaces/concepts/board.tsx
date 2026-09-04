"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Button, Card, CardBody, CardLabel, CardTitle, Icon } from "@noorddev/vlak-react";
import { WallpaperGenerator } from "./wallpaper-generator";

const CarViewport = dynamic(
  () => import("./car-viewport").then((module) => module.CarViewport),
  { ssr: false },
);

function Render() {
  const [rotating, setRotating] = React.useState(true);
  const [wireframe, setWireframe] = React.useState(false);
  const [material, setMaterial] = React.useState<"clay" | "graphite">("clay");
  const [view, setView] = React.useState(0);
  return <div className="cx cx-render">
    <header><b>3D workspace</b><span>Concept EV / body_v18</span><span className="cx-header-note">Interactive viewport</span></header>
    <nav aria-label="Viewport tools">
      <Button variant="ghost" className={rotating ? "on" : ""} aria-label="Auto-rotate model" aria-pressed={rotating} onClick={() => setRotating(!rotating)} title="Auto-rotate"><Icon name="refresh" size={16}/></Button>
      <Button variant="ghost" className={wireframe ? "on" : ""} aria-label="Show mesh" aria-pressed={wireframe} onClick={() => setWireframe(!wireframe)} title="Show mesh"><Icon name="grid" size={16}/></Button>
      <Button variant="ghost" aria-label="Reset camera" onClick={() => setView(view + 1)} title="Reset camera"><Icon name="camera" size={16}/></Button>
    </nav>
    <div className="cx-workspace">
      <div className="cx-render-meta"><span>Perspective · drag to orbit</span><span>{wireframe ? "Mesh view" : "Shaded view"}</span></div>
      <CarViewport rotating={rotating} wireframe={wireframe} material={material} resetKey={view}/>
      <div className="cx-timeline"><Button variant="ghost" aria-label={rotating ? "Pause turntable" : "Play turntable"} onClick={() => setRotating(!rotating)}><Icon name={rotating ? "pause" : "play"} size={12}/></Button><span>Turntable</span><i/><span>{rotating ? "Playing" : "Paused"}</span></div>
    </div>
    <aside>
      <p className="cx-label">Selected object</p><b>Door outer / left</b>
      <dl><div><dt>Location</dt><dd>0.42 · 1.08 · 0.76</dd></div><div><dt>Rotation</dt><dd>0° · 2° · 0°</dd></div><div><dt>Scale</dt><dd>1.00</dd></div></dl>
      <p className="cx-label">Body material</p>
      <Button variant="ghost" className="cx-row" onClick={() => setMaterial(material === "clay" ? "graphite" : "clay")}><i className={"cx-swatch " + material}/>{material === "clay" ? "Warm clay" : "Graphite"}<Icon name="refresh" size={12}/></Button>
      <p className="cx-panel-hint">Switch materials, inspect the mesh, or drag the model to find a new angle.</p>
    </aside>
  </div>;
}

const stations = ["North Sea Radio", "Evening frequency", "Instrumental hour"];
const driveModes = ["Vehicle", "Journey", "Energy"] as const;

function Drive() {
  const [temp, setTemp] = React.useState(20);
  const [playing, setPlaying] = React.useState(true);
  const [station, setStation] = React.useState(0);
  const [mode, setMode] = React.useState<(typeof driveModes)[number]>("Vehicle");
  return <div className="cx cx-drive">
    <header><span>09:41</span><b>Vehicle systems</b><span>18°C · LTE</span></header>
    <div className="cx-ev-vehicle">
      <p className="cx-ev-model"><b>Evoque</b><span>Electric concept</span></p>
      <div className="cx-ev-modes" aria-label="Vehicle view">{driveModes.map(value => <Button variant="ghost" key={value} className={mode === value ? "on" : ""} aria-pressed={mode === value} onClick={() => setMode(value)}>{value}</Button>)}</div>
      <img src="/interfaces/concepts/evoque-line-v4.png" alt="Evoque electric concept side-profile line illustration" />
      <div className="cx-ev-route" aria-live="polite"><Icon name={mode === "Energy" ? "activity" : "compass"} size={16}/><span><b>{mode === "Energy" ? "Next charge · Utrecht" : mode === "Journey" ? "A2 · Utrecht Centraal" : "Ready for the road"}</b><small>{mode === "Energy" ? "150 kW · 6 stalls available" : mode === "Journey" ? "24 min · 31 km · arrive 10:05" : "386 km range · all systems ready"}</small></span></div>
    </div>
    <section className="cx-ev-panels" aria-label="Vehicle controls">
      <Card><CardLabel>Range</CardLabel><strong>386</strong><span>kilometres</span></Card>
      <Card><CardLabel>Battery</CardLabel><strong>84%</strong><progress aria-label="Battery charge" value="84" max="100"/><span>Charge limit 90%</span></Card>
      <Card><CardLabel>Cabin</CardLabel><div className="cx-temp"><Button variant="ghost" aria-label="Lower temperature" disabled={temp <= 16} onClick={() => setTemp(temp - 1)}><Icon name="minus" size={16}/></Button><strong aria-live="polite">{temp}°</strong><Button variant="ghost" aria-label="Raise temperature" disabled={temp >= 28} onClick={() => setTemp(temp + 1)}><Icon name="plus" size={16}/></Button></div><span>Climate on</span></Card>
      <Card><CardLabel>Media and phone</CardLabel><b aria-live="polite">{stations[station]}</b><span>Mara’s phone · {playing ? "playing" : "paused"}</span><div className="cx-player"><Button variant="ghost" aria-label="Previous station" onClick={() => setStation((station + stations.length - 1) % stations.length)}><Icon name="skip-back" size={16}/></Button><Button className="primary" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={16}/></Button><Button variant="ghost" aria-label="Next station" onClick={() => setStation((station + 1) % stations.length)}><Icon name="skip-forward" size={16}/></Button></div></Card>
    </section>
  </div>;
}

const assets = [
  { name: "Asteria-3", region: "North Sea pass", coords: "52.37° N · 4.90° E", window: "11:42–11:49", altitude: "612 km", velocity: "7.54 km/s", downlink: "94 Mbps", cloud: "18%" },
  { name: "Helios-7", region: "Alpine corridor", coords: "46.82° N · 8.23° E", window: "12:06–12:13", altitude: "584 km", velocity: "7.58 km/s", downlink: "88 Mbps", cloud: "9%" },
  { name: "Northwatch-2", region: "Baltic coast", coords: "57.70° N · 11.97° E", window: "12:22–12:30", altitude: "638 km", velocity: "7.51 km/s", downlink: "91 Mbps", cloud: "24%" },
  { name: "Copernia-5", region: "Atlantic approach", coords: "48.39° N · 4.49° W", window: "12:41–12:48", altitude: "601 km", velocity: "7.56 km/s", downlink: "96 Mbps", cloud: "31%" },
];
const layers = ["True colour", "Moisture", "Thermal"] as const;

function Orbit() {
  const [layer, setLayer] = React.useState<(typeof layers)[number]>("True colour");
  const [selected, setSelected] = React.useState(0);
  const [queued, setQueued] = React.useState<string[]>([]);
  const asset = assets[selected]!;
  const isQueued = queued.includes(asset.name);
  return <div className="cx cx-orbit">
    <header><b>Satellite operations</b><span>European Observation Network</span><Button size="sm" disabled={isQueued} onClick={() => setQueued([...queued, asset.name])}>{isQueued ? "Capture queued" : "Queue capture"}</Button></header>
    <aside aria-label="Observation assets"><p className="cx-label">Assets</p>{assets.map((item, index) => <button aria-pressed={selected === index} className={selected === index ? "on" : ""} key={item.name} onClick={() => setSelected(index)}><span><i className={selected === index ? "live" : ""}/>{item.name}</span><small>{queued.includes(item.name) ? "Capture queued" : item.region}</small></button>)}</aside>
    <div className="cx-workspace" data-layer={layer.toLowerCase().replace(" ", "-")} data-asset={selected}>
      <img src="/interfaces/concepts/europe-observation-v1.jpg" alt={"Illustrative " + layer.toLowerCase() + " observation of Western Europe"}/>
      <div className="cx-orbit-grid"/><svg className="cx-pass-track" viewBox="0 0 600 560" aria-hidden="true"><path d="M-30 530 C 120 410, 190 390, 270 280 S 430 135, 640 40"/><circle cx="270" cy="280" r="5"/><circle cx="435" cy="134" r="4"/></svg><div className="cx-sweep"/><div className="cx-target cx-target-a"/><div className="cx-target cx-target-b"/><div className="cx-reticle"/>
      <div className="cx-coords"><i/>{asset.name}<br/>{asset.coords}<br/>Simulated pass · 10 m / px</div>
      <div className="cx-layers" aria-label="Observation layer">{layers.map(value => <button className={layer === value ? "on" : ""} aria-pressed={layer === value} onClick={() => setLayer(value)} key={value}>{value}</button>)}</div>
    </div>
    <section><p className="cx-label">{asset.name}</p><h2>{asset.region}</h2><p>Acquisition window<br/><b>{asset.window} CET</b></p><dl>{[["Altitude", asset.altitude], ["Velocity", asset.velocity], ["Downlink", asset.downlink], ["Cloud", asset.cloud]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="cx-status" aria-live="polite"><i/>{isQueued ? "Capture added to local queue" : "Telemetry nominal"}</p></section>
  </div>;
}

type FrontierSection = "Models" | "Research" | "Company";
const frontierContent: Record<FrontierSection, [string, string, string][]> = {
  Models: [["Model", "Aster 2", "Reason across research, technical documents, and code."], ["Context", "512k tokens", "Keep source material and working notes in one conversation."], ["Deployment", "Your environment", "A hosted service in Europe or a private deployment."]],
  Research: [["System card", "Evaluate first", "Test a model against the questions your work depends on."], ["Method", "Show the evidence", "Inspect references, compare answers, and retain the source material."], ["Scope", "Known limitations", "Model answers still need review, especially when evidence is incomplete."]],
  Company: [["Based in Europe", "Built together", "A fictional research lab studying useful reasoning systems."], ["Focus", "Applied research", "Tools for the people working through difficult, open-ended questions."], ["This example", "A design study", "Explore the page structure, typography, and components with Vlak."]],
};

function Frontier() {
  const [section, setSection] = React.useState<FrontierSection>("Models");
  const contentRef = React.useRef<HTMLElement>(null);
  function reveal(value: FrontierSection) {
    setSection(value);
    contentRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  return <div className="cx cx-frontier">
    <header><b>Aster Labs</b><nav aria-label="Company sections">{(["Models", "Research", "Company"] as const).map(value => <button key={value} aria-pressed={section === value} className={section === value ? "on" : ""} onClick={() => reveal(value)}>{value}</button>)}</nav><Button size="sm" onClick={() => reveal("Models")}>Explore models</Button></header>
    <div className="cx-workspace"><p>Built in Europe. Available everywhere.</p><h2>Reasoning models for research and engineering.</h2><p className="cx-frontier-intro">Work through complex questions with your documents, data, and code in view.</p><div><Button onClick={() => reveal("Models")}>Explore Aster 2</Button><button className="cx-text-link" onClick={() => reveal("Research")}>Read the system card <span aria-hidden="true">→</span></button></div></div>
    <section ref={contentRef} aria-label={section}>{frontierContent[section].map(([label, title, body]) => <Card key={label}><CardLabel>{label}</CardLabel><CardTitle>{title}</CardTitle><CardBody>{body}</CardBody></Card>)}</section>
    <footer><span>Aster Labs is a fictional company</span><span>Interface study · Vlak</span></footer>
  </div>;
}

const agenda = [["11:08", "Walk to Depot Noord", "18 min"], ["12:00", "Design review", "Studio 2"], ["15:42", "Train to Amsterdam", "Platform 6"]];

function Phone({ platform }: { platform: "iOS" | "Android" }) {
  const android = platform === "Android";
  const [tab, setTab] = React.useState("Today");
  const [options, setOptions] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  return <article className={"cx-phone " + (android ? "android" : "ios")} aria-label={platform + " travel app"}>
    {!android && <span className="cx-ios-island" aria-hidden="true" />}
    <div className="cx-phone-status"><span>9:41</span><i>{android ? "5G · 82%" : "● ● ▰"}</i></div>
    <header>{android && <button aria-label="Back to today" onClick={() => setTab("Today")}><Icon name="chevron-left" size={16}/></button>}<div><small>{android ? "Travel plan" : "Saturday, 12 September"}</small><b>{tab === "You" ? "Your profile" : "Rotterdam"}</b></div><button aria-label="More options" aria-expanded={options} onClick={() => setOptions(!options)}>{android ? "⋮" : "•••"}</button></header>
    <div className="cx-phone-content">
      {options && <div className="cx-phone-options"><button onClick={() => { setSaved(!saved); setOptions(false); }}>{saved ? "Remove saved trip" : "Save this trip"}</button></div>}
      {tab === "You" ? <div className="cx-phone-profile"><Icon name="user" size={24}/><h2>Mara</h2><p>{saved ? "Rotterdam trip saved" : "No saved trips yet"}</p><button onClick={() => setTab("Today")}>View today’s plan →</button></div> : <>
        <Card className="cx-trip-card"><span>10:24</span><div><b>Intercity 1135</b><p>Amsterdam Centraal → Rotterdam Centraal</p></div><em>On time{saved ? " · Saved" : ""}</em></Card>
        <h2>{tab === "Plan" ? "Your itinerary" : "Today"}</h2>
        {agenda.map((row, index) => <div className="cx-agenda" key={row[0]}>{android && <Icon name={index === 0 ? "map" : index === 1 ? "calendar" : "arrow-right"} size={16}/>}<span>{row[0]}</span><div><b>{row[1]}</b><small>{row[2]}</small></div></div>)}
        {tab === "Plan" && <p className="cx-phone-note">Three stops. Your return train leaves from platform 6.</p>}
        {android && <button className="cx-android-action" aria-label={saved ? "Trip saved" : "Save trip"} aria-pressed={saved} onClick={() => setSaved(!saved)}><Icon name={saved ? "check" : "plus"} size={16}/></button>}
      </>}
    </div>
    <nav aria-label={platform + " app navigation"}>{([["Plan", "map"], ["Today", "calendar"], ["You", "user"]] as const).map(([label, icon]) => <button key={label} className={tab === label ? "on" : ""} aria-pressed={tab === label} onClick={() => setTab(label)}><Icon name={icon} size={16}/><span>{label}</span></button>)}</nav>
    {android && <div className="cx-android-home" aria-hidden="true">━</div>}
  </article>;
}

function Platforms() {
  return <div className="cx cx-platforms"><header><b>One trip, two platforms</b><span>The same content in native patterns</span></header><div className="cx-workspace"><div><p>iOS <span>Large titles · tab bar</span></p><Phone platform="iOS"/></div><div><p>Android <span>App bar · navigation bar</span></p><Phone platform="Android"/></div></div></div>;
}

export function ConceptBoard({ kind }: { kind: "graphics" | "render" | "drive" | "orbit" | "frontier" | "platforms" }) {
  if (kind === "graphics") return <WallpaperGenerator/>;
  if (kind === "render") return <Render/>;
  if (kind === "drive") return <Drive/>;
  if (kind === "orbit") return <Orbit/>;
  if (kind === "frontier") return <Frontier/>;
  return <Platforms/>;
}
