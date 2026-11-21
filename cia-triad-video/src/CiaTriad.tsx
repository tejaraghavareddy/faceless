import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import timeline from "./timeline.json";
import { C, FONT } from "./design";
import { TimelineContext } from "./components/Chrome";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";

export const TOTAL_FRAMES = timeline.totalFrames;
const LEAD = 8;

const SCENES = [
  { C: Scene1, bg: C.paper },
  { C: Scene2, bg: C.navy },
  { C: Scene3, bg: C.paper },
  { C: Scene4, bg: C.navy },
  { C: Scene5, bg: C.paper },
  { C: Scene6, bg: C.navy },
  { C: Scene7, bg: C.paper },
  { C: Scene8, bg: C.navy },
];

export const CiaTriad: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <TimelineContext.Provider value={{ frame, total: TOTAL_FRAMES }}>
      <AbsoluteFill style={{ background: C.navy, fontFamily: FONT.body }}>
        {timeline.scenes.map((scene, i) => {
          const S = SCENES[i].C;
          const from = Math.max(0, scene.startFrame - LEAD);
          const dur = scene.durationInFrames + LEAD * 2;
          const local = frame - from;
          const opacity =
            local < LEAD + 8
              ? Math.max(0, Math.min(1, local / (LEAD + 8)))
              : local > dur - LEAD
                ? Math.max(0, Math.min(1, (dur - local) / LEAD))
                : 1;
          return (
            <Sequence key={scene.id} from={from} durationInFrames={dur} name={`${i + 1}. ${scene.label}`}>
              <AbsoluteFill style={{ opacity }}>
                <S bg={SCENES[i].bg} />
              </AbsoluteFill>
            </Sequence>
          );
        })}

        {/* narration */}
        {timeline.scenes.map((scene) =>
          scene.beats.map((b, i) => (
            <Sequence key={scene.id + i} from={scene.startFrame + b.frame} durationInFrames={b.durationInFrames} name={`vo ${scene.id}-${i + 1}`}>
              <Audio src={staticFile(`audio/vo/${b.file}`)} />
            </Sequence>
          )),
        )}

        {/* ambient score */}
        <Audio src={staticFile("audio/music/ambient.mp3")} volume={0.5} />
      </AbsoluteFill>
    </TimelineContext.Provider>
  );
};
