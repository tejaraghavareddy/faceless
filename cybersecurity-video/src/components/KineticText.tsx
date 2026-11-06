import React from "react";
import { useVideoConfig, interpolate, spring } from "remotion";

interface KineticTextProps {
  text: string;
  frame: number;
  duration: number;
  position?: "top" | "center" | "bottom";
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  delay?: number;
  direction?: "left" | "right" | "up" | "down" | "center";
  glowColor?: string;
  opacity?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  frame,
  duration,
  position = "center",
  color = "#00ffff",
  fontSize = 32,
  fontWeight = 700,
  delay = 0,
  direction = "center",
  glowColor = "rgba(0, 255, 255, 0.6)",
  opacity: explicitOpacity,
}) => {
  const { height } = useVideoConfig();

  const entranceStart = 0;
  const entranceDuration = Math.min(15, duration * 0.3);
  const entranceProgress = interpolate(
    frame,
    [entranceStart + delay, entranceStart + delay + entranceDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const adjustedFrame = Math.max(0, frame - delay);
  const exitStart = Math.max(0, duration - 15);
  const exitProgress = interpolate(
    adjustedFrame,
    [exitStart, duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const enterOffset: number = direction === "center" ? 0 :
    direction === "left" ? interpolate(entranceProgress, [0, 1], [80, 0]) :
    direction === "right" ? interpolate(entranceProgress, [0, 1], [-80, 0]) :
    direction === "up" ? interpolate(entranceProgress, [0, 1], [60, 0]) :
    direction === "down" ? interpolate(entranceProgress, [0, 1], [-60, 0]) : 0;

  const exitOffset: number = direction === "center" ? 0 :
    direction === "left" ? exitProgress * 40 :
    direction === "right" ? exitProgress * -40 : 0;

  const scale = interpolate(entranceProgress, [0, 0.1, 1], [0.9, 1.05, 1]);
  const opacity = explicitOpacity ?? interpolate(
    frame,
    [delay, delay + 5, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const getYPosition = () => {
    switch (position) {
      case "top": return `${height * 0.15}`;
      case "center": return "50%";
      case "bottom": return `${height * 0.85}`;
      default: return "50%";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: getYPosition(),
        transform: `translateX(-50%) translateY(${enterOffset}px) translateY(${spring({ fps: 30, frame: adjustedFrame, durationInFrames: 10 }) * 20}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: position === "center" ? "center" : "flex-start",
        textAlign: "center",
        width: position === "center" ? "90%" : "auto",
      }}
    >
      {direction === "center" && (
        <div
          style={{
            position: "absolute",
            inset: -10,
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
            opacity: 0.5,
            WebkitFilter: "blur(8px)",
            filter: "blur(8px)",
            zIndex: -1,
          }}
        />
      )}

      <span
        style={{
          fontSize,
          fontWeight,
          color,
          fontFamily: "Arial, Helvetica, sans-serif",
          letterSpacing: 2,
          WebkitTransform: `scale(${scale})`,
          transform: `scale(${scale})`,
          transformOrigin: "center",
          textShadow: `0 0 20px ${color}40, 0 0 40px ${color}20, 0 0 60px ${color}10`,
          display: "inline-block",
          willChange: "transform, opacity",
        }}
      >
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: interpolate(adjustedFrame, [i * 0.03, i * 0.03 + 0.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              transform: `translateY(${(1 - interpolate(adjustedFrame, [i * 0.03, i * 0.03 + 0.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })) * 20}px)`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
};

export const GlowingTitle: React.FC<{
  text: string;
  frame: number;
  duration: number;
  subtitle?: string;
  fontSize?: number;
  color?: string;
}> = ({ text, frame, duration, subtitle, fontSize = 48, color = "#00ffff" }) => {
  const { height } = useVideoConfig();

  const mainOpacity = interpolate(frame, [0, 15, duration - 15, duration, duration + 10], [0, 1, 1, 0, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [20, 30, duration - 10, duration, duration + 10], [0, 1, 1, 0, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "90%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -5,
          background: `radial-gradient(ellipse, ${color}30 0%, transparent 70%)`,
          WebkitFilter: "blur(15px)",
          filter: "blur(15px)",
          opacity: mainOpacity * 0.5,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: -2,
          background: `radial-gradient(ellipse, ${color}50 0%, transparent 60%)`,
          WebkitFilter: "blur(8px)",
          filter: "blur(8px)",
          opacity: mainOpacity * 0.7,
        }}
      />

      <h1
        style={{
          fontSize,
          fontWeight: 900,
          color,
          fontFamily: "Arial, sans-serif",
          letterSpacing: 4,
          textShadow: `
            0 0 10px ${color},
            0 0 20px ${color},
            0 0 40px ${color}80,
            0 0 80px ${color}40
          `,
          opacity: mainOpacity,
          margin: 0,
          lineHeight: 1.2,
          WebkitTransform: `scale(${interpolate(frame, [0, 15, 30, 40], [0.9, 1.05, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          transform: `scale(${interpolate(frame, [0, 15, 30, 40], [0.9, 1.05, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          transformOrigin: "center",
        }}
      >
        {text}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#aaddff",
            fontFamily: "Arial, sans-serif",
            letterSpacing: 2,
            textShadow: `0 0 10px rgba(0, 255, 255, 0.5)`,
            opacity: subtitleOpacity,
            marginTop: 16,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
