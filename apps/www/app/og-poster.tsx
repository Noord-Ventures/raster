import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type Motif = "components" | "interfaces" | "docs" | "about";

const columns = Array.from({ length: 11 }, (_, index) => (index + 1) * 100);

function Mark() {
  return (
    <svg width="42" height="42" viewBox="0 0 822 822" fill="currentColor" aria-hidden="true">
      <g transform="translate(0 822) scale(1 -1)">
        <path d="m411.128.67 128.714 128.713L334.5 334.726 129.158 540.068.405 411.315 411.128.669Z" />
        <path d="M539.429 128.97 411.09.63 282.751 128.97v564.691l128.661 127.928 128.017-127.928V128.97Z" />
        <path d="m500.812 347.858 128.752-128.752 192.21 192.209-128.752 128.753-96.105-96.105-96.105-96.105Z" />
      </g>
    </svg>
  );
}

function ComponentsMotif({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", left: 700, top: 92, width: 400, height: 238, display: "flex", flexWrap: "wrap", gap: 16, padding: 28, border: "1px solid #d8d5ce" }}>
      <div style={{ display: "flex", width: 152, height: 54, borderRadius: 5, background: "#191919", color: "#faf8f2", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 580 }}>Button</div>
      <div style={{ display: "flex", width: 166, height: 54, borderRadius: 5, border: "1px solid #aaa69e", alignItems: "center", paddingLeft: 18, fontSize: 18, color: "#55524d" }}>Input</div>
      <div style={{ display: "flex", width: 74, height: 42, borderRadius: 21, background: accent, padding: 5, justifyContent: "flex-end" }}><div style={{ width: 32, height: 32, borderRadius: 16, background: "#faf8f2" }} /></div>
      <div style={{ display: "flex", width: 240, height: 42, gap: 8, alignItems: "center" }}>
        {[0, 1, 2, 3].map((item) => <div key={item} style={{ width: 42, height: 42, borderRadius: 5, border: `1px solid ${item === 1 ? accent : "#aaa69e"}`, background: item === 1 ? accent : "transparent" }} />)}
      </div>
    </div>
  );
}

function InterfacesMotif({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", left: 700, top: 76, width: 400, height: 270, display: "flex", border: "1px solid #d8d5ce", background: "#f3f1eb" }}>
      <div style={{ display: "flex", width: 92, borderRight: "1px solid #d8d5ce", flexDirection: "column", padding: "22px 14px", gap: 13 }}>
        {[0, 1, 2, 3].map((item) => <div key={item} style={{ width: item === 0 ? 58 : 48, height: 7, borderRadius: 4, background: item === 0 ? accent : "#bbb7af" }} />)}
      </div>
      <div style={{ position: "relative", display: "flex", flex: 1, overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", width: 230, height: 230, border: `1px solid ${accent}`, borderRadius: 115, opacity: 0.55 }} />
        <div style={{ position: "absolute", width: 154, height: 154, border: `1px solid ${accent}`, transform: "rotate(45deg)", opacity: 0.8 }} />
        <div style={{ width: 24, height: 24, borderRadius: 12, background: accent, boxShadow: `0 0 38px ${accent}` }} />
      </div>
    </div>
  );
}

function DocsMotif({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", left: 700, top: 84, width: 400, display: "flex", flexDirection: "column", border: "1px solid #d8d5ce", background: "#202020", color: "#f4f1e9" }}>
      <div style={{ display: "flex", height: 42, borderBottom: "1px solid #444", alignItems: "center", padding: "0 18px", gap: 7 }}>
        {[0, 1, 2].map((item) => <div key={item} style={{ width: 7, height: 7, borderRadius: 4, background: item === 0 ? accent : "#777" }} />)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: "22px 24px 26px", gap: 13, fontFamily: "monospace", fontSize: 16 }}>
        <span style={{ color: "#9c9890" }}>npm install</span>
        <span><b style={{ color: accent }}>import</b> {"{ Button }"} from <b style={{ color: "#d6d2c9" }}>&quot;@noorddev/vlak-react&quot;</b></span>
        <span style={{ color: "#d6d2c9" }}>&lt;Button&gt;Build&lt;/Button&gt;</span>
      </div>
    </div>
  );
}

function AboutMotif({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", left: 700, top: 70, width: 400, height: 280, display: "flex", alignItems: "center" }}>
      <div style={{ position: "absolute", left: 40, width: 1, height: 230, background: "#bdb9b1" }} />
      {[{ top: 38, label: "1991" }, { top: 112, label: "2011" }, { top: 186, label: "NOW" }].map((item, index) => (
        <div key={item.label} style={{ position: "absolute", left: 34, top: item.top, display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 13, height: 13, borderRadius: 7, background: index === 2 ? accent : "#faf8f2", border: `2px solid ${index === 2 ? accent : "#8c8881"}` }} />
          <span style={{ fontSize: 17, color: index === 2 ? "#191919" : "#77736c", fontWeight: index === 2 ? 580 : 400 }}>{item.label}</span>
          <div style={{ width: index === 0 ? 126 : index === 1 ? 192 : 244, height: 1, background: index === 2 ? accent : "#d8d5ce" }} />
        </div>
      ))}
    </div>
  );
}

export function createOgPoster({ section, headline, description, accent, motif }: { section: string; headline: string; description: string; accent: string; motif: Motif }) {
  return new ImageResponse(
    <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", overflow: "hidden", background: "#faf8f2", color: "#191919", fontFamily: "Arial, sans-serif" }}>
      {columns.map((left) => <div key={left} style={{ position: "absolute", left, top: 0, width: 1, height: 630, background: "#e0ddd6" }} />)}
      <div style={{ position: "absolute", left: 0, top: 420, width: 1200, height: 1, background: "#d8d5ce" }} />
      <div style={{ position: "absolute", left: 40, top: 36, display: "flex", color: "#191919" }}><Mark /></div>
      <div style={{ position: "absolute", left: 100, top: 51, display: "flex", fontSize: 17, color: "#77736c", letterSpacing: "-0.015em" }}>{section}</div>
      {motif === "components" && <ComponentsMotif accent={accent} />}
      {motif === "interfaces" && <InterfacesMotif accent={accent} />}
      {motif === "docs" && <DocsMotif accent={accent} />}
      {motif === "about" && <AboutMotif accent={accent} />}
      <div style={{ position: "absolute", left: 100, bottom: 124, width: 800, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 64, fontWeight: 580, letterSpacing: "-0.055em", lineHeight: 0.98 }}>{headline}</span>
      </div>
      <div style={{ position: "absolute", left: 100, bottom: 34, display: "flex", fontSize: 18, fontWeight: 580 }}>Vlak</div>
      <div style={{ position: "absolute", left: 400, right: 100, bottom: 34, display: "flex", justifyContent: "space-between", fontSize: 17, color: "#77736c" }}>
        <span>{description}</span><span>vlak.dev/{section.toLowerCase()}</span>
      </div>
      <div style={{ position: "absolute", left: 100, top: 419, width: 200, height: 3, background: accent }} />
    </div>,
    ogSize,
  );
}
