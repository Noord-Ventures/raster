import type { ReactNode } from "react";
import { sx } from "@/lib/sx";
import { type InterfaceSlug, interfaceBySlug } from "./catalog";
import { interfaces } from "./interfaces.stylex";
import { Mark } from "./mark";

function Lockup({ slug }: { slug: InterfaceSlug }) {
  const proto = interfaceBySlug(slug)!;
  return (
    <p className="if-crop-lockup">
      <Mark slug={slug} />
      <span>{proto.title}</span>
    </p>
  );
}

function LineCrop() {
  return (
    <div className="if-crop-scene if-crop-lijn">
      <Lockup slug="line" />
      <p className="if-crop-kicker">Brief</p>
      <p className="if-crop-line">
        A tighter
        <br />
        project brief.
      </p>
      <div className="if-crop-dock">
        <span>Write a message</span>
        <span className="if-crop-send">Send</span>
      </div>
    </div>
  );
}

function PressCrop() {
  return (
    <div className="if-crop-scene if-crop-pers">
      <Lockup slug="press" />
      <p className="if-crop-kicker">Sheets this week</p>
      <p className="if-crop-numeral">38</p>
      <p className="if-crop-spot" style={{ color: "#E30613" }}>
        4 on press
      </p>
      <svg className="if-crop-chart" viewBox="0 0 320 80" aria-hidden="true">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          points="0,54 53,42 106,48 159,18 212,24 265,58 320,64"
        />
      </svg>
    </div>
  );
}

function WallCrop() {
  return (
    <div className="if-crop-scene if-crop-muur">
      <img src="/interfaces/threads/press-sheet-v2.jpg" alt="" />
      <p className="if-crop-line">A grid is a plan, not a decoration.</p>
    </div>
  );
}

function NightCrop() {
  return (
    <div className="if-crop-scene if-crop-nacht">
      <div className="if-crop-nacht-grid" />
      <Lockup slug="night" />
      <p className="if-crop-numeral">Van 04</p>
      <p className="if-crop-kicker">Kennemerstraatweg · en route</p>
    </div>
  );
}

function EveningCrop() {
  return (
    <div className="if-crop-scene if-crop-avond">
      <img src="/interfaces/food/de-buren-v2.jpg" alt="" />
      <p className="if-crop-line">Roast chicken, tonight</p>
    </div>
  );
}

function RoomCrop() {
  return (
    <div className="if-crop-scene if-crop-kamer">
      <Lockup slug="room" />
      <p className="if-crop-kicker">Press</p>
      <p className="if-crop-line">
        Press run 14 is
        <br />
        on the sheet.
        <br />
        Fee is on page one.
      </p>
      <p className="if-crop-reply">
        Logged. Weeks 4–7.
        <br />
        I will keep the timeline
        <br />
        under the fee.
        <em>Sheet · agent</em>
      </p>
    </div>
  );
}

function GraphicsCrop() {
  return (
    <div className="if-crop-scene if-crop-graphics">
      {[
        "/interfaces/concepts/poster-blue-v1.jpg",
        "/interfaces/concepts/poster-grid-v1.jpg",
        "/interfaces/concepts/poster-orbit-v1.jpg",
      ].map((src) => <img key={src} src={src} alt="" />)}
    </div>
  );
}

function RenderCrop() {
  return (
    <div className="if-crop-scene if-crop-render">
      <img src="/interfaces/concepts/render-car-v1.jpg" alt="" />
      <span>Perspective · body_v18</span>
    </div>
  );
}

function DriveCrop() {
  return (
    <div className="if-crop-scene if-crop-drive">
      <span>Driving</span><b>84</b><em>km/h</em>
      <p>318 km · North Sea Radio</p>
    </div>
  );
}

function OrbitCrop() {
  return (
    <div className="if-crop-scene if-crop-orbit">
      <img src="/interfaces/concepts/europe-observation-v1.jpg" alt="" />
      <span>52.37° N · 4.90° E</span>
    </div>
  );
}

function FrontierCrop() {
  return (
    <div className="if-crop-scene if-crop-frontier">
      <span>Aster Labs</span>
      <b>Reasoning models<br />for work that<br />has to hold up.</b>
      <em>Aster 2 →</em>
    </div>
  );
}

function PlatformsCrop() {
  return (
    <div className="if-crop-scene if-crop-platforms">
      <div><span>9:41</span><b>Rotterdam</b><p>Intercity 1135<br />On time</p></div>
      <div><span>9:41</span><b>Rotterdam</b><p>Intercity 1135<br />On time</p></div>
    </div>
  );
}

const CROPS: Record<InterfaceSlug, () => ReactNode> = {
  line: LineCrop,
  press: PressCrop,
  wall: WallCrop,
  night: NightCrop,
  evening: EveningCrop,
  room: RoomCrop,
  graphics: GraphicsCrop,
  render: RenderCrop,
  drive: DriveCrop,
  orbit: OrbitCrop,
  frontier: FrontierCrop,
  platforms: PlatformsCrop,
};

export function InterfaceCrop({ slug }: { slug: InterfaceSlug }) {
  const Crop = CROPS[slug];
  return (
    <div {...sx("if-crop", interfaces.crop)} aria-hidden="true">
      <Crop />
    </div>
  );
}
