import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Caption: React.FC<{ text: string; at?: number }> = ({ text, at = 0 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 10, 9999], [0, 1, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [at, at + 10], [20, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", bottom: 60, left: 120, right: 120, textAlign: "center", opacity, transform: `translateY(${y}px)` }}>
      <div style={{ display: "inline-block", background: "rgba(0,0,0,0.55)", padding: "18px 28px", borderRadius: 16, fontSize: 34, lineHeight: 1.35, maxWidth: 1500 }}>
        {text}
      </div>
    </div>
  );
};

export const Title: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div style={{ position: "absolute", top: 50, left: 80, right: 80 }}>
    <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: 0.5 }}>{children}</div>
    {subtitle && <div style={{ fontSize: 28, color: "#a9c1ff", marginTop: 8 }}>{subtitle}</div>}
  </div>
);

export const Panel: React.FC<{ x: number; y: number; w: number; h: number; label?: string; children?: React.ReactNode; color?: string }> = ({ x, y, w, h, label, children, color = "#1b2747" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: color, border: "2px solid #3a4f86", borderRadius: 20, padding: 20, boxSizing: "border-box" }}>
    {label && <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, color: "#dfe9ff" }}>{label}</div>}
    {children}
  </div>
);

export const FadeIn: React.FC<{ at?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at = 0, children, style }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s = interpolate(frame, [at, at + 15], [0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ ...style, opacity, transform: `scale(${s})` }}>{children}</div>;
};
