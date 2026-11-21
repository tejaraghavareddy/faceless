import React, { useEffect, useState } from "react";
import { Composition, continueRender, delayRender, staticFile } from "remotion";
import { CiaTriad, TOTAL_FRAMES } from "./CiaTriad";
import { fontCss } from "./fonts.css";
import { FONT } from "./design";

const FontLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [handle] = useState(() => delayRender("Loading typefaces"));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fontCss.replace(/url\('fonts\//g, `url('${staticFile("fonts").replace(/\/$/, "")}/`);
    document.head.appendChild(style);
    const done = () => {
      setReady(true);
      continueRender(handle);
    };
    Promise.all([
      document.fonts.load(`400 24px ${FONT.body}`),
      document.fonts.load(`500 24px ${FONT.body}`),
      document.fonts.load(`600 24px ${FONT.body}`),
      document.fonts.load(`700 24px ${FONT.body}`),
      document.fonts.load(`500 24px ${FONT.display}`),
      document.fonts.load(`600 24px ${FONT.display}`),
      document.fonts.load(`700 24px ${FONT.display}`),
      document.fonts.load(`400 16px ${FONT.mono}`),
      document.fonts.load(`500 16px ${FONT.mono}`),
    ])
      .then(() => document.fonts.ready)
      .then(done)
      .catch(done);
  }, [handle]);

  return <div style={{ opacity: ready ? 1 : 0 }}>{children}</div>;
};

export const RemotionRoot: React.FC = () => (
  <FontLoader>
    <Composition
      id="CiaTriad"
      component={CiaTriad}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  </FontLoader>
);
