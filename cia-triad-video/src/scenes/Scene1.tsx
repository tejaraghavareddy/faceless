import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT, ease, useBeats } from "../design";
import { SceneFrame, Kicker, Heading } from "../components/Chrome";
import { Canvas, Flow, Phone, Laptop, ServerRack, CloudNode, Tag } from "../components/Diagram";
import { Icon } from "../icons";

const BankingScreen: React.FC = () => (
  <div style={{ padding: 16, height: "100%", background: "#FBFCFD", display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 18, height: 18, borderRadius: 4, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="bank" size={11} color="#fff" strokeWidth={2.2} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.6, color: C.ink }}>SecureBank</span>
      <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 8.5, color: C.inkMute }}>A/C •••• 4821</span>
    </div>
    <div style={{ background: "#F2F5F8", borderRadius: 8, padding: "10px 12px" }}>
      <div style={{ fontSize: 8.5, letterSpacing: 1.4, color: C.inkMute, fontFamily: FONT.mono }}>AVAILABLE BALANCE</div>
      <div style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 600, color: C.ink, marginTop: 2 }}>₹ 2,45,000<span style={{ fontSize: 13, color: C.inkMute }}>.00</span></div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
      {[
        ["Salary credit", "+ ₹ 85,000", C.ok],
        ["Electricity bill", "− ₹ 2,140", C.inkSoft],
        ["UPI transfer", "− ₹ 1,000", C.inkSoft],
      ].map(([a, b, c]) => (
        <div key={a as string} style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.inkSoft, borderBottom: `1px solid ${C.line}`, paddingBottom: 5 }}>
          <span>{a}</span>
          <span style={{ color: c as string, fontFamily: FONT.mono }}>{b}</span>
        </div>
      ))}
      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
        <div style={{ flex: 1, height: 20, borderRadius: 5, background: C.blue, color: "#fff", fontSize: 8.5, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: 0.5 }}>
          Transfer
        </div>
        <div style={{ flex: 1, height: 20, borderRadius: 5, border: `1px solid ${C.line}`, color: C.inkSoft, fontSize: 8.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
          Statements
        </div>
      </div>
    </div>
  </div>
);

const PhoneScreen: React.FC = () => (
  <div style={{ padding: "26px 12px 12px", height: "100%", background: "#FBFCFD", display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ fontSize: 9, fontWeight: 600, color: C.ink }}>Healthcare</div>
    <div style={{ background: C.blue, borderRadius: 8, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name="hospital" size={22} color="#fff" />
    </div>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ height: 16, borderRadius: 4, background: i === 0 ? "#E7EDF3" : "#F0F3F6" }} />
    ))}
    <div style={{ marginTop: "auto", height: 18, borderRadius: 9, background: "#E7EDF3" }} />
  </div>
);

export const Scene1: React.FC<{ bg?: string }> = () => {
  const f = useCurrentFrame();
  const { beat } = useBeats("s1");
  const zoom = interpolate(f, [0, 900], [1, 1.035], { extrapolateRight: "clamp" });
  const words = [C.blue, C.integ, C.avail];
  const names = ["Confidentiality", "Integrity", "Availability"];

  return (
    <SceneFrame section="Introduction" index={1}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: "55% 45%" }}>
        {/* left editorial column */}
        <div style={{ position: "absolute", left: 88, top: 152, width: 560 }}>
          <Kicker at={4}>Information security · Foundations</Kicker>
          <Heading at={10} size={82} style={{ marginTop: 26, lineHeight: 0.98 }}>
            The CIA
            <br />
            Triad
          </Heading>
          <div
            style={{
              marginTop: 22,
              fontSize: 23,
              lineHeight: 1.45,
              color: C.inkSoft,
              maxWidth: 440,
              opacity: interpolate(f, [26, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }),
              transform: `translateY(${interpolate(f, [26, 46], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            Three principles protect every digital system you use.
          </div>

          <div style={{ marginTop: 70, display: "flex", flexDirection: "column", gap: 22 }}>
            {names.map((n, i) => {
              const start = beat(3) + i * 13;
              const p = interpolate(f, [start, start + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
              return (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 18, opacity: p, transform: `translateX(${(1 - p) * -22}px)` }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: `${words[i]}14`, border: `1px solid ${words[i]}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: words[i] }} />
                  </div>
                  <div style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 500, color: C.ink, letterSpacing: -0.2 }}>{n}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* system cluster */}
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 150,
            width: 1140,
            height: 780,
            opacity: interpolate(f, [12, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 50,
              width: 1120,
              height: 700,
              borderRadius: 22,
              background: "linear-gradient(165deg,#FFFFFF 0%,#F2F5F8 100%)",
              border: `1px solid ${C.line}`,
              boxShadow: "0 40px 90px rgba(16,36,54,0.10)",
            }}
          />
        </div>

        <Canvas>
          <Flow from={{ x: 1290, y: 430 }} to={{ x: 1530, y: 400 }} color={C.blue} draw={interpolate(f, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} packets={1} packetAt={f - 70} packetSpeed={70} width={1.6} arrow={false} dashed />
          <Flow from={{ x: 1290, y: 470 }} to={{ x: 1530, y: 690 }} color={C.blue} draw={interpolate(f, [46, 76], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} packets={1} packetAt={f - 76} packetSpeed={80} width={1.6} arrow={false} dashed />
          <Flow from={{ x: 1290, y: 500 }} to={{ x: 1070, y: 720 }} color={C.blue} draw={interpolate(f, [52, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} packets={1} packetAt={f - 82} packetSpeed={76} width={1.6} arrow={false} dashed />
        </Canvas>

        <Laptop x={840} y={250} w={620} url="securebank.example.com/dashboard" glow>
          <BankingScreen />
        </Laptop>

        <Phone x={1600} y={310} w={172} glow>
          <PhoneScreen />
        </Phone>

        <ServerRack x={950} y={650} w={160} h={190} color={C.blueSoft} load={0.55} />
        <div style={{ position: "absolute", left: 950, top: 862, width: 160, textAlign: "center", fontFamily: FONT.mono, fontSize: 12.5, letterSpacing: 1.4, color: C.inkMute }}>
          COMPANY SERVER
        </div>

        <CloudNode x={1620} y={640} w={230} label="CLOUD DATABASE" color={C.blueDeep} />

        {/* data labels */}
        <Tag x={1090} y={205} tone="light" color={C.inkMute} style={{ position: "absolute", background: "#fff", borderColor: C.line }}>
          Account balance
        </Tag>

        {[
          { x: 814, y: 340, at: 55 },
          { x: 1740, y: 292, at: 64 },
          { x: 1130, y: 634, at: 73 },
          { x: 1720, y: 606, at: 82 },
        ].map((p, i) => {
          const o = interpolate(f, [p.at, p.at + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const s = interpolate(f, [p.at, p.at + 20], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: 34,
                height: 34,
                borderRadius: 17,
                background: "#FFFFFF",
                border: `1px solid ${C.line}`,
                boxShadow: "0 8px 20px rgba(16,36,54,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: o,
                transform: `scale(${s})`,
              }}
            >
              <Icon name="lock" size={16} color={C.blue} strokeWidth={1.8} />
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
