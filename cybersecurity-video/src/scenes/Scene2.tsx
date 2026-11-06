import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, type ExtrapolateType } from "remotion";
import { NetworkVisualization } from "../components/NetworkVisualization";
import { ParticleSystem, NetworkNode, DataPacket, ParticleBurst } from "../components/ParticleSystem";
import { KineticText, GlowingTitle } from "../components/KineticText";
import { FirewallShield, FirewallStatus } from "../components/FirewallShield";


interface Scene2Props {
  frame: number;
  width: number;
  height: number;
  title?: string;
  isLastScene?: boolean;
}

export const Scene2: React.FC<Scene2Props> = ({ frame, width, height, title }) => {
  const { fps } = useVideoConfig();

  // Scene timing (5-13 seconds = frames 150-390)
  const localFrame = frame;
  const totalDuration = 240; // 8 seconds

  // Animation phases
  const introPhase = 0; // 0-30: intro
  const scanPhase = 30; // 30-90: port scanning
  const attackPhase = 90; // 90-140: attack attempt
  const firewallPhase = 140; // 140-180: firewall blocks
  const statusPhase = 180; // 180-240: status display

  // Phase detection
  const isIntro = localFrame < scanPhase;
  const isScanning = localFrame >= scanPhase && localFrame < attackPhase;
  const isAttack = localFrame >= attackPhase && localFrame < firewallPhase;
  const isBlocked = localFrame >= firewallPhase && localFrame < statusPhase;
  const isStatus = localFrame >= statusPhase;

  // Port scanning animation
  const scanProgress = isScanning
    ? interpolate(localFrame, [scanPhase, attackPhase, attackPhase + 10], [0, 1, 1], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType })
    : isAttack
    ? 1
    : 0;

  // Suspicious packet
  const suspiciousPacketProgress = isAttack
    ? interpolate(localFrame, [attackPhase, firewallPhase, firewallPhase + 10], [0, 1, 1], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType })
    : isBlocked
    ? 1
    : 0;

  // Firewall activation
  const firewallActivate = isBlocked
    ? interpolate(localFrame, [firewallPhase, firewallPhase + 20, firewallPhase + 30], [0, 1, 1], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType })
    : 0;

  // Firewall blocking visual
  const firewallScale = spring({ fps, frame: localFrame - firewallPhase, durationInFrames: 15 });

  // Title and captions
  const sectionTitleOpacity = interpolate(localFrame, [0, 15, 30, totalDuration - 30, totalDuration, totalDuration + 10], [0, 1, 1, 1, 0, 0], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType });
  const subsectionOpacity = interpolate(localFrame, [20, 35, totalDuration - 20, totalDuration, totalDuration + 10], [0, 1, 1, 0, 0], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType });

  // Camera movement
  const cameraZoom = interpolate(localFrame, [0, 60, 120, 180, totalDuration], [1, 1.1, 1.05, 1, 1], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType });
  const cameraY = interpolate(localFrame, [0, 60, 120, totalDuration], [0, -20, 0, 0], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Dark background with grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 40%, rgba(0, 50, 100, ${0.2 + Math.sin(localFrame * 0.02) * 0.05}) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(0, 100, 150, ${0.1 + Math.cos(localFrame * 0.025) * 0.05}) 0%, transparent 40%),
            linear-gradient(180deg, #000000 0%, #050515 50%, #000000 100%)
          `,
        }}
      />

      {/* Grid overlay */}
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
            stroke="#0066ff"
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
            stroke="#0066ff"
            strokeWidth={0.5}
            opacity={0.15}
          />
        ))}
      </svg>

      {/* Network visualization */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, ${cameraY}px) scale(${cameraZoom})`,
          width: "90%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Main network visualization */}
        <NetworkVisualization
          frame={localFrame}
          width={width * 0.8}
          height={height * 0.6}
          nodes={[
            { id: "internet", x: width * 0.1, y: height * 0.3, label: "INTERNET", color: "#ff3333", size: 14, pulse: true, isActive: true },
            { id: "attacker", x: width * 0.1, y: height * 0.3, label: "ATTACKER", color: "#ff3333", size: 12, pulse: true, isActive: true },
            { id: "firewall", x: width * 0.45, y: height * 0.5, label: "FIREWALL", color: "#00ffff", size: 16, pulse: true, isActive: true },
            { id: "server", x: width * 0.75, y: height * 0.5, label: "SERVER", color: "#00ff88", size: 14, pulse: true, isActive: true },
            { id: "user1", x: width * 0.85, y: height * 0.3, label: "USER", color: "#0066ff", size: 10, isActive: true },
            { id: "user2", x: width * 0.85, y: height * 0.7, label: "USER", color: "#0066ff", size: 10, isActive: true },
          ]          }
          connections={[
            { from: "internet", to: "firewall", color: "#ff3333", animated: true },
            { from: "firewall", to: "server", color: "#00ffff", animated: true },
            { from: "server", to: "user1", color: "#0066ff", animated: true },
            { from: "server", to: "user2", color: "#0066ff", animated: true },
          ]}
          packets={isAttack || isBlocked ? [
            {
              from: "attacker",
              to: "firewall",
              color: "#ff3333",
              isSuspicious: true,
              progress: suspiciousPacketProgress,
            },
          ] : []}
        />

        {/* Firewall shield */}
        <FirewallShield
          frame={localFrame}
          x={width * 0.45}
          y={height * 0.5}
          size={80 + 20 * firewallScale}
          isActive={true}
          blocking={isBlocked || isAttack}
          glowColor={isBlocked ? "#00ffff" : "#ff3333"}
          label="FIREWALL"
        />

        {/* Port scanner visualization */}
        {isScanning && (
          <div
            style={{
              position: "absolute",
              left: width * 0.05,
              top: height * 0.65,
              width: 120,
              height: 80,
              border: "1px solid #ff333340",
              borderRadius: 4,
              background: "rgba(0, 0, 0, 0.7)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 1,
                    width: "100%",
                    background: i < scanProgress * 40 ? "#ff3333" : "#0066ff",
                    opacity: 0.4,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: scanProgress * 80,
                width: "100%",
                height: 4,
                background: "linear-gradient(90deg, transparent, #ff3333, transparent)",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 4,
                left: 4,
                color: "#ff3333",
                fontSize: 8,
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            >
              SCANNING PORTS...
            </div>
          </div>
        )}

        {/* Network ports visualization */}
        <div
          style={{
            position: "absolute",
            left: width * 0.3,
            top: height * 0.7,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px",
                background: i === 4 && (isAttack || isBlocked) ? "rgba(255, 51, 51, 0.2)" : "rgba(0, 255, 255, 0.1)",
                border: `1px solid ${i === 4 && (isAttack || isBlocked) ? "#ff3333" : "#0066ff40"}`,
                borderRadius: 4,
                opacity: i === 4 && (isAttack || isBlocked) ? 1 : 0.7,
                transition: "all 0.1s ease-out",
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: i === 4 && (isAttack || isBlocked) ? "#ff3333" : "#aaddff",
                }}
              >
                PORT {i * 100}
              </span>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: i === 4 && (isAttack || isBlocked) ? "#ff3333" : i % 2 === 0 ? "#00ff88" : "#0066ff",
                  boxShadow: i === 4 && (isAttack || isBlocked) ? "0 0 6px #ff3333" : "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Attack indicator */}
      {(isAttack || isBlocked) && (
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ff3333",
              boxShadow: "0 0 10px #ff3333",
              animation: "suspiciousPulse 0.5s ease-in-out infinite",
            }}
          />
          <span
            style={{
              color: "#ff3333",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "monospace",
              textShadow: "0 0 10px rgba(255, 51, 51, 0.5)",
            }}
          >
            SUSPICIOUS PACKET DETECTED
          </span>
        </div>
      )}

      {/* Firewall blocking effect */}
      {isBlocked && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)",
            filter: "blur(20px)",
            animation: "padlockPulse 0.3s ease-in-out infinite",
          }}
        />
      )}

      {/* Status indicators */}
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
        <FirewallStatus
          frame={localFrame}
          x={0}
          y={0}
          status={isBlocked ? "blocking" : isAttack ? "active" : "active"}
          label="FIREWALL ACTIVE"
        />
        <FirewallStatus
          frame={localFrame}
          x={0}
          y={20}
          status="active"
          label="PORTS MONITORED"
        />
      </div>

      {/* Captions */}
      <GlowingTitle
        text="1. FIREWALL"
        frame={localFrame}
        duration={totalDuration}
        subtitle="YOUR DIGITAL BOUNCER"
        fontSize={48}
        color="#00ffff"
      />

      {/* Narration text */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "80%",
          transform: "translateX(-50%)",
          textAlign: "center",
          maxWidth: "80%",
          opacity: subsectionOpacity,
          color: "#aaddff",
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          textShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
        }}
      >
        {isIntro && "Your network uses numbered ports like doors to send data."}
        {isScanning && "Hackers scan for exposed services on open ports."}
        {isAttack && "A suspicious connection attempt is detected!"}
        {isBlocked && "A firewall acts as your digital bouncer, filtering unwanted traffic."}
        {isStatus && "Only authorized connections are allowed through."}
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 30,
          height: 30,
          borderTop: "2px solid #00ffff40",
          borderLeft: "2px solid #00ffff40",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: 30,
          height: 30,
          borderBottom: "2px solid #0066ff40",
          borderRight: "2px solid #0066ff40",
        }}
      />
    </div>
  );
};
