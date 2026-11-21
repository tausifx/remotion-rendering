import React from "react";
import { COLORS } from "../../theme";

/** A small synthetic "picture" sampled at n×n cells: sunset sky, sun, hills and fine stripes. */
const sample = (u: number, v: number): string => {
  // sky gradient
  const sky = [
    [COLORS.secondary, 0],
    ["#B65BE0", 0.45],
    ["#FF8A5B", 0.78],
  ] as const;
  const hex = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const mix = (a: number[], b: number[], t: number) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
  let col: number[];
  if (v < sky[1][1]) col = mix(hex(sky[0][0]), hex(sky[1][0]), v / sky[1][1]);
  else col = mix(hex(sky[1][0]), hex(sky[2][0]), Math.min(1, (v - sky[1][1]) / (sky[2][1] - sky[1][1])));
  // sun
  const d = Math.hypot(u - 0.68, v - 0.52);
  if (d < 0.14) col = [255, 233, 180];
  else if (d < 0.2) col = mix(col, [255, 214, 150], 0.55);
  // hills
  const h1 = 0.72 + Math.sin(u * 5.2) * 0.06;
  const h2 = 0.82 + Math.sin(u * 7 + 1.3) * 0.05;
  if (v > h2) col = hex(COLORS.primary);
  else if (v > h1) col = mix(hex(COLORS.primary), [80, 70, 150], 0.55);
  // fine detail stripes (only visible at high resolution)
  if (v > h2 && Math.floor(u * 64) % 2 === 0) col = mix(col, [255, 255, 255], 0.09);
  return `rgb(${col[0]},${col[1]},${col[2]})`;
};

export const PixelGrid: React.FC<{ n: number; size: number; radius?: number }> = ({ n, size, radius = 28 }) => {
  const cell = size / n;
  return (
    <svg width={size} height={size} style={{ borderRadius: radius, display: "block", overflow: "hidden" }} shapeRendering="crispEdges">
      {Array.from({ length: n * n }).map((_, i) => {
        const x = i % n, y = Math.floor(i / n);
        return <rect key={i} x={x * cell} y={y * cell} width={cell + 0.6} height={cell + 0.6} fill={sample((x + 0.5) / n, (y + 0.5) / n)} />;
      })}
    </svg>
  );
};
