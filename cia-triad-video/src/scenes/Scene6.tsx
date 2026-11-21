import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT, ease, fade, useBeats } from "../design";
import { SceneFrame, Kicker, Heading } from "../components/Chrome";
import { Canvas, Flow, NodeBox, Tag } from "../components/Diagram";
import { Icon } from "../icons";

export const Scene6: React.FC<{ bg?: string }> = () => {
  const f = useCurrentFrame();
  const { beat } = useBeats("s6");
  const cOn = f >= beat(1);
  const iOn = f >= beat(2);
  const aOn = f >= beat(3);
  const broken = f >= beat(4);
  const fixed = f >= beat(5) + 10;
  const trust = broken && !fixed ? interpolate(f, [beat(4), beat(4) + 40], [1, 0.34], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }) : fixed ? interpolate(f, [beat(5) + 10, beat(5) + 50], [0.34, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }) : interpolate(f, [beat(3), beat(3) + 40], [0.55, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const zones = [
    { key: "C", name: "Confidentiality", note: "Identity · Access · Encryption", color: C.confDark, on: cOn, x: 300 },
    { key: "I", name: "Integrity", note: "Hashing · Signature", color: C.integDark, on: iOn && (!broken || fixed), x: 720 },
    { key: "A", name: "Availability", note: "Replicas · Failover", color: C.availDark, on: aOn, x: 1140 },
  ];

  const protections = [
    { title: "Authenticated, encrypted session", detail: "Only Ananya can open this account.", color: C.confDark, on: cOn, x: 150 },
    { title: "Hash and signature verified", detail: "₹1,000 arrives exactly as sent.", color: C.integDark, on: iOn && (!broken || fixed), x: 590 },
    { title: "Load balanced, replicated", detail: "The service answers in 140 ms.", color: C.availDark, on: aOn, x: 1030 },
  ];

  return (
    <SceneFrame section="Working Together" index={6} tone="dark" accent={C.blueSoft}>
      <div style={{ position: "absolute", left: 88, top: 148, width: 900 }}>
        <Kicker at={2} color={C.blueSoft}>
          One system · three protections
        </Kicker>
        <Heading at={8} size={54} color={C.navyText} style={{ marginTop: 16 }}>
          All three, at the same moment
        </Heading>
      </div>
      <div style={{ position: "absolute", right: 88, top: 176, fontFamily: FONT.mono, fontSize: 11.5, letterSpacing: 2, color: C.navySoft, opacity: fade(f, 30, 20) }}>
        ONLINE BANKING · END-TO-END TRANSACTION
      </div>

      <div
        style={{
          position: "absolute",
          left: 88,
          top: 268,
          width: 1744,
          height: 520,
          borderRadius: 18,
          background: "linear-gradient(160deg, rgba(23,53,79,0.94), rgba(9,28,43,0.97))",
          border: "1px solid rgba(126,178,224,0.20)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        {zones.map((z) => (
          <div
            key={z.key}
            style={{
              position: "absolute",
              left: z.x,
              top: 34,
              width: 260,
              padding: "12px 16px",
              borderRadius: 10,
              border: `1px solid ${z.on ? z.color + "88" : "rgba(126,178,224,0.18)"}`,
              background: z.on ? `${z.color}16` : "transparent",
              boxShadow: z.on ? `0 0 26px ${z.color}22` : "none",
              transition: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name={z.key === "C" ? "lock" : z.key === "I" ? "shieldCheck" : "activity"} size={16} color={z.on ? z.color : C.navySoft} />
              <span style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: 1.6, color: z.on ? z.color : C.navySoft }}>{z.name.toUpperCase()}</span>
              {z.on && <Icon name="check" size={13} color={z.color} strokeWidth={2.4} style={{ marginLeft: "auto" }} />}
            </div>
            <div style={{ fontSize: 12, color: C.navySoft, marginTop: 5, marginLeft: 24 }}>{z.note}</div>
          </div>
        ))}

        {[
          { icon: "phone" as const, title: "Customer app", sub: "AUTHENTICATED", x: 150, color: C.confDark },
          { icon: "server" as const, title: "Banking API", sub: "VALIDATES REQUEST", x: 560, color: C.blueSoft },
          { icon: "database" as const, title: "Core ledger", sub: "HASHED RECORD", x: 970, color: C.integDark },
          { icon: "bank" as const, title: "Payment network", sub: "24 × 7 SERVICE", x: 1380, color: C.availDark },
        ].map((n) => (
          <NodeBox key={n.title} x={n.x} y={210} w={190} h={104} icon={n.icon} title={n.title} sub={n.sub} tone="dark" color={n.color} active={1} selected={false} />
        ))}

        <Canvas>
          <Flow from={{ x: 345, y: 262 }} to={{ x: 552, y: 262 }} color={cOn ? C.confDark : C.navySoft} draw={fade(f, 50, 30)} packets={cOn ? 2 : 0} packetAt={f - 50} packetSpeed={54} />
          <Flow from={{ x: 755, y: 262 }} to={{ x: 962, y: 262 }} color={iOn && (!broken || fixed) ? C.integDark : C.navySoft} draw={fade(f, beat(2), 30)} packets={iOn ? 2 : 0} packetAt={f - beat(2)} packetSpeed={54} />
          <Flow from={{ x: 1165, y: 262 }} to={{ x: 1372, y: 262 }} color={aOn ? C.availDark : C.navySoft} draw={fade(f, beat(3), 30)} packets={aOn ? 2 : 0} packetAt={f - beat(3)} packetSpeed={54} />
        </Canvas>

        {/* transaction chip */}
        <div
          style={{
            position: "absolute",
            left: 470 + interpolate(f, [beat(2), beat(2) + 90], [0, 360], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }),
            top: 158,
            padding: "7px 13px",
            borderRadius: 7,
            background: "rgba(8,28,44,0.95)",
            border: `1px solid ${broken && !fixed ? C.dangerDark : C.integDark}66`,
            fontFamily: FONT.mono,
            fontSize: 12,
            color: C.navyText,
            opacity: fade(f, beat(2) - 10, 14),
          }}
        >
          ₹ 1,000 <span style={{ color: C.navySoft }}>TXN-8841</span>
        </div>

        {protections.map((p) => (
          <div
            key={p.title}
            style={{
              position: "absolute",
              left: p.x,
              top: 380,
              width: 400,
              padding: "14px 16px",
              borderRadius: 10,
              border: `1px solid ${p.on ? p.color + "55" : "rgba(126,178,224,0.15)"}`,
              background: p.on ? `${p.color}0E` : "rgba(255,255,255,0.02)",
              opacity: p.on ? 1 : 0.35,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name={p.on ? "check" : "x"} size={14} color={p.on ? p.color : C.navySoft} strokeWidth={2.4} />
              <span style={{ fontSize: 14.5, fontWeight: 600, color: C.navyText }}>{p.title}</span>
            </div>
            <div style={{ fontSize: 12.5, color: C.navySoft, marginTop: 5, marginLeft: 22 }}>{p.detail}</div>
          </div>
        ))}

        {/* replica */}
        <div style={{ position: "absolute", left: 970, top: 352, display: "flex", alignItems: "center", gap: 7, opacity: aOn ? 1 : 0.25 }}>
          <Icon name="layers" size={13} color={C.availDark} />
          <span style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: 1.2, color: C.availDark }}>REPLICA · STANDBY · SYNCED</span>
        </div>

        {broken && !fixed && (
          <div style={{ position: "absolute", left: 560, top: 436, width: 760, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "rgba(200,69,59,0.12)", border: `1px solid ${C.danger}55`, opacity: fade(f, beat(4) + 10, 16) }}>
            <Icon name="alert" size={16} color={C.dangerDark} />
            <span style={{ fontSize: 13.5, color: C.navyText }}>
              Integrity removed: the transfer can be altered to <span style={{ color: C.dangerDark, fontFamily: FONT.mono }}>₹ 10,000</span> while the account still looks private and available.
            </span>
          </div>
        )}
      </div>

      {/* trust meter */}
      <div style={{ position: "absolute", left: 88, top: 816, width: 1744, display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ width: 210 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: 2, color: C.navySoft }}>SYSTEM TRUST</div>
          <div style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 600, color: broken && !fixed ? C.dangerDark : C.integDark, marginTop: 4 }}>
            {Math.round(trust * 100)}%
          </div>
        </div>
        <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(126,178,224,0.14)", overflow: "hidden" }}>
          <div style={{ width: `${trust * 100}%`, height: "100%", borderRadius: 5, background: broken && !fixed ? C.danger : `linear-gradient(90deg, ${C.confDark}, ${C.integDark} 55%, ${C.availDark})` }} />
        </div>
        <div style={{ width: 430, textAlign: "right", fontSize: 14, color: broken && !fixed ? C.dangerDark : C.navySoft, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8 }}>
          {broken && !fixed ? (
            <>
              <Icon name="alert" size={15} color={C.dangerDark} /> Private, available — but no longer trustworthy.
            </>
          ) : fixed ? (
            <>
              <Icon name="shieldCheck" size={16} color={C.integDark} /> Confidential + accurate + reachable.
            </>
          ) : (
            "Each principle adds one layer of trust."
          )}
        </div>
      </div>

      <div style={{ position: "absolute", left: 88, top: 916, display: "flex", alignItems: "center", gap: 12, opacity: fade(f, beat(5) + 20, 22) }}>
        {[
          { t: "CONFIDENTIALITY", c: C.confDark },
          { t: "INTEGRITY", c: C.integDark },
          { t: "AVAILABILITY", c: C.availDark },
        ].map((x, i) => (
          <React.Fragment key={x.t}>
            {i > 0 && <span style={{ color: C.navySoft, fontSize: 20 }}>+</span>}
            <span style={{ fontFamily: FONT.mono, fontSize: 12.5, letterSpacing: 1.8, color: x.c, padding: "7px 12px", borderRadius: 6, border: `1px solid ${x.c}44`, background: `${x.c}12` }}>{x.t}</span>
          </React.Fragment>
        ))}
        <span style={{ color: C.navySoft, fontSize: 20 }}>=</span>
        <span style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, letterSpacing: 2.2, color: C.navyText }}>COMPLETE SECURITY</span>
      </div>
    </SceneFrame>
  );
};
