import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, ease, FONT, mix, Tone } from "../design";
import { Icon, IconName } from "../icons";

export type Principle = {
  key: "C" | "I" | "A";
  name: string;
  color: string;
  icon: IconName;
  question: string;
};

export const PRINCIPLES: Principle[] = [
  { key: "C", name: "Confidentiality", color: C.blue, icon: "lock", question: "Who can access it?" },
  { key: "I", name: "Integrity", color: C.integ, icon: "shieldCheck", question: "Is it accurate?" },
  { key: "A", name: "Availability", color: C.avail, icon: "activity", question: "Is it there when needed?" },
];

const darken = (p: Principle) => (p.key === "C" ? C.confDark : p.key === "I" ? C.integDark : C.availDark);

/* ------------------------------------------------------------------ */
/* Three structural pillars supporting a beam                          */
/* ------------------------------------------------------------------ */

export const Pillars: React.FC<{
  at: number[];
  dim?: number | null;
  tone?: Tone;
  x?: number;
  y?: number;
  width?: number;
  beamLabel?: string;
}> = ({ at, dim = null, tone = "dark", x = 300, y = 470, width = 1320, beamLabel = "INFORMATION SECURITY" }) => {
  const frame = useCurrentFrame();
  const t = mix(tone);
  const gap = width / 3;
  const pillarW = 190;
  const maxH = 240;

  const beamTilt = dim === null ? 0 : dim === 1 ? -2.2 : 1.8;
  const beamDrop = dim === null ? 0 : 16;

  return (
    <div style={{ position: "absolute", left: x, top: y, width, height: 470 }}>
      {/* beam */}
      <div
        style={{
          position: "absolute",
          left: -20,
          top: 60 + beamDrop,
          width: width + 40,
          transform: `rotate(${beamTilt}deg)`,
          transformOrigin: "50% 100%",
          opacity: interpolate(frame, [at[0] + 6, at[0] + 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            height: 74,
            borderRadius: 10,
            background: tone === "dark" ? "linear-gradient(180deg,#20465F,#14324A)" : "linear-gradient(180deg,#FFFFFF,#EDF2F6)",
            border: `1px solid ${tone === "dark" ? "rgba(126,178,224,0.34)" : C.lineStrong}`,
            boxShadow: "0 24px 50px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <Icon name="shieldCheck" size={26} color={C.blueSoft} />
          <span style={{ fontFamily: FONT.display, fontSize: 25, fontWeight: 600, letterSpacing: 3.4, color: tone === "dark" ? C.navyText : C.ink }}>
            {beamLabel}
          </span>
        </div>
      </div>

      {PRINCIPLES.map((p, i) => {
        const pAt = at[i] ?? 0;
        const grow = interpolate(frame, [pAt, pAt + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        const lift = interpolate(frame, [pAt, pAt + 30], [22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        const op = interpolate(frame, [pAt, pAt + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const isDim = dim === i;
        const col = tone === "dark" ? darken(p) : p.color;
        const h = maxH * grow * (isDim ? 0.9 : 1);
        const cx = gap * i + gap / 2;
        return (
          <div key={p.key} style={{ position: "absolute", left: cx - pillarW / 2, top: 134, width: pillarW, height: 340, opacity: op }}>
            {/* shaft */}
            <div
              style={{
                position: "absolute",
                bottom: 84,
                left: "50%",
                transform: `translateX(-50%) translateY(${lift}px)`,
                width: pillarW,
                height: h,
                borderRadius: "8px 8px 4px 4px",
                background:
                  tone === "dark"
                    ? `linear-gradient(100deg, ${col}22, ${col}0D 42%, rgba(11,32,48,0.9) 100%)`
                    : `linear-gradient(100deg, ${col}12, #FFFFFF 60%)`,
                border: `1px solid ${col}${isDim ? "2A" : "55"}`,
                boxShadow: isDim ? "none" : `inset 0 1px 0 ${col}33`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                overflow: "hidden",
                paddingTop: 6,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  background: tone === "dark" ? "rgba(9,28,43,0.55)" : "#FFFFFF",
                  border: `1.5px solid ${col}${isDim ? "44" : "88"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: grow,
                }}
              >
                <Icon name={p.icon} size={23} color={col} />
              </div>
              <div style={{ fontFamily: FONT.display, fontSize: 74, fontWeight: 700, lineHeight: 1, color: col, opacity: 0.92 }}>{p.key}</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: 2.6, color: tone === "dark" ? C.navySoft : C.inkMute }}>PRINCIPLE</div>
              {[0.62, 0.48, 0.72, 0.4].map((w, k) => (
                <div key={k} style={{ width: pillarW * w, height: 2, background: `${col}30`, borderRadius: 2 }} />
              ))}
            </div>

            {/* base */}
            <div
              style={{
                position: "absolute",
                bottom: 78,
                left: "50%",
                transform: "translateX(-50%)",
                width: pillarW + 34,
                height: 12,
                borderRadius: 3,
                background: tone === "dark" ? "linear-gradient(#2B5570,#173A52)" : "linear-gradient(#E5EBF0,#CBD5DE)",
                border: `1px solid ${col}30`,
                opacity: grow,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: -20,
                width: pillarW + 40,
                textAlign: "center",
                opacity: grow,
              }}
            >
              <div style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, letterSpacing: 0.4, color: tone === "dark" ? C.navyText : C.ink }}>{p.name}</div>
              <div style={{ fontSize: 16, color: tone === "dark" ? C.navySoft : C.inkSoft, marginTop: 5 }}>{p.question}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Triangular relationship diagram                                     */
/* ------------------------------------------------------------------ */

export const TriadRing: React.FC<{
  x: number;
  y: number;
  radius?: number;
  tone?: Tone;
  active?: (number | null)[];
  centerLabel?: string;
  centerSub?: string;
  showQuestions?: boolean;
  pulse?: number;
}> = ({ x, y, radius = 250, tone = "dark", active = [1, 1, 1], centerLabel = "DIGITAL TRUST", centerSub = "CIA TRIAD", showQuestions = true, pulse = 0 }) => {
  const t = mix(tone);
  const angles = [-90, 30, 150];
  const pts = angles.map((a) => ({ x: x + Math.cos((a * Math.PI) / 180) * radius, y: y + Math.sin((a * Math.PI) / 180) * radius }));

  return (
    <>
      <svg style={{ position: "absolute", inset: 0, overflow: "visible" }} width={1920} height={1080}>
        {[0, 1, 2].map((i) => {
          const a = pts[i];
          const b = pts[(i + 1) % 3];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={active[i] === 0 ? "rgba(126,178,224,0.18)" : "rgba(126,178,224,0.42)"}
              strokeWidth={1.4}
              strokeDasharray="5 7"
            />
          );
        })}
        {[0, 1, 2].map((i) => (
          <g key={`dot${i}`}>
            <circle cx={pts[i].x} cy={pts[i].y} r={18 + ((pulse + i * 12) % 46)} fill="none" stroke={i === 0 ? C.confDark : i === 1 ? C.integDark : C.availDark} strokeWidth={1} opacity={0.18} />
          </g>
        ))}
      </svg>

      <div style={{ position: "absolute", left: x - 130, top: y - 86, width: 260, height: 172, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 31,
            background: "linear-gradient(160deg,#1D4562,#102B41)",
            border: "1px solid rgba(126,178,224,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(47,111,235,0.25)",
          }}
        >
          <Icon name="shieldCheck" size={30} color={C.blueSoft} />
        </div>
        <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, letterSpacing: 3, color: tone === "dark" ? C.navyText : C.ink, textAlign: "center" }}>{centerLabel}</div>
        <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: 2.4, color: t.soft }}>{centerSub}</div>
      </div>

      {PRINCIPLES.map((p, i) => {
        const a = angles[i];
        const left = pts[i].x;
        const top = pts[i].y;
        const col = tone === "dark" ? darken(p) : p.color;
        const dim = active[i] === 0;
        return (
          <div
            key={p.key}
            style={{
              position: "absolute",
              left: left - 150,
              top: top - 56,
              width: 300,
              padding: "18px 22px",
              borderRadius: 14,
              background: tone === "dark" ? "linear-gradient(160deg,rgba(25,58,84,0.95),rgba(12,34,50,0.98))" : "#FFFFFF",
              border: `1px solid ${col}${dim ? "33" : "88"}`,
              boxShadow: dim ? "none" : `0 20px 44px rgba(0,0,0,0.3), 0 0 0 1px ${col}18`,
              opacity: dim ? 0.4 : 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name={p.icon} size={20} color={col} />
              <span style={{ fontFamily: FONT.display, fontSize: 21, fontWeight: 600, color: tone === "dark" ? C.navyText : C.ink }}>{p.name}</span>
            </div>
            {showQuestions && <div style={{ fontSize: 15, color: t.soft, lineHeight: 1.35 }}>{p.question}</div>}
          </div>
        );
      })}
    </>
  );
};
