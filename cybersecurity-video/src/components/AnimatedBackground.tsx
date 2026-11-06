import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface AnimatedBackgroundProps {
  opacity?: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ opacity = 0.5 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Subtle grid animation that shifts over time
  const gridOffset = interpolate(frame, [0, 900], [0, 100], { extrapolateRight: "clamp" });
  const pulse = interpolate(frame, [0, 30, 60, 90], [0.6, 1, 0.6, 0.8]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        background: `
          radial-gradient(circle at 50% 30%, rgba(0, 150, 255, ${0.15 * pulse}) 0%, transparent 40%),
          radial-gradient(circle at 20% 80%, rgba(0, 255, 255, ${0.1 * pulse}) 0%, transparent 35%),
          radial-gradient(circle at 80% 60%, rgba(100, 0, 255, ${0.1 * pulse}) 0%, transparent 30%),
          linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)
        `,
        backgroundSize: "100% 100%",
        backgroundPosition: `0px ${gridOffset}px`,
      }}
    >
      {/* Background animated grid lines - perspective effect */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.15 }}
        preserveAspectRatio="none"
      >
        {/* Horizontal lines */}
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
        {/* Vertical lines */}
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

      {/* Animated data stream lines */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.1 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`data-${i}`}
            x1={Math.random() * width}
            y1={0}
            x2={Math.random() * width}
            y2={height}
            stroke={Math.random() > 0.5 ? "#00ffff" : "#0066ff"}
            strokeWidth={0.5}
            strokeDasharray={`${2 + Math.random() * 4} ${8 - Math.random() * 4}`}
          />
        ))}
      </svg>

      {/* Gradient orb that pulses */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 200, 255, ${0.3 * pulse}) 0%, transparent 70%)`,
          top: "30%",
          left: "50%",
          transform: `translateX(-50%) translateY(${Math.sin(frame * 0.02) * 20}px)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(100, 0, 255, ${0.25 * pulse}) 0%, transparent 70%)`,
          top: "70%",
          right: "15%",
          transform: `translateY(${Math.sin(frame * 0.025 + 1) * 15}px)`,
          filter: "blur(30px)",
        }}
      />
    </div>
  );
};
