import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT, ease, fade, useBeats } from "../design";
import { SceneFrame, Kicker, Heading, DefinitionBand } from "../components/Chrome";
import { Browser, ServerRack, Tag } from "../components/Diagram";
import { Icon } from "../icons";

const ResultPortal: React.FC<{ spin: number; loading: boolean; phase: "calm" | "fail" | "ok" }> = ({ spin, loading, phase }) => {
  if (phase === "fail") {
    return (
      <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <div style={{ fontFamily: FONT.display, fontSize: 74, fontWeight: 700, color: C.danger, letterSpacing: -2 }}>503</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: C.ink }}>Service temporarily unavailable</div>
        <div style={{ fontSize: 14, color: C.inkMute, maxWidth: 420, textAlign: "center", lineHeight: 1.55 }}>
          The server is receiving more requests than it can process. Please try again later.
        </div>
        <div style={{ marginTop: 8, padding: "9px 18px", borderRadius: 7, border: `1px solid ${C.line}`, fontSize: 13, color: C.inkSoft }}>Retry</div>
        <div style={{ position: "absolute", bottom: 20, fontFamily: FONT.mono, fontSize: 10.5, color: C.inkMute }}>ERROR CODE 503 · UPSTREAM OVERLOADED</div>
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", inset: 0, background: "#FBFCFD", padding: "26px 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${C.blue}12`, border: `1px solid ${C.blue}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="graduation" size={19} color={C.blue} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.ink }}>Examination Results Portal</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 10.5, color: C.inkMute, marginTop: 2 }}>UNIVERSITY OF TECHNOLOGY</div>
        </div>
        <Tag tone="light" color={loading ? C.inkMute : C.ok} size={9.5} style={{ marginLeft: "auto" }}>
          {loading ? "LOADING" : "ONLINE"}
        </Tag>
      </div>

      <div style={{ marginTop: 26, padding: 22, borderRadius: 10, background: "#fff", border: `1px solid ${C.line}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="user" size={15} color={C.blue} />
          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Ananya R. · Roll 21CS0142</span>
          <span style={{ marginLeft: "auto", fontFamily: FONT.mono, fontSize: 10, color: C.inkMute }}>SEMESTER 6</span>
        </div>
        {loading ? (
          <div style={{ marginTop: 22 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 12, borderRadius: 6, background: "#EDF1F4", width: i === 2 ? "60%" : "100%", marginTop: 10 }} />
            ))}
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 9, color: C.inkMute, fontSize: 12.5 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, border: `2px solid ${C.blue}`, borderTopColor: "transparent", transform: `rotate(${(spin * 8) % 360}deg)` }} />
              Fetching your result…
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 9, marginTop: 16 }}>
              {[
                ["DBMS", "88"],
                ["NETWORKS", "91"],
                ["SECURITY", "86"],
              ].map(([s, m]) => (
                <div key={s} style={{ flex: 1, background: "#F7F9FB", borderRadius: 7, padding: "10px 12px" }}>
                  <div style={{ fontFamily: FONT.mono, fontSize: 9, color: C.inkMute }}>{s}</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: C.ink }}>{m}</div>
                </div>
              ))}
              <div style={{ flex: 1.2, background: "rgba(12,143,99,0.07)", border: "1px solid rgba(12,143,99,0.2)", borderRadius: 7, padding: "10px 12px" }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 9, color: C.ok }}>SGPA</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: C.ok }}>8.9</div>
              </div>
            </div>
            <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 14px", borderRadius: 7, background: C.blue, color: "#fff", fontSize: 12.5 }}>
                <Icon name="download" size={14} color="#fff" /> Download marksheet
              </div>
              <span style={{ fontFamily: FONT.mono, fontSize: 10, color: C.inkMute }}>PDF · 240 KB</span>
              <Tag tone="light" color={C.ok} size={9.5} style={{ marginLeft: "auto" }}>
                SIGNATURE VERIFIED
              </Tag>
            </div>
          </>
        )}
      </div>
      <div style={{ marginTop: 14, fontFamily: FONT.mono, fontSize: 10.5, color: C.inkMute }}>RESPONSE TIME · {loading ? "1,200" : "140"} ms</div>
    </div>
  );
};

export const Scene5: React.FC<{ bg?: string }> = () => {
  const f = useCurrentFrame();
  const { beat } = useBeats("s5");
  const phaseFail = f >= beat(2);
  const phaseMitigate = f >= beat(3);
  const phaseRecover = f >= beat(5);
  const phase: "calm" | "fail" | "ok" = phaseRecover ? "ok" : phaseFail ? "fail" : "calm";
  const soa: "steady" | "overload" | "balanced" | "normal" = phaseRecover ? "normal" : phaseMitigate ? "balanced" : phaseFail ? "overload" : "steady";
  const failP = fade(f, beat(2) + 20, 20);
  const mitigateP = fade(f, beat(3), 22);
  const recP = fade(f, beat(5), 20);

  const traffic = (i: number) => {
    const seed = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const base = Math.abs(seed) * 0.12;
    if (soa === "steady") return 0.16 + base;
    if (soa === "overload") return 0.62 + base * 1.9;
    if (soa === "balanced") return 0.4 + base * 0.6;
    return 0.28 + base;
  };
  const bars = 52;
  const latency = phaseRecover ? "140 ms" : phaseMitigate ? "210 ms" : phaseFail ? "8,420 ms" : "120 ms";
  const rps = phaseRecover ? "1,180 /s" : phaseMitigate ? "6,400 /s" : phaseFail ? "38,900 /s" : "240 /s";

  return (
    <SceneFrame section="Availability" index={5} accent={C.avail}>
      <div style={{ position: "absolute", left: 88, top: 148, width: 830 }}>
        <Kicker at={2} color={C.avail}>
          Principle 03 · Availability
        </Kicker>
        <Heading at={8} size={58} style={{ marginTop: 18 }}>
          Reachable when it matters
        </Heading>
      </div>

      <Browser x={88} y={292} w={760} h={500} url="results.university.ac.in">
        <ResultPortal spin={f} loading={f < beat(1) + 80} phase={phase} />
      </Browser>

      <div
        style={{
          position: "absolute",
          left: 890,
          top: 292,
          width: 942,
          height: 500,
          borderRadius: 16,
          background: "#FFFFFF",
          border: `1px solid ${C.line}`,
          boxShadow: "0 22px 54px rgba(16,36,54,0.10)",
          padding: 22,
          boxSizing: "border-box",
          opacity: fade(f, 20, 20),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: 1.8, color: C.inkMute }}>SERVICE HEALTH</span>
          <span style={{ flex: 1, height: 1, background: C.line }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: phaseRecover || !phaseFail ? "rgba(12,143,99,0.10)" : "rgba(200,69,59,0.10)", border: `1px solid ${phaseRecover || !phaseFail ? "rgba(12,143,99,0.35)" : "rgba(200,69,59,0.35)"}`, fontSize: 13, fontWeight: 500, color: phaseRecover || !phaseFail ? C.ok : C.danger }}><span style={{width:7,height:7,borderRadius:4,background:phaseRecover||!phaseFail?C.ok:C.danger}} />{phaseRecover ? "Healthy" : phaseFail ? (phaseMitigate ? "Degraded" : "Unavailable") : "Healthy"}</div>
        </div>

        <div style={{ display: "flex", gap: 26, marginTop: 16 }}>
          {[
            ["REQUESTS", rps],
            ["LATENCY", latency],
            ["UPTIME", phaseFail && !phaseRecover ? "98.2%" : "99.98%"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: FONT.mono, fontSize: 9.5, letterSpacing: 1.4, color: C.inkMute }}>{k}</div>
              <div style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, color: phaseFail && !phaseRecover && k !== "UPTIME" ? C.danger : C.ink, marginTop: 2 }}>{v}</div>
            </div>
          ))}
          <div style={{ marginLeft: "auto", alignSelf: "flex-end", fontFamily: FONT.mono, fontSize: 10.5, color: C.inkMute }}>
            {phaseFail && !phaseRecover ? "SOURCE · DISTRIBUTED BOTNET · 12,400 IPs" : "SOURCE · STUDENT PEAK HOUR"}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 108, marginTop: 14, padding: "0 2px", borderBottom: `1px solid ${C.line}`, position: "relative" }}>
          {Array.from({ length: bars }).map((_, i) => {
            const h = traffic(i) * 100;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: "2px 2px 0 0",
                  background: phaseFail && !phaseRecover ? C.danger : phaseMitigate ? C.avail : C.blue,
                  opacity: 0.35 + (i / bars) * 0.55,
                }}
              />
            );
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: C.line, opacity: 0.8 }} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginTop: 32, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 8, border: `1px solid ${mitigateP > 0.2 ? C.blue + "55" : C.line}`, background: mitigateP > 0.2 ? "rgba(47,111,235,0.06)" : "#fff", opacity: 1 }}>
            <Icon name="network" size={18} color={mitigateP > 0.2 ? C.blue : C.inkMute} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.ink }}>Load balancer</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 9.5, color: C.inkMute, marginTop: 1 }}>{mitigateP > 0.2 ? "SPREADING TRAFFIC" : "NOT CONFIGURED"}</div>
            </div>
          </div>
          {[0, 1, 2].map((i) => {
            const down = phaseFail && !phaseMitigate;
            const isDown = down && i === 0;
            return (
              <div key={i} style={{ flex: 1, position: "relative" }}>
                <div style={{ width: 130, height: 82, margin: "0 auto", position: "relative" }}>
                  <ServerRack x={0} y={0} w={130} h={82} units={4} tone="dark" color={down || (phaseFail && !phaseRecover) ? C.danger : phaseRecover ? C.ok : C.blue} load={down || (phaseFail && !phaseRecover) ? 0.98 : 0.42 + i * 0.08} />
                </div>
                <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 6, justifyContent: "center", fontFamily: FONT.mono, fontSize: 10.5, color: isDown ? C.danger : C.inkMute }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: isDown ? C.danger : C.ok }} />
                  WEB-0{i + 1} {isDown ? "DOWN" : phaseFail && !phaseRecover ? "SATURATED" : "LIVE"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* mitigation strip */}
      <div style={{ position: "absolute", left: 88, top: 816, display: "flex", gap: 12, opacity: f >= beat(4) ? fade(f, beat(4), 20) : 0 }}>
        {[
          { icon: "layers" as const, t: "Redundant servers", s: "A replica takes over if one fails" },
          { icon: "database" as const, t: "Backups", s: "Data can be restored after loss" },
          { icon: "refresh" as const, t: "Disaster recovery", s: "Service returns after a major failure" },
        ].map((x) => (
          <div key={x.t} style={{ display: "flex", gap: 9, alignItems: "center", padding: "10px 14px", borderRadius: 9, background: "#FFFFFF", border: `1px solid ${C.line}`, boxShadow: "0 8px 20px rgba(16,36,54,0.05)" }}>
            <Icon name={x.icon} size={17} color={C.avail} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>{x.t}</div>
              <div style={{ fontSize: 10.5, color: C.inkMute }}>{x.s}</div>
            </div>
          </div>
        ))}
      </div>

      {failP > 0 && f < beat(4) && (
        <div style={{ position: "absolute", left: 88, top: 816, display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 9, background: "rgba(200,69,59,0.07)", border: `1px solid ${C.danger}33`, opacity: failP }}>
          <Icon name="alert" size={17} color={C.danger} />
          <span style={{ fontSize: 13, color: C.inkSoft }}>
            <b style={{ color: C.ink }}>Denial of service.</b> Legitimate students cannot reach the service.
          </span>
        </div>
      )}

      <DefinitionBand at={beat(6)} term="AVAILABILITY" definition="ACCESS TO INFORMATION WHEN NEEDED" color={C.avail} />
    </SceneFrame>
  );
};
