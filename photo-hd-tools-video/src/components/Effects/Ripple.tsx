import React from "react";
import { COLORS } from "../../theme";
import { prog } from "../../utils/animations";
import { EASE } from "../../theme";

export const Ripple: React.FC<{ x: number; y: number; frame: number; start: number; color?: string; max?: number }> = ({
  x, y, frame, start, color = COLORS.accent, max = 150,
}) => {
  const p = prog(frame, start, 24, EASE.out);
  if (frame < start || p >= 1) return null;
  const r = max * p;
  return (
    <div
      style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", border: `5px solid ${color}`, opacity: 1 - p }}
    />
  );
};

/** Pointer cursor (SVG) */
export const Cursor: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <svg width="64" height="64" viewBox="0 0 24 24" style={{ position: "absolute", left: x, top: y, transform: `scale(${scale})`, transformOrigin: "3px 2px", filter: "drop-shadow(0 6px 8px rgba(0,0,0,.25))" }}>
    <path d="M4 2 L4 19 L8.5 15 L11.5 22 L14.5 20.8 L11.6 14 L17.5 14 Z" fill="#141414" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
