import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface EncryptionAnimationProps {
  frame: number;
  width: number;
  height: number;
  message?: string;
  progress?: number;
  position?: { x: number; y: number };
  size?: number;
}

export const EncryptionAnimation: React.FC<EncryptionAnimationProps> = ({
  frame,
  width,
  height,
  message = "Sensitive data travels over Wi-Fi",
  progress: externalProgress,
  position = { x: 0, y: 0 },
  size = 24,
}) => {
  // Calculate encryption progress
  const encryptFrame = frame;
  const encryptDuration = 45;
  const encryptProgress = externalProgress ?? interpolate(
    encryptFrame,
    [0, encryptDuration],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Message parts
  const words = message.split(" ");
  const encryptedMessage = words.map((word, i) => {
    const wordProgress = Math.max(0, encryptProgress - i * 0.05);
    if (wordProgress >= 1) {
      const chars = "!@#$%^&*()_+-=[]|;:',.<>?";
      return word.split("").map((_, j) => {
        return chars[(i * 17 + j * 31 + Math.floor(frame / 10)) % chars.length];
      }).join("");
    } else if (wordProgress > 0.5) {
      const progressInWord = (wordProgress - 0.5) * 2;
      const encryptedCount = Math.floor(word.length * progressInWord);
      return word.slice(0, word.length - encryptedCount) + word.slice(-encryptedCount).split("").map(() => {
        const chars = "!@#$%^&*";
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");
    }
    return word;
  }).join(" ");

  // Original message with individual word animation
  const displayedMessage = words.map((word, i) => {
    const wordProgress = Math.max(0, encryptProgress - i * 0.05);
    if (wordProgress >= 1) {
      const chars = "!@#$%^&*()_+-=[]|;:',.<>?";
      return word.split("").map((_, j) => {
        return chars[(i * 17 + j * 31 + Math.floor(frame / 10)) % chars.length];
      }).join("");
    }
    return word;
  }).join(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "auto",
        maxWidth: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* Original message */}
      <div
        style={{
          fontSize: size,
          fontWeight: 600,
          color: "#aaddff",
          fontFamily: "Arial, sans-serif",
          letterSpacing: 1,
          opacity: 1 - encryptProgress,
          textShadow: `0 0 10px rgba(0, 255, 255, ${(1 - encryptProgress) * 0.5})`,
          transition: "opacity 0.1s ease-out",
        }}
      >
        {message}
      </div>

      {/* Encryption indicator */}
      {encryptProgress > 0 && encryptProgress < 0.95 && (
        <div style={{ position: "relative", height: 20 }}>
          {/* Original text fading */}
          <div
            style={{
              fontSize: size,
              fontWeight: 600,
              color: "#ffcc00",
              fontFamily: "Arial, sans-serif",
              letterSpacing: 1,
              opacity: (1 - encryptProgress) * 0.8,
              transform: `translateY(${-encryptProgress * 5}px)`,
              textShadow: `0 0 10px rgba(255, 204, 0, ${(1 - encryptProgress) * 0.5})`,
            }}
          >
            {message}
          </div>

          {/* Encrypted text appearing */}
          <div
            style={{
              fontSize: size,
              fontWeight: 700,
              color: "#00ff88",
              fontFamily: "monospace",
              letterSpacing: 2,
              opacity: encryptProgress * 0.8,
              transform: `translateY(${encryptProgress * 5}px)`,
              textShadow: `0 0 10px rgba(0, 255, 136, ${encryptProgress * 0.5})`,
            }}
          >
            {displayedMessage}
          </div>
        </div>
      )}

      {/* Fully encrypted message */}
      {encryptProgress >= 0.95 && (
        <div
          style={{
            fontSize: size,
            fontWeight: 700,
            color: "#00ff88",
            fontFamily: "monospace",
            letterSpacing: 2,
            opacity: 1,
            textShadow: `0 0 15px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.3)`,
          }}
        >
          {displayedMessage}
        </div>
      )}

      {/* Encryption progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: -20,
          right: -20,
          height: 3,
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${encryptProgress * 100}%`,
            background: `linear-gradient(90deg, #ffcc00, #00ff88)`,
            borderRadius: 2,
            boxShadow: `0 0 10px #00ff88`,
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Encryption icon */}
      {encryptProgress < 0.5 && (
        <div
          style={{
            position: "absolute",
            right: -30,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EncryptionIcon frame={frame} progress={encryptProgress * 2} />
        </div>
      )}
    </div>
  );
};

// Encryption icon (lock transforming from open to closed)
const EncryptionIcon: React.FC<{ frame: number; progress: number }> = ({ frame, progress }) => {
  const lockOpen = progress < 0.5;
  const lockProgress = lockOpen ? progress * 2 : (1 - progress) * 2;
  const shackleHeight = lockOpen ? 8 : 8 * (1 - lockProgress);
  const shackleOpacity = lockOpen ? 1 : lockProgress;

  return (
    <svg width={24} height={24} viewBox="0 0 24 24">
      {/* Lock body */}
      <rect x="4" y="12" width="16" height="10" rx="2" fill="none" stroke="#ffcc00" strokeWidth="2" />

      {/* Shackle */}
      {lockOpen && (
        <path
          d={`M 6 12 V ${12 - shackleHeight} A 3 3 0 0 1 18 ${12 - shackleHeight} V 12`}
          fill="none"
          stroke="#ffcc00"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={shackleOpacity}
        />
      )}

      {/* Keyhole */}
      <circle cx="12" cy="16" r="1.5" fill="#ffcc00" opacity={0.8} />
      <rect x="11.5" y="16.5" width="1" height="3" fill="#ffcc00" opacity={0.8} />
    </svg>
  );
};

// Wi-Fi signal visualization
export const WiFIVisualization: React.FC<{
  frame: number;
  x: number;
  y: number;
  strength?: number;
  color?: string;
  animated?: boolean;
  pulse?: boolean;
}> = ({ frame, x, y, strength = 3, color = "#ffcc00", animated = true, pulse = true }) => {
  const signalStrength = strength;

  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}>
      {/* Signal waves */}
      {Array.from({ length: signalStrength }).map((_, i) => {
        const radius = 10 + i * 12;
        const opacity = 1 - i * 0.25;

        return (
          <svg
            key={i}
            width={radius * 2 + 20}
            height={radius * 2 + 20}
            viewBox={`-${(radius + 10)} -${(radius + 10)} ${radius * 2 + 20} ${radius * 2 + 20}`}
            style={{ position: "absolute", left: -radius, top: -radius }}
          >
            <path
              d={`M 0 ${radius + 10} A ${radius + 10} ${radius + 10} 0 0 1 0 ${-(radius + 10)}`}
              fill="none"
              stroke={color}
              strokeWidth={2 - i * 0.3}
              strokeLinecap="round"
              opacity={opacity * (pulse ? 0.6 + Math.sin(frame * 0.1 + i) * 0.2 : 0.7)}
            />
          </svg>
        );
      })}

      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          left: -5,
          top: -5,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
};

// Scrambled text effect (for encrypted message traveling)
export const ScrambledText: React.FC<{
  frame: number;
  text: string;
  color?: string;
  size?: number;
  speed?: number;
  showOriginal?: boolean;
}> = ({ frame, text, color = "#00ff88", size = 20, speed = 1, showOriginal = false }) => {
  const chars = "!@#$%^&*()_+-=[]|;:',.<>?";

  const scrambledText = text.split("").map((originalChar, i) => {
    if (originalChar === " ") {
      return " ";
    }

    const seed = i * 13 + frame * speed;
    const randomIndex = Math.floor((seed * 7 + frame * 11) % chars.length);
    return chars[randomIndex];
  }).join("");

  const opacity = showOriginal
    ? interpolate(frame, [0, 15, 30], [1, 0, 0])
    : interpolate(frame, [0, 5, 10], [0, 1, 1]);

  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 700,
        color,
        fontFamily: "monospace",
        letterSpacing: 1,
        opacity,
        textShadow: `0 0 10px ${color}40`,
      }}
    >
      {scrambledText}
    </div>
  );
};

// Encrypted message packet (traveling across network)
export const EncryptedPacket: React.FC<{
  frame: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress?: number;
  color?: string;
  size?: number;
  delay?: number;
}> = ({
  frame,
  fromX,
  fromY,
  toX,
  toY,
  progress: externalProgress,
  color = "#00ff88",
  size = 12,
  delay = 0,
}) => {
  const effectiveFrame = Math.max(0, frame - delay);
  const packetProgress = externalProgress ?? interpolate(effectiveFrame, [0, 50], [0, 1], { extrapolateRight: "clamp" });

  const x = fromX + (toX - fromX) * packetProgress;
  const y = fromY + (toY - fromY) * packetProgress;

  // Wobble effect - encryption makes it wobble
  const wobbleX = Math.sin(effectiveFrame * 0.5) * 2;
  const wobbleY = Math.cos(effectiveFrame * 0.3) * 2;

  // Encryption particles around packet
  const particles = React.useMemo(() => {
    const result: { offsetX: number; offsetY: number; char: string }[] = [];
    const chars = "!@#$%^&*";
    for (let i = 0; i < 4; i++) {
      result.push({
        offsetX: (i - 1.5) * 6,
        offsetY: (i % 2 === 0 ? 1 : -1) * 4,
        char: chars[(i * 7 + Math.floor(effectiveFrame / 5)) % chars.length],
      });
    }
    return result;
  }, [effectiveFrame]);

  return (
    <div
      style={{
        position: "absolute",
        left: x + wobbleX - size / 2,
        top: y + wobbleY - size / 2,
        pointerEvents: "none",
      }}
    >
      {/* Packet glow */}
      <div
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          filter: "blur(4px)",
        }}
      />

      {/* Main packet */}
      <div
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${color}80, ${color}40)`,
          borderRadius: 3,
          border: `1px solid ${color}`,
          boxShadow: `0 0 10px ${color}, inset 0 0 10px ${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 8,
            fontWeight: 700,
            color,
            fontFamily: "monospace",
          }}
        >
          🔒
        </span>
      </div>

      {/* Scrambling particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.offsetX,
            top: p.offsetY,
            fontSize: 6,
            color,
            fontFamily: "monospace",
            opacity: 0.8,
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
};

// Golden padlock with glow
export const GoldenPadlock: React.FC<{
  frame: number;
  x: number;
  y: number;
  size?: number;
  isLocked?: boolean;
  glowIntensity?: number;
  showLabel?: boolean;
}> = ({
  frame,
  x,
  y,
  size = 50,
  isLocked = true,
  glowIntensity = 1,
  showLabel = true,
}) => {
  const pulse = Math.sin(frame * 0.05) * 0.1 + 0.9;
  const glowColor = "#ffd700";
  const padlockGlow = glowIntensity * (0.5 + pulse * 0.5);

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor}${Math.floor(padlockGlow * 50).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />

      {/* Padlock SVG */}
      <svg width={size} height={size * 0.8} viewBox="0 0 50 40">
        {/* Shackle */}
        <path
          d="M 15 20 V 10 A 10 10 0 0 1 35 10 V 20"
          fill="none"
          stroke={glowColor}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={isLocked ? 1 : 0.3}
        />

        {/* Lock body */}
        <rect
          x="8"
          y="20"
          width="34"
          height="18"
          rx="3"
          fill="rgba(0, 0, 0, 0.7)"
          stroke={glowColor}
          strokeWidth={2}
        />

        {/* Keyhole */}
        <circle cx="25" cy="28" r="3" fill={glowColor} />
        <rect x="23.5" y="28" width="3" height="6" fill={glowColor} />

        {/* Shine effect */}
        <rect
          x="12"
          y="23"
          width="26"
          height="2"
          rx="1"
          fill={glowColor}
          opacity={0.3}
        />
      </svg>

      {/* Label */}
      {showLabel && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: glowColor,
            fontFamily: "monospace",
            letterSpacing: 2,
            textShadow: `0 0 5px ${glowColor}60`,
          }}
        >
          ENCRYPTED
        </span>
      )}
    </div>
  );
};
