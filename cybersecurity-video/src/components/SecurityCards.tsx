import React from "react";
import { useCurrentFrame, interpolate, spring, Easing } from "remotion";

interface SecurityCardsProps {
  frame: number;
  width: number;
  height: number;
  highlightStandard?: boolean;
  showAdministrator?: boolean;
  transitionProgress?: number;
  position?: { x: number; y: number };
}

export const SecurityCards: React.FC<SecurityCardsProps> = ({
  frame,
  width,
  height,
  highlightStandard = true,
  showAdministrator = true,
  transitionProgress,
  position = { x: 0, y: 0 },
}) => {
  const cardWidth = Math.min(width * 0.4, 300);
  const cardHeight = 180;
  const gap = 20;

  // Entrance animation
  const standardOpacity = interpolate(frame, [0, 15, 30], [0, 1, 1]);
  const adminOpacity = showAdministrator ? interpolate(frame, [15, 30, 45], [0, 1, 1]) : 0;

  // Highlight pulse for standard user
  const highlightPulse = highlightStandard
    ? Math.sin(frame * 0.05) * 0.15 + 0.85
    : 1;

  // Card entrance animation
  const standardY = position.y - interpolate(frame, [0, 20, 40], [30, 0, 0]);
  const adminY = position.y - interpolate(frame, [15, 35, 50], [30, 0, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y - cardHeight,
        width: cardWidth + gap + cardWidth,
        display: "flex",
        flexDirection: "row",
        gap: gap,
        alignItems: "flex-start",
      }}
    >
      {/* Standard User Card */}
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          background: highlightStandard
            ? `linear-gradient(135deg, rgba(0, 255, 255, ${0.1 * highlightPulse}) 0%, rgba(0, 100, 200, ${0.1 * highlightPulse}) 100%)`
            : "rgba(20, 20, 40, 0.8)",
          border: highlightStandard
            ? `2px solid rgba(0, 255, 255, ${0.5 * highlightPulse})`
            : "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 12,
          padding: 16,
          boxShadow: highlightStandard
            ? `0 0 20px rgba(0, 255, 255, ${0.2 * highlightPulse}), inset 0 0 30px rgba(0, 255, 255, ${0.05 * highlightPulse})`
            : "0 4px 20px rgba(0, 0, 0, 0.5)",
          opacity: standardOpacity,
          transform: `translateY(${standardY}px)`,
          transition: "all 0.2s ease-out",
        }}
      >
        {/* Card header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: `1px solid ${highlightStandard ? "rgba(0, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
          }}
        >
          {/* User icon */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: highlightStandard
                ? "linear-gradient(135deg, #00ffff 0%, #0066ff 100%)"
                : "linear-gradient(135deg, #666 0%, #333 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: highlightStandard ? "#000" : "#fff",
            }}
          >
            {highlightStandard ? "✓" : "👤"}
          </div>

          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: highlightStandard ? "#00ffff" : "#888",
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "Arial, sans-serif",
            }}
          >
            STANDARD USER
          </span>
        </div>

        {/* Card content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: highlightStandard ? "#00ff88" : "#555",
                boxShadow: highlightStandard ? "0 0 6px #00ff88" : "none",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: highlightStandard ? "#aaddff" : "#666",
                fontFamily: "monospace",
              }}
            >
              Limited privileges
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: highlightStandard ? "#00ff88" : "#555",
                boxShadow: highlightStandard ? "0 0 6px #00ff88" : "none",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: highlightStandard ? "#aaddff" : "#666",
                fontFamily: "monospace",
              }}
            >
              Safe for daily use
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: highlightStandard ? "#00ff88" : "#555",
                boxShadow: highlightStandard ? "0 0 6px #00ff88" : "none",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: highlightStandard ? "#aaddff" : "#666",
                fontFamily: "monospace",
              }}
            >
              Restricted system changes
            </span>
          </div>
        </div>

        {/* Highlight badge */}
        {highlightStandard && (
          <div
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              background: "#00ff88",
              color: "#000",
              fontSize: 10,
              fontWeight: 700,
              padding: "4px 8px",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0, 255, 136, 0.5)",
              animation: "badgePulse 2s ease-in-out infinite",
            }}
          >
            RECOMMENDED
          </div>
        )}
      </div>

      {/* Administrator Card */}
      {showAdministrator && (
        <div
          style={{
            width: cardWidth,
            height: cardHeight,
            background: "rgba(40, 20, 20, 0.8)",
            border: "1px solid rgba(255, 51, 51, 0.3)",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            opacity: adminOpacity,
            transform: `translateY(${adminY}px)`,
            transition: "all 0.2s ease-out",
          }}
        >
          {/* Card header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255, 51, 51, 0.2)",
            }}
          >
            {/* Admin icon */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff3333 0%, #cc0000 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: "#fff",
              }}
            >
              ⚠
            </div>

            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#ff5555",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: "Arial, sans-serif",
              }}
            >
              ADMINISTRATOR
            </span>
          </div>

          {/* Card content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ff3333",
                  boxShadow: "0 0 6px #ff3333",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#ff8888",
                  fontFamily: "monospace",
                }}
              >
                Full system access
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ff3333",
                  boxShadow: "0 0 6px #ff3333",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#ff8888",
                  fontFamily: "monospace",
                }}
              >
                Can install software
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ff3333",
                  boxShadow: "0 0 6px #ff3333",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#ff8888",
                  fontFamily: "monospace",
                }}
              >
                Risk of malware damage
              </span>
            </div>
          </div>

          {/* Warning badge */}
          <div
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              background: "#ff3333",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              padding: "4px 8px",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(255, 51, 51, 0.5)",
            }}
          >
            RISKY
          </div>
        </div>
      )}
    </div>
  );
};

// Security wall visualization
export const SecurityWall: React.FC<{
  frame: number;
  width: number;
  height: number;
  strength?: number;
  breaches?: number;
  active?: boolean;
  position?: { x: number; y: number };
  color?: string;
}> = ({
  frame,
  width,
  height,
  strength = 100,
  breaches = 0,
  active = true,
  position = { x: 0, y: 0 },
  color = "#00ffff",
}) => {
  const wallOpacity = active ? 1 : 0.3;
  const breachPositions: Array<{ x: number; y: number; size: number }> = [];

  // Generate breach positions
  for (let i = 0; i < breaches; i++) {
    breachPositions.push({
      x: (i + 1) * (width / (breaches + 1)),
      y: height / 2 + (i % 2 === 0 ? -20 : 20),
      size: 15 + i * 3,
    });
  }

  // Wall segments
  const segments = Math.floor(width / 40);
  const segmentWidth = width / segments;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width,
        height,
        opacity: wallOpacity,
      }}
    >
      {/* Main wall background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 20, 40, 0.8)",
          borderRadius: 8,
          border: `1px solid ${color}20`,
          overflow: "hidden",
        }}
      >
        {/* Wall pattern */}
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * segmentWidth,
              top: 0,
              width: segmentWidth,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 4,
            }}
          >
            {Array.from({ length: Math.floor(height / 12) }).map((_, j) => (
              <div
                key={j}
                style={{
                  height: 8,
                  width: "100%",
                  background: i % 2 === j % 2 ? `${color}15` : "transparent",
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Breach indicators */}
      {breachPositions.map((breach, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: breach.x - breach.size / 2,
            top: breach.y - breach.size / 2,
            width: breach.size,
            height: breach.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, #ff3333 0%, transparent 70%)`,
            border: "2px solid #ff3333",
            boxShadow: "0 0 10px #ff3333, 0 0 20px #ff333340",
            animation: "breachPulse 0.5s ease-in-out infinite",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            !
          </span>
        </div>
      ))}

      {/* Wall strength indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 8,
          right: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 4,
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${strength}%`,
              background: strength > 50
                ? `linear-gradient(90deg, #00ff88, ${color})`
                : `linear-gradient(90deg, ${color}, #ff3333)`,
              borderRadius: 2,
              boxShadow: "0 0 8px currentColor",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: strength > 50 ? "#00ff88" : "#ff3333",
            fontFamily: "monospace",
          }}
        >
          {strength}%
        </span>
      </div>

      {/* Status label */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          color: active ? color : "#555",
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {active ? "SECURITY ACTIVE" : "SECURITY OFFLINE"}
      </div>
    </div>
  );
};

// Vulnerability indicator
export const Vulnerability: React.FC<{
  frame: number;
  x: number;
  y: number;
  severity?: "low" | "medium" | "high" | "critical";
  active?: boolean;
  pulse?: boolean;
  label?: string;
}> = ({
  frame,
  x,
  y,
  severity = "medium",
  active = true,
  pulse = true,
  label,
}) => {
  const severityColors = {
    low: "#00ff88",
    medium: "#ffcc00",
    high: "#ff8800",
    critical: "#ff3333",
  };
  const color = severityColors[severity];
  const pulseAnim = pulse ? Math.sin(frame * 0.08) * 0.2 + 0.8 : 1;

  // Size based on severity
  const size = severity === "critical" ? 24 : severity === "high" ? 20 : severity === "medium" ? 16 : 12;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: active ? 1 : 0.3,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}${Math.floor(pulseAnim * 50).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(4px)",
          animation: `vulnPulse ${0.5 / pulseAnim}s ease-in-out infinite`,
        }}
      />

      {/* Main indicator */}
      <div
        style={{
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: "50%",
          background: active ? color : "rgba(255, 255, 255, 0.1)",
          border: `2px solid ${color}`,
          boxShadow: active ? `0 0 8px ${color}` : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.4,
          color: active ? "#fff" : "#555",
        }}
      >
        {severity === "critical" ? "!" : severity === "high" ? "!!" : severity === "medium" ? "i" : "•"}
      </div>

      {/* Label */}
      {label && (
        <span
          style={{
            position: "absolute",
            bottom: -14,
            fontSize: 8,
            fontWeight: 600,
            color: color,
            fontFamily: "monospace",
            letterSpacing: 0.5,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

// Update effect animation
export const UpdateEffect: React.FC<{
  frame: number;
  x: number;
  y: number;
  progress?: number;
  color?: string;
}> = ({ frame, x, y, progress: externalProgress, color = "#00ff88" }) => {
  const updateFrame = frame;
  const updateDuration = 40;
  const progress = externalProgress ?? interpolate(updateFrame, [0, updateDuration], [0, 1], { extrapolateRight: "clamp" });

  // Ripple effect
  const rippleCount = 3;
  const ripples = React.useMemo(() => {
    const result: { radius: number; opacity: number; delay: number }[] = [];
    for (let i = 0; i < rippleCount; i++) {
      const rippleProgress = Math.max(0, progress - i * 0.15);
      result.push({
        radius: 10 + rippleProgress * 40,
        opacity: (1 - rippleProgress) * 0.6,
        delay: i * 0.15,
      });
    }
    return result;
  }, [progress]);

  // Repair sparkles
  const sparkles = React.useMemo(() => {
    const count = Math.floor(progress * 12);
    const result: { angle: number; distance: number; size: number }[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        angle: (i / count) * Math.PI * 2 + progress * 0.5,
        distance: 20 + progress * 30,
        size: 2 + (1 - progress) * 3,
      });
    }
    return result;
  }, [progress]);

  if (progress >= 1) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
      }}
    >
      {/* Center flash */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}40`,
          transform: `scale(${1 + progress * 2})`,
          opacity: 1 - progress,
        }}
      />

      {/* Ripples */}
      {ripples.map((ripple, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: -ripple.radius / 2,
            top: -ripple.radius / 2,
            width: ripple.radius,
            height: ripple.radius,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            opacity: ripple.opacity,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      ))}

      {/* Repair sparkles */}
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: Math.cos(sparkle.angle) * sparkle.distance,
            top: Math.sin(sparkle.angle) * sparkle.distance,
            width: sparkle.size,
            height: sparkle.size,
            background: color,
            borderRadius: "50%",
            boxShadow: `0 0 6px ${color}`,
            opacity: progress * 0.8,
          }}
        />
      ))}

      {/* Update checkmark */}
      {progress > 0.5 && (
        <div
          style={{
            position: "absolute",
            left: -8,
            top: -8,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 10px ${color}`,
            animation: "checkmarkPop 0.3s ease-out",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M 2 6 L 5 9 L 10 3"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

// CTA button with animation
export const CTAButton: React.FC<{
  frame: number;
  x: number;
  y: number;
  text: string;
  subtext?: string;
  color?: string;
  pulse?: boolean;
  clickable?: boolean;
}> = ({
  frame,
  x,
  y,
  text = "FOLLOW FOR MORE",
  subtext = "TECH BASICS",
  color = "#00ffff",
  pulse = true,
  clickable = false,
}) => {
  const opacity = interpolate(frame, [0, 10, 20], [0, 1, 1]);
  const scale = interpolate(frame, [0, 15, 30], [0.9, 1.05, 1]);
  const pulseAnim = pulse ? Math.sin(frame * 0.05) * 0.05 + 0.95 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale * pulseAnim})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: clickable ? "pointer" : "default",
      }}
    >
      {/* Button background glow */}
      <div
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: 12,
          background: `radial-gradient(ellipse, ${color}30 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />

      {/* Main button */}
      <div
        style={{
          padding: "14px 32px",
          background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
          border: `2px solid ${color}`,
          borderRadius: 8,
          boxShadow: `0 0 20px ${color}40, inset 0 0 20px ${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transform: clickable ? `scale(${1 + Math.sin(frame * 0.1) * 0.02})` : "none",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Arrow icon */}
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: `translateX(${clickable ? Math.sin(frame * 0.1) * 2 : 0}px)`,
          }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>

        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color,
            fontFamily: "Arial, sans-serif",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {text}
        </span>
      </div>

      {/* Subtext */}
      {subtext && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#aaddff",
            fontFamily: "monospace",
            letterSpacing: 1,
            opacity: 0.8,
          }}
        >
          {subtext}
        </span>
      )}

      {/* Follow animation dots */}
      <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: color,
              opacity: 0.6,
              animation: `dotPulse ${0.6 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
