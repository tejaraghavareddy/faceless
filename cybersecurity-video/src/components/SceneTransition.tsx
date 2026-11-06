import React from "react";

interface SceneTransitionProps {
  frame: number;
  fromScene: string;
  toScene: string;
  progress: number;
}

function customInterpolate(value: number, inputRange: [number, number, number], outputRange: [number, number, number], extrapolateLeft?: string, extrapolateRight?: string): number {
  const [inputStart, inputMid, inputEnd] = inputRange;
  const [outputStart, outputMid, outputEnd] = outputRange;

  if (value <= inputStart) {
    if (extrapolateLeft === "clamp") {
      return outputStart;
    }
    const t = (value - inputStart) / (inputMid - inputStart);
    return outputStart + (outputMid - outputStart) * t;
  }

  if (value >= inputEnd) {
    if (extrapolateRight === "clamp") {
      return outputEnd;
    }
    const t = (value - inputMid) / (inputEnd - inputMid);
    return outputMid + (outputEnd - outputMid) * t;
  }

  if (value <= inputMid) {
    const t = (value - inputStart) / (inputMid - inputStart);
    return outputStart + (outputMid - outputStart) * t;
  } else {
    const t = (value - inputMid) / (inputEnd - inputMid);
    return outputMid + (outputEnd - outputMid) * t;
  }
}

// Alias for backwards compatibility
const interpolate = customInterpolate;

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  frame,
  fromScene,
  toScene,
  progress,
}) => {
  // Different transition types based on scenes
  const transitionType = getTransitionType(fromScene, toScene);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {transitionType === "fade" && (
        <FadingTransition frame={frame} progress={progress} />
      )}
      {transitionType === "swipe" && (
        <SwipeTransition frame={frame} progress={progress} />
      )}
      {transitionType === "glitch" && (
        <GlitchTransition frame={frame} progress={progress} fromScene={fromScene} toScene={toScene} />
      )}
      {transitionType === "zoom" && (
        <ZoomTransition frame={frame} progress={progress} />
      )}
    </div>
  );
};

const getTransitionType = (from: string, to: string): "fade" | "swipe" | "glitch" | "zoom" => {
  // Scene 1 to 2: Fade
  if (from === "scene1" && to === "scene2") return "fade";
  // Scene 2 to 3: Swipe
  if (from === "scene2" && to === "scene3") return "swipe";
  // Scene 3 to 4: Glitch
  if (from === "scene3" && to === "scene4") return "glitch";
  // Default: zoom
  return "zoom";
};

// Fade transition
const FadingTransition: React.FC<{ frame: number; progress: number }> = ({ frame, progress }) => {
  const fadeOut = customInterpolate(progress, [0, 0.5, 1], [0, 0, 1]);
  const fadeIn = customInterpolate(progress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "black",
        opacity: fadeOut,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {/* Overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 50%, transparent 100%)`,
          opacity: fadeIn * 0.5,
        }}
      />
    </div>
  );
};

// Swipe transition
const SwipeTransition: React.FC<{ frame: number; progress: number }> = ({ frame, progress }) => {
  const swipeProgress = customInterpolate(progress, [0, 0.5, 1], [0, 0.5, 1]);
  const swipeX = -swipeProgress * 100;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, #000000 0%, #0a0a2a 50%, #000000 100%)",
        transform: `translateX(${swipeX}%)`,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {/* Light trail */}
      <div
        style={{
          position: "absolute",
          right: "0%",
          top: "50%",
          width: 60,
          height: 300,
          background: "linear-gradient(90deg, transparent, #00ffff80, transparent)",
          filter: "blur(10px)",
          transform: "translateY(-50%)",
          opacity: 1 - swipeProgress,
        }}
      />
    </div>
  );
};

// Glitch transition
const GlitchTransition: React.FC<{ frame: number; progress: number; fromScene: string; toScene: string }> = ({
  frame,
  progress,
}) => {
  const glitchIntensity = customInterpolate(progress, [0, 0.3, 1], [0, 1, 0]);
  const glitchOffset = (Math.sin(frame * 20) * 0.5 + Math.sin(frame * 37) * 0.3 + Math.sin(frame * 53) * 0.2) * glitchIntensity * 30;
  const glitchOpacity = glitchIntensity * (0.3 + Math.sin(frame * 13) * 0.2);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {/* RGB split effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
          transform: `translateX(${glitchOffset}px)`,
          opacity: glitchOpacity,
          mixBlendMode: "screen",
        }}
      >
        {/* Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, 0.1) 2px,
                rgba(0, 255, 255, 0.1) 4px
              )
            `,
          }}
        />
      </div>

      {/* Color glitch bars */}
      {Array.from({ length: 5 }).map((_, i) => {
        const barY = (i / 5) * 100 + Math.sin(frame * 0.1 + i * 2) * 10;
        const barHeight = 20 + Math.sin(frame * 0.15 + i * 3) * 10;
        const barOpacity = glitchIntensity * (0.5 + Math.sin(frame * 0.2 + i) * 0.3);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 80 + 10}%`,
              top: `${barY}%`,
              width: `${5 + Math.random() * 10}%`,
              height: `${barHeight}%`,
              background: i % 2 === 0 ? "#ff0000" : "#00ffff",
              opacity: barOpacity * 0.3,
              mixBlendMode: "screen",
              transform: `skewX(${Math.sin(frame * 0.1 + i) * 10}deg)`,
            }}
          />
        );
      })}

      {/* Noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at ${50 + Math.sin(frame * 0.05) * 20}% ${50 + Math.cos(frame * 0.07) * 20}%, 
              rgba(0, 255, 255, ${glitchIntensity * 0.1}) 0%, 
              transparent 50%
            )
          `,
        }}
      />
    </div>
  );
};

// Zoom transition
const ZoomTransition: React.FC<{ frame: number; progress: number }> = ({ frame, progress }) => {
  const zoomOut = customInterpolate(progress, [0, 0.5, 1], [1, 1.5, 2]);
  const opacity = customInterpolate(progress, [0, 0.5, 1], [0, 0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at center, #000000 0%, #0a0a2a 50%, #000000 100%)",
        transform: `scale(${zoomOut})`,
        opacity,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {/* Digital grid during zoom */}
      <svg
        width={1000}
        height={1000}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.3,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`hg-${i}`}
            x1={0}
            y1={i * 50}
            x2={1000}
            y2={i * 50}
            stroke="#00ffff"
            strokeWidth={0.5}
            opacity={0.3 - i * 0.01}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`vg-${i}`}
            x1={i * 50}
            y1={0}
            x2={i * 50}
            y2={1000}
            stroke="#0066ff"
            strokeWidth={0.5}
            opacity={0.2 - i * 0.01}
          />
        ))}
      </svg>
    </div>
  );
};

// Transition flash effect
export const TransitionFlash: React.FC<{
  frame: number;
  delay?: number;
  duration?: number;
  color?: string;
}> = ({ frame, delay = 0, duration = 5, color = "#00ffff" }) => {
  const effectiveFrame = frame - delay;
  const flashOpacity = customInterpolate(effectiveFrame, [0, 0.5, duration], [0.8, 0.4, 0]);

  if (flashOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity: flashOpacity,
        pointerEvents: "none",
        zIndex: 200,
        mixBlendMode: "screen",
      }}
    />
  );
};

// Digital wipe transition
export const DigitalWipe: React.FC<{
  frame: number;
  progress: number;
  direction?: "left" | "right" | "up" | "down";
  color?: string;
}> = ({ frame, progress, direction = "left", color = "#00ffff" }) => {
  const wipeProgress = customInterpolate(progress, [0, 0.5, 1], [0, 50, 100]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 150,
      }}
    >
      {/* Wipe line */}
      <div
        style={{
          position: "absolute",
          [direction === "left" || direction === "right" ? "top" : "left"]: "0%",
          [direction === "left" || direction === "right" ? "left" : "top"]: `${wipeProgress}%`,
          width: direction === "left" || direction === "right" ? "100%" : `${wipeProgress}%`,
          height: direction === "left" || direction === "right" ? `${100 - wipeProgress}%` : "100%",
          background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
          filter: "blur(2px)",
        }}
      />

      {/* Digital blocks behind wipe */}
      <div
        style={{
          position: "absolute",
          [direction === "left" || direction === "right" ? "top" : "left"]: "0%",
          [direction === "left" || direction === "right" ? "left" : "top"]: `${wipeProgress - 5}%`,
          width: direction === "left" || direction === "right" ? "100%" : `${5 + wipeProgress}%`,
          height: direction === "left" || direction === "right" ? `${105 - wipeProgress}%` : "100%",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(8, 1fr)",
          gap: 2,
          opacity: 0.5,
        }}
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: Math.random() > 0.5 ? `${color}30` : "transparent",
              border: "1px solid " + (Math.random() > 0.5 ? `${color}40` : "transparent"),
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Glitch text effect for transitions
export const GlitchText: React.FC<{
  frame: number;
  text: string;
  x: number;
  y: number;
  fontSize?: number;
  color?: string;
  glitchIntensity?: number;
}> = ({ frame, text, x, y, fontSize = 32, color = "#00ffff", glitchIntensity = 1 }) => {
  const glitchOffsetX = (Math.sin(frame * 15) * 0.5 + Math.sin(frame * 23) * 0.3 + Math.sin(frame * 37) * 0.2) * glitchIntensity * 8;
  const glitchOffsetY = (Math.sin(frame * 17) * 0.4 + Math.sin(frame * 29) * 0.3) * glitchIntensity * 4;
  const glitchOpacity = 0.4 + Math.sin(frame * 13) * 0.2 * glitchIntensity;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Original text */}
      <div
        style={{
          fontSize,
          fontWeight: 900,
          color,
          fontFamily: "Arial, sans-serif",
          textShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`,
          transform: `translate(${glitchOffsetX}px, ${glitchOffsetY}px)`,
          opacity: 1,
        }}
      >
        {text}
      </div>

      {/* Red channel glitch */}
      <div
        style={{
          fontSize,
          fontWeight: 900,
          color: "#ff0000",
          fontFamily: "Arial, sans-serif",
          textShadow: `0 0 10px #ff000080`,
          transform: `translate(${glitchOffsetX + 2}px, ${glitchOffsetY - 1}px)`,
          opacity: glitchOpacity * 0.5,
          mixBlendMode: "screen",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        {text}
      </div>

      {/* Blue channel glitch */}
      <div
        style={{
          fontSize,
          fontWeight: 900,
          color: "#0066ff",
          fontFamily: "Arial, sans-serif",
          textShadow: `0 0 10px #0066ff80`,
          transform: `translate(${glitchOffsetX - 2}px, ${glitchOffsetY + 1}px)`,
          opacity: glitchOpacity * 0.5,
          mixBlendMode: "screen",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        {text}
      </div>
    </div>
  );
};
