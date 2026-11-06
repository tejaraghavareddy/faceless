import React from "react";

interface DigitalHouseProps {
  frame: number;
  transformProgress: number;
  size: number;
}

export const DigitalHouse: React.FC<DigitalHouseProps> = ({ frame, transformProgress, size }) => {
  const opacity = 1 - transformProgress;
  const scale = 1 - transformProgress * 0.3;
  const rotation = transformProgress * 15;
  const yOffset = -transformProgress * 30;

  const roofColor = `rgba(0, 255, 255, ${0.6 * opacity})`;
  const wallColor = `rgba(0, 100, 200, ${0.5 * opacity})`;
  const doorColor = `rgba(0, 200, 255, ${0.7 * opacity})`;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg) translateY(${yOffset}px)`,
        opacity,
      }}
    >
      <svg width={size} height={size * 0.9} viewBox="0 0 200 180">
        <path
          d="M 30 100 L 100 20 L 170 100 Z"
          fill={roofColor}
          stroke="#00ffff"
          strokeWidth={2}
        />
        <rect
          x={40}
          y={100}
          width={120}
          height={70}
          fill={wallColor}
          stroke="#0066ff"
          strokeWidth={2}
        />
        <rect
          x={85}
          y={130}
          width={30}
          height={40}
          fill={doorColor}
          stroke="#00ffff"
          strokeWidth={1.5}
          rx={2}
        />
        <circle cx={108} cy={150} r={3} fill="#00ffff" opacity={0.8} />
        <rect
          x={55}
          y={115}
          width={20}
          height={20}
          fill="rgba(0, 200, 255, 0.3)"
          stroke="#00ffff"
          strokeWidth={1.5}
          rx={1}
        />
        <rect
          x={125}
          y={115}
          width={20}
          height={20}
          fill="rgba(0, 200, 255, 0.3)"
          stroke="#00ffff"
          strokeWidth={1.5}
          rx={1}
        />
        <line x1={65} y1={115} x2={65} y2={135} stroke="#00ffff" strokeWidth={1} />
        <line x1={55} y1={125} x2={75} y2={125} stroke="#00ffff" strokeWidth={1} />
        <line x1={135} y1={115} x2={135} y2={135} stroke="#00ffff" strokeWidth={1} />
        <line x1={125} y1={125} x2={145} y2={125} stroke="#00ffff" strokeWidth={1} />
        <rect
          x={145}
          y={40}
          width={15}
          height={30}
          fill={roofColor}
          stroke="#00ffff"
          strokeWidth={1.5}
        />
        <rect
          x={40}
          y={100}
          width={120}
          height={70}
          fill={`url(#hg-${frame})`}
          opacity={0.3}
        />
        <defs>
          <linearGradient id={`hg-${frame}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {Array.from({ length: 4 }).map((_, i) => (
          <circle
            key={i}
            cx={50 + i * 30}
            cy={145}
            r={2}
            fill="#00ffff"
            opacity={0.5 + Math.sin(frame * 0.1 + i) * 0.3}
          />
        ))}
      </svg>
    </div>
  );
};

interface ComputerTowerProps {
  frame: number;
  transformProgress: number;
  size: number;
}

export const ComputerTower: React.FC<ComputerTowerProps> = ({ frame, transformProgress, size }) => {
  const opacity = transformProgress;
  const scale = 0.7 + transformProgress * 0.3;
  const rotation = -transformProgress * 15;

  const towerColor = `rgba(30, 30, 60, ${0.8 * opacity})`;
  const accentColor = `rgba(0, 255, 255, ${0.6 * opacity})`;
  const lightColor = `rgba(0, 255, 255, ${0.8 * opacity})`;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 200 240">
        <rect
          x={50}
          y={30}
          width={100}
          height={180}
          fill={towerColor}
          stroke={accentColor}
          strokeWidth={2}
          rx={4}
        />
        <rect
          x={60}
          y={40}
          width={80}
          height={160}
          fill="rgba(0, 0, 0, 0.5)"
          stroke={accentColor}
          strokeWidth={1}
          rx={2}
        />
        <circle cx={100} cy={60} r={8} fill="#0a0a1a" stroke={lightColor} strokeWidth={2} />
        <circle cx={100} cy={60} r={3} fill={lightColor} opacity={0.8 + Math.sin(frame * 0.1) * 0.2} />
        <rect
          x={65}
          y={80}
          width={70}
          height={20}
          fill="rgba(0, 255, 255, 0.1)"
          stroke={accentColor}
          strokeWidth={1}
          rx={1}
        />
        <rect
          x={65}
          y={105}
          width={70}
          height={20}
          fill="rgba(0, 255, 255, 0.1)"
          stroke={accentColor}
          strokeWidth={1}
          rx={1}
        />
        <circle cx={80} cy={90} r={4} fill={lightColor} opacity={0.6} />
        <circle cx={100} cy={90} r={4} fill={lightColor} opacity={0.6} />
        <circle cx={120} cy={90} r={4} fill={lightColor} opacity={0.6} />
        <circle cx={80} cy={115} r={4} fill={lightColor} opacity={0.6} />
        <circle cx={100} cy={115} r={4} fill={lightColor} opacity={0.6} />
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={55}
            y1={150 + i * 8}
            x2={145}
            y2={150 + i * 8}
            stroke={accentColor}
            strokeWidth={1}
            opacity={0.3}
          />
        ))}
        <rect
          x={65}
          y={175}
          width={8}
          height={4}
          fill="#00ff88"
          opacity={0.8 + Math.sin(frame * 0.15) * 0.2}
          rx={1}
        />
        <rect
          x={80}
          y={175}
          width={8}
          height={4}
          fill="#00ffff"
          opacity={0.6 + Math.sin(frame * 0.12 + 1) * 0.2}
          rx={1}
        />
        <rect
          x={95}
          y={175}
          width={8}
          height={4}
          fill="#ffcc00"
          opacity={0.6 + Math.sin(frame * 0.1 + 2) * 0.2}
          rx={1}
        />
        <rect
          x={50}
          y={30}
          width={100}
          height={180}
          fill={`url(#tg-${frame})`}
          opacity={0.2}
          rx={4}
        />
        <defs>
          <linearGradient id={`tg-${frame}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx={100} cy={20} r={3} fill={lightColor} opacity={0.8} />
        <path
          d="M 100 20 A 15 15 0 0 1 115 35"
          fill="none"
          stroke={accentColor}
          strokeWidth={1.5}
          opacity={0.6}
        />
        <path
          d="M 100 20 A 25 25 0 0 1 125 45"
          fill="none"
          stroke={accentColor}
          strokeWidth={1}
          opacity={0.4}
        />
      </svg>
    </div>
  );
};
