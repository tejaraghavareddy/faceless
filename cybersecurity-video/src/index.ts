import { registerRoot } from "remotion";
import { Root } from "./Root";

export const compositions = [
  {
    id: "cybersecurity-explainer",
    name: "Cyber Security Explainer",
    component: Root,
    durationInFrames: 900,
    fps: 30,
    width: 1080,
    height: 1920,
    defaultProps: {
      title: "CYBER SECURITY IN 30 SECONDS",
    },
  },
];

registerRoot(Root);
