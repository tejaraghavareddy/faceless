import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT, ease, fade, useBeats } from "../design";
import { SceneFrame, Kicker, Heading } from "../components/Chrome";
import { Icon, IconName } from "../icons";

const DATA = [
  {
    icon: "bank" as IconName,
    name: "Banking",
    sub: "ACCOUNTS · PAYMENTS · LEDGERS",
    color: C.blue,
    rows: [
      ["C", "Account details stay private", "Only the account holder sees the balance."],
      ["I", "The ledger cannot be altered", "Every transaction is signed and audited."],
      ["A", "Payments run around the clock", "Replicas keep transfers available 24 × 7."],
    ],
  },
  {
    icon: "hospital" as IconName,
    name: "Healthcare",
    sub: "PATIENT RECORDS · PRESCRIPTIONS",
    color: C.integ,
    rows: [
      ["C", "Patient records are restricted", "Only the treating team can open a file."],
      ["I", "Prescriptions stay accurate", "Changes are versioned and verifiable."],
      ["A", "Access during emergencies", "Records remain reachable when seconds count."],
    ],
  },
  {
    icon: "graduation" as IconName,
    name: "Education",
    sub: "STUDENT DATA · RESULTS · PORTALS",
    color: C.avail,
    rows: [
      ["C", "Student data is protected", "Each student sees only their own record."],
      ["I", "Marks cannot be changed secretly", "Published results are digitally signed."],
      ["A", "Portals stay open on result day", "Traffic is balanced across servers."],
    ],
  },
];

const COLORS: Record<string, string> = { C: C.blue, I: C.integ, A: C.avail };

export const Scene7: React.FC<{ bg?: string }> = () => {
  const f = useCurrentFrame();
  const { beat } = useBeats("s7");
  const active = f >= beat(3) ? 2 : f >= beat(2) ? 1 : f >= beat(1) ? 0 : -1;

  return (
    <SceneFrame section="Real-World Applications" index={7}>
      <div style={{ position: "absolute", left: 88, top: 146, width: 1100 }}>
        <Kicker at={2} color={C.inkMute}>
          In practice
        </Kicker>
        <Heading at={8} size={54} style={{ marginTop: 16 }}>
          The same three principles, everywhere
        </Heading>
      </div>
      <div style={{ position: "absolute", right: 88, top: 176, fontFamily: FONT.mono, fontSize: 11.5, letterSpacing: 2, color: C.inkMute, opacity: fade(f, 20, 20) }}>
        THREE SECTORS · ONE FRAMEWORK
      </div>

      {DATA.map((d, i) => {
        const on = active === i;
        const dim = active !== -1 && !on;
        const p = fade(f, 24 + i * 12, 22);
        return (
          <div
            key={d.name}
            style={{
              position: "absolute",
              left: 88 + i * 588,
              top: 286,
              width: 540,
              height: 505,
              borderRadius: 16,
              background: on ? "#FFFFFF" : "rgba(255,255,255,0.72)",
              border: `1px solid ${on ? d.color + "66" : C.line}`,
              boxShadow: on ? `0 24px 60px ${d.color}1A, 0 4px 12px rgba(16,36,54,0.06)` : "0 8px 24px rgba(16,36,54,0.04)",
              opacity: p * (dim ? 0.72 : 1),
              transform: `translateY(${(1 - p) * 24}px)`,
              overflow: "hidden",
              padding: 30,
              boxSizing: "border-box",
              transition: "none",
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, height: 4, width: "100%", background: on ? d.color : "transparent" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 50, height: 50, borderRadius: 13, background: `${d.color}12`, border: `1px solid ${d.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={d.icon} size={25} color={d.color} />
              </div>
              <div>
                <div style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 600, color: C.ink }}>{d.name}</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: 1.3, color: C.inkMute, marginTop: 4 }}>{d.sub}</div>
              </div>
            </div>
            <div style={{ height: 1, background: C.line, margin: "24px 0 8px" }} />
            {d.rows.map(([k, title, desc], j) => {
              const rowOn = f >= beat(i + 1) + j * 12;
              const rp = fade(f, beat(i + 1) + j * 12, 16);
              return (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    gap: 13,
                    padding: "16px 0",
                    borderBottom: j < 2 ? `1px solid ${C.line}` : "none",
                    opacity: rowOn ? 1 : 0.35,
                    transform: `translateY(${(1 - rp) * 6}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: `${COLORS[k]}12`,
                      border: `1px solid ${COLORS[k]}44`,
                      color: COLORS[k],
                      fontFamily: FONT.display,
                      fontSize: 15,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {k}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: C.ink, lineHeight: 1.3 }}>{title}</div>
                    <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 5, lineHeight: 1.45 }}>{desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {DATA.map((d, i) => (
        <div key={"foot" + d.name} style={{ position: "absolute", left: 118 + i * 588, top: 706, display: "flex", alignItems: "center", gap: 8, opacity: fade(f, 40, 20) }}>
          <Icon name="link" size={13} color={d.color} />
          <span style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: 1.2, color: C.inkMute }}>{i === 0 ? "UPI · NEFT · IMPS" : i === 1 ? "EMR · LAB REPORTS" : "ADMISSIONS · RESULTS"}</span>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 88,
          right: 88,
          bottom: 96,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: fade(f, beat(4) + 10, 22),
          transform: `translateY(${(1 - fade(f, beat(4) + 10, 22)) * 10}px)`,
        }}
      >
        <div style={{ height: 1, flex: 1, background: C.line }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {["C", "I", "A"].map((k) => (
            <span key={k} style={{ width: 8, height: 8, borderRadius: 4, background: COLORS[k] }} />
          ))}
          <span style={{ fontFamily: FONT.display, fontSize: 21, fontWeight: 500, color: C.inkSoft, letterSpacing: 0.2 }}>
            The technology differs. The principles do not.
          </span>
        </div>
        <div style={{ height: 1, flex: 1, background: C.line }} />
      </div>
    </SceneFrame>
  );
};
