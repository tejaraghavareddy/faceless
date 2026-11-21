import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT, ease, fade, mix, useBeats } from "../design";
import { SceneFrame, Kicker, Heading, DefinitionBand } from "../components/Chrome";
import { Canvas, Flow, Database, NodeBox, Tag, MonoRow } from "../components/Diagram";
import { Icon } from "../icons";

const ORIG = "9f2a 7c41 d0b8 e5a3 6c17 88fa 2b4d 0e91";
const MOD = "3b7e 19d8 4a2c f07b 55e1 93a8 6d34 c21f";

/* ---------------- transaction stage ---------------- */
const TransactionStage: React.FC<{ t: number }> = ({ t }) => {
  const move = interpolate(t, [10, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const tamper = t >= 300;
  const amount = tamper ? "₹ 10,000" : "₹ 1,000";
  const amountOpacity = tamper ? interpolate(t, [300, 320], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const oldAmountOpacity = tamper ? interpolate(t, [300, 320], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const x = 300 + move * 560;
  const alertP = interpolate(t, [370, 400], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <>
      <div style={{ position: "absolute", left: 40, top: 34, fontFamily: FONT.mono, fontSize: 12, letterSpacing: 2, color: C.navySoft }}>
        FUND TRANSFER · RECORD LIFECYCLE
      </div>
      <Database x={150} y={330} w={150} label="CORE BANKING DB" color={C.integDark} />
      <NodeBox x={470} y={330} w={160} h={96} icon="network" title="Payment gateway" sub="PROCESSING" tone="dark" color={C.blueSoft} />
      <NodeBox x={850} y={330} w={160} h={96} icon="file" title="Settlement ledger" sub="RECORD" tone="dark" color={C.integDark} />

      <Canvas>
        <Flow from={{ x: 320, y: 370 }} to={{ x: 465, y: 370 }} color={C.blueSoft} draw={interpolate(t, [470, 520], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
        <Flow from={{ x: 640, y: 370 }} to={{ x: 845, y: 370 }} color={C.blueSoft} draw={interpolate(t, [560, 610], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
        {tamper && (
          <Flow from={{ x: 1450, y: 404 }} to={{ x: x + 210, y: 300 }} color={C.dangerDark} dashed draw={interpolate(t, [300, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} width={1.8} />
        )}
      </Canvas>

      <div
        style={{
          position: "absolute",
          left: x,
          top: 166,
          width: 210,
          padding: "14px 16px",
          borderRadius: 10,
          background: tamper ? "rgba(200,69,59,0.16)" : "linear-gradient(160deg,#1D4562,#123149)",
          border: `1px solid ${tamper ? C.dangerDark : "rgba(126,178,224,0.45)"}`,
          boxShadow: tamper ? `0 0 30px ${C.danger}55` : "0 16px 34px rgba(0,0,0,0.3)",
          opacity: t > 500 ? 1 : 0,
        }}
      >
        <div style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: 1.4, color: tamper ? C.dangerDark : C.navySoft }}>TRANSACTION</div>
        <div style={{ position: "relative", height: 34, marginTop: 4 }}>
          <div style={{ position: "absolute", fontFamily: FONT.display, fontSize: 26, fontWeight: 600, color: C.navyText, opacity: oldAmountOpacity }}>{amount === "₹ 10,000" ? "₹ 1,000" : amount}</div>
          <div style={{ position: "absolute", fontFamily: FONT.display, fontSize: 26, fontWeight: 600, color: C.dangerDark, opacity: amountOpacity }}>{amount}</div>
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 10, color: C.navySoft, marginTop: 2 }}>REF TXN-8841</div>
      </div>

      <NodeBox x={1440} y={360} w={200} h={96} icon="user" title="Unauthorised actor" sub="TAMPERING" tone="dark" color={C.dangerDark} active={tamper ? 1 : 0} style={{ opacity: tamper ? 1 : 0.18 }} />

      {tamper && (
        <div
          style={{
            position: "absolute",
            left: 1000,
            top: 400,
            width: 420,
            padding: "18px 20px",
            borderRadius: 12,
            background: "rgba(200,69,59,0.12)",
            border: `1px solid ${C.danger}77`,
            opacity: alertP,
            transform: `translateY(${(1 - alertP) * 12}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9, color: C.dangerDark, fontSize: 15, fontWeight: 600 }}>
            <Icon name="alert" size={18} color={C.dangerDark} /> Integrity check failed
          </div>
          <div style={{ fontSize: 13.5, color: C.navySoft, marginTop: 8, lineHeight: 1.5 }}>
            Stored hash no longer matches the computed hash. The record is rejected and flagged for review.
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12, fontFamily: FONT.mono, fontSize: 11 }}>
            <span style={{ color: C.integDark }}>EXPECTED {ORIG.split(" ")[0]}…</span>
            <span style={{ color: C.dangerDark }}>GOT {MOD.split(" ")[0]}…</span>
          </div>
        </div>
      )}

      <div style={{ position: "absolute", left: 60, top: 452, width: 700, fontSize: 15.5, color: C.navySoft, lineHeight: 1.55 }}>
        {!tamper ? (
          <>
            The amount is written once, then carried between systems. Without protection, an attacker in the middle could change it and no one would notice.
          </>
        ) : (
          <>
            The ledger now says <span style={{ color: C.dangerDark, fontFamily: FONT.mono }}>₹ 10,000</span> — but the customer authorised{" "}
            <span style={{ color: C.navyText, fontFamily: FONT.mono }}>₹ 1,000</span>. The data looks valid. It is not true.
          </>
        )}
      </div>
    </>
  );
};

/* ---------------- hashing stage ---------------- */
const HashStage: React.FC<{ t: number }> = ({ t }) => {
  const changed = t > 150;
  const flow = interpolate(t, [40, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <div style={{ position: "absolute", left: 40, top: 34, fontFamily: FONT.mono, fontSize: 12, letterSpacing: 2, color: C.navySoft }}>
        CRYPTOGRAPHIC HASHING · SHA-256
      </div>
      <div style={{ display: "flex", gap: 60, position: "absolute", left: 60, top: 80, width: 1620 }}>
        {[
          { title: "ORIGINAL FILE", amount: "1,000", digest: ORIG, ok: true, accent: C.integDark },
          { title: "MODIFIED FILE", amount: "10,000", digest: MOD, ok: false, accent: C.dangerDark },
        ].map((col, i) => (
          <div key={col.title} style={{ flex: 1, opacity: i === 0 ? 1 : fade(t, 130, 20) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <Icon name={col.ok ? "fileCheck" : "file"} size={18} color={col.accent} />
              <span style={{ fontFamily: FONT.mono, fontSize: 11.5, letterSpacing: 1.8, color: col.accent }}>{col.title}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${col.accent}44`, borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 12, color: C.navySoft }}>transaction.json</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 15, color: C.navyText, marginTop: 8 }}>
                {"{ amount: "}
                <span style={{ color: i === 1 && changed ? C.dangerDark : C.navyText }}>"{col.amount}"</span>
                {" }"}
              </div>
            </div>
            <div style={{ height: 46, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="34" viewBox="0 0 20 34">
                <path d="M10 2v24" stroke={col.accent} strokeWidth="1.6" strokeDasharray="4 4" opacity={flow} />
                <path d="M5 24l5 6 5-6" fill="none" stroke={col.accent} strokeWidth="1.6" opacity={flow} />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                background: `${col.accent}14`,
                border: `1px solid ${col.accent}55`,
              }}
            >
              <Icon name="hash" size={17} color={col.accent} />
              <span style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: 1.4, color: col.accent }}>SHA-256</span>
              <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 10, color: C.navySoft }}>256 bits</span>
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: FONT.mono,
                fontSize: 16,
                lineHeight: 1.7,
                letterSpacing: 1.6,
                color: col.accent,
                padding: "12px 14px",
                border: `1px dashed ${col.accent}55`,
                borderRadius: 8,
                opacity: i === 0 ? 1 : fade(t, 150, 20),
              }}
            >
              {col.digest}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 60, top: 452, right: 60, display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 10, background: "rgba(200,69,59,0.10)", border: `1px solid ${C.danger}44`, opacity: fade(t, 190, 20) }}>
        <Icon name="alert" size={18} color={C.dangerDark} />
        <span style={{ fontSize: 15, color: C.navyText }}>
          One character changed. The fingerprint is <span style={{ color: C.dangerDark }}>completely different</span> — the modification cannot pass unnoticed.
        </span>
      </div>
    </>
  );
};

/* ---------------- signature stage ---------------- */
const SignatureStage: React.FC<{ t: number }> = ({ t }) => {
  const steps = [0, 90, 170, 250];
  return (
    <>
      <div style={{ position: "absolute", left: 40, top: 34, fontFamily: FONT.mono, fontSize: 12, letterSpacing: 2, color: C.navySoft }}>
        DIGITAL SIGNATURE · SIGN AND VERIFY
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 22, position: "absolute", left: 55, top: 120, width: 1630 }}>
        {[
          { icon: "file" as const, title: "Document", sub: "result.pdf", color: C.blueSoft },
          { icon: "key" as const, title: "Private key", sub: "signs the hash", color: C.integDark },
          { icon: "signature" as const, title: "Signature", sub: "attached to file", color: C.integDark },
          { icon: "shieldCheck" as const, title: "Public key", sub: "verifies authenticity", color: C.availDark },
        ].map((s, i) => (
          <React.Fragment key={s.title}>
            <div
              style={{
                flex: 1,
                padding: "22px 18px",
                borderRadius: 12,
                border: `1px solid ${s.color}44`,
                background: "rgba(255,255,255,0.035)",
                opacity: fade(t, steps[i], 18),
                transform: `translateY(${(1 - fade(t, steps[i], 18)) * 14}px)`,
                textAlign: "center",
              }}
            >
              <div style={{ width: 44, height: 44, margin: "0 auto", borderRadius: 22, background: `${s.color}18`, border: `1px solid ${s.color}55`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.icon} size={21} color={s.color} />
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 12, color: C.navyText }}>{s.title}</div>
              <div style={{ fontSize: 12, color: C.navySoft, marginTop: 4, fontFamily: FONT.mono }}>{s.sub}</div>
            </div>
            {i < 3 && (
              <div style={{ width: 26, display: "flex", justifyContent: "center", opacity: fade(t, steps[i] + 40, 12) }}>
                <Icon name="arrowRight" size={20} color={C.navySoft} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ position: "absolute", left: 55, top: 300, width: 700, padding: "18px 20px", borderRadius: 12, border: `1px solid ${C.integ}55`, background: "rgba(12,143,99,0.09)", opacity: fade(t, steps[3] + 40, 20) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="shieldCheck" size={20} color={C.integDark} />
          <span style={{ fontSize: 16, fontWeight: 600, color: C.integDark }}>Signature valid</span>
          <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 10.5, color: C.navySoft }}>VERIFIED</span>
        </div>
        <div style={{ fontSize: 13.5, color: C.navySoft, marginTop: 8, lineHeight: 1.55 }}>
          The file has not changed since it was signed, and it was signed by the holder of the private key.
        </div>
      </div>
      <div style={{ position: "absolute", left: 800, top: 300, width: 830, display: "flex", flexDirection: "column", gap: 12 }}>
        <MonoRow label="SIGNER" value="exams.university.ac.in" tone="dark" />
        <MonoRow label="ALGORITHM" value="RSA-2048 / SHA-256" tone="dark" />
        <MonoRow label="SIGNED AT" value="12 MAY 2026 · 09:41 IST" tone="dark" />
        <MonoRow label="SIGNATURE" value="a91f…4c07" color={C.integDark} tone="dark" />
      </div>
    </>
  );
};

/* ---------------- audit stage ---------------- */
const AuditStage: React.FC<{ t: number }> = ({ t }) => {
  const rows = [
    ["09:41:02", "exams.admin", "Result published", "a1c4…"],
    ["09:44:18", "system", "Integrity check passed", "a1c4…"],
    ["10:12:55", "unknown", "Modification attempted", "3b7e…"],
    ["10:12:56", "system", "Change rejected · signature invalid", "—"],
  ];
  return (
    <>
      <div style={{ position: "absolute", left: 40, top: 34, fontFamily: FONT.mono, fontSize: 12, letterSpacing: 2, color: C.navySoft }}>
        AUDIT LOG · EVERY CHANGE IS RECORDED
      </div>
      <div style={{ position: "absolute", left: 55, top: 88, width: 1040 }}>
        <div style={{ display: "grid", gridTemplateColumns: "130px 190px 1fr 120px", gap: 12, padding: "0 16px 10px", fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: 1.6, color: C.navySoft }}>
          <span>TIME</span>
          <span>ACTOR</span>
          <span>EVENT</span>
          <span>HASH</span>
        </div>
        {rows.map((r, i) => {
          const p = fade(t, 40 + i * 55, 18);
          const bad = i === 2 || i === 3;
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "130px 190px 1fr 120px",
                gap: 12,
                alignItems: "center",
                padding: "13px 16px",
                marginBottom: 7,
                borderRadius: 8,
                background: bad ? "rgba(200,69,59,0.07)" : "rgba(255,255,255,0.035)",
                border: `1px solid ${bad ? C.danger + "55" : "rgba(126,178,224,0.16)"}`,
                opacity: p,
                transform: `translateX(${(1 - p) * -12}px)`,
              }}
            >
              <span style={{ fontFamily: FONT.mono, fontSize: 12.5, color: C.navySoft }}>{r[0]}</span>
              <span style={{ fontFamily: FONT.mono, fontSize: 12.5, color: bad ? C.dangerDark : C.navyText }}>{r[1]}</span>
              <span style={{ fontSize: 13.5, color: bad ? C.dangerDark : C.navyText }}>{r[2]}</span>
              <span style={{ fontFamily: FONT.mono, fontSize: 12, color: C.navySoft }}>{r[3]}</span>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", right: 55, top: 100, width: 520, padding: 22, borderRadius: 12, background: "rgba(12,143,99,0.07)", border: `1px solid ${C.integ}44`, opacity: fade(t, 120, 20) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Icon name="fileCheck" size={18} color={C.integDark} />
          <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: 1.8, color: C.integDark }}>FILE INTEGRITY CHECK</span>
        </div>
        <div style={{ marginTop: 16 }}>
          <MonoRow label="BEFORE" value="a1c4 8e2b …" color={C.integDark} tone="dark" />
          <div style={{ height: 10 }} />
          <MonoRow label="AFTER" value="3b7e 19d8 …" color={C.dangerDark} tone="dark" />
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: C.navySoft, lineHeight: 1.5 }}>Hashes are compared before and after transfer. Any mismatch means the file was altered.</div>
      </div>
    </>
  );
};

/* ---------------- university example ---------------- */
const UniversityStage: React.FC<{ t: number }> = ({ t }) => {
  const attack = t > 130;
  const revert = t > 210;
  const grade = attack && !revert ? "9.9" : "8.9";
  const rejectP = fade(t, 160, 14);
  const okP = fade(t, 225, 18);
  return (
    <>
      <div style={{ position: "absolute", left: 40, top: 34, fontFamily: FONT.mono, fontSize: 12, letterSpacing: 2, color: C.navySoft }}>
        EXAMPLE · PUBLISHED UNIVERSITY RESULT
      </div>
      <div style={{ position: "absolute", left: 60, top: 90, width: 1000, borderRadius: 14, background: "rgba(255,255,255,0.045)", border: `1px solid ${attack && !revert ? C.danger + "77" : "rgba(126,178,224,0.28)"}`, padding: 26 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.blueSoft}18`, border: `1px solid ${C.blueSoft}55`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="graduation" size={24} color={C.blueSoft} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 19, fontWeight: 600, color: C.navyText }}>Semester 6 · Statement of Results</div>
            <div style={{ fontFamily: FONT.mono, fontSize: 11.5, color: C.navySoft, marginTop: 5, letterSpacing: 0.8 }}>ANANYA R. · ROLL 21CS0142 · PUBLISHED 12 MAY 2026</div>
          </div>
          <Tag color={attack && !revert ? C.dangerDark : C.integDark} size={10.5}>
            {attack && !revert ? "SIGNATURE INVALID" : "DIGITALLY SIGNED"}
          </Tag>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          {[
            ["DBMS", "88"],
            ["NETWORKS", "91"],
            ["SECURITY", "86"],
          ].map(([s, m]) => (
            <div key={s} style={{ flex: 1, padding: "14px 16px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(126,178,224,0.14)" }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: 1.6, color: C.navySoft }}>{s}</div>
              <div style={{ fontSize: 26, fontWeight: 600, color: C.navyText, marginTop: 4 }}>{m}</div>
            </div>
          ))}
          <div style={{ flex: 1.2, padding: "14px 16px", borderRadius: 9, background: "rgba(47,111,235,0.12)", border: `1px solid ${C.blueSoft}55` }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: 1.6, color: C.blueSoft }}>SGPA</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: attack && !revert ? C.dangerDark : C.navyText, marginTop: 4 }}>{grade}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 22, fontFamily: FONT.mono, fontSize: 11, color: C.navySoft }}>
          <Icon name="fingerprint" size={14} color={C.integDark} /> RESULT HASH a1c4 8e2b 55f0 7d13
        </div>
      </div>

      <div style={{ position: "absolute", right: 70, top: 110, width: 640, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: "18px 20px", borderRadius: 12, background: "rgba(200,69,59,0.10)", border: `1px solid ${C.danger}55`, opacity: attack ? 1 : 0.35 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, color: C.dangerDark, fontFamily: FONT.mono, fontSize: 11, letterSpacing: 1.8 }}>
            <Icon name="alert" size={16} color={C.dangerDark} /> MODIFICATION ATTEMPT
          </div>
          <div style={{ fontSize: 14, color: C.navySoft, marginTop: 9, lineHeight: 1.5 }}>SGPA changed from 8.9 to 9.9 after publication.</div>
          <div style={{ marginTop: 10, fontSize: 14, color: C.dangerDark, opacity: rejectP, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="x" size={15} color={C.dangerDark} strokeWidth={2.4} /> Signature does not match — change rejected
          </div>
        </div>
        <div style={{ padding: "18px 20px", borderRadius: 12, background: "rgba(12,143,99,0.09)", border: `1px solid ${C.integ}55`, opacity: okP }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, color: C.integDark, fontFamily: FONT.mono, fontSize: 11, letterSpacing: 1.8 }}>
            <Icon name="shieldCheck" size={16} color={C.integDark} /> ORIGINAL RESTORED
          </div>
          <div style={{ fontSize: 14, color: C.navySoft, marginTop: 9, lineHeight: 1.5 }}>Verification fails, the altered copy is discarded, and the signed record remains the source of truth.</div>
        </div>
      </div>
    </>
  );
};

export const Scene4: React.FC<{ bg?: string }> = () => {
  const f = useCurrentFrame();
  const { beat } = useBeats("s4");
  const starts = [0, beat(1), beat(2), beat(3), beat(4), beat(5), beat(6)];
  const phases = [TransactionStage, TransactionStage, TransactionStage, HashStage, SignatureStage, AuditStage, UniversityStage];
  const active = starts.reduce((acc, s, i) => (f >= s ? i : acc), 0);
  const t = mix("dark");
  const controls = [
    { label: "Hashing", at: beat(3) },
    { label: "Digital signatures", at: beat(4) },
    { label: "Integrity checks", at: beat(5) },
    { label: "Audit logs", at: beat(5) + 30 },
  ];

  return (
    <SceneFrame section="Integrity" index={4} tone="dark" accent={C.integDark}>
      <div style={{ position: "absolute", left: 88, top: 148, width: 800 }}>
        <Kicker at={2} color={C.integDark}>
          Principle 02 · Integrity
        </Kicker>
        <Heading at={8} size={58} color={C.navyText} style={{ marginTop: 18 }}>
          Data stays exactly as recorded
        </Heading>
      </div>
      <div style={{ position: "absolute", right: 88, top: 170, display: "flex", gap: 10 }}>
        {controls.map((c) => {
          const on = f >= c.at;
          return (
            <div
              key={c.label}
              style={{
                padding: "8px 13px",
                borderRadius: 7,
                border: `1px solid ${on ? C.integDark + "66" : "rgba(126,178,224,0.18)"}`,
                background: on ? "rgba(12,143,99,0.10)" : "transparent",
                fontFamily: FONT.mono,
                fontSize: 11,
                letterSpacing: 1.2,
                color: on ? C.integDark : C.navySoft,
                opacity: on ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              {on && <Icon name="check" size={12} color={C.integDark} strokeWidth={2.4} />}
              {c.label}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: 88,
          top: 290,
          width: 1744,
          height: 550,
          borderRadius: 18,
          background: "linear-gradient(160deg, rgba(23,53,79,0.94), rgba(9,28,43,0.97))",
          border: `1px solid ${t.border}`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        {phases.map((P, i) => {
          const next = starts[i + 1] ?? 99999;
          const op = i === active ? fade(f, starts[i], 14) : 0;
          const out = f >= next ? 1 - fade(f, next, 10) : 1;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, opacity: Math.min(op, Math.max(0, out)) }}>
              <P t={f - starts[i]} />
            </div>
          );
        })}
      </div>

      <DefinitionBand at={beat(6) + 60} term="INTEGRITY" definition="MAINTAINING DATA ACCURACY AND TRUSTWORTHINESS" color={C.integDark} tone="dark" />
    </SceneFrame>
  );
};
