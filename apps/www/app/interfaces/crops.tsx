import type { ReactNode } from "react";
import { type InterfaceSlug, interfaceBySlug } from "./catalog";
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
        Two sentences,
        <br />
        same claim.
      </p>
      <div className="if-crop-dock">
        <span>The next line</span>
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
      <img src="/interfaces/threads/press-sheet.jpg" alt="" />
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
      <img src="/interfaces/food/de-buren.jpg" alt="" />
      <p className="if-crop-line">Roast chicken, tonight</p>
    </div>
  );
}

function RoomCrop() {
  return (
    <div className="if-crop-scene if-crop-kamer">
      <Lockup slug="room" />
      <p className="if-crop-kicker">Press</p>
      <p className="if-crop-line">Press run 14 is on the sheet. Fee is on page one.</p>
      <p className="if-crop-reply">
        Logged. Weeks 4–7. I will keep the timeline under the fee.
        <em>Sheet · agent</em>
      </p>
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
};

export function InterfaceCrop({ slug }: { slug: InterfaceSlug }) {
  const Crop = CROPS[slug];
  return (
    <div className="if-crop" aria-hidden="true">
      <Crop />
    </div>
  );
}
