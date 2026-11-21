import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT, ease, useBeats } from "../design";
import { SceneFrame, Kicker, Heading } from "../components/Chrome";
import { Pillars } from "../components/Triad";
import { Icon } from "../icons";

export const Scene2: React.FC<{ bg?: string }> = () => {
  const f = useCurrentFrame();
  const { beat } = useBeats("s2");
  const dim = f >= beat(4) + 10 ? 1 : null;
  const zoom = interpolate(f, [0, 1400], [1, 1.02], { extrapolateRight: "clamp" });
  const noteP = interpolate(f, [beat(4) + 6, beat(4) + 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

  return (
    <SceneFrame section="Understanding the Triad" index={2} tone="dark" accent={C.blueSoft}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: "55% 50%" }}>
        <div style={{ position: "absolute", left: 88, top: 158, width: 450 }}>
          <Kicker at={4} color={C.blueSoft}>
            The framework
          </Kicker>
          <Heading at={10} size={62} color={C.navyText} style={{ marginTop: 24 }}>
            Three
            <br />
            principles.
            <br />
            One system.
          </Heading>
          <div
            style={{
              marginTop: 24,
              fontSize: 20,
              lineHeight: 1.55,
              color: C.navySoft,
              maxWidth: 380,
              opacity: interpolate(f, [30, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            Each principle protects information in a different way.
          </div>

          <div
            style={{
              marginTop: 34,
              padding: "20px 22px",
              borderRadius: 12,
              border: `1px solid ${dim ? "rgba(126,178,224,0.30)" : "rgba(126,178,224,0.16)"}`,
              background: "rgba(12,34,50,0.72)",
              opacity: noteP,
              transform: `translateY(${(1 - noteP) * 14}px)`,
              width: 370,
            }}
          >
            <div style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: 2.4, color: C.blueSoft, marginBottom: 12 }}>ALL THREE ARE REQUIRED</div>
            {[
              { t: "Private", c: C.confDark, on: true },
              { t: "Accurate", c: C.integDark, on: true },
              { t: "Reachable", c: C.availDark, on: true },
            ].map((r, i) => (
              <div key={r.t} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: i ? 9 : 0 }}>
                <Icon name="check" size={14} color={r.c} strokeWidth={2.4} />
                <span style={{ fontSize: 18, color: C.navyText }}>{r.t}</span>
              </div>
            ))}
            <div style={{ height: 1, background: "rgba(126,178,224,0.2)", margin: "14px 0 12px" }} />
            <div style={{ fontSize: 15, color: C.navySoft, lineHeight: 1.45 }}>Remove one, and the structure no longer holds.</div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 560,
            right: 60,
            top: 790,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(126,178,224,0.4), transparent)",
          }}
        />
        <Pillars at={[beat(1) - 8, beat(2) - 8, beat(3) - 8]} dim={dim} tone="dark" x={590} y={330} width={1210} />
        {[
          ["Encryption", "Access control"],
          ["Hashing", "Digital signatures"],
          ["Redundancy", "Backups"],
        ].map((items, i) => {
          const start = beat(i + 1) + 20;
          const p = interpolate(f, [start, start + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 590 + (1210 / 3) * i + 1210 / 6 - 130,
                top: 812,
                width: 260,
                textAlign: "center",
                fontFamily: FONT.mono,
                fontSize: 12.5,
                letterSpacing: 1.6,
                color: C.navySoft,
                opacity: p * 0.85,
              }}
            >
              {items.join("  ·  ")}
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
