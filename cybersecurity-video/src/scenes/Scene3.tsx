import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, type ExtrapolateType } from "remotion";
import { KineticText, GlowingTitle } from "../components/KineticText";
import {
  WiFIVisualization,
  EncryptionAnimation,
  GoldenPadlock,
  EncryptedPacket,
  ScrambledText,
} from "../components/EncryptionAnimation";
import { ParticleBurst } from "../components/ParticleSystem";
import { NetworkNode, NetworkConnection, ParticleSystem } from "../components/ParticleSystem";

interface Scene3Props {
  frame: number;
  width: number;
  height: number;
  title?: string;
  isLastScene?: boolean;
}

export const Scene3: React.FC<Scene3Props> = ({ frame, width, height, title }) => {
  const { fps } = useVideoConfig();

  // Scene timing (13-20 seconds = frames 390-600)
  const localFrame = frame;
  const totalDuration = 210; // 7 seconds

  // Animation phases
  const wifiPhase = 0; // 0-30: wifi setup
  const messagePhase = 30; // 30-60: show message
  const encryptPhase = 60; // 60-105: encryption animation
  const travelPhase = 105; // 105-150: encrypted data travels
  const securePhase = 150; // 150-210: secure status

  // Phase detection
  const isWifi = localFrame < messagePhase;
  const isShowingMessage = localFrame >= messagePhase && localFrame < encryptPhase;
  const isEncrypting = localFrame >= encryptPhase && localFrame < travelPhase;
  const isTraveling = localFrame >= travelPhase && localFrame < securePhase;
  const isSecure = localFrame >= securePhase;

  // Encryption progress
  const encryptProgress = isEncrypting
    ? interpolate(localFrame, [encryptPhase, travelPhase, travelPhase + 10], [0, 1, 1], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType })
    : isTraveling
    ? 1
    : 0;

  // Message
  const message = "Sensitive banking data travels over public Wi-Fi";

  // Camera movement
  const cameraZoom = interpolate(localFrame, [0, 60, 120, 180, 210], [1, 1.1, 1.05, 1, 1], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType });
  const cameraY = interpolate(localFrame, [0, 60, 150, 210], [0, -15, 0, 0], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType });

  // Recipient position for packet travel
  const senderX = width * 0.2;
  const senderY = height * 0.5;
  const recipientX = width * 0.75;
  const recipientY = height * 0.5;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 40%, rgba(0, 50, 80, ${0.2 + Math.sin(localFrame * 0.02) * 0.05}) 0%, transparent 50%),
            radial-gradient(circle at 30% 60%, rgba(0, 100, 50, ${0.1 + Math.cos(localFrame * 0.025) * 0.05}) 0%, transparent 40%),
            linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)
          `,
        }}
      />

      {/* Grid */}
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
            stroke="#00ff88"
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
            stroke="#00ff88"
            strokeWidth={0.5}
            opacity={0.15}
          />
        ))}
      </svg>

      {/* Main content area */}
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
        {/* Wi-Fi signal visualization */}
        <div
          style={{
            position: "absolute",
            left: senderX - 30,
            top: senderY - 80,
            opacity: isWifi || isShowingMessage ? 1 : 0.5,
          }}
        >
          <WiFIVisualization
            frame={localFrame}
            x={30}
            y={30}
            strength={3}
            color={isEncrypting || isTraveling ? "#00ff88" : "#ffcc00"}
            animated
            pulse
          />
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#aaddff",
              fontSize: 10,
              fontWeight: 600,
              fontFamily: "monospace",
              letterSpacing: 1,
            }}
          >
            PUBLIC WI-FI
          </div>
        </div>

        {/* Sender device */}
        <div
          style={{
            position: "absolute",
            left: senderX - 40,
            top: senderY - 40,
            width: 80,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              background: "rgba(0, 50, 80, 0.8)",
              border: "2px solid #00ff8840",
              boxShadow: "0 0 20px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M12 18h.01" />
              <path d="M17 10h.01" />
              <path d="M7 10h.01" />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#00ff88",
              fontSize: 9,
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            SENDER
          </div>
        </div>

        {/* Recipient device */}
        <div
          style={{
            position: "absolute",
            left: recipientX - 40,
            top: recipientY - 40,
            width: 80,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              background: "rgba(0, 50, 80, 0.8)",
              border: "2px solid #00ff8840",
              boxShadow: "0 0 20px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M12 18h.01" />
              <path d="M17 10h.01" />
              <path d="M7 10h.01" />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#00ff88",
              fontSize: 9,
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            RECIPIENT
          </div>
        </div>

        {/* Connection line between devices */}
        <svg
          width={width * 0.6}
          height={60}
          style={{
            position: "absolute",
            left: senderX + 20,
            top: senderY + 10,
            opacity: 0.4,
          }}
        >
          <line
            x1={0}
            y1={20}
            x2={width * 0.55}
            y2={20}
            stroke="#00ff88"
            strokeWidth={1.5}
            strokeDasharray="8 4"
            strokeDashoffset={-localFrame * 2}
          />
          <line
            x1={0}
            y1={20}
            x2={width * 0.55}
            y2={20}
            stroke="#00ff88"
            strokeWidth={1}
            opacity={0.3}
          />
        </svg>

        {/* Message display area */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translateX(-50%)",
            width: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Original message */}
          {(isShowingMessage || isEncrypting || isTraveling) && (
            <EncryptionAnimation
              frame={localFrame}
              width={width}
              height={height}
              message={message}
              progress={encryptProgress}
              size={22}
            />
          )}

          {/* Golden padlock */}
          <GoldenPadlock
            frame={localFrame}
            x={0}
            y={60}
            size={50}
            isLocked={isEncrypting || isTraveling || isSecure}
            glowIntensity={isEncrypting || isTraveling || isSecure ? 1 : 0.3}
            showLabel={isEncrypting || isTraveling || isSecure}
          />
        </div>

        {/* Encrypted packet traveling */}
        {isTraveling && (
          <EncryptedPacket
            frame={localFrame}
            fromX={senderX}
            fromY={senderY}
            toX={recipientX}
            toY={recipientY}
            progress={interpolate(localFrame, [travelPhase, securePhase, securePhase + 10], [0, 1, 1], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType })}
            color="#00ff88"
            size={14}
          />
        )}

        {/* Network nodes along the path */}
        {isTraveling && (
          <>
            <NetworkNode
              x={width * 0.35}
              y={height * 0.45}
              size={6}
              color="#00ff88"
            />
            <NetworkNode
              x={width * 0.5}
              y={height * 0.55}
              size={6}
              color="#00ff88"
            />
            <NetworkNode
              x={width * 0.6}
              y={height * 0.45}
              size={6}
              color="#00ff88"
            />
          </>
        )}
      </div>

      {/* Scrambled text effect (background) */}
      {isEncrypting && (
        <div
          style={{
            position: "absolute",
            left: "10%",
            top: "20%",
            width: "20%",
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            opacity: 0.3,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <ScrambledText
              key={i}
              frame={localFrame + i * 10}
              text={message.substring(0, 20)}
              color="#00ff88"
              size={14}
              speed={1 + i * 0.2}
            />
          ))}
        </div>
      )}

      {/* Security status */}
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
            color: isSecure ? "#00ff88" : "#ffcc00",
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
              background: isSecure ? "#00ff88" : "#ffcc00",
              boxShadow: `0 0 8px ${isSecure ? "#00ff88" : "#ffcc00"}`,
              animation: isSecure ? `pulse 1s ease-in-out infinite` : "none",
            }}
          />
          {isSecure ? "DATA ENCRYPTED" : isEncrypting ? "ENCRYPTING..." : "TRANSMITTING..."}
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
              background: "#0066ff",
              boxShadow: "0 0 6px #0066ff",
            }}
          />
          PROTOCOL: TLS/SSL
        </div>
      </div>

      {/* Captions */}
      <GlowingTitle
        text="2. ENCRYPTION"
        frame={localFrame}
        duration={totalDuration}
        subtitle="SCRAMBLE YOUR DATA"
        fontSize={48}
        color="#00ff88"
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
          color: "#aaddff",
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          textShadow: "0 0 10px rgba(0, 255, 136, 0.3)",
          opacity: interpolate(localFrame, [20, 35, totalDuration - 25, totalDuration, totalDuration + 10], [0, 1, 1, 0, 0], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType }),
        }}
      >
        {isWifi && "When data travels over Wi-Fi..."}
        {isShowingMessage && "Your sensitive data is visible to anyone on the network."}
        {isEncrypting && "Encryption scrambles it into unreadable code."}
        {isTraveling && "Only the recipient can decode it with the right key."}
        {isSecure && "This prevents snoopers from reading your sensitive information."}
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 30,
          height: 30,
          borderTop: "2px solid #00ff8840",
          borderRight: "2px solid #00ff8840",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          width: 30,
          height: 30,
          borderBottom: "2px solid #00ff8840",
          borderLeft: "2px solid #00ff8840",
        }}
      />
    </div>
  );
};
