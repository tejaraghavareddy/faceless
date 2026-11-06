import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { NetworkNode, NetworkConnection, DataPacket } from "./ParticleSystem";

interface NetworkVisualizationProps {
  frame: number;
  width: number;
  height: number;
  nodes?: Array<{
    id: string;
    x: number;
    y: number;
    label?: string;
    color?: string;
    size?: number;
    pulse?: boolean;
    isActive?: boolean;
  }>;
  connections?: Array<{
    from: string;
    to: string;
    color?: string;
    animated?: boolean;
  }>;
  packets?: Array<{
    from: string;
    to: string;
    color?: string;
    delay?: number;
    isSuspicious?: boolean;
    progress?: number;
  }>;
  center?: { x: number; y: number };
  scale?: number;
}

export const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  frame,
  width,
  height,
  nodes = [],
  connections = [],
  packets = [],
  center = { x: width / 2, y: height / 2 },
  scale = 1,
}) => {
  // Default network layout if no nodes provided
  const defaultNodes = nodes.length === 0 ? getDefaultNetworkNodes(width, height, center, scale) : nodes;
  const defaultConnections = connections.length === 0 ? getDefaultConnections(defaultNodes) : connections;

  // Map node labels to indices for connection lookup
  const nodeMap = React.useMemo(() => {
    const map = new Map<string, typeof defaultNodes[0]>();
    defaultNodes.forEach((node) => map.set(node.label || node.id, node));
    return map;
  }, [defaultNodes]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: "100%",
        height: "100%",
      }}
    >
      {/* Connection lines */}
      {defaultConnections.map((conn, i) => {
        const fromNode = nodeMap.get(conn.from);
        const toNode = nodeMap.get(conn.to);
        if (!fromNode || !toNode) return null;

        return (
          <NetworkConnection
            key={`${conn.from}-${conn.to}-${i}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            color={conn.color || "#0066ff"}
            animated={conn.animated !== false}
          />
        );
      })}

      {/* Network nodes */}
      {defaultNodes.map((node) => (
        <NetworkNode
          key={node.id}
          x={node.x}
          y={node.y}
          size={node.size}
          color={node.color}
          label={node.label}
          pulse={node.pulse}
          isActive={node.isActive}
        />
      ))}

      {/* Data packets */}
      {packets.map((pkt, i) => {
        const fromNode = nodeMap.get(pkt.from);
        const toNode = nodeMap.get(pkt.to);
        if (!fromNode || !toNode) return null;

        return (
          <DataPacket
            key={`${pkt.from}-${pkt.to}-${i}`}
            frame={frame}
            fromX={fromNode.x}
            fromY={fromNode.y}
            toX={toNode.x}
            toY={toNode.y}
            color={pkt.color}
            isSuspicious={pkt.isSuspicious}
            delay={pkt.delay}
            progress={pkt.progress}
          />
        );
      })}
    </div>
  );
};

// Helper to create default network node positions
const getDefaultNetworkNodes = (
  width: number,
  height: number,
  center: { x: number; y: number },
  scale: number
): Array<{ id: string; x: number; y: number; label?: string; color?: string; size?: number; pulse?: boolean; isActive?: boolean }> => {
  const cx = center.x;
  const cy = center.y;
  const r = Math.min(width, height) * 0.25 * scale;

  return [
    { id: "internet", x: cx, y: cy - r * 1.2, label: "INTERNET", color: "#00ffff", size: 14, pulse: true, isActive: true },
    { id: "router", x: cx + r * 0.8, y: cy - r * 0.4, label: "ROUTER", color: "#0066ff", size: 12 },
    { id: "firewall", x: cx - r * 0.8, y: cy - r * 0.4, label: "FIREWALL", color: "#00ffff", size: 12, pulse: true, isActive: true },
    { id: "server", x: cx, y: cy + r * 0.6, label: "SERVER", color: "#ffcc00", size: 12 },
    { id: "device1", x: cx + r * 0.5, y: cy + r * 0.9, label: "DEVICE A", color: "#aaddff", size: 10 },
    { id: "device2", x: cx - r * 0.5, y: cy + r * 0.9, label: "DEVICE B", color: "#aaddff", size: 10 },
  ];
};

// Helper to get default connections
const getDefaultConnections = (
  nodes: Array<{ id: string; label?: string }>
): Array<{ from: string; to: string; color?: string; animated?: boolean; width?: number; pulse?: boolean }> => {
  const labels = nodes.map((n) => n.label || n.id);
  return [
    { from: labels[0], to: labels[1], color: "#0066ff", animated: true },
    { from: labels[0], to: labels[2], color: "#0066ff", animated: true },
    { from: labels[1], to: labels[3], color: "#0066ff", animated: true },
    { from: labels[2], to: labels[3], color: "#00ffff", animated: true, width: 3 },
    { from: labels[3], to: labels[4], color: "#0066ff", animated: true },
    { from: labels[3], to: labels[5], color: "#0066ff", animated: true },
  ];
};

// Network scanner visualization
export const PortScanner: React.FC<{
  frame: number;
  x: number;
  y: number;
  width: number;
  height: number;
  scannedPorts?: number;
  targetPort?: number;
}> = ({ frame, x, y, width, height, scannedPorts, targetPort }) => {
  const totalPorts = 65535;
  const scanProgress = interpolate(frame, [0, 120], [0, 1], { extrapolateRight: "clamp" });
  const scannedCount = Math.floor(scanProgress * 1000); // Show first 1000 ports

  // Determine scan position
  const scanY = y + (height / 100) * Math.min(scannedCount % 100, 99);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        border: "1px solid #0066ff40",
        borderRadius: 4,
        background: "rgba(0, 0, 0, 0.6)",
        overflow: "hidden",
      }}
    >
      {/* Port list background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {Array.from({ length: Math.min(scannedCount, 100) }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 1,
              width: "100%",
              background: i % 2 === 0 ? "#00ffff" : "#0066ff",
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Scanning indicator */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: scanY,
          width: "100%",
          height: 4,
          background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
          opacity: 0.8,
          filter: "blur(1px)",
          animation: "scannerPulse 0.5s ease-in-out infinite",
        }}
      />

      {/* Target port highlight */}
      {targetPort !== undefined && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: (targetPort / totalPorts) * height,
            width: "100%",
            height: 2,
            background: "#ff3333",
            boxShadow: "0 0 8px #ff3333",
          }}
        />
      )}

      {/* Status text */}
      <div
        style={{
          position: "absolute",
          bottom: 4,
          left: 4,
          color: "#00ffff",
          fontSize: 9,
          fontFamily: "monospace",
          fontWeight: 600,
        }}
      >
        SCANNING {scannedCount} PORTSCONNECTIONS
      </div>
    </div>
  );
};

// Subnet visualization
export const SubnetVisualization: React.FC<{
  frame: number;
  width: number;
  height: number;
  subnet?: string;
}> = ({ frame, width, height, subnet = "192.168.1.0/24" }) => {
  const nodes = 8;
  const gridSize = Math.min(width, height) * 0.3;
  const cellSize = gridSize / nodes;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: gridSize,
        height: gridSize,
      }}
    >
      {/* Grid cells */}
      {Array.from({ length: nodes * nodes }).map((_, i) => {
        const row = Math.floor(i / nodes);
        const col = i % nodes;
        const isActive = (row + col) % 2 === 0;
        const isVulnerable = (row === 3 && col === 4) || (row === 5 && col === 2);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: col * cellSize,
              top: row * cellSize,
              width: cellSize - 1,
              height: cellSize - 1,
              background: isVulnerable
                ? "#ff333320"
                : isActive
                ? "#00ffff10"
                : "transparent",
              border: "1px solid " + (isVulnerable ? "#ff333340" : "#0066ff20"),
              boxShadow: isVulnerable ? "0 0 4px #ff3333" : "none",
            }}
          >
            {isVulnerable && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ff3333",
                  fontSize: 8,
                  fontWeight: 700,
                }}
              >
                !
              </div>
            )}
          </div>
        );
      })}

      {/* Subnet label */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#aaddff",
          fontSize: 10,
          fontFamily: "monospace",
          fontWeight: 600,
        }}
      >
        {subnet}
      </div>
    </div>
  );
};
