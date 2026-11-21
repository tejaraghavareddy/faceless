import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT, ease, fade, useBeats } from "../design";
import { SceneFrame, Kicker, Heading, DefinitionBand } from "../components/Chrome";
import { Browser, Tag, CheckLine } from "../components/Diagram";
import { Icon } from "../icons";

const INNER: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#FFFFFF",
  fontFamily: FONT.body,
  overflow: "hidden",
};

const LoginScreen: React.FC<{ t: number }> = ({ t }) => {
  const user = "arjun.mehta";
  const typedUser = user.slice(0, Math.max(0, Math.floor(interpolate(t, [12, 52], [0, user.length], { extrapolateRight: "clamp" }))));
  const pwLen = Math.floor(interpolate(t, [60, 92], [0, 9], { extrapolateRight: "clamp" }));
  const press = interpolate(t, [112, 124], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ ...INNER, display: "flex" }}>
      <div style={{ width: "42%", background: "linear-gradient(155deg,#0E2C44,#0A1E2E)", color: "#fff", padding: 26, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="bank" size={15} color="#fff" strokeWidth={2} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>SecureBank</span>
          </div>
          <div style={{ marginTop: 40, fontSize: 25, lineHeight: 1.25, fontWeight: 300, letterSpacing: -0.3 }}>
            Your money,
            <br />
            <span style={{ color: C.blueSoft }}>your access.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 11.5, color: "#9DB4C6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="lock" size={13} color={C.integDark} /> 256-bit TLS encryption
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Icon name="shieldCheck" size={13} color={C.integDark} /> Regulated banking platform
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "34px 38px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 12, fontFamily: FONT.mono, letterSpacing: 1.8, color: C.inkMute }}>SECURE LOGIN</div>
        <div style={{ fontSize: 23, fontWeight: 600, color: C.ink, letterSpacing: -0.3 }}>Welcome back</div>
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 11.5, color: C.inkMute, marginBottom: 5 }}>Customer ID</div>
          <div style={{ height: 38, borderRadius: 7, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 14, color: C.ink, background: "#FBFCFD" }}>
            {typedUser}
            {typedUser.length < user.length && typedUser.length > 0 && <span style={{ color: C.blue }}>|</span>}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11.5, color: C.inkMute, marginBottom: 5 }}>Password</div>
          <div style={{ height: 38, borderRadius: 7, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 5, padding: "0 12px", background: "#FBFCFD" }}>
            {Array.from({ length: pwLen }).map((_, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: C.inkSoft }} />
            ))}
          </div>
        </div>
        <div
          style={{
            height: 40,
            borderRadius: 7,
            background: C.blue,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 500,
            marginTop: 6,
            transform: `scale(${1 - press * 0.02})`,
            boxShadow: `0 ${6 - press * 3}px ${14 - press * 6}px rgba(47,111,235,0.35)`,
          }}
        >
          Sign in securely
        </div>
        <div style={{ marginTop: "auto", fontSize: 10.5, color: C.inkMute, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="globe" size={12} color={C.inkMute} /> Public page · reachable by anyone
        </div>
      </div>
    </div>
  );
};

const OtpScreen: React.FC<{ t: number }> = ({ t }) => {
  const code = "481206";
  const shown = Math.floor(interpolate(t, [24, 86], [0, 6], { extrapolateRight: "clamp" }));
  const verified = t > 130;
  return (
    <div style={{ ...INNER, padding: "36px 46px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: 44, height: 44, borderRadius: 22, background: `${C.blue}12`, border: `1px solid ${C.blue}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="phone" size={22} color={C.blue} />
      </div>
      <div style={{ marginTop: 14, fontSize: 20, fontWeight: 600, color: C.ink }}>Two-factor authentication</div>
      <div style={{ marginTop: 6, fontSize: 12.5, color: C.inkMute }}>Enter the 6-digit code sent to ••••• 4821</div>
      <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 46,
              height: 54,
              borderRadius: 9,
              border: `1.5px solid ${i < shown ? C.blue : C.line}`,
              background: i < shown ? `${C.blue}0D` : "#FBFCFD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT.mono,
              fontSize: 24,
              color: C.ink,
            }}
          >
            {i < shown ? code[i] : ""}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.inkSoft }}>
        <Icon name="fingerprint" size={20} color={C.blue} /> or verify with biometrics
      </div>
      <div
        style={{
          marginTop: 22,
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "9px 16px",
          borderRadius: 8,
          background: verified ? "rgba(12,143,99,0.10)" : "rgba(10,27,41,0.04)",
          border: `1px solid ${verified ? "rgba(12,143,99,0.3)" : C.line}`,
          color: verified ? C.ok : C.inkMute,
          fontSize: 13,
          opacity: shown > 0 ? 1 : 0.5,
        }}
      >
        <Icon name={verified ? "check" : "clock"} size={15} color={verified ? C.ok : C.inkMute} />
        {verified ? "Identity verified · session established" : "Verifying one-time code…"}
      </div>
      <div style={{ marginTop: "auto", fontSize: 11.5, color: C.inkMute }}>A password alone is no longer enough. Identity is proven with a second factor.</div>
    </div>
  );
};

const PermissionScreen: React.FC<{ t: number }> = ({ t }) => {
  const rows: Array<[string, boolean]> = [
    ["View own account", true],
    ["Transfer funds", true],
    ["View another customer's account", false],
    ["Change account limits", false],
  ];
  return (
    <div style={{ ...INNER, padding: "30px 34px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: `${C.blue}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="user" size={21} color={C.blue} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>Arjun Mehta</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 10.5, color: C.inkMute, marginTop: 2 }}>ROLE · RETAIL CUSTOMER · A/C 4821</div>
        </div>
        <Tag tone="light" color={C.integ} style={{ marginLeft: "auto" }} size={10.5}>
          AUTHENTICATED
        </Tag>
      </div>
      <div style={{ marginTop: 22, fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: 1.8, color: C.inkMute }}>AUTHORISED ACTIONS</div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map(([label, ok], i) => {
          const on = t > 10 + i * 8;
          return (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "10px 13px",
                borderRadius: 8,
                background: ok ? "rgba(12,143,99,0.05)" : "rgba(200,69,59,0.04)",
                border: `1px solid ${ok ? "rgba(12,143,99,0.18)" : "rgba(200,69,59,0.16)"}`,
                opacity: on ? 1 : 0.25,
                transform: `translateX(${on ? 0 : -8}px)`,
              }}
            >
              <Icon name={ok ? "check" : "x"} size={16} color={ok ? C.ok : C.danger} strokeWidth={2.2} />
              <span style={{ fontSize: 13.5, color: C.ink, flex: 1 }}>{label}</span>
              <span style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: 1.2, color: ok ? C.ok : C.danger }}>{ok ? "ALLOW" : "DENY"}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 16, fontSize: 11.5, color: C.inkMute }}>Authorisation defines what an identified user is allowed to do.</div>
    </div>
  );
};

const AccessScreen: React.FC<{ t: number }> = ({ t }) => {
  const denied = t > 70;
  return (
    <div style={{ ...INNER, padding: "26px 30px", background: "#F7F9FB" }}>
      <div style={{ fontSize: 17, fontWeight: 600, color: C.ink }}>Accounts</div>
      <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
        <div style={{ flex: 1, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FONT.mono, fontSize: 11, color: C.inkMute }}>A/C •••• 4821</span>
            <Tag tone="light" color={C.ok} size={9.5}>YOUR ACCOUNT</Tag>
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, marginTop: 8, color: C.ink }}>₹ 2,45,000</div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            {["Salary + ₹85,000", "UPI − ₹1,000"].map((s) => (
              <div key={s} style={{ fontSize: 10.5, color: C.inkSoft, fontFamily: FONT.mono }}>{s}</div>
            ))}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: denied ? "rgba(200,69,59,0.04)" : "#fff",
            border: `1px solid ${denied ? "rgba(200,69,59,0.35)" : C.line}`,
            borderRadius: 10,
            padding: 15,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FONT.mono, fontSize: 11, color: C.inkMute }}>A/C •••• 9074</span>
            <Tag tone="light" color={denied ? C.danger : C.inkMute} size={9.5}>
              ANOTHER CUSTOMER
            </Tag>
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, marginTop: 8, color: C.inkMute, letterSpacing: 2 }}>₹ ••••••</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8 }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ height: 9, borderRadius: 4, background: "#EDF1F4", width: i ? "60%" : "82%" }} />
            ))}
          </div>
          {denied && (
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 7, color: C.danger, fontSize: 11.5, fontWeight: 500 }}>
              <Icon name="lock" size={13} color={C.danger} /> 403 · Not authorised
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 9, alignItems: "center", padding: "9px 13px", background: "#fff", border: `1px solid ${C.line}`, borderRadius: 8 }}>
        <Icon name="shield" size={15} color={C.blue} />
        <span style={{ fontSize: 11.5, color: C.inkSoft }}>Every request is checked against the user's permissions before data is returned.</span>
      </div>
    </div>
  );
};

const EncryptScreen: React.FC<{ t: number }> = ({ t }) => {
  const p = interpolate(t, [10, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const cipher = "9F 2C 41 AB 7D 0E B3 55 C1 88 24 E9";
  return (
    <div style={{ ...INNER, padding: "26px 30px" }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: 1.8, color: C.inkMute }}>DATA IN TRANSIT · TLS 1.3</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18 }}>
        <div style={{ flex: 1, background: "#FBFCFD", border: `1px solid ${C.line}`, borderRadius: 9, padding: 13 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 9.5, letterSpacing: 1.4, color: C.inkMute, marginBottom: 8 }}>PLAINTEXT</div>
          <div style={{ fontSize: 13, color: C.ink, fontFamily: FONT.mono, lineHeight: 1.9 }}>
            to: A/C 9074
            <br />
            amount: ₹ 24,500
            <br />
            ref: TXN-8841
          </div>
        </div>
        <div style={{ width: 132, textAlign: "center" }}>
          <div style={{ position: "relative", height: 44 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 21, height: 2, background: `${C.blue}44` }} />
            <div style={{ position: "absolute", left: `${p * 88}%`, top: 14, width: 14, height: 14, borderRadius: 7, background: C.blue, boxShadow: `0 0 12px ${C.blue}` }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 2 }}>
            <Icon name="lock" size={15} color={C.blue} />
            <span style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: 1, color: C.inkSoft }}>AES-256</span>
          </div>
        </div>
        <div style={{ flex: 1, background: "rgba(47,111,235,0.04)", border: `1px solid ${C.blue}33`, borderRadius: 9, padding: 13 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 9.5, letterSpacing: 1.4, color: C.blue, marginBottom: 8 }}>CIPHERTEXT</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 12, color: C.inkSoft, lineHeight: 1.9, wordSpacing: 2, opacity: 0.35 + p * 0.65, letterSpacing: 0.6 }}>
            {cipher.slice(0, Math.floor(p * cipher.length))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
        {[
          { icon: "globe" as const, t: "In transit", d: "TLS between browser and server" },
          { icon: "database" as const, t: "At rest", d: "Encrypted records on disk" },
        ].map((x) => (
          <div key={x.t} style={{ flex: 1, display: "flex", gap: 10, padding: "11px 13px", border: `1px solid ${C.line}`, borderRadius: 8, background: "#fff" }}>
            <Icon name={x.icon} size={17} color={C.blue} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.ink }}>{x.t}</div>
              <div style={{ fontSize: 10.5, color: C.inkMute, marginTop: 2 }}>{x.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, fontSize: 11.5, color: C.inkMute }}>Without the decryption key, intercepted data is unreadable.</div>
    </div>
  );
};

const ResultsScreen: React.FC<{ t: number }> = ({ t }) => {
  const blocked = t > 95;
  return (
    <div style={{ ...INNER, padding: "24px 28px", background: "#FBFCFD" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Icon name="graduation" size={20} color={C.blue} />
        <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>University Examination Portal</span>
        <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 10, color: C.inkMute }}>SEMESTER 6 · 2026</span>
      </div>
      <div style={{ marginTop: 16, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 9, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="user" size={14} color={C.ok} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: C.ink }}>Ananya R. · Roll 21CS0142</span>
          <Tag tone="light" color={C.ok} size={9} style={{ marginLeft: "auto" }}>AUTHORISED</Tag>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 11 }}>
          {[
            ["DBMS", "88"],
            ["Networks", "91"],
            ["Security", "86"],
          ].map(([s, m]) => (
            <div key={s} style={{ flex: 1, background: "#F7F9FB", borderRadius: 6, padding: "8px 10px" }}>
              <div style={{ fontSize: 9.5, color: C.inkMute, fontFamily: FONT.mono }}>{s}</div>
              <div style={{ fontSize: 17, fontWeight: 600, color: C.ink }}>{m}</div>
            </div>
          ))}
          <div style={{ flex: 1.2, background: "rgba(12,143,99,0.07)", borderRadius: 6, padding: "8px 10px", border: "1px solid rgba(12,143,99,0.2)" }}>
            <div style={{ fontSize: 9.5, color: C.ok, fontFamily: FONT.mono }}>SGPA</div>
            <div style={{ fontSize: 17, fontWeight: 600, color: C.ok }}>8.9</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, border: `1px solid ${blocked ? "rgba(200,69,59,0.35)" : C.line}`, background: blocked ? "rgba(200,69,59,0.03)" : "#fff", borderRadius: 9, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="user" size={14} color={blocked ? C.danger : C.inkMute} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: blocked ? C.ink : C.inkMute }}>Rahul K. · Roll 21CS0187</span>
          <Tag tone="light" color={blocked ? C.danger : C.inkMute} size={9} style={{ marginLeft: "auto" }}>
            {blocked ? "403 · DENIED" : "NOT REQUESTED"}
          </Tag>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 11 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, background: "#F1F4F7", borderRadius: 6, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: C.inkMute, letterSpacing: 3 }}>
              {blocked ? "•••" : "—"}
            </div>
          ))}
        </div>
        {blocked && (
          <div style={{ marginTop: 10, fontSize: 11, color: C.danger, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="lock" size={12} color={C.danger} /> This record belongs to another student. Access is refused.
          </div>
        )}
      </div>
    </div>
  );
};

export const Scene3: React.FC<{ bg?: string }> = () => {
  const f = useCurrentFrame();
  const { beat } = useBeats("s3");
  const starts = [0, beat(1), beat(2), beat(3), beat(4), beat(5)];
  const screens = [LoginScreen, OtpScreen, PermissionScreen, AccessScreen, EncryptScreen, ResultsScreen];
  const active = starts.reduce((acc, s, i) => (f >= s ? i : acc), 0);
  const steps = [
    { icon: "key" as const, title: "Authentication", desc: "Prove the identity — password and a one-time code.", at: beat(1) },
    { icon: "users" as const, title: "Authorisation", desc: "Decide what that identity is allowed to do.", at: beat(2) },
    { icon: "shield" as const, title: "Access control", desc: "Enforce permissions on every single request.", at: beat(3) },
    { icon: "lock" as const, title: "Encryption", desc: "Keep data unreadable without the decryption key.", at: beat(4) },
  ];

  return (
    <SceneFrame section="Confidentiality" index={3} accent={C.conf}>
      <div style={{ position: "absolute", left: 88, top: 148, width: 780 }}>
        <Kicker at={2} color={C.blue}>
          Principle 01 · Confidentiality
        </Kicker>
        <Heading at={8} size={58} style={{ marginTop: 18 }}>
          Only the right people can see it
        </Heading>
      </div>

      <Browser x={88} y={300} w={880} h={540} url="securebank.example.com/login">
        {screens.map((S, i) => {
          const next = starts[i + 1] ?? 99999;
          const op = i === active ? fade(f, starts[i], 12) : 0;
          const out = f >= next ? 1 - fade(f, next, 10) : 1;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, opacity: Math.min(op, Math.max(0, out)), pointerEvents: "none" }}>
              <S t={f - starts[i]} />
            </div>
          );
        })}
      </Browser>

      {/* concept stack */}
      <div style={{ position: "absolute", left: 1020, top: 300, width: 812 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: fade(f, 20, 20) }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: 2.4, color: C.inkMute }}>HOW ACCESS IS CONTROLLED</span>
          <span style={{ flex: 1, height: 1, background: C.line }} />
        </div>
        {steps.map((s, i) => {
          const on = f >= s.at;
          const done = f >= (steps[i + 1]?.at ?? 99999);
          const p = fade(f, s.at, 16);
          return (
            <div
              key={s.title}
              style={{
                display: "flex",
                gap: 14,
                padding: "16px 18px",
                marginBottom: 10,
                borderRadius: 11,
                border: `1px solid ${on ? `${C.blue}44` : C.line}`,
                background: on ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                boxShadow: on ? "0 12px 28px rgba(16,36,54,0.07)" : "none",
                transform: `translateX(${on ? 0 : 8}px)`,
                opacity: on ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: on ? `${C.blue}12` : "rgba(10,27,41,0.04)",
                  border: `1px solid ${on ? `${C.blue}33` : "transparent"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name={s.icon} size={19} color={on ? C.blue : C.inkMute} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 17, fontWeight: 600, color: C.ink }}>{s.title}</span>
                  <span style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: 1.4, color: C.inkMute }}>0{i + 1}</span>
                  {done && <Icon name="check" size={14} color={C.ok} strokeWidth={2.4} style={{ marginLeft: "auto" }} />}
                </div>
                <div style={{ fontSize: 13.5, color: C.inkSoft, marginTop: 4, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: 8, padding: "14px 18px", borderRadius: 11, background: "rgba(47,111,235,0.05)", border: `1px solid ${C.blue}26`, opacity: fade(f, beat(5), 20) }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Icon name="graduation" size={17} color={C.blue} style={{ marginTop: 2 }} />
            <div style={{ fontSize: 13, lineHeight: 1.5, color: C.inkSoft }}>
              <b style={{ color: C.ink, fontWeight: 600 }}>Example.</b> One student sees their own results. Another student's record is refused — they are not authorised.
            </div>
          </div>
        </div>
      </div>

      <DefinitionBand at={beat(6)} term="CONFIDENTIALITY" definition="PREVENTING UNAUTHORISED ACCESS" color={C.blue} />
    </SceneFrame>
  );
};
