import React from "react";
import { interpolate, spring } from "remotion";

interface FirewallShieldProps {
  frame: number;
  x: number;
  y: number;
  size?: number;
  isActive?: boolean;
  blocking?: boolean;
  glowColor?: string;
  label?: string;
}

export const FirewallShield: React.FC<FirewallShieldProps> = ({
  frame,
  x,
  y,
  size = 80,
  isActive = true,
  blocking = false,
  glowColor = "#00ffff",
  label = "FIREWALL",
}) => {
  const scale = blocking
    ? spring({ fps: 30, frame, durationInFrames: 10 })
    : 1;
  const pulse = Math.sin(frame * 0.1) * 0.1 + 0.9;
  const shieldOpacity = isActive ? 1 : 0.5;
  const glowIntensity = blocking ? 1 : 0.5;

  // Shield path (shield shape)
  const shieldPath = `
    M 0 ${size * 0.1}
    C ${size * 0.1} ${size * 0.05}, ${size * 0.4} ${size * 0.05}, ${size * 0.5} ${size * 0.1}
    L ${size * 0.5} ${size * 0.1}
    C ${size * 0.7} ${size * 0.05}, ${size * 0.9} ${size * 0.05}, ${size * 0.95} ${size * 0.1}
    L ${size * 0.95} ${size * 0.6}
    C ${size * 0.95} ${size * 0.9}, ${size * 0.7} ${size * 0.95}, ${size * 0.5} ${size * 0.95}
    C ${size * 0.3} ${size * 0.95}, ${size * 0.05} ${size * 0.9}, ${size * 0.05} ${size * 0.6}
    Z
  `;

  // Inner glow path
  const innerShieldPath = shieldPath.replace(/size/g, `size * 0.85`);

  // Shield rotation (subtle)
  const rotation = Math.sin(frame * 0.02) * 2;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        pointerEvents: "none",
      }}
    >
      {/* Outer glow */}
      <svg
        width={size * 1.2}
        height={size * 1.2}
        style={{ position: "absolute", left: -size * 0.1, top: -size * 0.1 }}
      >
        <defs>
          <filter id={`glow-${frame}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id={`shieldGrad-${frame}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={glowColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d={shieldPath}
          fill={`url(#shieldGrad-${frame})`}
          stroke={glowColor}
          strokeWidth={2}
          opacity={glowIntensity * pulse}
          filter={blocking ? `url(#glow-${frame})` : "none"}
          style={{
            transform: "scale(1.1)",
            transition: "all 0.1s ease-out",
          }}
        />
      </svg>

      {/* Main shield */}
      <svg width={size} height={size} style={{ position: "absolute", left: 0, top: 0 }}>
        <path
          d={shieldPath}
          fill="rgba(0, 0, 0, 0.7)"
          stroke={glowColor}
          strokeWidth={2}
          opacity={shieldOpacity}
          filter={blocking ? `url(#glow-${frame})` : "none"}
        />

        {/* Shield icon */}
        <g transform={`translate(${size * 0.25}, ${size * 0.3})`}>
          {/* Checkmark or lock icon */}
          {blocking ? (
            <path
              d="M 5 15 L 12 22 L 28 5"
              stroke={glowColor}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.9}
            />
          ) : (
            <circle cx="15" cy="15" r="8" fill={glowColor} opacity="0.3" />
          )}
        </g>

        {/* Label */}
        <text
          x={size / 2}
          y={size * 0.85}
          textAnchor="middle"
          fill={glowColor}
          fontSize={8}
          fontWeight="bold"
          fontFamily="monospace"
          opacity={0.9}
          letterSpacing={1}
        >
          {label}
        </text>
      </svg>

      {/* Blocking indicator */}
      {blocking && (
        <div
          style={{
            position: "absolute",
            left: -5,
            top: -5,
            width: size + 10,
            height: size + 10,
            border: "2px solid #ff3333",
            borderRadius: "50%",
            opacity: 0.6,
            animation: "blockPulse 0.3s ease-in-out infinite",
          }}
        />
      )}

      {/* Active status indicator */}
      {isActive && !blocking && (
        <div
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00ff88",
            boxShadow: "0 0 6px #00ff88",
          }}
        />
      )}
    </div>
  );
};

// Shield wall (multiple shields in a row)
export const ShieldWall: React.FC<{
  frame: number;
  x: number;
  y: number;
  width: number;
  height: number;
  count?: number;
  activeCount?: number;
  color?: string;
}> = ({ frame, x, y, width, height, count = 5, activeCount, color = "#00ffff" }) => {
  const shields: Array<{ x: number; y: number; size: number; isActive: boolean }> = [];
  const active = activeCount ?? count;

  for (let i = 0; i < count; i++) {
    const shieldX = x + (width / (count + 1)) * (i + 1);
    shields.push({
      x: shieldX,
      y: y + height / 2,
      size: Math.min(width, height) * 0.15,
      isActive: i < active,
    });
  }

  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      {shields.map((shield, i) => (
        <FirewallShield
          key={i}
          frame={frame}
          x={shield.x}
          y={shield.y}
          size={shield.size}
          isActive={shield.isActive}
          glowColor={shield.isActive ? color : "#ff3333"}
        />
      ))}
    </div>
  );
};

// Digital lock / padlock icon
export const DigitalPadlock: React.FC<{
  frame: number;
  x: number;
  y: number;
  size?: number;
  isLocked?: boolean;
  glowColor?: string;
  animation?: "unlock" | "lock" | "idle";
  progress?: number;
}> = ({
  frame,
  x,
  y,
  size = 40,
  isLocked = true,
  glowColor = "#ffcc00",
  animation = "idle",
  progress,
}) => {
  // Animation progress
  const animProgress = animation !== "idle" ? (progress ?? interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" })) : 1;

  // Lock position based on animation
  const lockY = isLocked ? 0 : (1 - animProgress) * 10;
  const shackleOpacity = isLocked ? 1 : animProgress;
  const shackleRotation = isLocked ? 0 : (1 - animProgress) * -90;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        pointerEvents: "none",
      }}
    >
      <svg width={size} height={size} style={{ display: "block" }}>
        {/* Lock body */}
        <rect
          x={size * 0.2}
          y={size * 0.5}
          width={size * 0.6}
          height={size * 0.35}
          rx={size * 0.05}
          fill="rgba(0, 0, 0, 0.7)"
          stroke={glowColor}
          strokeWidth={2}
        />

        {/* Shackle (U-shaped part) */}
        <g
          transform={`translate(0, ${lockY}) rotate(${shackleRotation}, ${size / 2}, ${size * 0.35})`}
          opacity={shackleOpacity}
        >
          <path
            d={`M ${size * 0.25} ${size * 0.5}
                L ${size * 0.25} ${size * 0.3}
                A ${size * 0.25} ${size * 0.25} 0 0 1 ${size * 0.75} ${size * 0.3}
                L ${size * 0.75} ${size * 0.5}`}
            fill="none"
            stroke={glowColor}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>

        {/* Keyhole */}
        <circle
          cx={size * 0.5}
          cy={size * 0.62}
          r={size * 0.06}
          fill={glowColor}
        />
        <rect
          x={size * 0.48}
          y={size * 0.62}
          width={size * 0.04}
          height={size * 0.1}
          fill={glowColor}
        />

        {/* Glow effect */}
        {isLocked && (
          <circle
            cx={size * 0.5}
            cy={size * 0.5}
            r={size * 0.4}
            fill={`url(#padlockGlow-${frame})`}
            opacity={0.5}
          />
        )}
      </svg>

      {/* Glow ring */}
      {isLocked && (
        <div
          style={{
            position: "absolute",
            left: -size * 0.2,
            top: -size * 0.2,
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowColor}30 0%, transparent 70%)`,
            filter: "blur(4px)",
            animation: "padlockPulse 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Status text */}
      <div
        style={{
          position: "absolute",
          bottom: -12,
          left: "50%",
          transform: "translateX(-50%)",
          color: glowColor,
          fontSize: 8,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: 1,
          whiteSpace: "nowrap",
        }}
      >
        {isLocked ? "SECURE" : "UNLOCKED"}
      </div>
    </div>
  );
};

// Firewall status indicator
export const FirewallStatus: React.FC<{
  frame: number;
  x: number;
  y: number;
  status?: "active" | "inactive" | "blocking";
  label?: string;
}> = ({ frame, x, y, status = "active", label }) => {
  const statusColors = {
    active: "#00ff88",
    inactive: "#ff3333",
    blocking: "#ffaa00",
  };
  const color = statusColors[status];
  const pulse = Math.sin(frame * 0.1) * 0.2 + 0.8;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* Status dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px ${color}`,
          animation: status === "active" || status === "blocking" ? `pulse ${0.5 / pulse}s ease-in-out infinite` : "none",
        }}
      />

      {/* Label */}
      {label && (
        <span
          style={{
            color: "#aaddff",
            fontSize: 10,
            fontWeight: 600,
            fontFamily: "monospace",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
