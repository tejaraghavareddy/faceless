import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONT, ease, fade, useBeats } from "../design";
import { SceneFrame } from "../components/Chrome";
import { TriadRing, PRINCIPLES } from "../components/Triad";
import { Icon } from "../icons";

export const Scene8: React.FC<{ bg?: string }> = () => {
  const f = useCurrentFrame();
  const { beat, scene } = useBeats("s8");
  const closing = f >= beat(3);
  const endP = fade(f, beat(3) + 2, 22);
  const ringOut = 1 - fade(f, beat(3), 14);
  const finalFade = interpolate(f, [scene.durationInFrames - 34, scene.durationInFrames - 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = f;

  return (
    <SceneFrame section="Recap" index={8} tone="dark" accent={C.blueSoft}>
      <AbsoluteFill style={{ opacity: ringOut }}>
        <div style={{ position: "absolute", left: 88, top: 168, width: 640 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 14, letterSpacing: 3.4, color: C.blueSoft, display: "flex", gap: 12, alignItems: "center", opacity: fade(f, 4, 20) }}>
            <span style={{ width: 26, height: 1, background: C.blueSoft }} /> THE RECAP
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 56, fontWeight: 600, lineHeight: 1.06, letterSpacing: -1, color: C.navyText, marginTop: 22, opacity: fade(f, 10, 22) }}>
            Three questions
            <br />
            for any system
          </div>
          <div style={{ marginTop: 46, display: "flex", flexDirection: "column", gap: 26 }}>
            {PRINCIPLES.map((p, i) => {
              const on = f >= beat(i);
              return (
                <div key={p.key} style={{ display: "flex", gap: 16, alignItems: "flex-start", opacity: on ? 1 : 0.35 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background: `${p.key === "C" ? C.confDark : p.key === "I" ? C.integDark : C.availDark}16`,
                      border: `1px solid ${p.key === "C" ? C.confDark : p.key === "I" ? C.integDark : C.availDark}55`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <Icon name={p.icon} size={17} color={p.key === "C" ? C.confDark : p.key === "I" ? C.integDark : C.availDark} />
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT.display, fontSize: 23, fontWeight: 600, color: C.navyText, letterSpacing: -0.2 }}>{p.name}</div>
                    <div style={{ fontSize: 16, color: C.navySoft, marginTop: 4, lineHeight: 1.4, maxWidth: 420 }}>
                      {i === 0 ? "Who can access the information?" : i === 1 ? "Is the information accurate and trustworthy?" : "Can authorised users access it when needed?"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <svg style={{ position: "absolute", inset: 0, overflow: "visible" }} width={1920} height={1080}>
          <circle cx={1300} cy={600} r={250} fill="none" stroke="rgba(126,178,224,0.16)" strokeWidth={1} strokeDasharray="2 9" />
        </svg>
        <TriadRing x={1300} y={600} radius={250} tone="dark" showQuestions={false} active={[f >= beat(0) ? 1 : 0, f >= beat(1) ? 1 : 0, f >= beat(2) ? 1 : 0]} centerLabel="DIGITAL TRUST" centerSub="CIA TRIAD" pulse={pulse} />
      </AbsoluteFill>

      <AbsoluteFill style={{ background: "#081C2C", opacity: fade(f, beat(3) + 2, 18) }} />
      <AbsoluteFill style={{ opacity: endP, alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", transform: `translateY(${(1 - endP) * 18}px)` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: FONT.mono, fontSize: 13, letterSpacing: 4.6, color: C.blueSoft }}>
            <span style={{ width: 60, height: 1, background: "rgba(126,178,224,0.5)" }} />
            THE FOUNDATION OF DIGITAL TRUST
            <span style={{ width: 60, height: 1, background: "rgba(126,178,224,0.5)" }} />
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 104, fontWeight: 700, letterSpacing: 4, color: C.navyText, marginTop: 30, lineHeight: 1 }}>
            THE CIA TRIAD
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 400, letterSpacing: 8, color: C.navySoft, marginTop: 22 }}>
            THE FOUNDATION OF CYBERSECURITY
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginTop: 64 }}>
            {[
              { n: "CONFIDENTIALITY", c: C.confDark },
              { n: "INTEGRITY", c: C.integDark },
              { n: "AVAILABILITY", c: C.availDark },
            ].map((x, i) => (
              <React.Fragment key={x.n}>
                {i > 0 && <span style={{ width: 1, height: 30, background: "rgba(126,178,224,0.3)", margin: "0 30px" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 4, background: x.c, boxShadow: `0 0 10px ${x.c}` }} />
                  <span style={{ fontFamily: FONT.mono, fontSize: 14, letterSpacing: 2.4, color: C.navySoft }}>{x.n}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ background: "#061420", opacity: finalFade, pointerEvents: "none" }} />
    </SceneFrame>
  );
};
