import { ImageResponse } from "next/og";

export const alt = "Dhruvik Automation: AI automation for leads, enquiries and operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0d11",
          color: "#e8ebf0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#98a2b3" }}>
          <div style={{ width: 18, height: 18, borderRadius: 18, background: "#56d4e4" }} />
          Dhruvik Automation
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Build smarter business systems with AI automation.
          </div>
          <div style={{ fontSize: 30, color: "#98a2b3" }}>
            Ritik Choudhary, AI Automation Developer. n8n, WhatsApp AI agents, lead automation.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
