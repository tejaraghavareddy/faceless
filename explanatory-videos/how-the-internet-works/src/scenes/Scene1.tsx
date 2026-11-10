import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, FadeIn, Title } from "../components/Layout";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(frame, [120, 300], [1, 1.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const typed = "www.example.com".slice(0, Math.max(0, Math.floor(interpolate(frame, [20, 90], [0, 15], { extrapolateRight: "clamp" }))));
  const showEnter = frame > 110;
  const pulse = spring({ fps, frame: frame - 120, config: { damping: 12 } });
  const lines = frame > 200;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(#f7fbff,#eaf2ff)", color: "#14213d" }}>
      <Title subtitle="Scene 01 · The Big Question">How the Internet Works</Title>
      <FadeIn at={5}>
        <div style={{ position: "absolute", left: 460, top: 220, width: 1000, height: 560, borderRadius: 24, background: "#dfe7f5", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", transform: `scale(${zoom})`, transformOrigin: "center 40%" }}>
          <div style={{ margin: 30, height: 500, borderRadius: 16, background: "#fff", border: "2px solid #c8d4ea", position: "relative", overflow: "hidden" }}>
            <div style={{ height: 64, background: "#f1f5fb", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ff6b6b" }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ffd166" }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#06d6a0" }} />
              <div style={{ flex: 1, marginLeft: 20, height: 36, borderRadius: 18, background: "#fff", border: "1px solid #cfd9ea", display: "flex", alignItems: "center", padding: "0 16px", fontSize: 22, color: "#334" }}>
                {typed}{frame % 30 < 15 && frame < 110 ? "|" : ""}
              </div>
            </div>
            <div style={{ padding: 40, fontSize: 28, color: "#6b7280" }}>Press Enter to navigate… {showEnter ? "↵" : ""}</div>
            {lines && (
              <svg style={{ position: "absolute", inset: 0 }}>
                {[0,1,2,3,4].map(i => (
                  <line key={i} x1={470} y1={220} x2={200 + i*140} y2={420} stroke="#4f8cff" strokeWidth={4} opacity={Math.min(1, pulse)} />
                ))}
                {[0,1,2,3,4].map(i => <circle key={i} cx={200 + i*140} cy={420} r={10} fill="#4f8cff" opacity={Math.min(1, pulse)} />)}
              </svg>
            )}
          </div>
        </div>
      </FadeIn>
      {frame < 350 && <Caption text="Every day we use the internet — but what actually happens when you press Enter?" />}
      {frame >= 350 && <Caption text="How does data travel thousands of kilometres and appear on your screen in seconds?" />}
    </AbsoluteFill>
  );
};
