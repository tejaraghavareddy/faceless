import React from "react";
import { interpolate } from "remotion";
import { C, FONT, mix, Tone, ease } from "../design";
import { Icon, IconName } from "../icons";

/* ------------------------------------------------------------------ */
/* Connection flow: cubic bezier with precise packet positions          */
/* ------------------------------------------------------------------ */

export type Pt = { x: number; y: number };

const bez = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
};

export const Flow: React.FC<{
  from: Pt;
  to: Pt;
  color?: string;
  width?: number;
  draw?: number;
  opacity?: number;
  packets?: number;
  packetAt?: number;
  packetSpeed?: number;
  packetSize?: number;
  arrow?: boolean;
  dashed?: boolean;
  axis?: "h" | "v";
  bend?: number;
}> = ({
  from,
  to,
  color = C.blue,
  width = 2,
  draw = 1,
  opacity = 0.9,
  packets = 0,
  packetAt = 0,
  packetSpeed = 46,
  packetSize = 7,
  arrow = true,
  dashed = false,
  axis = "h",
  bend = 0,
}) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const c1: Pt = axis === "h" ? { x: from.x + dx * 0.5, y: from.y + bend } : { x: from.x + bend, y: from.y + dy * 0.5 };
  const c2: Pt = axis === "h" ? { x: to.x - dx * 0.5, y: to.y - bend } : { x: to.x - bend, y: to.y - dy * 0.5 };
  const d = `M ${from.x} ${from.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`;
  const paths = [];
  for (let i = 0; i < packets; i++) {
    const t = ((packetAt / packetSpeed + i / Math.max(1, packets)) % 1 + 1) % 1;
    const p = bez(from, c1, c2, to, t);
    paths.push(
      <g key={i} opacity={interpolate(t, [0, 0.08, 0.9, 1], [0, 1, 1, 0])}>
        <circle cx={p.x} cy={p.y} r={packetSize * 2.1} fill={color} opacity={0.13} />
        <circle cx={p.x} cy={p.y} r={packetSize} fill={color} />
      </g>,
    );
  }
  return (
    <g opacity={opacity}>
      <path d={d} fill="none" stroke={color} strokeWidth={width} opacity={0.22} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={dashed ? "0.012 0.014" : 1}
        strokeDashoffset={dashed ? 0 : 1 - draw}
        opacity={draw <= 0 ? 0 : 1}
      />
      {arrow && draw > 0.94 && (
        <g transform={`translate(${to.x},${to.y}) rotate(${(Math.atan2(to.y - c2.y, to.x - c2.x) * 180) / Math.PI})`} opacity={(draw - 0.94) / 0.06}>
          <path d="M 2 0 L -8 -5 L -8 5 Z" fill={color} />
        </g>
      )}
      {paths}
    </g>
  );
};

/** Absolutely positioned svg canvas for flows inside a panel/div. */
export const Canvas: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <svg style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none", ...style }}>{children}</svg>
);

/* ------------------------------------------------------------------ */
/* Generic node                                                         */
/* ------------------------------------------------------------------ */

export const NodeBox: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  icon?: IconName;
  title: string;
  sub?: string;
  tone?: Tone;
  color?: string;
  active?: number;
  selected?: boolean;
  compact?: boolean;
  style?: React.CSSProperties;
}> = ({ x, y, w, h, icon, title, sub, tone = "dark", color = C.blue, active = 1, selected = false, compact, style }) => {
  const t = mix(tone);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 14,
        background: tone === "dark" ? "linear-gradient(165deg, rgba(29,63,90,0.95), rgba(13,35,52,0.98))" : "#FFFFFF",
        border: `1px solid ${selected ? color : t.border}`,
        boxShadow: selected ? `0 0 0 3px ${color}22, 0 16px 34px rgba(0,0,0,0.28)` : "0 10px 24px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: compact ? 4 : 7,
        opacity: 0.45 + active * 0.55,
        transform: `scale(${0.97 + active * 0.03})`,
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            width: compact ? 34 : 44,
            height: compact ? 34 : 44,
            borderRadius: 10,
            background: `${color}1F`,
            border: `1px solid ${color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={icon} size={compact ? 19 : 24} color={color} />
        </div>
      )}
      <div style={{ fontSize: compact ? 15 : 18, fontWeight: 600, color: tone === "dark" ? C.navyText : C.ink, letterSpacing: 0.2, textAlign: "center", lineHeight: 1.2 }}>
        {title}
      </div>
      {sub && (
        <div style={{ fontFamily: FONT.mono, fontSize: compact ? 11 : 12.5, color: tone === "dark" ? C.navySoft : C.inkMute, letterSpacing: 0.4, textAlign: "center" }}>
          {sub}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Realistic-ish devices                                                */
/* ------------------------------------------------------------------ */

export const Browser: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  url?: string;
  tone?: Tone;
  children?: React.ReactNode;
  dark?: boolean;
  radius?: number;
  style?: React.CSSProperties;
}> = ({ x, y, w, h, url = "bank.example.com", children, radius = 14, style }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: radius,
      background: "#FFFFFF",
      border: `1px solid ${C.line}`,
      boxShadow: "0 26px 60px rgba(16,36,54,0.16), 0 2px 4px rgba(16,36,54,0.05)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div style={{ height: 42, background: "#F1F4F7", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, flexShrink: 0 }}>
      <div style={{ display: "flex", gap: 5 }}>
        {["#E3E8ED", "#E3E8ED", "#E3E8ED"].map((c, i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: 5, background: c }} />
        ))}
      </div>
      <div style={{ flex: 1, height: 24, borderRadius: 6, background: "#FFFFFF", border: `1px solid #E4E9EE`, display: "flex", alignItems: "center", padding: "0 10px", gap: 7, marginLeft: 8 }}>
        <Icon name="lock" size={11} color={C.ok} strokeWidth={2} />
        <span style={{ fontFamily: FONT.mono, fontSize: 11.5, color: C.inkMute, letterSpacing: 0.2 }}>{url}</span>
      </div>
    </div>
    <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#FFFFFF" }}>{children}</div>
  </div>
);

export const Laptop: React.FC<{
  x: number;
  y: number;
  w: number;
  url?: string;
  children?: React.ReactNode;
  glow?: boolean;
}> = ({ x, y, w, url, children, glow }) => {
  const h = w * 0.6;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h + 24 }}>
      <div
        style={{
          width: w,
          height: h,
          borderRadius: 14,
          background: "#101A24",
          padding: 11,
          boxSizing: "border-box",
          boxShadow: glow ? "0 40px 90px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)" : "0 30px 70px rgba(0,0,0,0.3)",
        }}
      >
        <Browser x={0} y={0} w={w - 22} h={h - 22} url={url} radius={6} style={{ position: "relative", boxShadow: "none", border: "none" }}>
          {children}
        </Browser>
      </div>
      <div
        style={{
          width: w * 1.14,
          height: 12,
          marginLeft: -w * 0.07,
          background: "linear-gradient(#DCE3EA, #B9C4CF)",
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 10px 22px rgba(0,0,0,0.22)",
        }}
      />
      <div style={{ width: w * 0.22, height: 4, marginLeft: w * 0.39, background: "#9AA8B5", borderRadius: "0 0 4px 4px", opacity: 0.6 }} />
    </div>
  );
};

export const Phone: React.FC<{ x: number; y: number; w: number; children?: React.ReactNode; glow?: boolean }> = ({ x, y, w, children, glow }) => {
  const h = w * 2.03;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: w * 0.14,
        background: "#12202C",
        padding: 7,
        boxSizing: "border-box",
        boxShadow: glow ? "0 30px 70px rgba(0,0,0,0.4)" : "0 18px 40px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: w * 0.1, background: "#fff", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: w * 0.34, height: 5, borderRadius: 4, background: "#1B2A36", zIndex: 5 }} />
        {children}
      </div>
    </div>
  );
};

export const ServerRack: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  color?: string;
  load?: number;
  tone?: Tone;
  units?: number;
}> = ({ x, y, w, h, label, color = C.integDark, load = 0.3, tone = "dark", units = 5 }) => {
  const t = mix(tone);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 10,
        background: tone === "dark" ? "linear-gradient(150deg,#1A3346,#0D2436)" : "linear-gradient(150deg,#E9EEF3,#D3DBE3)",
        border: `1px solid ${tone === "dark" ? "rgba(126,178,224,0.3)" : C.lineStrong}`,
        padding: 9,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
      }}
    >
      {Array.from({ length: units }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderRadius: 4,
            background: tone === "dark" ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.8)",
            border: `1px solid ${tone === "dark" ? "rgba(255,255,255,0.07)" : "rgba(10,27,41,0.06)"}`,
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "0 6px",
          }}
        >
          <div style={{ width: 4, height: 4, borderRadius: 2, background: i / units < load ? color : "rgba(140,160,175,0.35)" }} />
          <div style={{ width: 4, height: 4, borderRadius: 2, background: "rgba(140,160,175,0.3)" }} />
          <div style={{ flex: 1, height: 2, borderRadius: 1, background: "rgba(140,160,175,0.22)" }} />
        </div>
      ))}
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -24, textAlign: "center", fontFamily: FONT.mono, fontSize: 13, letterSpacing: 1.2, color: tone === "dark" ? C.navySoft : C.inkMute }}>
          {label}
        </div>
      )}
    </div>
  );
};

export const Database: React.FC<{ x: number; y: number; w: number; label?: string; color?: string; tone?: Tone; rows?: number }> = ({
  x,
  y,
  w,
  label,
  color = C.blue,
  tone = "dark",
  rows = 3,
}) => {
  const h = w * 0.82;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            style={{
              width: w * 0.62,
              height: 8,
              borderRadius: 4,
              background: i === 0 ? color : tone === "dark" ? "rgba(126,178,224,0.35)" : C.lineStrong,
              opacity: 1 - i * 0.18,
              marginTop: 5,
            }}
          />
        ))}
      </div>
      <svg viewBox="0 0 100 82" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <ellipse cx="50" cy="16" rx="42" ry="13" fill={tone === "dark" ? "#16374F" : "#E8EEF3"} stroke={color} strokeWidth="1.6" />
        <path d="M8 16v50c0 7.2 18.8 13 42 13s42-5.8 42-13V16" fill={tone === "dark" ? "rgba(22,55,79,0.75)" : "rgba(240,244,247,0.9)"} stroke={color} strokeWidth="1.6" />
        <path d="M8 41c0 7.2 18.8 13 42 13s42-5.8 42-13" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      </svg>
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -25, textAlign: "center", fontFamily: FONT.mono, fontSize: 13, color: tone === "dark" ? C.navySoft : C.inkMute, letterSpacing: 1 }}>
          {label}
        </div>
      )}
    </div>
  );
};

export const CloudNode: React.FC<{ x: number; y: number; w: number; label?: string; color?: string; tone?: Tone }> = ({
  x,
  y,
  w,
  label = "CLOUD",
  color = C.blue,
  tone = "dark",
}) => {
  const h = w * 0.62;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      <svg viewBox="0 0 120 74" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="cloudg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tone === "dark" ? "#1E4462" : "#FFFFFF"} />
            <stop offset="1" stopColor={tone === "dark" ? "#12314A" : "#EDF2F6"} />
          </linearGradient>
        </defs>
        <path
          d="M30 66a18 18 0 0 1-2-35.9A26 26 0 0 1 78 24a19 19 0 0 1 12 42H30Z"
          fill="url(#cloudg)"
          stroke={color}
          strokeWidth="1.6"
        />
        <g stroke={color} strokeWidth="1.4" opacity="0.6">
          <path d="M45 44h30M45 52h20" />
        </g>
        <circle cx="84" cy="38" r="3" fill={color} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: -22, textAlign: "center", fontFamily: FONT.mono, fontSize: 12.5, letterSpacing: 1.6, color: tone === "dark" ? C.navySoft : C.inkMute }}>
        {label}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                      */
/* ------------------------------------------------------------------ */

export const Tag: React.FC<{
  children: React.ReactNode;
  color?: string;
  tone?: Tone;
  x?: number;
  y?: number;
  size?: number;
  solid?: boolean;
  style?: React.CSSProperties;
}> = ({ children, color = C.blue, tone = "dark", x, y, size = 14, solid, style }) => (
  <div
    style={{
      position: x !== undefined ? "absolute" : "relative",
      left: x,
      top: y,
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: solid ? "6px 12px" : "5px 10px",
      borderRadius: 6,
      background: solid ? color : `${color}1C`,
      border: `1px solid ${color}55`,
      fontFamily: FONT.mono,
      fontSize: size,
      letterSpacing: 0.8,
      color: solid ? "#FFFFFF" : tone === "dark" ? color : color,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

export const StatusPill: React.FC<{ x: number; y: number; ok: boolean; label: string; tone?: Tone }> = ({ x, y, ok, label, tone = "light" }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 12px",
      borderRadius: 999,
      background: ok ? "rgba(12,143,99,0.10)" : "rgba(200,69,59,0.10)",
      border: `1px solid ${ok ? "rgba(12,143,99,0.35)" : "rgba(200,69,59,0.35)"}`,
      fontSize: 14,
      fontWeight: 500,
      color: ok ? (tone === "dark" ? C.okDark : C.ok) : tone === "dark" ? C.dangerDark : C.danger,
      letterSpacing: 0.3,
    }}
  >
    <div style={{ width: 7, height: 7, borderRadius: 4, background: ok ? C.ok : C.danger, boxShadow: `0 0 8px ${ok ? C.ok : C.danger}` }} />
    {label}
  </div>
);

export const MonoRow: React.FC<{
  label: string;
  value: string;
  color?: string;
  tone?: Tone;
  strike?: boolean;
  size?: number;
  gap?: number;
}> = ({ label, value, color, tone = "dark", strike, size = 16, gap = 10 }) => {
  const t = mix(tone);
  return (
    <div style={{ display: "flex", alignItems: "center", gap, fontSize: size, fontFamily: FONT.mono, color: t.soft }}>
      <span style={{ letterSpacing: 0.6, opacity: 0.75 }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: t.border, minWidth: 10 }} />
      <span style={{ color: color ?? t.text, textDecoration: strike ? "line-through" : "none", letterSpacing: 0.4 }}>{value}</span>
    </div>
  );
};

export const Avatar: React.FC<{ x: number; y: number; name: string; role?: string; color?: string; icon?: IconName; tone?: Tone }> = ({
  x,
  y,
  name,
  role,
  color = C.blue,
  icon = "user",
  tone = "dark",
}) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", alignItems: "center", gap: 12 }}>
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        background: `${color}22`,
        border: `1.5px solid ${color}66`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon name={icon} size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: 16, fontWeight: 600, color: tone === "dark" ? C.navyText : C.ink, lineHeight: 1.2 }}>{name}</div>
      {role && <div style={{ fontFamily: FONT.mono, fontSize: 11.5, color: tone === "dark" ? C.navySoft : C.inkMute, marginTop: 3, letterSpacing: 0.4 }}>{role}</div>}
    </div>
  </div>
);

export const Bar: React.FC<{ x: number; y: number; w: number; h: number; p: number; color: string; tone?: Tone; delay?: number }> = ({
  x,
  y,
  w,
  h,
  p,
  color,
  tone = "dark",
  delay = 0,
}) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 2, background: tone === "dark" ? "rgba(126,178,224,0.12)" : "rgba(10,27,41,0.08)" }}>
    <div style={{ width: `${Math.max(0, Math.min(1, p)) * 100}%`, height: "100%", borderRadius: 2, background: color, opacity: 1 - delay * 0.1 }} />
  </div>
);

export const CheckLine: React.FC<{ x: number; y: number; text: string; color?: string; tone?: Tone; at?: number; frame: number; strike?: boolean }> = ({
  x,
  y,
  text,
  color = C.ok,
  tone = "light",
  at = 0,
  frame,
  strike,
}) => {
  const p = interpolate(frame, [at, at + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", alignItems: "center", gap: 10, opacity: p, transform: `translateX(${(1 - p) * -10}px)` }}>
      <div style={{ width: 20, height: 20, borderRadius: 10, background: `${color}22`, border: `1px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={strike ? "x" : "check"} size={12} color={color} strokeWidth={2.4} />
      </div>
      <span style={{ fontSize: 17.5, color: tone === "dark" ? C.navyText : C.inkSoft, textDecoration: strike ? "line-through" : "none" }}>{text}</span>
    </div>
  );
};
