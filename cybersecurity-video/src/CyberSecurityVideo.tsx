import React from "react";
import { Sequence, AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import type { ComponentType } from "react";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { ParticleSystem } from "./components/ParticleSystem";
import { SceneTransition } from "./components/SceneTransition";
import { styles } from "./styles/global";

export interface CyberSecurityVideoProps {
  title?: string;
}

// Scene timing (30 seconds total, 900 frames)
const SCENES: Array<{
  id: string;
  startFrame: number;
  endFrame: number;
  component: React.ComponentType<any>;
}> = [
  { id: "scene1", startFrame: 0, endFrame: 150, component: Scene1 }, // 0-5s
  { id: "scene2", startFrame: 150, endFrame: 390, component: Scene2 }, // 5-13s
  { id: "scene3", startFrame: 390, endFrame: 600, component: Scene3 }, // 13-20s
  { id: "scene4", startFrame: 600, endFrame: 900, component: Scene4 }, // 20-30s
];

export const CyberSecurityVideo: React.FC<CyberSecurityVideoProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const currentSceneIndex = SCENES.findIndex(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );
  const previousSceneIndex = currentSceneIndex > 0 ? currentSceneIndex - 1 : 0;

  const currentScene = SCENES[currentSceneIndex];
  const transitionStartFrame = currentScene?.startFrame ?? 0;
  const transitionProgress = interpolate(
    frame,
    [transitionStartFrame - 15, transitionStartFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      {/* Animated background grid */}
      <AnimatedBackground opacity={0.6} />

      {/* Floating particles throughout the video */}
      <ParticleSystem frame={frame} width={width} height={height} />

      {/* Scene content */}
      {SCENES.map((scene, index) => {
        const isVisible = frame >= scene.startFrame && frame < scene.endFrame;
        const sceneFrame = frame - scene.startFrame;

        if (isVisible) {
          return (
            <Sequence from={scene.startFrame} durationInFrames={scene.endFrame - scene.startFrame} key={scene.id}>
              {(scene.component as any)({
                frame: sceneFrame,
                width,
                height,
                title,
                isLastScene: index === SCENES.length - 1,
              })}
            </Sequence>
          );
        }

        // Fade out previous scene during transition
        if (index === currentSceneIndex - 1 && !isVisible) {
          const localFrame = frame - scene.startFrame;
          const fadeOutDuration = 15;
          const opacity = interpolate(
            localFrame,
            [scene.endFrame - scene.startFrame - fadeOutDuration, scene.endFrame - scene.startFrame],
            [1, 0],
            { extrapolateLeft: "clamp" }
          );
          return (
            <div style={{ ...styles.positionAbsolute, ...styles.fullSize, opacity }}>
              {(scene.component as any)({
                frame: Math.max(0, localFrame - fadeOutDuration),
                width,
                height,
                title,
                isLastScene: index === SCENES.length - 1,
              })}
            </div>
          );
        }

        return null;
      })}

      {/* Scene transitions */}
      {currentSceneIndex > 0 && (
        <SceneTransition
          frame={frame}
          fromScene={SCENES[currentSceneIndex - 1].id}
          toScene={SCENES[currentSceneIndex].id}
          progress={transitionProgress}
        />
      )}

      {/* Global title overlay (visible briefly at start) */}
      {frame < 150 && (
        <div style={{
          ...styles.positionAbsolute,
          ...styles.fullSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            textAlign: "center",
            color: "#00ffff",
            textShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
          }}>
            <div style={{
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: 4,
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame, [0, 20, 40], [0, 1, 1]),
            }}>
              {title}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
