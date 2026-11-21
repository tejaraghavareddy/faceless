import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import timeline from "./timeline.json";

export type Tone = "light" | "dark";

export const C = {
  paper: "#F3F5F7",
  paperWarm: "#FAFBFC",
  white: "#FFFFFF",
  ink: "#0A1B29",
  inkSoft: "#3D5060",
  inkMute: "#7C8B98",
  line: "#D9E0E6",
  lineStrong: "#C3CED8",
  navy: "#081C2C",
  navy2: "#0C2438",
  navy3: "#123349",
  navyLine: "rgba(126,178,224,0.20)",
  navyText: "#E7F0F7",
  navySoft: "#9DB4C6",
  blue: "#2F6FEB",
  blueDeep: "#1B4FD1",
  blueSoft: "#79A9FF",
  conf: "#2F6FEB",
  confDark: "#6AA6FF",
  integ: "#0C8F63",
  integDark: "#46D6A0",
  avail: "#C47A1B",
  availDark: "#F0B45C",
  danger: "#C8453B",
  dangerDark: "#FF8A7E",
  ok: "#0C8F63",
  okDark: "#46D6A0",
};

export const FONT = {
  body: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  display: "'Inter Tight', 'Inter', Arial, sans-serif",
  mono: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
};

export const scene = (id: string) => {
  const s = timeline.scenes.find((x) => x.id === id);
  if (!s) throw new Error("unknown scene " + id);
  return s;
};

/** Local frame at which beat `i` begins. */
export const useBeats = (id: string) => {
  const s = scene(id);
  return {
    scene: s,
    beat: (i: number, offset = 0) => (s.beats[i]?.frame ?? s.durationInFrames) + offset,
    text: (i: number) => s.beats[i]?.text ?? "",
    count: s.beats.length,
  };
};

export const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** 0 → 1 progress starting at `start` over `dur` frames. */
export const useProgress = (start: number, dur = 18) => {
  const f = useCurrentFrame();
  return interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
};

export const useSpring = (start: number, damping = 200, stiffness = 90) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - start, fps, config: { damping, stiffness, mass: 1 } });
};

/** Fade + rise for a block of content. */
export const reveal = (frame: number, at: number, distance = 22, dur = 20) => {
  const p = interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return { opacity: p, transform: `translateY(${(1 - p) * distance}px)` };
};

export const fade = (frame: number, at: number, dur = 18) =>
  interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

export const mix = (t: Tone) =>
  t === "dark"
    ? {
        bg: C.navy,
        panel: C.navy2,
        panelAlt: C.navy3,
        border: C.navyLine,
        text: C.navyText,
        soft: C.navySoft,
        line: "rgba(126,178,224,0.28)",
        grid: "rgba(126,178,224,0.055)",
      }
    : {
        bg: C.paper,
        panel: C.white,
        panelAlt: "#F7F9FB",
        border: C.line,
        text: C.ink,
        soft: C.inkSoft,
        line: C.lineStrong,
        grid: "rgba(10,27,41,0.045)",
      };
