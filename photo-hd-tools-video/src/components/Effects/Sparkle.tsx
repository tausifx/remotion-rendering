import React from "react";
import { COLORS } from "../../theme";
import { prog } from "../../utils/animations";
import { EASE } from "../../theme";

type Props = { x: number; y: number; size?: number; frame: number; start: number; color?: string; dur?: number };

/** Four-point star that pops, spins slightly and fades. */
export const Sparkle: React.FC<Props> = ({ x, y, size = 60, frame, start, color = COLORS.white, dur = 22 }) => {
  const p = prog(frame, start, dur, EASE.out);
  if (frame < start || p >= 1) return null;
  const s = Math.sin(p * Math.PI);
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      style={{ position: "absolute", left: x - size / 2, top: y - size / 2, transform: `scale(${s}) rotate(${p * 70}deg)`, opacity: s, overflow: "visible" }}
    >
      <path d="M0 -48 C4 -14 14 -4 48 0 C14 4 4 14 0 48 C-4 14 -14 4 -48 0 C-14 -4 -4 -14 0 -48Z" fill={color} />
    </svg>
  );
};
