import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, type ExtrapolateType, type EasingFunction } from "remotion";
import { KineticText, GlowingTitle } from "../components/KineticText";
import { ParticleSystem, NetworkNode, NetworkConnection, DataPacket, ParticleBurst } from "../components/ParticleSystem";

interface Scene1Props {
  frame: number;
  width: number;
  height: number;
  title?: string;
  isLastScene?: boolean;
}

export const Scene1: React.FC<Scene1Props> = ({ frame, width, height, title }) => {
  const { fps } = useVideoConfig();

  // Scene timing
  const totalDuration = 150; // 5 seconds
  const houseTransformStart = 30;
  const houseTransformEnd = 90;
  const titleRevealStart = 60;
  const titleRevealEnd = 130;

  // Animations
  const transformProgress = interpolate(frame, [houseTransformStart, houseTransformEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [titleRevealStart, titleRevealStart + 15, titleRevealEnd - 10, titleRevealEnd], [0, 1, 1, 0]);
  const titleScale = spring({ fps, frame: frame - titleRevealStart, durationInFrames: 15 });

  // Camera zoom effect
  const cameraZoom = interpolate(frame, [0, 60, 120, 150], [1, 1.2, 1.1, 1], { extrapolateLeft: "clamp" as ExtrapolateType, extrapolateRight: "clamp" as ExtrapolateType });

  // Particle burst at transform
  const burstAt = 60;
  const burstActive = frame >= burstAt && frame < burstAt + 30;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Background grid with pulse */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 30%, rgba(0, 200, 255, ${0.15 + Math.sin(frame * 0.02) * 0.05}) 0%, transparent 40%),
            radial-gradient(circle at 30% 70%, rgba(100, 0, 255, ${0.1 + Math.cos(frame * 0.025) * 0.05}) 0%, transparent 35%),
            radial-gradient(circle at 70% 50%, rgba(0, 255, 255, ${0.08 + Math.sin(frame * 0.03) * 0.03}) 0%, transparent 30%),
            linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)
          `,
        }}
      />

      {/* Grid lines */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.12 }}
        preserveAspectRatio="none"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={(i / 20) * height}
            x2={width}
            y2={(i / 20) * height}
            stroke={i % 2 === 0 ? "#00ffff" : "#0066ff"}
            strokeWidth={0.5}
            strokeOpacity={0.3}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(i / 15) * width}
            y1={0}
            x2={(i / 15) * width}
            y2={height}
            stroke={i % 2 === 0 ? "#00ffff" : "#0066ff"}
            strokeWidth={0.5}
            strokeOpacity={0.2}
          />
        ))}
      </svg>

      {/* Network connections in background */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.15 }}
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const x1 = (i / 6) * width;
          const y1 = Math.random() * height;
          const x2 = ((i + 1) / 6) * width;
          const y2 = Math.random() * height;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#0066ff"
              strokeWidth={0.5}
              strokeDasharray={`${4 + i * 2} ${6 - i}`}
            />
          );
        })}
      </svg>

      {/* Particles */}
      <ParticleSystem frame={frame} width={width} height={height} particleCount={30} />

      {/* Main content with camera zoom */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${cameraZoom})`,
          width: "80%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Digital House / Computer transformation */}
        <div
          style={{
            position: "relative",
            width: 200,
            height: 200,
          }}
        >
          {/* Digital House */}
          <DigitalHouse
            frame={frame}
            transformProgress={transformProgress}
            size={200}
          />

          {/* Computer Tower (appears during transformation) */}
          <ComputerTower
            frame={frame}
            transformProgress={transformProgress}
            size={200}
          />

          {/* Connection lines from house to network */}
          <svg
            width={300}
            height={300}
            style={{
              position: "absolute",
              left: -50,
              top: -50,
              opacity: 0.4,
            }}
          >
            <NetworkConnection
              x1={100}
              y1={150}
              x2={250}
              y2={100}
              color="#00ffff"
              animated
            />
            <NetworkConnection
              x1={100}
              y1={150}
              x2={250}
              y2={200}
              color="#0066ff"
              animated
            />
            <NetworkConnection
              x1={100}
              y1={150}
              x2={50}
              y2={100}
              color="#0066ff"
              animated
            />
          </svg>

          {/* Network nodes */}
          <NetworkNode
            x={250}
            y={100}
            size={8}
            color="#00ffff"
            pulse
            isActive
          />
          <NetworkNode
            x={250}
            y={200}
            size={8}
            color="#0066ff"
            pulse
            isActive
          />
          <NetworkNode
            x={50}
            y={100}
            size={6}
            color="#0066ff"
          />
        </div>
      </div>

      {/* Data packets flying around */}
      <DataPacket
        frame={frame}
        fromX={100 + Math.sin(frame * 0.05) * 50}
        fromY={300 + Math.cos(frame * 0.07) * 50}
        toX={900 + Math.cos(frame * 0.03) * 50}
        toY={400 + Math.sin(frame * 0.05) * 50}
        color="#00ffff"
        size={6}
        delay={0}
      />
      <DataPacket
        frame={frame}
        fromX={800 + Math.cos(frame * 0.04) * 30}
        fromY={200 + Math.sin(frame * 0.06) * 30}
        toX={200 + Math.sin(frame * 0.05) * 30}
        toY={600 + Math.cos(frame * 0.04) * 30}
        color="#0066ff"
        size={5}
        delay={20}
      />

      {/* Particle burst at transformation point */}
      {burstActive && (
        <ParticleBurst
          frame={frame}
          x={width / 2}
          y={height / 2}
          color="#00ffff"
          count={15}
          delay={0}
          burstFrame={burstAt}
        />
      )}

      {/* Title text */}
      <GlowingTitle
        text={title || "CYBER SECURITY IN 30 SECONDS"}
        frame={frame}
        duration={totalDuration}
        subtitle="HOW HACKERS ACTUALLY BREAK IN"
        fontSize={42}
        color="#00ffff"
      />

      {/* Subtitle below title */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "65%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: titleOpacity,
          color: "#aaddff",
          fontSize: 16,
          fontWeight: 600,
          fontFamily: "Arial, sans-serif",
          letterSpacing: 2,
          textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
        }}
      >
        Want to know how hackers actually break into computers?
        <br />
        It comes down to two things: your network and your operating system.
      </div>

      {/* Security indicators */}
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
            color: "#00ff88",
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
              background: "#00ff88",
              boxShadow: "0 0 6px #00ff88",
            }}
          />
          NETWORK: SECURE
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#00ff88",
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
              background: "#00ff88",
              boxShadow: "0 0 6px #00ff88",
            }}
          />
          OS: PATCHED
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 40,
          height: 40,
          borderRight: "2px solid #00ffff40",
          borderTop: "2px solid #00ffff40",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          width: 40,
          height: 40,
          borderLeft: "2px solid #0066ff40",
          borderBottom: "2px solid #0066ff40",
        }}
      />
    </div>
  );
};

// Digital House component
const DigitalHouse: React.FC<{ frame: number; transformProgress: number; size: number }> = ({ frame, transformProgress, size }) => {
  const opacity = 1 - transformProgress;
  const scale = 1 - transformProgress * 0.3;
  const rotation = transformProgress * 15;
  const yOffset = -transformProgress * 30;

  // House colors
  const roofColor = `rgba(0, 255, 255, ${0.6 * opacity})`;
  const wallColor = `rgba(0, 100, 200, ${0.5 * opacity})`;
  const doorColor = `rgba(0, 200, 255, ${0.7 * opacity})`;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg) translateY(${yOffset}px)`,
        opacity,
        transition: "all 0.05s linear",
      }}
    >
      <svg width={size} height={size * 0.9} viewBox="0 0 200 180">
        {/* Roof */}
        <path
          d="M 30 100 L 100 20 L 170 100 Z"
          fill={roofColor}
          stroke="#00ffff"
          strokeWidth={2}
        />

        {/* Walls */}
        <rect
          x={40}
          y={100}
          width={120}
          height={70}
          fill={wallColor}
          stroke="#0066ff"
          strokeWidth={2}
        />

        {/* Door */}
        <rect
          x={85}
          y={130}
          width={30}
          height={40}
          fill={doorColor}
          stroke="#00ffff"
          strokeWidth={1.5}
          rx={2}
        />

        {/* Door handle */}
        <circle
          cx={108}
          cy={150}
          r={3}
          fill="#00ffff"
          opacity={0.8}
        />

        {/* Windows */}
        <rect
          x={55}
          y={115}
          width={20}
          height={20}
          fill="rgba(0, 200, 255, 0.3)"
          stroke="#00ffff"
          strokeWidth={1.5}
          rx={1}
        />
        <rect
          x={125}
          y={115}
          width={20}
          height={20}
          fill="rgba(0, 200, 255, 0.3)"
          stroke="#00ffff"
          strokeWidth={1.5}
          rx={1}
        />

        {/* Window cross */}
        <line x1={65} y1={115} x2={65} y2={135} stroke="#00ffff" strokeWidth={1} />
        <line x1={55} y1={125} x2={75} y2={125} stroke="#00ffff" strokeWidth={1} />
        <line x1={135} y1={115} x2={135} y2={135} stroke="#00ffff" strokeWidth={1} />
        <line x1={125} y1={125} x2={145} y2={125} stroke="#00ffff" strokeWidth={1} />

        {/* Chimney */}
        <rect
          x={145}
          y={40}
          width={15}
          height={30}
          fill={roofColor}
          stroke="#00ffff"
          strokeWidth={1.5}
        />

        {/* Glow effect */}
        <rect
          x={40}
          y={100}
          width={120}
          height={70}
          fill={`url(#houseGlow-${frame})`}
          opacity={0.3}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id={`houseGlow-${frame}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Animated dots on house */}
        {Array.from({ length: 4 }).map((_, i) => (
          <circle
            key={i}
            cx={50 + i * 30}
            cy={145}
            r={2}
            fill="#00ffff"
            opacity={0.5 + Math.sin(frame * 0.1 + i) * 0.3}
          />
        ))}
      </svg>
    </div>
  );
};

// Computer Tower component
const ComputerTower: React.FC<{ frame: number; transformProgress: number; size: number }> = ({ frame, transformProgress, size }) => {
  const opacity = transformProgress;
  const scale = 0.7 + transformProgress * 0.3;
  const rotation = -transformProgress * 15;

  // Tower colors
  const towerColor = `rgba(30, 30, 60, ${0.8 * opacity})`;
  const accentColor = `rgba(0, 255, 255, ${0.6 * opacity})`;
  const lightColor = `rgba(0, 255, 255, ${0.8 * opacity})`;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        transition: "all 0.05s linear",
      }}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 200 240">
        {/* Tower body */}
        <rect
          x={50}
          y={30}
          width={100}
          height={180}
          fill={towerColor}
          stroke={accentColor}
          strokeWidth={2}
          rx={4}
        />

        {/* Front panel */}
        <rect
          x={60}
          y={40}
          width={80}
          height={160}
          fill="rgba(0, 0, 0, 0.5)"
          stroke={accentColor}
          strokeWidth={1}
          rx={2}
        />

        {/* Power button */}
        <circle
          cx={100}
          cy={60}
          r={8}
          fill="#0a0a1a"
          stroke={lightColor}
          strokeWidth={2}
        />
        <circle
          cx={100}
          cy={60}
          r={3}
          fill={lightColor}
          opacity={0.8 + Math.sin(frame * 0.1) * 0.2}
        />

        {/* Drive bays */}
        <rect
          x={65}
          y={80}
          width={70}
          height={20}
          fill="rgba(0, 255, 255, 0.1)"
          stroke={accentColor}
          strokeWidth={1}
          rx={1}
        />
        <rect
          x={65}
          y={105}
          width={70}
          height={20}
          fill="rgba(0, 255, 255, 0.1)"
          stroke={accentColor}
          strokeWidth={1}
          rx={1}
        />

        {/* Drive icons */}
        <circle cx={80} cy={90} r={4} fill={lightColor} opacity={0.6} />
        <circle cx={100} cy={90} r={4} fill={lightColor} opacity={0.6} />
        <circle cx={120} cy={90} r={4} fill={lightColor} opacity={0.6} />
        <circle cx={80} cy={115} r={4} fill={lightColor} opacity={0.6} />
        <circle cx={100} cy={115} r={4} fill={lightColor} opacity={0.6} />

        {/* Ventilation lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={55}
            y1={150 + i * 8}
            x2={145}
            y2={150 + i * 8}
            stroke={accentColor}
            strokeWidth={1}
            opacity={0.3}
          />
        ))}

        {/* LED indicators */}
        <rect
          x={65}
          y={175}
          width={8}
          height={4}
          fill="#00ff88"
          opacity={0.8 + Math.sin(frame * 0.15) * 0.2}
          rx={1}
        />
        <rect
          x={80}
          y={175}
          width={8}
          height={4}
          fill="#00ffff"
          opacity={0.6 + Math.sin(frame * 0.12 + 1) * 0.2}
          rx={1}
        />
        <rect
          x={95}
          y={175}
          width={8}
          height={4}
          fill="#ffcc00"
          opacity={0.6 + Math.sin(frame * 0.1 + 2) * 0.2}
          rx={1}
        />

        {/* Glow effect */}
        <rect
          x={50}
          y={30}
          width={100}
          height={180}
          fill={`url(#towerGlow-${frame})`}
          opacity={0.2}
          rx={4}
        />

        <defs>
          <linearGradient id={`towerGlow-${frame}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Antenna / network icon on top */}
        <circle cx={100} cy={20} r={3} fill={lightColor} opacity={0.8} />
        <path
          d="M 100 20 A 15 15 0 0 1 115 35"
          fill="none"
          stroke={accentColor}
          strokeWidth={1.5}
          opacity={0.6}
        />
        <path
          d="M 100 20 A 25 25 0 0 1 125 45"
          fill="none"
          stroke={accentColor}
          strokeWidth={1}
          opacity={0.4}
        />
      </svg>
    </div>
  );
};
