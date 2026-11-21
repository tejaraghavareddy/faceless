import React from "react";

export type IconName =
  | "lock"
  | "unlock"
  | "shield"
  | "shieldCheck"
  | "check"
  | "x"
  | "alert"
  | "user"
  | "users"
  | "key"
  | "fingerprint"
  | "database"
  | "server"
  | "cloud"
  | "laptop"
  | "phone"
  | "globe"
  | "bank"
  | "hospital"
  | "graduation"
  | "file"
  | "fileCheck"
  | "signature"
  | "log"
  | "download"
  | "refresh"
  | "activity"
  | "clock"
  | "layers"
  | "network"
  | "eye"
  | "eyeOff"
  | "wifi"
  | "code"
  | "arrowRight"
  | "search"
  | "scale"
  | "link"
  | "hash"
  | "graph"
  | "creditCard"
  | "crosshair";

const PATHS: Record<IconName, React.ReactNode> = {
  lock: (
    <>
      <rect x="4" y="10.5" width="16" height="10.5" rx="2.2" />
      <path d="M8 10.5V7.4a4 4 0 0 1 8 0v3.1" />
      <path d="M12 15v2.2" />
    </>
  ),
  unlock: (
    <>
      <rect x="4" y="10.5" width="16" height="10.5" rx="2.2" />
      <path d="M8 10.5V7.4a4 4 0 0 1 7.6-1.7" />
    </>
  ),
  shield: <path d="M12 3.2 19 6v5.4c0 4.3-2.8 7.5-7 9.4-4.2-1.9-7-5.1-7-9.4V6l7-2.8Z" />,
  shieldCheck: (
    <>
      <path d="M12 3.2 19 6v5.4c0 4.3-2.8 7.5-7 9.4-4.2-1.9-7-5.1-7-9.4V6l7-2.8Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.4" />
    </>
  ),
  check: <path d="m4.5 12.5 4.6 4.6L19.5 6.6" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  alert: (
    <>
      <path d="M12 3.8 21 19.4H3L12 3.8Z" />
      <path d="M12 9.6v4.6M12 17.2v.1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M4.8 20.2c.7-3.7 3.6-5.8 7.2-5.8s6.5 2.1 7.2 5.8" />
    </>
  ),
  users: (
    <>
      <circle cx="9.2" cy="8.4" r="3.3" />
      <path d="M2.8 19.8c.6-3.4 3.1-5.3 6.4-5.3s5.8 1.9 6.4 5.3" />
      <path d="M16.2 5.3a3.3 3.3 0 0 1 0 6.4M17.6 14.8c2.2.5 3.6 2.2 3.9 4.7" />
    </>
  ),
  key: (
    <>
      <circle cx="8.4" cy="8.4" r="4.1" />
      <path d="m11.4 11.4 8 8M16.6 16.6l2-2M19 19l1.6-1.6" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M5.2 11.6a6.8 6.8 0 0 1 13.6 0v1.6" />
      <path d="M8.4 12a3.6 3.6 0 0 1 7.2 0v3.4a6.4 6.4 0 0 1-1 3.4" />
      <path d="M11.6 12.2c.9 0 1.4.6 1.4 1.5v3.6a9 9 0 0 1-.9 3.6" />
      <path d="M5 15.4a9.4 9.4 0 0 0 .6 3.3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6" />
      <path d="M5 12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8" />
    </>
  ),
  server: (
    <>
      <rect x="3.4" y="4" width="17.2" height="6.4" rx="1.6" />
      <rect x="3.4" y="13.6" width="17.2" height="6.4" rx="1.6" />
      <path d="M7 7.2h.1M7 16.8h.1M10.6 7.2h0.1M10.6 16.8h.1" />
    </>
  ),
  cloud: <path d="M7.4 18.6a4.3 4.3 0 0 1-.5-8.6 5.7 5.7 0 0 1 10.9-1.2 4.2 4.2 0 0 1 .6 8.3l-.4.1H7.4Z" />,
  laptop: (
    <>
      <rect x="4.6" y="5.4" width="14.8" height="9.8" rx="1.4" />
      <path d="M2.6 18.4h18.8" />
    </>
  ),
  phone: (
    <>
      <rect x="7.4" y="2.8" width="9.2" height="18.4" rx="2.2" />
      <path d="M10.8 5.4h2.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <ellipse cx="12" cy="12" rx="3.7" ry="8.6" />
      <path d="M3.8 9.4h16.4M3.8 14.6h16.4" />
    </>
  ),
  bank: (
    <>
      <path d="M3.4 9.6 12 4.4l8.6 5.2" />
      <path d="M5.4 10.4v7.2M9.6 10.4v7.2M14.4 10.4v7.2M18.6 10.4v7.2" />
      <path d="M3.2 20h17.6" />
    </>
  ),
  hospital: (
    <>
      <rect x="4" y="5.2" width="16" height="14.8" rx="2" />
      <path d="M12 8.6v6.4M8.8 11.8h6.4" />
    </>
  ),
  graduation: (
    <>
      <path d="M2.8 9.2 12 4.8l9.2 4.4L12 13.6 2.8 9.2Z" />
      <path d="M6.6 11.4v4.8c0 1.5 2.4 2.8 5.4 2.8s5.4-1.3 5.4-2.8v-4.8" />
      <path d="M21.2 9.6v4.8" />
    </>
  ),
  file: (
    <>
      <path d="M6 3.4h7.4L19 9v11.6H6V3.4Z" />
      <path d="M13.2 3.6V9H19" />
    </>
  ),
  fileCheck: (
    <>
      <path d="M6 3.4h7.4L19 9v11.6H6V3.4Z" />
      <path d="M13.2 3.6V9H19" />
      <path d="m9.4 15 1.9 1.9 3.5-3.6" />
    </>
  ),
  signature: (
    <>
      <path d="M3.4 16.8c3.4 0 4.2-9.4 6.6-9.4 2 0-1.2 9 1.4 9 2 0 2.3-5 4-5 1.4 0 1 3.4 2.8 3.4 1 0 1.6-.6 2.4-1.4" />
      <path d="M3.4 20.4h17.2" />
    </>
  ),
  log: (
    <>
      <rect x="4" y="3.6" width="16" height="16.8" rx="2" />
      <path d="M7.6 8.4h8.8M7.6 12h8.8M7.6 15.6h5.6" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10.4M7.8 10.6 12 14.8l4.2-4.2" />
      <path d="M4.6 18.4v1.4h14.8v-1.4" />
    </>
  ),
  refresh: (
    <>
      <path d="M19.4 12a7.4 7.4 0 1 1-2.2-5.2" />
      <path d="M19.8 4.4v4.4h-4.4" />
    </>
  ),
  activity: <path d="M2.8 12.4h4l2.6-7 4 14 2.6-7h5.2" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.6V12l3 1.8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.4 8.4 4.4L12 12.2 3.6 7.8 12 3.4Z" />
      <path d="m3.6 12 8.4 4.4 8.4-4.4M3.6 16.2l8.4 4.4 8.4-4.4" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M12 7.4v4.2M10.6 13.4 6.4 16M13.4 13.4l4.2 2.6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.6 12S6 6.4 12 6.4 21.4 12 21.4 12 18 17.6 12 17.6 2.6 12 2.6 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M4 4.6 20 19.4" />
      <path d="M9.4 7.1A10.6 10.6 0 0 1 12 6.4c6 0 9.4 5.6 9.4 5.6a16 16 0 0 1-2.7 3.4M6.2 8.6A16.4 16.4 0 0 0 2.6 12S6 17.6 12 17.6c1.1 0 2.1-.1 3-.5" />
    </>
  ),
  wifi: (
    <>
      <path d="M3.4 9.4a13 13 0 0 1 17.2 0M6.4 12.8a8.6 8.6 0 0 1 11.2 0M9.4 16.2a4.2 4.2 0 0 1 5.2 0" />
      <path d="M12 19.6v.1" />
    </>
  ),
  code: <path d="m8.4 7.4-5 4.6 5 4.6M15.6 7.4l5 4.6-5 4.6M13.6 4.6l-3.2 14.8" />,
  arrowRight: <path d="M4 12h15M14 7l5 5-5 5" />,
  search: (
    <>
      <circle cx="10.6" cy="10.6" r="6.2" />
      <path d="m15.2 15.2 4.6 4.6" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M5 7.4h14" />
      <path d="M5 7.4 2.6 14h4.8L5 7.4ZM19 7.4 16.6 14h4.8L19 7.4Z" />
      <path d="M8 20h8" />
    </>
  ),
  link: (
    <>
      <path d="M10.2 13.8a3.8 3.8 0 0 0 5.4 0l2.8-2.8a3.8 3.8 0 0 0-5.4-5.4l-1.4 1.4" />
      <path d="M13.8 10.2a3.8 3.8 0 0 0-5.4 0l-2.8 2.8a3.8 3.8 0 0 0 5.4 5.4l1.4-1.4" />
    </>
  ),
  hash: <path d="M9 3.6 7.4 20.4M16.6 3.6 15 20.4M4.2 9h16M3.6 15h16" />,
  graph: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7 15.4 4-4.4 3 2.6 4.6-6" />
    </>
  ),
  creditCard: (
    <>
      <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="2.2" />
      <path d="M2.8 10h18.4M6.4 14.6h3.2" />
    </>
  ),
  crosshair: (
    <>
      <circle cx="12" cy="12" r="6.6" />
      <path d="M12 2.6v3.4M12 18v3.4M2.6 12h3.4M18 12h3.4" />
    </>
  ),
};

export const Icon: React.FC<{
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}> = ({ name, size = 24, color = "currentColor", strokeWidth = 1.6, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0, ...style }}
  >
    {PATHS[name]}
  </svg>
);
