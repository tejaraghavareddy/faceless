import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caption, FadeIn, Panel, Title } from "../components/Layout";

const Node: React.FC<{ x: number; y: number; label: string; color?: string; at?: number }> = ({ x, y, label, color = "#4f8cff", at = 0 }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [at, at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", left: x, top: y, opacity: o, textAlign: "center" }}>
    <div style={{ width: 90, height: 90, borderRadius: 45, background: color, margin: "0 auto", boxShadow: `0 0 30px ${color}66` }} />
    <div style={{ marginTop: 8, fontSize: 22 }}>{label}</div>
  </div>;
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Title subtitle="Scene 02 · What is the Internet?">A Network of Networks</Title>
      <FadeIn at={10}><div style={{ position: "absolute", left: 120, top: 170, width: 760, height: 620, borderRadius: 24, background: "radial-gradient(circle at 50% 40%, #1e3a6d, #0b1020)", border: "1px solid #355" }}>
        <div style={{ position: "absolute", left: 330, top: 250, width: 120, height: 120, borderRadius: 60, background: "#2ec4b6", boxShadow: "0 0 40px #2ec4b688" }} />
        <div style={{ position: "absolute", left: 360, top: 290, fontSize: 20, fontWeight: 700 }}>Globe</div>
        {[[120,120,"Phone"],[560,140,"Laptop"],[140,420,"Router"],[520,440,"Server"],[330,80,"ISP"]].map((n,i)=> <Node key={i} x={n[0] as number} y={n[1] as number} label={n[2] as string} at={30+i*20} />)}
        <svg style={{ position: "absolute", inset: 0 }}>
          {[[165,165],[605,185],[185,465],[565,485],[375,125]].map((p,i)=> <line key={i} x1={390} y1={310} x2={p[0]} y2={p[1]} stroke="#6ea8fe" strokeWidth={3} opacity={interpolate(frame,[40+i*20,60+i*20],[0,0.8],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})} />)}
        </svg>
      </div></FadeIn>
      <Panel x={960} y={170} w={840} h={620} label="How you reach the world">
        <FadeIn at={80}><div style={{ fontSize: 28, lineHeight: 1.8 }}>
          <div>🏠 <b>Home network</b> (Wi-Fi / Ethernet)</div>
          <div style={{ marginLeft: 30, color: "#7dd3fc" }}>↓</div>
          <div>🌐 <b>Internet Service Provider (ISP)</b></div>
          <div style={{ marginLeft: 30, color: "#7dd3fc" }}>↓</div>
          <div>🕸️ <b>Other interconnected networks</b></div>
          <div style={{ marginLeft: 30, color: "#7dd3fc" }}>↓</div>
          <div>🖥️ <b>Remote web server</b></div>
        </div></FadeIn>
        <FadeIn at={350}><div style={{ marginTop: 30, padding: 16, background: "#24365f", borderRadius: 12, fontSize: 26 }}>
          Key idea: the internet works because independent networks follow <b>common protocols</b>.
        </div></FadeIn>
      </Panel>
      {frame < 500 && <Caption text="The internet is a global network of interconnected networks — not one giant computer." at={10} />}
      {frame >= 500 && <Caption text="Your device connects locally, through an ISP, to servers worldwide using common rules." at={500} />}
    </AbsoluteFill>
  );
};
