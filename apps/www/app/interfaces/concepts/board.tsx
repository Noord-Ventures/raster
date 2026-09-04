"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Button, Card, CardBody, CardLabel, CardTitle, Icon } from "@noorddev/vlak-react";

const CarViewport = dynamic(
  () => import("./car-viewport").then((module) => module.CarViewport),
  { ssr: false },
);

const posters = [
  ["/interfaces/concepts/poster-blue-v1.jpg", "Blue field"],
  ["/interfaces/concepts/poster-grid-v1.jpg", "Open grid"],
  ["/interfaces/concepts/poster-orbit-v1.jpg", "Black orbit"],
] as const;

function Graphics() {
  const [selected, setSelected] = React.useState(0);
  const [prompt, setPrompt] = React.useState("Modernist cultural poster. Strict grid, strong geometry, one signal color.");
  const [format, setFormat] = React.useState<"poster" | "square" | "story">("poster");
  const [results, setResults] = React.useState<Array<{ src: string; name: string }>>(
    posters.map(([src, name]) => ({ src, name })),
  );
  const [status, setStatus] = React.useState("");

  async function generate() {
    setStatus("Generating…");
    try {
      const response = await fetch("/api/interfaces/generate/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt, format }),
      });
      const payload = await response.json() as { image?: string; error?: string };
      if (!response.ok || !payload.image) throw new Error(payload.error ?? "Generation failed.");
      setResults((current) => [{ src: payload.image!, name: "New output" }, ...current].slice(0, 3));
      setSelected(0);
      setStatus("Generated");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Generation failed.");
    }
  }

  async function exportSelected() {
    const result = results[selected];
    if (!result) return;
    const response = await fetch(result.src);
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `vlak-graphic-${selected + 1}.png`;
    anchor.click();
    URL.revokeObjectURL(href);
  }

  return <div className="cx cx-graphics">
    <header><b>Graphic generator</b><span>Campaign / September</span><Button size="sm" onClick={exportSelected}>Export</Button></header>
    <aside><p className="cx-label">Direction</p><label>Prompt<textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} /></label><p className="cx-label">Format</p><div className="cx-segments">{(["poster", "square", "story"] as const).map((value) => <button key={value} className={format === value ? "on" : ""} aria-pressed={format === value} onClick={() => setFormat(value)}>{value[0]!.toUpperCase() + value.slice(1)}</button>)}</div><label>Variation<input type="range" defaultValue="42" /></label><Button onClick={generate}><Icon name="image" size={16}/>Generate</Button><p className="cx-generation-status" aria-live="polite">{status}</p></aside>
    <main><div className="cx-results">{results.map(({ src, name }, index) => <button key={`${src}-${index}`} className={selected === index ? "on" : ""} onClick={() => setSelected(index)}><img src={src} alt={`${name}, generated modernist poster`} /><span>{String(index + 1).padStart(2, "0")} · {name}</span></button>)}</div></main>
  </div>;
}

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
    <header><span>09:41</span><b>EV controls</b><span>18°C · LTE</span></header>
    <aside><p className="cx-kicker">Driving</p><strong>84</strong><span>km/h</span><div className="cx-range"><b>318 km</b><span>72% battery</span><progress value="72" max="100"/></div><p className="cx-route"><Icon name="compass" size={16}/>A2 · Utrecht<br/><small>24 min · 31 km</small></p></aside>
    <main><p className="cx-kicker">Now playing</p><div className="cx-album"><span>NE</span></div><h2>North Sea Radio</h2><p>Signal Forms · Live session</p><div className="cx-player"><button><Icon name="skip-back" size={16}/></button><button className="primary" onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={16}/></button><button><Icon name="skip-forward" size={16}/></button></div></main>
    <section><p className="cx-kicker">Cabin</p><div className="cx-temp"><button aria-label="Lower temperature" onClick={() => setTemp(temp - 1)}><Icon name="minus" size={16}/></button><strong>{temp}°</strong><button aria-label="Raise temperature" onClick={() => setTemp(temp + 1)}><Icon name="plus" size={16}/></button></div><div className="cx-quick"><button><Icon name="phone" size={16}/>Phone</button><button><Icon name="wifi" size={16}/>Online</button><button><Icon name="power" size={16}/>Charge</button><button><Icon name="sun" size={16}/>Climate</button></div><p className="cx-device"><span>Connected</span><b>Mara’s phone</b></p></section>
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
  return <article className={`cx-phone ${android ? "android" : "ios"}`}><div className="cx-phone-status"><span>9:41</span><i>{android ? "▴ 5G ▰" : "● ● ▰"}</i></div><header>{android && <button>‹</button>}<div><small>Saturday, 12 September</small><b>Rotterdam</b></div><button>•••</button></header><main><div className="cx-trip-card"><span>10:24</span><div><b>Intercity 1135</b><p>Amsterdam Centraal → Rotterdam Centraal</p></div><em>On time</em></div><h2>Today</h2>{[["11:08","Walk to Depot Noord","18 min"],["12:00","Design review","Studio 2"],["15:42","Train to Amsterdam","Platform 6"]].map(row=><div className="cx-agenda" key={row[0]}><span>{row[0]}</span><div><b>{row[1]}</b><small>{row[2]}</small></div></div>)}</main><nav>{android?<><button><Icon name="map" size={16}/>Plan</button><button><Icon name="calendar" size={16}/>Today</button><button><Icon name="user" size={16}/>You</button></>:<><button>Plan</button><button className="on">Today</button><button>You</button></>}</nav>{android && <div className="cx-android-home">━</div>}</article>;
}

function Platforms() { return <div className="cx cx-platforms"><header><b>Same content, native patterns</b><span>Travel plan · Today</span></header><main><div><p>iPhone</p><Phone platform="iOS"/></div><div><p>Android</p><Phone platform="Android"/></div></main></div>; }

export function ConceptBoard({ kind }: { kind: "graphics" | "render" | "drive" | "orbit" | "frontier" | "platforms" }) {
  if (kind === "graphics") return <Graphics/>;
  if (kind === "render") return <Render/>;
  if (kind === "drive") return <Drive/>;
  if (kind === "orbit") return <Orbit/>;
  if (kind === "frontier") return <Frontier/>;
  return <Platforms/>;
}
