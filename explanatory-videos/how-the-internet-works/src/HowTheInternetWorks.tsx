import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";

const FPS = 30;
export const SCENE_DURATIONS = {
  scene1: 35 * FPS, // 0:00-0:35
  scene2: 45 * FPS, // 0:35-1:20
  scene3: 55 * FPS, // 1:20-2:15
  scene4: 60 * FPS, // 2:15-3:15
  scene5: 60 * FPS, // 3:15-4:15
  scene6: 80 * FPS, // 4:15-5:35
  scene7: 50 * FPS, // 5:35-6:25
  scene8: 20 * FPS, // 6:25-6:45
};
export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const HowTheInternetWorks: React.FC = () => {
  let from = 0;
  const seq = (dur: number) => {
    const f = from;
    from += dur;
    return f;
  };
  const s1 = seq(SCENE_DURATIONS.scene1);
  const s2 = seq(SCENE_DURATIONS.scene2);
  const s3 = seq(SCENE_DURATIONS.scene3);
  const s4 = seq(SCENE_DURATIONS.scene4);
  const s5 = seq(SCENE_DURATIONS.scene5);
  const s6 = seq(SCENE_DURATIONS.scene6);
  const s7 = seq(SCENE_DURATIONS.scene7);
  const s8 = seq(SCENE_DURATIONS.scene8);
  return (
    <AbsoluteFill style={{ background: "#0b1020", fontFamily: "Inter, Arial, sans-serif", color: "white" }}>
      <Sequence from={s1} durationInFrames={SCENE_DURATIONS.scene1}><Scene1 /></Sequence>
      <Sequence from={s2} durationInFrames={SCENE_DURATIONS.scene2}><Scene2 /></Sequence>
      <Sequence from={s3} durationInFrames={SCENE_DURATIONS.scene3}><Scene3 /></Sequence>
      <Sequence from={s4} durationInFrames={SCENE_DURATIONS.scene4}><Scene4 /></Sequence>
      <Sequence from={s5} durationInFrames={SCENE_DURATIONS.scene5}><Scene5 /></Sequence>
      <Sequence from={s6} durationInFrames={SCENE_DURATIONS.scene6}><Scene6 /></Sequence>
      <Sequence from={s7} durationInFrames={SCENE_DURATIONS.scene7}><Scene7 /></Sequence>
      <Sequence from={s8} durationInFrames={SCENE_DURATIONS.scene8}><Scene8 /></Sequence>
    </AbsoluteFill>
  );
};
