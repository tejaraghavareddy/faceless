import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, type ExtrapolateType } from "remotion";
import { KineticText, GlowingTitle } from "../components/KineticText";
import { SecurityCards, SecurityWall, Vulnerability, UpdateEffect, CTAButton } from "../components/SecurityCards";
import { ParticleSystem, ParticleBurst, NetworkNode, NetworkConnection } from "../components/ParticleSystem";

interface Scene4Props {
  frame: number;
  width: number;
  height: number;
  title?: string;
  isLastScene?: boolean;
}

export const Scene4: React.FC<Scene4Props> = ({ frame, width, height, title, isLastScene }) => {
  const { fps } = useVideoConfig();

  const localFrame = frame;
  const totalDuration = 300;

  const cardsPhase = 0;
  const wallPhase = 45;
  const vulnerabilityPhase = 90;
  const updatePhase = 135;
  const shieldPhase = 180;
  const ctaPhase = 240;

  const isShowingCards = localFrame < wallPhase;
  const isWallTransition = localFrame >= wallPhase && localFrame < vulnerabilityPhase;
  const isShowingVulnerabilities = localFrame >= vulnerabilityPhase && localFrame < updatePhase;
  const isUpdating = localFrame >= updatePhase && localFrame < shieldPhase;
  const isShield = localFrame >= shieldPhase && localFrame < ctaPhase;
  const isCTA = localFrame >= ctaPhase;

  const highlightStandard = isShowingCards || isWallTransition;

  const wallAppear = isWallTransition || isShowingVulnerabilities || isUpdating || isShield || isCTA
    ? interpolate(localFrame, [wallPhase, wallPhase + 20, wallPhase + 40], [0, 1, 1])
    : 0;

  const wallStrength = isShowingVulnerabilities
    ? interpolate(localFrame, [vulnerabilityPhase, updatePhase, updatePhase + 50], [100, 40, 40])
    : isUpdating
    ? interpolate(localFrame, [updatePhase, shieldPhase, shieldPhase + 50], [40, 100, 100])
    : 100;

  const vulnerabilityCount = isShowingVulnerabilities ? 3 : isUpdating ? Math.max(0, 3 - interpolate(localFrame, [updatePhase, shieldPhase, shieldPhase + 50], [0, 3, 3])) : 0;

  const updateProgress = isUpdating
    ? interpolate(localFrame, [updatePhase, shieldPhase, shieldPhase + 50], [0, 1, 1])
    : isShield || isCTA
    ? 1
    : 0;

  const shieldAppear = isShield || isCTA
    ? interpolate(localFrame, [shieldPhase, shieldPhase + 30, shieldPhase + 60], [0, 1, 1])
    : 0;

  const ctaOpacity = isCTA ? interpolate(localFrame, [ctaPhase, ctaPhase + 20, ctaPhase + 40], [0, 1, 1]) : 0;
  const ctaScale = spring({ fps, frame: localFrame - ctaPhase, durationInFrames: 20 });

  const cameraZoom = interpolate(localFrame, [0, 60, 150, 250, 300], [1, 1.05, 1.1, 1.05, 1]);
  const cameraY = interpolate(localFrame, [0, 100, 200, 300], [0, -10, 0, 0]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 40%, rgba(50, 0, 100, ${0.2 + Math.sin(localFrame * 0.02) * 0.05}) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(100, 0, 50, ${0.1 + Math.cos(localFrame * 0.025) * 0.05}) 0%, transparent 40%),
            linear-gradient(180deg, #000000 0%, #050515 50%, #000000 100%)
          `,
        }}
      />

      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.1 }}
        preserveAspectRatio="none"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={(i / 20) * height}
            x2={width}
            y2={(i / 20) * height}
            stroke="#8800ff"
            strokeWidth={0.5}
            opacity={0.2}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(i / 15) * width}
            y1={0}
            x2={(i / 15) * width}
            y2={height}
            stroke="#8800ff"
            strokeWidth={0.5}
            opacity={0.15}
          />
        ))}
      </svg>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, ${cameraY}px) scale(${cameraZoom})`,
          width: "90%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isShowingCards && (
          <SecurityCards
            frame={localFrame}
            width={width}
            height={height}
            highlightStandard={highlightStandard}
            showAdministrator={true}
            position={{ x: width * 0.1, y: height * 0.35 }}
          />
        )}

        {wallAppear > 0 && (
          <div
            style={{
              position: "absolute",
              left: width * 0.05,
              top: height * 0.15,
              width: width * 0.5,
              height: height * 0.5,
              opacity: wallAppear,
              transform: `scaleY(${wallAppear})`,
              transformOrigin: "top center",
            }}
          >
            <SecurityWall
              frame={localFrame}
              width={width * 0.5}
              height={height * 0.5}
              strength={wallStrength}
              breaches={Math.floor(vulnerabilityCount)}
              active={wallStrength > 0}
              color="#8800ff"
            />
          </div>
        )}

        {isShowingVulnerabilities && (
          <>
            <Vulnerability
              frame={localFrame}
              x={width * 0.2}
              y={height * 0.35}
              severity="critical"
              active={true}
              pulse
              label="ADMIN ACCESS"
            />
            <Vulnerability
              frame={localFrame}
              x={width * 0.3}
              y={height * 0.4}
              severity="high"
              active={true}
              pulse
              label="OUTDATED SOFTWARE"
            />
            <Vulnerability
              frame={localFrame}
              x={width * 0.25}
              y={height * 0.45}
              severity="medium"
              active={true}
              pulse
              label="MISSING PATCH"
            />
          </>
        )}

        {isUpdating && (
          <UpdateEffect
            frame={localFrame}
            x={width * 0.25}
            y={height * 0.4}
            progress={updateProgress}
            color="#00ff88"
          />
        )}

        {isShield && (
          <div
            style={{
              position: "absolute",
              left: width * 0.25,
              top: height * 0.2,
              width: width * 0.4,
              height: height * 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: shieldAppear,
            }}
          >
            <svg
              width={120}
              height={120}
              viewBox="0 0 120 120"
              style={{
                transform: `scale(${1 + shieldAppear * 0.2})`,
                opacity: shieldAppear,
              }}
            >
              <defs>
                <linearGradient id={`shieldGrad-${localFrame}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#00ff88" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00ff88" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              <path
                d="M 60 10 L 105 30 L 105 65 C 105 90 85 110 60 115 C 35 110 15 90 15 65 L 15 30 Z"
                fill={`url(#shieldGrad-${localFrame})`}
                stroke="#00ff88"
                strokeWidth={2}
                opacity={0.6}
              />

              <path
                d="M 60 20 L 98 36 L 98 64 C 98 84 82 100 60 104 C 38 100 22 84 22 64 L 22 36 Z"
                fill="rgba(0, 0, 0, 0.7)"
                stroke="#00ff88"
                strokeWidth={1.5}
              />

              <path
                d="M 40 55 L 55 70 L 82 42"
                fill="none"
                stroke="#00ff88"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={i}
                  cx={20 + i * 10}
                  cy={105}
                  r={2}
                  fill="#00ff88"
                  opacity={0.5 + Math.sin(localFrame * 0.1 + i) * 0.3}
                />
              ))}
            </svg>

            <div
              style={{
                marginTop: 16,
                color: "#00ff88",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: 2,
                textShadow: "0 0 10px rgba(0, 255, 136, 0.5)",
              }}
            >
              SYSTEM SECURED
            </div>
          </div>
        )}

        {isCTA && (
          <CTAButton
            frame={localFrame}
            x={width * 0.5}
            y={height * 0.75}
            text="FOLLOW FOR MORE"
            subtext="TECH BASICS"
            color="#00ffff"
            pulse
            clickable={false}
          />
        )}
      </div>

      <ParticleSystem frame={localFrame} width={width} height={height} particleCount={25} />

      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 40,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: wallStrength > 70 ? "#00ff88" : wallStrength > 40 ? "#ffcc00" : "#ff3333",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: wallStrength > 70 ? "#00ff88" : wallStrength > 40 ? "#ffcc00" : "#ff3333",
              boxShadow: `0 0 8px ${wallStrength > 70 ? "#00ff88" : wallStrength > 40 ? "#ffcc00" : "#ff3333"}`,
            }}
          />
          {wallStrength > 70 ? "SYSTEM SECURE" : wallStrength > 40 ? "UPDATING..." : "VULNERABLE"}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#aaddff",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#8800ff",
              boxShadow: "0 0 6px #8800ff",
            }}
          />
          OS: WINDOWS/LINUX/MAC
        </div>
      </div>

      <GlowingTitle
        text="3. OS SECURITY"
        frame={localFrame}
        duration={totalDuration}
        subtitle="LIMIT ADMIN ACCESS"
        fontSize={48}
        color="#8800ff"
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "75%",
          transform: "translateX(-50%)",
          textAlign: "center",
          maxWidth: "80%",
          color: "#aaddff",
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          opacity: interpolate(localFrame, [20, 35, totalDuration - 30, totalDuration], [0, 1, 1, 0]),
        }}
      >
        {isShowingCards && "Your operating system manages access to your computer."}
        {isWallTransition && "Avoid using administrator privileges for everyday tasks."}
        {isShowingVulnerabilities && "Running as admin exposes your system to security vulnerabilities."}
        {isUpdating && "Install updates to patch security vulnerabilities."}
        {isShield && "Follow for more tech basics!"}
        {isCTA && "Stay safe online!"}
      </div>

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 30,
          height: 30,
          borderTop: "2px solid #8800ff40",
          borderLeft: "2px solid #8800ff40",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: 30,
          height: 30,
          borderBottom: "2px solid #8800ff40",
          borderRight: "2px solid #8800ff40",
        }}
      />

      {isLastScene && localFrame > totalDuration - 20 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(localFrame, [totalDuration - 20, totalDuration], [0, 0.8]),
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#00ffff",
              fontSize: 24,
              fontWeight: 700,
              fontFamily: "Arial, sans-serif",
              letterSpacing: 3,
              textShadow: "0 0 20px rgba(0, 255, 255, 0.6)",
            }}
          >
            STAY CYBER SAFE!
          </div>
        </div>
      )}
    </div>
  );
};
