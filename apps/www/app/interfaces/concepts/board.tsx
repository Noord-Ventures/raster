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
  const [tool, setTool] = React.useState("Move");
  return <div className="cx cx-render">
    <header><b>3D workspace</b><span>Concept EV / body_v18</span><div><button>Object</button><button>Material</button><button>Render</button></div></header>
    <nav aria-label="Modeling tools">{([["Move","move"],["Rotate","refresh"],["Scale","expand"],["Mesh","grid"],["Cut","cut"],["Camera","camera"]] as const).map(([label, icon]) => <button key={label} className={tool === label ? "on" : ""} onClick={() => setTool(label)} title={label}><Icon name={icon} size={16}/></button>)}</nav>
    <main><div className="cx-render-meta"><span>Perspective · drag to rotate</span><span>Live viewport · 38k faces</span></div><CarViewport/><div className="cx-timeline"><button><Icon name="play" size={12}/></button><span>001</span><i/><span>120</span></div></main>
    <aside><p className="cx-label">Selected object</p><b>Door outer / left</b><dl><div><dt>Location</dt><dd>0.42 · 1.08 · 0.76</dd></div><div><dt>Rotation</dt><dd>0° · 2° · 0°</dd></div><div><dt>Scale</dt><dd>1.00</dd></div></dl><p className="cx-label">Material</p><button className="cx-row"><i className="cx-swatch"/>Clay / warm gray</button><p className="cx-label">Render</p><span>Frame 64 · 31%</span><progress value="31" max="100"/></aside>
  </div>;
}

function Drive() {
  const [temp, setTemp] = React.useState(20);
  const [playing, setPlaying] = React.useState(true);
  return <div className="cx cx-drive">
    <header><span>09:41</span><b>Vehicle systems</b><span>18°C · LTE</span></header>
    <main className="cx-ev-vehicle">
      <p className="cx-ev-model"><b>Evoque</b><span>Electric concept · side profile</span></p>
      <div className="cx-ev-modes"><button className="on">Vehicle</button><button>Journey</button><button>Energy</button></div>
      <img src="/interfaces/concepts/evoque-line-v4.png" alt="Evoque electric concept side-profile line illustration" />
      <p className="cx-ev-route"><Icon name="compass" size={16}/><span><b>A2 · Utrecht</b><small>24 min · 31 km</small></span></p>
    </main>
    <section className="cx-ev-panels">
      <article><p className="cx-kicker">Range</p><strong>386</strong><span>kilometres</span></article>
      <article><p className="cx-kicker">Battery</p><strong>84%</strong><progress value="84" max="100"/><span>Ready · limit 90%</span></article>
      <article><p className="cx-kicker">Cabin</p><div className="cx-temp"><button aria-label="Lower temperature" onClick={() => setTemp(temp - 1)}><Icon name="minus" size={16}/></button><strong>{temp}°</strong><button aria-label="Raise temperature" onClick={() => setTemp(temp + 1)}><Icon name="plus" size={16}/></button></div><span>Climate on</span></article>
      <article><p className="cx-kicker">Media and phone</p><b>North Sea Radio</b><span>Mara’s phone · connected</span><div className="cx-player"><button aria-label="Previous"><Icon name="skip-back" size={16}/></button><button className="primary" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={16}/></button><button aria-label="Next"><Icon name="skip-forward" size={16}/></button></div></article>
    </section>
  </div>;
}

function Orbit() {
  const [layer, setLayer] = React.useState("True colour");
  return <div className="cx cx-orbit">
    <header><b>Satellite operations</b><span>European Observation Network</span><Button size="sm">Queue capture</Button></header>
    <aside><p className="cx-label">Assets</p>{["Asteria-3","Helios-7","Northwatch-2","Copernia-5"].map((name,i)=><button className={i===0?"on":""} key={name}><span><i className={i===0?"live":""}/>{name}</span><small>{i===0?"Active pass":"Next pass 14:20"}</small></button>)}</aside>
    <main><img src="/interfaces/concepts/europe-observation-v1.jpg" alt="Illustrative satellite observation of Western Europe"/><div className="cx-orbit-grid"/><svg className="cx-pass-track" viewBox="0 0 600 560" aria-hidden="true"><path d="M-30 530 C 120 410, 190 390, 270 280 S 430 135, 640 40"/><circle cx="270" cy="280" r="5"/><circle cx="435" cy="134" r="4"/></svg><div className="cx-sweep"/><div className="cx-target cx-target-a"/><div className="cx-target cx-target-b"/><div className="cx-reticle"/><div className="cx-coords"><i/> Live · Asteria-3<br/>52.37° N · 4.90° E<br/>Pass 1842 · 10 m / px</div><div className="cx-layers">{["True colour","Moisture","Thermal"].map(x=><button className={layer===x?"on":""} onClick={()=>setLayer(x)} key={x}>{x}</button>)}</div></main>
    <section><p className="cx-label">Asteria-3</p><h2>North Sea pass</h2><p>Acquisition window<br/><b>11:42:18–11:49:06 CET</b></p><dl><div><dt>Altitude</dt><dd>612 km</dd></div><div><dt>Velocity</dt><dd>7.54 km/s</dd></div><div><dt>Downlink</dt><dd>94 Mbps</dd></div><div><dt>Cloud</dt><dd>18%</dd></div></dl><p className="cx-status"><i/>Telemetry nominal</p></section>
  </div>;
}

function Frontier() {
  return <div className="cx cx-frontier"><header><b>Aster Labs</b><nav><a href="#models">Models</a><a href="#research">Research</a><a href="#company">Company</a></nav><Button size="sm">Request access</Button></header><main><p>Built in Europe. Available everywhere.</p><h1>Reasoning models for work that has to hold up.</h1><div><Button>Explore Aster 2</Button><a href="#research">Read the system card →</a></div></main><section id="models"><article><Card><CardLabel>Model</CardLabel><CardTitle>Aster 2</CardTitle><CardBody>Long-context reasoning for research, engineering, and operations.</CardBody></Card></article><article><Card><CardLabel>Context</CardLabel><CardTitle>512k</CardTitle><CardBody>Text, image, structured data, and tool use in one working session.</CardBody></Card></article><article><Card><CardLabel>Deployment</CardLabel><CardTitle>EU / private</CardTitle><CardBody>Hosted in the EU or deployed inside your own environment.</CardBody></Card></article></section><footer><span>Evaluation suite · September 2026</span><b>87.4 reasoning</b><b>92.1 retrieval</b><b>99.98% uptime</b></footer></div>;
}

function Phone({ platform }: { platform: "iOS" | "Android" }) {
  const android = platform === "Android";
  const agenda = [["11:08","Walk to Depot Noord","18 min"],["12:00","Design review","Studio 2"],["15:42","Train to Amsterdam","Platform 6"]];
  return <article className={`cx-phone ${android ? "android" : "ios"}`}>
    {!android && <span className="cx-ios-island" aria-hidden="true" />}
    <div className="cx-phone-status"><span>9:41</span><i>{android ? "5G · 82%" : "● ● ▰"}</i></div>
    <header>
      {android ? <button aria-label="Back"><Icon name="chevron-left" size={16}/></button> : null}
      <div><small>{android ? "Travel plan" : "Saturday, 12 September"}</small><b>Rotterdam</b></div>
      <button aria-label="More options">{android ? "⋮" : "•••"}</button>
    </header>
    <main>
      <div className="cx-trip-card"><span>10:24</span><div><b>Intercity 1135</b><p>Amsterdam Centraal → Rotterdam Centraal</p></div><em>On time</em></div>
      <h2>Today</h2>
      {agenda.map((row, index)=><div className="cx-agenda" key={row[0]}>{android && <Icon name={index === 0 ? "map" : index === 1 ? "calendar" : "arrow-right"} size={16}/>}<span>{row[0]}</span><div><b>{row[1]}</b><small>{row[2]}</small></div></div>)}
      {android && <button className="cx-android-action" aria-label="Add to plan"><Icon name="plus" size={16}/></button>}
    </main>
    <nav>
      <button><Icon name="map" size={16}/><span>Plan</span></button>
      <button className="on"><Icon name="calendar" size={16}/><span>Today</span></button>
      <button><Icon name="user" size={16}/><span>You</span></button>
    </nav>
    {android && <div className="cx-android-home">━</div>}
  </article>;
}

function Platforms() { return <div className="cx cx-platforms"><header><b>Same content, native patterns</b><span>Travel plan · Today</span></header><main><div><p>iPhone</p><Phone platform="iOS"/></div><div><p>Android</p><Phone platform="Android"/></div></main></div>; }

export function ConceptBoard({ kind }: { kind: "graphics" | "render" | "drive" | "orbit" | "frontier" | "platforms" }) {
  if (kind === "graphics") return <WallpaperGenerator/>;
  if (kind === "render") return <Render/>;
  if (kind === "drive") return <Drive/>;
  if (kind === "orbit") return <Orbit/>;
  if (kind === "frontier") return <Frontier/>;
  return <Platforms/>;
}
