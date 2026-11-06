import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  life: number;
  type: "dot" | "line" | "glow" | "packet";
  startFrame: number;
  duration: number;
}

interface ParticleSystemProps {
  frame: number;
  width: number;
  height: number;
  particleCount?: number;
}

// Deterministic pseudo-random based on seed
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  frame,
  width,
  height,
  particleCount = 40,
}) => {
  // Generate particles deterministically based on frame
  const particles: Particle[] = React.useMemo(() => {
    const result: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const seed = i * 1000 + frame;
      const type = (Math.floor(seededRandom(seed)) * 4) % 4 as unknown as Particle["type"];
      const startFrame = Math.floor(seededRandom(seed * 2) * 900);
      const duration = 60 + Math.floor(seededRandom(seed * 3) * 120);

      // Reset particle when it expires
      const resetFrame = (frame - startFrame) % duration;
      const t = resetFrame / duration;

      result.push({
        id: i,
        x: seededRandom(seed) * width,
        y: seededRandom(seed * 1.5) * height,
        size: 1 + seededRandom(seed * 2) * 3,
        speedX: (seededRandom(seed * 3) - 0.5) * 0.5,
        speedY: (seededRandom(seed * 4) - 0.5) * 0.5 - 0.2,
        opacity: 0.3 + seededRandom(seed * 5) * 0.7,
        color: [
          "#00ffff",
          "#0066ff",
          "#ff3333",
          "#ffcc00",
        ][Math.floor(seededRandom(seed * 6) * 4)],
        life: t,
        type,
        startFrame,
        duration,
      });
    }
    return result;
  }, [frame, width, height, particleCount]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p) => {
        // Calculate particle position over its lifetime
        const lifeProgress = p.life;
        const x = p.x + p.speedX * frame + (lifeProgress - 0.5) * 100;
        const y = p.y + p.speedY * frame + (lifeProgress - 0.5) * 50;
        const opacity = p.opacity * (1 - Math.abs(lifeProgress - 0.5) * 2) * 0.6;
        const pulse = Math.sin(frame * 0.1 + p.id) * 0.3 + 0.7;

        if (opacity <= 0.05) return null;

        const baseStyle = {
          position: "absolute",
          pointerEvents: "none",
          opacity,
        };

        switch (p.type) {
          case "dot":
            return (
              <div
                key={p.id}
                style={{
                  ...baseStyle,
                  left: x % width,
                  top: y % height,
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background: p.color,
                  WebkitBoxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                } as React.CSSProperties}
              />
            );

          case "line":
            return (
              <div
                key={p.id}
                style={{
                  ...baseStyle,
                  left: x % width,
                  top: y % height,
                  width: p.size * 3,
                  height: 1,
                  background: p.color,
                  WebkitBoxShadow: `0 0 ${p.size}px ${p.color}`,
                  boxShadow: `0 0 ${p.size}px ${p.color}`,
                  WebkitTransform: `rotate(${p.speedX * 30}deg)`,
                  transform: `rotate(${p.speedX * 30}deg)`,
                } as React.CSSProperties}
              />
            );

          case "glow":
            return (
              <div
                key={p.id}
                style={{
                  ...baseStyle,
                  left: x % width,
                  top: y % height,
                  width: p.size * 4,
                  height: p.size * 4,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${p.color}80 0%, ${p.color}20 40%, transparent 70%)`,
                  WebkitFilter: "blur(2px)",
                  filter: "blur(2px)" as const,
                  animation: `pulse ${2 + p.id * 0.1}s ease-in-out infinite`,
                } as React.CSSProperties}
              />
            );

          case "packet":
            return (
              <div
                key={p.id}
                style={{
                  ...baseStyle,
                  left: x % width,
                  top: y % height,
                  width: p.size * 2,
                  height: p.size * 2,
                  background: p.color,
                  borderRadius: "2px",
                  WebkitBoxShadow: `0 0 ${p.size}px ${p.color}`,
                  boxShadow: `0 0 ${p.size}px ${p.color}`,
                  WebkitTransform: `rotate(${frame * p.speedX * 10}deg)`,
                  transform: `rotate(${frame * p.speedX * 10}deg)`,
                } as React.CSSProperties}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

// Specialized data packet animation for network scenes
export const DataPacket: React.FC<{
  frame: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color?: string;
  size?: number;
  delay?: number;
  isSuspicious?: boolean;
  progress?: number;
}> = ({
  frame,
  fromX,
  fromY,
  toX,
  toY,
  color = "#00ffff",
  size = 8,
  delay = 0,
  isSuspicious = false,
  progress,
}) => {
  const effectiveFrame = Math.max(0, frame - delay);
  const packetProgress = progress ?? interpolate(effectiveFrame, [0, 60], [0, 1], { extrapolateRight: "clamp" });

  const x = fromX + (toX - fromX) * packetProgress;
  const y = fromY + (toY - fromY) * packetProgress;

  // Wobble effect
  const wobble = Math.sin(effectiveFrame * 0.3) * 3;

  // Trail particles
  const trailPositions = React.useMemo(() => {
    const trail: { x: number; y: number; opacity: number }[] = [];
    for (let i = 1; i <= 3; i++) {
      const t = Math.max(0, packetProgress - i * 0.03);
      const tx = fromX + (toX - fromX) * t;
      const ty = fromY + (toY - fromY) * t + wobble;
      trail.push({
        x: tx,
        y: ty,
        opacity: (1 - i * 0.25) * 0.5,
      });
    }
    return trail;
  }, [fromX, fromY, toX, toY, packetProgress, wobble]);

  const glowColor = isSuspicious ? "#ff3333" : color;
  const glowSize = isSuspicious ? size * 2 : size * 1.5;

  return (
    <>
      {/* Trail */}
      {trailPositions.map((t, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: t.x,
            top: t.y,
            width: size * 0.5,
            height: size * 0.5,
            borderRadius: "50%",
            background: glowColor,
            opacity: t.opacity,
            boxShadow: `0 0 ${size}px ${glowColor}`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main packet */}
      <div
        style={{
          position: "absolute",
          left: x + wobble,
          top: y,
          width: size,
          height: size,
          background: isSuspicious ? "#ff3333" : color,
          borderRadius: "50%",
          boxShadow: `0 0 ${glowSize}px ${glowColor}, 0 0 ${glowSize * 2}px ${glowColor}40`,
          pointerEvents: "none",
          animation: `packetPulse ${0.3}s ease-in-out infinite alternate`,
        }}
      >
        {isSuspicious && (
          <div
            style={{
              position: "absolute",
              inset: -4,
              border: "2px solid #ff3333",
              borderRadius: "50%",
              animation: "suspiciousPulse 0.5s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </>
  );
};

// Network node with connections
export const NetworkNode: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  label?: string;
  pulse?: boolean;
  isActive?: boolean;
}> = ({ x, y, size = 12, color = "#00ffff", label, pulse = false, isActive = false }) => {
  const glowSize = pulse ? 20 + Math.sin(useCurrentFrame() * 0.1) * 5 : 15;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: isActive ? color : "#1a1a2e",
        border: `2px solid ${color}`,
        boxShadow: `0 0 ${glowSize}px ${color}60, inset 0 0 ${glowSize / 2}px ${color}20`,
        pointerEvents: "none",
      }}
    >
      {label && (
        <span
          style={{
            position: "absolute",
            top: size / 2 + 4,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#aaddff",
            fontSize: 10,
            fontWeight: 600,
            whiteSpace: "nowrap",
            fontFamily: "monospace",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

// Connection line between nodes
export const NetworkConnection: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  animated?: boolean;
  width?: number;
  pulse?: boolean;
}> = ({ x1, y1, x2, y2, color = "#0066ff", animated = true, width = 2, pulse = false }) => {
  const frame = useCurrentFrame();
  const dashOffset = animated ? (frame * 2) % 20 : 0;

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={`${8} ${6}`}
        strokeDashoffset={animated ? -dashOffset : 0}
        strokeLinecap="round"
        opacity={pulse ? 0.6 + Math.sin(frame * 0.1) * 0.2 : 0.7}
      />
    </svg>
  );
};

// Particle burst effect
export const ParticleBurst: React.FC<{
  frame: number;
  x: number;
  y: number;
  color?: string;
  count?: number;
  delay?: number;
  burstFrame?: number;
}> = ({ frame, x, y, color = "#00ffff", count = 12, delay = 0, burstFrame = 0 }) => {
  const effectiveFrame = frame - delay;
  const isActive = effectiveFrame >= burstFrame && effectiveFrame < burstFrame + 30;
  const burstProgress = isActive ? (effectiveFrame - burstFrame) / 30 : 0;

  if (!isActive && burstProgress >= 1) return null;

  const particles = React.useMemo(() => {
    const result: { angle: number; speed: number; size: number }[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        angle: (i / count) * Math.PI * 2,
        speed: 50 + Math.random() * 30,
        size: 2 + Math.random() * 3,
      });
    }
    return result;
  }, [count]);

  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const px = Math.cos(p.angle) * p.speed * burstProgress;
        const py = Math.sin(p.angle) * p.speed * burstProgress;
        const opacity = 1 - burstProgress;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px - 2,
              top: py - 2,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: color,
              opacity,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
              transform: `rotate(${frame * 0.1}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};
