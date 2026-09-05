import { ImageResponse } from "next/og";

export const alt = "Vlak — A minimal design system for product exploration.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpenGraphImage() {
  const columns = Array.from({ length: 11 }, (_, index) => (index + 1) * 100);
  const rows = [210, 420];

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#faf8f2",
        color: "#1a1a1a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {columns.map((left) => <div key={left} style={{ position: "absolute", left, top: 0, width: 1, height: 630, background: "#d9d6cf" }} />)}
      {rows.map((top) => <div key={top} style={{ position: "absolute", left: 0, top, width: 1200, height: 1, background: "#d9d6cf" }} />)}

      <div style={{ position: "absolute", left: 40, top: 36, display: "flex", alignItems: "center" }}>
        <svg width="46" height="46" viewBox="0 0 822 822" fill="#1a1a1a" aria-hidden="true">
          <g transform="translate(0 822) scale(1 -1)">
            <path d="m411.128.67 128.714 128.713L334.5 334.726 129.158 540.068.405 411.315 411.128.669Z" />
            <path d="M539.429 128.97 411.09.63 282.751 128.97v564.691l128.661 127.928 128.017-127.928V128.97Z" />
            <path d="m500.812 347.858 128.752-128.752 192.21 192.209-128.752 128.753-96.105-96.105-96.105-96.105Z" />
          </g>
        </svg>
      </div>

      <div style={{ position: "absolute", left: 40, bottom: 34, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 106, fontWeight: 580, letterSpacing: "-0.065em", lineHeight: 0.86 }}>Vlak</span>
        <span style={{ marginTop: 26, fontSize: 20, color: "#55524d" }}>vlak.dev</span>
      </div>

      <div style={{ position: "absolute", left: 720, right: 44, bottom: 42, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 46, fontWeight: 580, letterSpacing: "-0.055em", lineHeight: 1.03 }}>
          A minimal design system for product exploration.
        </span>
        <span style={{ marginTop: 28, fontSize: 18, color: "#55524d" }}>React · CSS · tokens · interfaces</span>
      </div>

      <div style={{ position: "absolute", left: 600, top: 0, width: 100, height: 210, background: "#1d34bd" }} />
      <div style={{ position: "absolute", left: 600, top: 210, width: 100, height: 210, background: "#1a1a1a" }} />
      <div style={{ position: "absolute", left: 800, top: 0, width: 1, height: 420, background: "#1d34bd" }} />
      <div style={{ position: "absolute", left: 600, top: 210, width: 300, height: 1, background: "#1d34bd" }} />
    </div>,
    size,
  );
}
