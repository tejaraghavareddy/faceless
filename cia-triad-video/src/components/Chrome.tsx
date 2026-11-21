import React, { createContext, useContext } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONT, mix, Tone, ease } from "../design";

export const TimelineContext = createContext({ frame: 0, total: 1 });
export const useGlobal = () => useContext(TimelineContext);

export const SceneFrame: React.FC<{
  tone?: Tone;
  section: string;
  index: number;
  accent?: string;
  children: React.ReactNode;
  grid?: boolean;
  vignette?: boolean;
  noChrome?: boolean;
}> = ({ tone = "light", section, index, accent = C.blue, children, grid = true, vignette = true, noChrome }) => {
  const t = mix(tone);
  const { frame, total } = useGlobal();
  const local = useCurrentFrame();
  const progress = Math.min(1, frame / total);
  const tc = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const seconds = frame / 30;

  return (
    <AbsoluteFill style={{ background: t.bg, color: t.text, fontFamily: FONT.body, overflow: "hidden" }}>
      {grid && (
        <AbsoluteFill
          style={{
            backgroundImage: `linear-gradient(${t.grid} 1px, transparent 1px), linear-gradient(90deg, ${t.grid} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at 50% 45%, black 30%, transparent 88%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 30%, transparent 88%)",
          }}
        />
      )}
      {/* soft light falloff */}
      <AbsoluteFill
        style={{
          background:
            tone === "dark"
              ? "radial-gradient(1200px 700px at 50% 8%, rgba(66,132,190,0.14), transparent 70%)"
              : "radial-gradient(1100px 760px at 50% 0%, rgba(255,255,255,0.9), transparent 70%)",
        }}
      />
      {vignette && (
        <AbsoluteFill
          style={{
            boxShadow:
              tone === "dark"
                ? "inset 0 0 240px 40px rgba(0,0,0,0.55)"
                : "inset 0 0 220px 30px rgba(16,36,54,0.07)",
            pointerEvents: "none",
          }}
        />
      )}

      {!noChrome && (
        <>
          <div
            style={{
              position: "absolute",
              left: 88,
              top: 54,
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: 0.92,
            }}
          >
            <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 22 }}>
              <div style={{ width: 4, height: 12, background: accent, borderRadius: 2 }} />
              <div style={{ width: 4, height: 17, background: accent, opacity: 0.72, borderRadius: 2 }} />
              <div style={{ width: 4, height: 22, background: tone === "dark" ? C.navyText : C.ink, opacity: 0.55, borderRadius: 2 }} />
            </div>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 19, letterSpacing: 3.4 }}>
              THE CIA TRIAD
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: 88,
              top: 60,
              fontSize: 14,
              letterSpacing: 2.6,
              textTransform: "uppercase",
              color: t.soft,
              fontWeight: 500,
            }}
          >
            {section}
          </div>
          <div style={{ position: "absolute", left: 88, right: 88, top: 104, height: 1, background: t.border }} />
          <div style={{ position: "absolute", left: 88, right: 88, bottom: 52, height: 1, background: t.border }} />
          <div
            style={{
              position: "absolute",
              left: 88,
              bottom: 22,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              letterSpacing: 2.4,
              textTransform: "uppercase",
              color: t.soft,
              fontFamily: FONT.mono,
            }}
          >
            <span style={{ color: accent, fontWeight: 500 }}>{String(index).padStart(2, "0")}</span>
            <span style={{ opacity: 0.5 }}>/ 08</span>
            <span style={{ opacity: 0.7, letterSpacing: 2 }}>{section}</span>
          </div>
          <div style={{ position: "absolute", right: 88, bottom: 20, fontFamily: FONT.mono, fontSize: 13, letterSpacing: 1.6, color: t.soft, opacity: 0.8 }}>
            {tc(seconds)} / {tc(total / 30)}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: tone === "dark" ? "rgba(255,255,255,0.08)" : "rgba(10,27,41,0.07)" }}>
            <div style={{ width: `${progress * 100}%`, height: "100%", background: accent, opacity: 0.85 }} />
          </div>
        </>
      )}
      {children}
    </AbsoluteFill>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode; color?: string; at?: number; style?: React.CSSProperties }> = ({
  children,
  color = C.blue,
  at = 0,
  style,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <div
      style={{
        fontFamily: FONT.mono,
        fontSize: 16,
        letterSpacing: 3.6,
        textTransform: "uppercase",
        color,
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity: p,
        transform: `translateY(${(1 - p) * 10}px)`,
        ...style,
      }}
    >
      <span style={{ width: 26, height: 1, background: color }} />
      {children}
    </div>
  );
};

export const Heading: React.FC<{
  children: React.ReactNode;
  at?: number;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ children, at = 0, size = 68, color, weight = 600, style }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <div
      style={{
        fontFamily: FONT.display,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: -1.4,
        fontWeight: weight,
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 18}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Panel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: Tone;
  label?: React.ReactNode;
  accent?: string;
  children?: React.ReactNode;
  at?: number;
  style?: React.CSSProperties;
  pad?: number;
  elevated?: boolean;
}> = ({ x, y, w, h, tone = "dark", label, accent = C.blue, children, at = 0, style, pad = 26, elevated }) => {
  const f = useCurrentFrame();
  const t = mix(tone);
  const p = interpolate(f, [at, at + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 18,
        background:
          tone === "dark"
            ? "linear-gradient(160deg, rgba(23,53,79,0.92), rgba(10,29,44,0.96))"
            : "linear-gradient(180deg, #FFFFFF, #FBFCFD)",
        border: `1px solid ${t.border}`,
        boxShadow:
          tone === "dark"
            ? "0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)"
            : elevated
              ? "0 24px 60px rgba(16,36,54,0.10), 0 2px 6px rgba(16,36,54,0.04)"
              : "0 8px 26px rgba(16,36,54,0.05)",
        boxSizing: "border-box",
        padding: pad,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
        overflow: "hidden",
        ...style,
      }}
    >
      {label && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: FONT.mono,
            fontSize: 14,
            letterSpacing: 2.4,
            textTransform: "uppercase",
            color: t.soft,
            marginBottom: 16,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: 4, background: accent }} />
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

/** The bottom "definition" band that every principle scene ends on. */
export const DefinitionBand: React.FC<{
  at: number;
  term: string;
  definition: string;
  color: string;
  tone?: Tone;
}> = ({ at, term, definition, color, tone = "light" }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const t = mix(tone);
  return (
    <div
      style={{
        position: "absolute",
        left: 88,
        right: 88,
        bottom: 92,
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "22px 30px",
        borderRadius: 14,
        background: tone === "dark" ? "rgba(13,38,56,0.92)" : "#FFFFFF",
        border: `1px solid ${tone === "dark" ? "rgba(126,178,224,0.28)" : C.line}`,
        boxShadow: "0 18px 40px rgba(10,27,41,0.12)",
        opacity: p,
        transform: `translateY(${(1 - p) * 26}px)`,
      }}
    >
      <div style={{ width: 5, alignSelf: "stretch", background: color, borderRadius: 3 }} />
      <div
        style={{
          fontFamily: FONT.display,
          fontWeight: 700,
          fontSize: 27,
          letterSpacing: 1.4,
          color: tone === "dark" ? C.navyText : C.ink,
          whiteSpace: "nowrap",
        }}
      >
        {term}
        <span style={{ color, margin: "0 12px" }}>=</span>
      </div>
      <div
        style={{
          fontSize: 25,
          letterSpacing: 1.2,
          color: tone === "dark" ? C.navySoft : C.inkSoft,
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {definition}
      </div>
    </div>
  );
};

/** Small labelled annotation that points at part of a diagram. */
export const Annotation: React.FC<{
  x: number;
  y: number;
  label: string;
  color?: string;
  tone?: Tone;
  at?: number;
  align?: "left" | "right";
}> = ({ x, y, label, color = C.blue, tone = "dark", at = 0, align = "left" }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexDirection: align === "right" ? "row-reverse" : "row",
        opacity: p,
        transform: `translateY(${(1 - p) * 8}px)`,
      }}
    >
      <div style={{ width: 7, height: 7, borderRadius: 4, background: color }} />
      <div
        style={{
          fontSize: 18,
          color: tone === "dark" ? C.navySoft : C.inkSoft,
          letterSpacing: 0.3,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};
